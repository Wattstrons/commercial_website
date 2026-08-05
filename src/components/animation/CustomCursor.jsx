/**
 * CustomCursor
 * A global custom cursor: glowing green dot + outer ring.
 * Hides the native cursor site-wide via CSS.
 * Drop this once inside App.jsx — it handles everything itself.
 */

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const mouse    = useRef({ x: -200, y: -200 });
  const ring     = useRef({ x: -200, y: -200 });
  const raf      = useRef(null);
  const [clicking, setClicking] = useState(false);
  const visibleRef = useRef(false);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // ── track raw mouse ──────────────────────────────────────────────
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      visibleRef.current = true;
      
      // Check if hovering over a clickable element
      const target = e.target;
      const isClickable = target.closest('.view-details-btn, .cursor-pointer, a, button');
      isHoveringRef.current = !!isClickable;
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    const onLeave = () => visibleRef.current = false;
    const onEnter = () => visibleRef.current = true;

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // ── animation loop: dot snaps, ring lags ────────────────────────
    const animate = () => {
      // Only animate custom cursor when NOT hovering clickable elements
      if (!isHoveringRef.current) {
        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
          dotRef.current.style.opacity = visibleRef.current ? 1 : 0;
        }

        ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.12;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
          ringRef.current.style.opacity = visibleRef.current ? 1 : 0;
        }
      } else {
        // Hide custom cursor when hovering view details
        if (dotRef.current) dotRef.current.style.opacity = 0;
        if (ringRef.current) ringRef.current.style.opacity = 0;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
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
      `}</style>

      {/* Custom cursor - visible by default, hidden on clickable elements */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: clicking ? "28px" : "36px",
          height: clicking ? "28px" : "36px",
          marginLeft: clicking ? "-14px" : "-18px",
          marginTop: clicking ? "-14px" : "-18px",
          border: "1.5px solid #22c55e",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.15s ease, height 0.15s ease, margin 0.15s ease, opacity 0.3s ease",
          willChange: "transform",
        }}
      />

      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: clicking ? "6px" : "8px",
          height: clicking ? "6px" : "8px",
          marginLeft: clicking ? "-3px" : "-4px",
          marginTop: clicking ? "-3px" : "-4px",
          background: "#22c55e",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.1s ease, height 0.1s ease, margin 0.1s ease, opacity 0.3s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
