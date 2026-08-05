import React, { useMemo, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

function generateStars(count, starColor) {
 const shadows = [];
 for (let i = 0; i < count; i++) {
 const x = Math.floor(Math.random() * 6000) - 2000;
 const y = Math.floor(Math.random() * 4000) - 2000;
 shadows.push(`${x}px ${y}px ${starColor}`);
 }
 return shadows.join(", ");
}

function StarLayer({
  count = 1000,
  size = 1,
  duration = 50,
  starColor = "#fff",
  className,
  ...props
}) {
  const boxShadow = useMemo(() => generateStars(count, starColor), [count, starColor]);

  return (
    <div
      data-slot="star-layer"
      className={cn("animate-stars absolute top-0 left-0 w-full h-[2000px]", className)}
      style={{
        "--star-duration": `${duration}s`,
      }}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </div>
  );
}

export function StarsBackground({
 children,
 className,
 factor = 0.05,
 speed = 50,
 transition = { stiffness: 50, damping: 20 },
 starColor = "#fff",
 ...props
}) {
 const offsetX = useMotionValue(1);
 const offsetY = useMotionValue(1);

 const springX = useSpring(offsetX, transition);
 const springY = useSpring(offsetY, transition);

 const rafRef = React.useRef(null);
 const handleMouseMove = useCallback(
 (e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const newOffsetX = -(e.clientX - centerX) * factor;
        const newOffsetY = -(e.clientY - centerY) * factor;
        offsetX.set(newOffsetX);
        offsetY.set(newOffsetY);
    });
 },
 [offsetX, offsetY, factor]
 );

 return (
 <div
 data-slot="stars-background"
 className={cn(
 "relative w-full bg-black",
 className
 )}
 onMouseMove={handleMouseMove}
 {...props}
 >
 {/* Background stars container */}
 <div className="absolute inset-0 pointer-events-none">
 {/* Sticky wrapper to keep stars visible during scroll */}
 <div className="sticky top-0 w-full h-screen overflow-hidden">
 <motion.div style={{ x: springX, y: springY }} className="absolute inset-0">
 <StarLayer
 count={1000}
 size={1}
 duration={speed}
 starColor={starColor}
 />
 <StarLayer
 count={400}
 size={2}
 duration={speed * 2}
 starColor={starColor}
 />
 <StarLayer
 count={200}
 size={3}
 duration={speed * 3}
 starColor={starColor}
 />
 </motion.div>
 </div>
 </div>
 
 {/* Foreground content */}
 <div className="relative z-10 w-full">
 {children}
 </div>
 </div>
 );
}
