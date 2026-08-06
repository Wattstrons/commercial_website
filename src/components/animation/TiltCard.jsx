/**
 * TiltCard
 * A 3D perspective tilt card with a soft spotlight effect.
 *
 * Props:
 * tiltLimit - max tilt angle in degrees (default 15)
 * scale - scale on hover (default 1.05)
 * perspective - perspective distance in px (default 1200)
 * effect - "gravitate" (follows cursor) | "evade" (tilts away) (default "evade")
 * spotlight - show radial spotlight on hover (default true)
 * className - extra classes for the wrapper
 * style - extra inline styles
 * children - card content
 */

import { useRef, useState, useCallback } from "react";

export function TiltCard({
 tiltLimit = 15,
 scale = 1.05,
 perspective = 1200,
 effect = "evade",
 spotlight = true,
 className = "",
 style = {},
 children,
}) {
 const cardRef = useRef(null);
 const dir = effect === "evade" ? -1 : 1;

 const [transform, setTransform] = useState(
 `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
 );
 const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
 const [isHovered, setIsHovered] = useState(false);

 const handlePointerMove = useCallback(
 (e) => {
 const el = cardRef.current;
 if (!el) return;
 const rect = el.getBoundingClientRect();
 const px = (e.clientX - rect.left) / rect.width;
 const py = (e.clientY - rect.top) / rect.height;
 const xRot = (py - 0.5) * tiltLimit * 2 * dir;
 const yRot = (px - 0.5) * -(tiltLimit * 2) * dir;
 setTransform(
 `perspective(${perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(${scale},${scale},${scale})`
 );
 if (spotlight) setSpotlightPos({ x: px * 100, y: py * 100 });
 },
 [tiltLimit, scale, perspective, dir, spotlight]
 );

 const handlePointerEnter = useCallback(() => setIsHovered(true), []);

 const handlePointerLeave = useCallback(() => {
 setTransform(
 `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
 );
 setIsHovered(false);
 }, [perspective]);

 return (
 <div
 ref={cardRef}
 onPointerEnter={handlePointerEnter}
 onPointerMove={handlePointerMove}
 onPointerLeave={handlePointerLeave}
 className={`relative overflow-hidden will-change-transform ${className}`}
 style={{
 transform,
 transition: "transform 0.2s ease-out",
 transformStyle: "preserve-3d",
 ...style,
 }}
 >
 {children}

 {/* Spotlight overlay */}
 {spotlight && (
 <div
 className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
 style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s" }}
 >
 <div
 className="absolute w-[200%] h-[200%] rounded-full"
 style={{
 left: `${spotlightPos.x}%`,
 top: `${spotlightPos.y}%`,
 transform: "translate(-50%, -50%)",
 background:
 "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 40%)",
 }}
 />
 </div>
 )}
 </div>
 );
}
