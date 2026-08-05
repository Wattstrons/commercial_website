/**
 * CustomCursor
 * A global custom cursor: glowing green dot + outer ring.
 * Hides the native cursor site-wide via CSS.
 * Drop this once inside App.jsx — it handles everything itself.
 */

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const raf = useRef(null);
  const visibleRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isMoving = useRef(false);

  useEffect(() => {
    // ── track raw mouse ──────────────────────────────────────────────
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      visibleRef.current = true;
      isMoving.current = true;

      // Wake up animation loop if it's sleeping
      if (!raf.current) {
        raf.current = requestAnimationFrame(animate);
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (target.closest('.view-details-btn, .cursor-pointer, a, button')) {
        isHoveringRef.current = true;
      }
    };

    const onMouseOut = (e) => {
      isHoveringRef.current = false;
    };

    const onDown = () => {
      if (ringRef.current) ringRef.current.classList.add("is-clicking");
      if (dotRef.current) dotRef.current.classList.add("is-clicking");
    };

    const onUp = () => {
      if (ringRef.current) ringRef.current.classList.remove("is-clicking");
      if (dotRef.current) dotRef.current.classList.remove("is-clicking");
    };

    const onLeave = () => {
      visibleRef.current = false;
      if (!raf.current) raf.current = requestAnimationFrame(animate); // force update
    };

    const onEnter = () => {
      visibleRef.current = true;
      if (!raf.current) raf.current = requestAnimationFrame(animate); // force update
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("mouseenter", onEnter, { passive: true });

    // ── animation loop: dot snaps, ring lags ────────────────────────
    const animate = () => {
      let needsNextFrame = false;

      if (!isHoveringRef.current) {
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
          dotRef.current.style.opacity = visibleRef.current ? 1 : 0;
        }

        const dx = mouse.current.x - ring.current.x;
        const dy = mouse.current.y - ring.current.y;

        ring.current.x += dx * 0.12;
        ring.current.y += dy * 0.12;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
          ringRef.current.style.opacity = visibleRef.current ? 1 : 0;
        }

        // If ring is still catching up, keep animating
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          needsNextFrame = true;
        }
      } else {
        // Hide custom cursor when hovering view details
        if (dotRef.current) dotRef.current.style.opacity = 0;
        if (ringRef.current) ringRef.current.style.opacity = 0;
      }

      if (needsNextFrame || isMoving.current) {
        isMoving.current = false; // Reset flag so it sleeps if no new mousemove fires
        raf.current = requestAnimationFrame(animate);
      } else {
        raf.current = null; // Sleep
      }
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Don't render on touch-only devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <style>{`
        /* Hide native cursor completely */
        * {
          cursor: none !important;
        }
        
        /* Show native cursor on clickable elements - this overrides the above */
        .view-details-btn,
        .view-details-btn *,
        .cursor-pointer,
        .cursor-pointer *,
        a, a *,
        button, button * {
          cursor: pointer !important;
        }
        
        /* Ensure body has no cursor */
        html, body {
          cursor: none;
        }

        /* Custom Cursor Base Styles */
        .custom-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 36px;
          height: 36px;
          margin-left: -18px;
          margin-top: -18px;
          border: 1.5px solid #22c55e;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transition: width 0.15s ease, height 0.15s ease, margin 0.15s ease, opacity 0.3s ease;
          will-change: transform;
        }
        .custom-cursor-ring.is-clicking {
          width: 28px;
          height: 28px;
          margin-left: -14px;
          margin-top: -14px;
        }

        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          margin-left: -4px;
          margin-top: -4px;
          background: #22c55e;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transition: width 0.1s ease, height 0.1s ease, margin 0.1s ease, opacity 0.3s ease;
          will-change: transform;
        }
        .custom-cursor-dot.is-clicking {
          width: 6px;
          height: 6px;
          margin-left: -3px;
          margin-top: -3px;
        }
      `}</style>

      {/* Custom cursor - visible by default, hidden on clickable elements */}
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}
