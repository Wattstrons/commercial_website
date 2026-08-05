
import { useEffect, useRef, useMemo } from "react";
import {
 Clock,
 PerspectiveCamera,
 Scene,
 WebGLRenderer,
 SRGBColorSpace,
 MathUtils,
 Vector2,
 Vector3,
 MeshPhysicalMaterial,
 Color,
 Object3D,
 InstancedMesh,
 PMREMGenerator,
 SphereGeometry,
 AmbientLight,
 PointLight,
 ACESFilmicToneMapping,
 Raycaster,
 Plane,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// ─── Three.js Scene Manager ────────────────────────────────────────────────

class ThreeScene {
 constructor(canvas) {
 this._resizeTimer = null;
 this._animFrameId = 0;
 this._clock = new Clock();
 this._animState = { elapsed: 0, delta: 0 };
 this._animating = false;
 this._visible = false;

 this.canvas = canvas;
 this.camera = new PerspectiveCamera(50, 1, 0.1, 100);
 this.scene = new Scene();
 this.renderer = new WebGLRenderer({
 canvas,
 powerPreference: "high-performance",
 alpha: true,
 antialias: true,
 });
 this.renderer.outputColorSpace = SRGBColorSpace;
 this.renderer.toneMapping = ACESFilmicToneMapping;
 this.canvas.style.display = "block";

 this.size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0 };
 this.onBeforeRender = () => {};
 this.onAfterResize = () => {};

 this._initObservers();
 this.resize();
 }

 _initObservers() {
 const parent = this.canvas.parentNode;
 if (parent) {
 this._resizeObserver = new ResizeObserver(() => this._scheduleResize());
 this._resizeObserver.observe(parent);
 } else {
 window.addEventListener("resize", () => this._scheduleResize());
 }

 this._intersectionObserver = new IntersectionObserver(
 (entries) => {
 this._animating = entries[0].isIntersecting;
 this._animating ? this._startAnim() : this._stopAnim();
 },
 { threshold: 0 }
 );
 this._intersectionObserver.observe(this.canvas);

 document.addEventListener("visibilitychange", () => {
 if (this._animating) {
 document.hidden ? this._stopAnim() : this._startAnim();
 }
 });
 }

 _scheduleResize() {
 clearTimeout(this._resizeTimer);
 this._resizeTimer = setTimeout(() => this.resize(), 100);
 }

 resize() {
 const parent = this.canvas.parentNode;
 const w = parent ? parent.offsetWidth : window.innerWidth;
 const h = parent ? parent.offsetHeight : window.innerHeight;

 this.size.width = w;
 this.size.height = h;
 this.size.ratio = w / h;

 this.camera.aspect = this.size.ratio;
 this.camera.updateProjectionMatrix();

 const fovRad = (this.camera.fov * Math.PI) / 180;
 this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.z;
 this.size.wWidth = this.size.wHeight * this.camera.aspect;

 this.renderer.setSize(w, h);
 this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
 this.onAfterResize(this.size);
 }

 _startAnim() {
 if (this._visible) return;
 this._visible = true;
 this._clock.start();
 const loop = () => {
 this._animFrameId = requestAnimationFrame(loop);
 this._animState.delta = this._clock.getDelta();
 this._animState.elapsed += this._animState.delta;
 this.onBeforeRender(this._animState);
 this.renderer.render(this.scene, this.camera);
 };
 loop();
 }

 _stopAnim() {
 if (!this._visible) return;
 cancelAnimationFrame(this._animFrameId);
 this._visible = false;
 this._clock.stop();
 }

 dispose() {
 this._stopAnim();
 this._resizeObserver?.disconnect();
 this._intersectionObserver?.disconnect();
 this.scene.clear();
 this.renderer.dispose();
 }
}

// ─── Physics Engine ────────────────────────────────────────────────────────

class BallPhysics {
 constructor(config) {
 this.config = config;
 this.positionData = new Float32Array(3 * config.count);
 this.velocityData = new Float32Array(3 * config.count);
 this.sizeData = new Float32Array(config.count);
 this.center = new Vector3();
 this._initPositions();
 this._initSizes();
 }

 _initPositions() {
 const { count, maxX, maxY, maxZ } = this.config;
 this.center.toArray(this.positionData, 0);
 for (let i = 1; i < count; i++) {
 const idx = 3 * i;
 this.positionData[idx] = MathUtils.randFloatSpread(2 * maxX);
 this.positionData[idx + 1] = MathUtils.randFloatSpread(2 * maxY);
 this.positionData[idx + 2] = MathUtils.randFloatSpread(2 * maxZ);
 }
 }

 _initSizes() {
 const { count, size0, minSize, maxSize } = this.config;
 this.sizeData[0] = size0;
 for (let i = 1; i < count; i++) {
 this.sizeData[i] = MathUtils.randFloat(minSize, maxSize);
 }
 }

 update({ delta }) {
 const { config, center, positionData, sizeData, velocityData } = this;
 const start = config.controlSphere0 ? 1 : 0;

 if (config.controlSphere0) {
 new Vector3().fromArray(positionData, 0).lerp(center, 0.1).toArray(positionData, 0);
 new Vector3(0, 0, 0).toArray(velocityData, 0);
 }

 for (let i = start; i < config.count; i++) {
 const base = 3 * i;
 const pos = new Vector3().fromArray(positionData, base);
 const vel = new Vector3().fromArray(velocityData, base);

 vel.y -= delta * config.gravity * sizeData[i];
 vel.multiplyScalar(config.friction);
 vel.clampLength(0, config.maxVelocity);
 pos.add(vel);

 // Sphere–sphere collision
 for (let j = i + 1; j < config.count; j++) {
 const ob = 3 * j;
 const otherPos = new Vector3().fromArray(positionData, ob);
 const diff = new Vector3().subVectors(otherPos, pos);
 const dist = diff.length();
 const minDist = sizeData[i] + sizeData[j];
 if (dist < minDist) {
 const overlap = (minDist - dist) * 0.5;
 diff.normalize();
 pos.addScaledVector(diff, -overlap);
 otherPos.addScaledVector(diff, overlap);
 otherPos.toArray(positionData, ob);
 }
 }

 // Wall bounce
 if (Math.abs(pos.x) + sizeData[i] > config.maxX) {
 pos.x = Math.sign(pos.x) * (config.maxX - sizeData[i]);
 vel.x *= -config.wallBounce;
 }
 if (pos.y - sizeData[i] < -config.maxY) {
 pos.y = -config.maxY + sizeData[i];
 vel.y *= -config.wallBounce;
 }
 if (Math.abs(pos.z) + sizeData[i] > config.maxZ) {
 pos.z = Math.sign(pos.z) * (config.maxZ - sizeData[i]);
 vel.z *= -config.wallBounce;
 }

 pos.toArray(positionData, base);
 vel.toArray(velocityData, base);
 }
 }
}

// ─── Instanced Ball Mesh ───────────────────────────────────────────────────

const _dummy = new Object3D();

class BallMesh extends InstancedMesh {
 constructor(renderer, params) {
 const pmrem = new PMREMGenerator(renderer);
 const envTexture = pmrem.fromScene(new RoomEnvironment(renderer)).texture;
 pmrem.dispose();

 const geometry = new SphereGeometry(1, 24, 24);
 const material = new MeshPhysicalMaterial({
 envMap: envTexture,
 metalness: 0.7,
 roughness: 0.3,
 clearcoat: 1,
 clearcoatRoughness: 0.2,
 ...(params.materialParams ?? {}),
 });

 super(geometry, material, params.count);
 this.config = params;
 this.physics = new BallPhysics(params);

 this.ambientLight = new AmbientLight(0xffffff, params.ambientIntensity ?? 1.5);
 this.add(this.ambientLight);

 this.pointLight = new PointLight(0xffffff, params.lightIntensity ?? 3, 100, 1);
 this.add(this.pointLight);

 this._applyColors(params.colors);
 }

 _applyColors(colors) {
 if (!Array.isArray(colors) || !colors.length) return;
 const colorObjs = colors.map((c) => (c instanceof Color ? c : new Color(c)));
 for (let i = 0; i < this.count; i++) {
 this.setColorAt(i, colorObjs[i % colorObjs.length]);
 }
 if (this.instanceColor) this.instanceColor.needsUpdate = true;
 }

 tick(state) {
 this.physics.update(state);
 for (let i = 0; i < this.count; i++) {
 _dummy.position.fromArray(this.physics.positionData, 3 * i);
 _dummy.scale.setScalar(this.physics.sizeData[i]);
 _dummy.updateMatrix();
 this.setMatrixAt(i, _dummy.matrix);
 }
 this.instanceMatrix.needsUpdate = true;
 if (this.config.controlSphere0) {
 this.pointLight.position.fromArray(this.physics.positionData, 0);
 }
 }
}

// ─── Global pointer ────────────────────────────────────────────────────────

const _pointer = new Vector2();
function _onPointerMove(e) {
 _pointer.set(
 (e.clientX / window.innerWidth) * 2 - 1,
 -(e.clientY / window.innerHeight) * 2 + 1
 );
}

// ─── Default Config ────────────────────────────────────────────────────────

const DEFAULT_CONFIG = {
 count: 150,
 minSize: 0.3,
 maxSize: 0.8,
 size0: 1.0,
 gravity: 0.4,
 friction: 0.995,
 wallBounce: 0.2,
 maxVelocity: 0.1,
 maxX: 10,
 maxY: 10,
 maxZ: 10,
 controlSphere0: true,
 followCursor: true,
 lightIntensity: 4,
 ambientIntensity: 1.5,
 colors: [
 "#10b981", // emerald-500
 "#34d399", // emerald-400
 "#6ee7b7", // emerald-300
 "#059669", // emerald-600
 "#0891b2", // cyan-600
 "#22d3ee", // cyan-400
 "#1a1a2e", // dark navy
 "#0f172a", // slate-900
 ],
};

// ─── React Component ───────────────────────────────────────────────────────

/**
 * @param {{ config?: Partial<typeof DEFAULT_CONFIG>, className?: string }} props
 */
export default function BallpitCanvas({ config: userConfig = {}, className = "" }) {
 const canvasRef = useRef(null);
 const config = useMemo(
 () => ({ ...DEFAULT_CONFIG, ...userConfig }),
 // eslint-disable-next-line react-hooks/exhaustive-deps
 [JSON.stringify(userConfig)]
 );

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;

 const three = new ThreeScene(canvas);
 three.camera.position.set(0, 0, 20);

 const balls = new BallMesh(three.renderer, config);
 three.scene.add(balls);

 const raycaster = new Raycaster();
 const plane = new Plane(new Vector3(0, 0, 1), 0);
 const hit = new Vector3();

 if (config.followCursor) {
 window.addEventListener("pointermove", _onPointerMove);
 }

 three.onBeforeRender = (state) => {
 if (config.followCursor) {
 raycaster.setFromCamera(_pointer, three.camera);
 if (raycaster.ray.intersectPlane(plane, hit)) {
 balls.physics.center.copy(hit);
 }
 }
 balls.tick(state);
 };

 three.onAfterResize = (size) => {
 balls.physics.config.maxX = size.wWidth / 2;
 balls.physics.config.maxY = size.wHeight / 2;
 balls.physics.config.maxZ = size.wWidth / 4;
 };

 return () => {
 if (config.followCursor) {
 window.removeEventListener("pointermove", _onPointerMove);
 }
 three.dispose();
 };
 }, [config]);

 return (
 <canvas
 ref={canvasRef}
 className={`absolute inset-0 w-full h-full ${className}`}
 style={{ display: "block" }}
 />
 );
}
