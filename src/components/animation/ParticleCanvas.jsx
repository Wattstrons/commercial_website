import { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const ParticleCanvas = ({ projects, active }) => {
 const canvasRef = useRef(null);
 const animationRef = useRef(null);

 const particlesMap = useRef({});
 const currentIndex = useRef(active);

 const mouse = useRef({ x: 0, y: 0, active: false });
 const opacityRef = useRef(0);

 /* 🎛️ MOTION CONTROL */
 const MOTION_SCALE = 0.28;
 const FORCE_SCALE = 0.35;
 const VERTICAL_SCALE = 0.78;
 const MORPH_SPEED = 0.12;

 /* 3D ROTATION */
 const rotationRef = useRef({ x: 0, y: 0 });

 /* 📐 CANVAS SIZE */
 const CANVAS_WIDTH = 1400;
 const CANVAS_HEIGHT = 1200;
 const CONTENT_WIDTH = 900;
 const OFFSET = (CANVAS_WIDTH - CONTENT_WIDTH) / 2;
 const CX = CANVAS_WIDTH / 2;
 const CY = CANVAS_HEIGHT / 2;
 const RADIUS = CONTENT_WIDTH / 2;

 const isMobile = window.innerWidth < 768;
 const ICON_DENSITY = isMobile ? 12 : 8;

 const activeParticles = useRef([]);

 useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    let isVisible = false; // Will be set by IntersectionObserver

    /* 🖱️ MOUSE - Improved tracking */
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      mouse.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
        active: true,
      };
    };
    
    const onLeave = () => {
      mouse.current.active = false;
    };

    const onEnter = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      mouse.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
        active: true,
      };
    };

    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave, { passive: true });
    canvas.addEventListener("mouseenter", onEnter, { passive: true });

    /* 🔧 CREATE PARTICLES */
    const createParticles = (src, density, size) =>
      new Promise(resolve => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          ctx.drawImage(img, OFFSET, OFFSET, CONTENT_WIDTH, CONTENT_WIDTH);

          const data = ctx.getImageData(
            0,
            0,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
          ).data;

          const raw = [];
          let minY = Infinity;
          let maxY = -Infinity;
          const cy = CANVAS_HEIGHT / 2;

          for (let y = 0; y < CANVAS_HEIGHT; y += density) {
            for (let x = 0; x < CANVAS_WIDTH; x += density) {
              const i = (y * CANVAS_WIDTH + x) * 4;
              if (data[i + 3] > 150) {
                const sy = (y - cy) * VERTICAL_SCALE + cy;
                minY = Math.min(minY, sy);
                maxY = Math.max(maxY, sy);

                raw.push({
                  x: Math.random() * CANVAS_WIDTH,
                  y: Math.random() * CANVAS_HEIGHT,
                  z: Math.random() * 100 - 50,
                  tx: x,
                  ty: sy,
                  tz: 0,
                  ox: x,
                  oy: sy,
                  oz: 0,
                  vx: 0,
                  vy: 0,
                  vz: 0,
                  size: Math.random() * size + 0.5,
                });
              }
            }
          }

          const range = maxY - minY || 1;
          
          raw.forEach(p => {
            const normalizedY = (p.ty - minY) / range;
            const targetHeight = CONTENT_WIDTH * 0.8;
            const centeredY = (normalizedY * targetHeight) + (CANVAS_HEIGHT - targetHeight) / 2;
            
            p.ty = centeredY;
            p.oy = centeredY;
            
            p.tz = (Math.random() - 0.5) * 40; 
            p.oz = p.tz;
          });

          resolve(raw);
        };
      });

    /* 🔥 PRELOAD */
    const preload = async () => {
      for (let i = 0; i < projects.length; i++) {
        let iconUrl = "";
        if (typeof projects[i].icon === 'function' || typeof projects[i].icon === 'object') {
          const Icon = projects[i].icon;
          const svgString = renderToStaticMarkup(
            <Icon size={800} color="white" strokeWidth={2} />
          );
          const encoded = encodeURIComponent(svgString);
          iconUrl = `data:image/svg+xml;charset=utf-8,${encoded}`;
        } else {
          iconUrl = projects[i].icon;
        }

        const iconPts = await createParticles(
          iconUrl,
          ICON_DENSITY,
          2.0
        );
        particlesMap.current[i] = iconPts;
      }
      
      if (activeParticles.current.length === 0 && particlesMap.current[0]) {
        activeParticles.current = particlesMap.current[0].map(p => ({
          ...p,
          x: p.tx, 
          y: p.ty,
          z: p.tz
        }));
      }
    };

    /* 🎬 LOOP */
    const animate = () => {
      if (!isVisible) {
        animationRef.current = null;
        return;
      }

      ctx.restore();
      ctx.save();

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      opacityRef.current = Math.min(opacityRef.current + 0.02, 1);
      
      // Mouse interaction for rotation - only when mouse is active
      if (mouse.current.active) {
        const targetRotY = (mouse.current.x - CX) * 0.0005;
        const targetRotX = (mouse.current.y - CY) * 0.0005;
        rotationRef.current.y += (targetRotY - rotationRef.current.y) * 0.1;
        rotationRef.current.x += (targetRotX - rotationRef.current.x) * 0.1;
      }

      const targetParticles =
        particlesMap.current[currentIndex.current] || [];
      
      // Update active particles to match target count
      while (activeParticles.current.length < targetParticles.length) {
        const randIdx = Math.floor(Math.random() * targetParticles.length);
        const p = targetParticles[randIdx];
        activeParticles.current.push({
          ...p,
          x: Math.random() * CANVAS_WIDTH,
          y: Math.random() * CANVAS_HEIGHT,
          z: Math.random() * 200 - 100,
        });
      }
      if (activeParticles.current.length > targetParticles.length) {
        activeParticles.current.length = targetParticles.length;
      }

      // Update targets
      for (let i = 0; i < activeParticles.current.length; i++) {
        const target = targetParticles[i];
        if (target) {
          activeParticles.current[i].tx = target.tx;
          activeParticles.current[i].ty = target.ty;
          activeParticles.current[i].tz = target.tz;
          activeParticles.current[i].ox = target.tx;
          activeParticles.current[i].oy = target.ty;
          activeParticles.current[i].oz = target.tz;
        }
      }

      // Define gradient colors
      const colorStart = [0, 237, 194]; // RGB for #00EDC2
      const colorEnd = [0, 237, 194]; // RGB for #00EDC2

      activeParticles.current.forEach(p => {
        // Morphing Logic
        const dx = p.ox - p.x;
        const dy = p.oy - p.y;
        const dz = (p.oz || 0) - (p.z || 0);
        
        p.vx += dx * MORPH_SPEED * FORCE_SCALE;
        p.vy += dy * MORPH_SPEED * FORCE_SCALE;
        p.vz += dz * MORPH_SPEED * FORCE_SCALE;

        // Mouse interaction (Repel) - only when mouse is active
        if (mouse.current.active) {
          const dxM = p.x - mouse.current.x;
          const dyM = p.y - mouse.current.y;
          const dist = Math.sqrt(dxM * dxM + dyM * dyM);
          if (dist < 100) {
            const force = (100 - dist) * 0.15 * FORCE_SCALE;
            p.vx += (dxM / (dist || 1)) * force;
            p.vy += (dyM / (dist || 1)) * force;
          }
        }

        // Add subtle float/jitter
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;
        p.vz += (Math.random() - 0.5) * 0.05;

        p.vx *= 0.85;
        p.vy *= 0.85;
        p.vz *= 0.85;
        
        p.x += p.vx;
        p.y += p.vy;
        p.z = (p.z || 0) + p.vz;

        // 3D PROJECTION
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);

        let px = p.x - CX;
        let py = p.y - CY;
        let pz = p.z;

        let x1 = px * cosY - pz * sinY;
        let z1 = px * sinY + pz * cosY;

        let y1 = py * cosX - z1 * sinX;
        let z2 = py * sinX + z1 * cosX;

        const perspective = 800;
        const scale = perspective / (perspective + z2);
        
        const screenX = x1 * scale + CX;
        const screenY = y1 * scale + CY;

        // Calculate gradient color based on particle's X position
        const normalizedX = Math.max(0, Math.min(1, (screenX - CX + RADIUS) / (RADIUS * 2)));
        
        const r = Math.round(colorStart[0] + (colorEnd[0] - colorStart[0]) * normalizedX);
        const g = Math.round(colorStart[1] + (colorEnd[1] - colorStart[1]) * normalizedX);
        const b = Math.round(colorStart[2] + (colorEnd[2] - colorStart[2]) * normalizedX);

        const alpha = Math.max(0.1, Math.min(1, (scale * scale) * 0.85 * opacityRef.current));
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        
        let drawSize = p.size * scale;
        
        // Enhanced mouse interaction for sizing
        if (mouse.current.active) {
          const dxM = screenX - mouse.current.x;
          const dyM = screenY - mouse.current.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < 120) {
            drawSize *= (1.5 + (120 - distM) / 80);
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
            ctx.shadowBlur = 15;
          } else {
            ctx.shadowBlur = 0;
          }
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.arc(screenX, screenY, drawSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    ctx.save();
    preload();

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && !animationRef.current) {
          animate();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("mouseenter", onEnter);
    };
  }, [projects]);

 useEffect(() => {
 currentIndex.current = active;
 }, [active]);

 return (
 <canvas
 ref={canvasRef}
 className="cursor-none" // Hide default cursor for custom interaction
 style={{ 
 display: "block", 
 width: "100%", 
 height: "100%", 
 objectFit: "contain",
 pointerEvents: "auto"
 }}
 />
 );
};

export default ParticleCanvas;
