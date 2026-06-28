import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import boardImageEmbedded from "../../assets/ourservice/embedded.png";
import boardImageIoT from "../../assets/ourservice/Iot.png";
import boardImagePCB from "../../assets/ourservice/PCBDesigning.png";
import boardImageApp from "../../assets/ourservice/prototyping.png";
import boardImageEdgeAI from "../../assets/ourservice/ESD.png";
import boardImageIndustrial from "../../assets/ourservice/softwaredevelopment.jpeg";
import boardImageSensing from "../../assets/ourservice/portaldevelopment.jpeg";
import boardImageSecurity from "../../assets/ourservice/IndustrialEnclosure_ProductDesign.png";

const AnimatedSplitText = ({ text, delayOffset = 0.2, className = "", style = {} }) => {
  const chars = text.split("");
  const mid = Math.floor(chars.length / 2);
  return (
    <motion.p
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, x: i < mid ? -20 : 20 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.3, delay: delayOffset + i * 0.01 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.p>
  );
};

// ─── Font Loader with CRT effect and Space Grotesk ───────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    
    * {
      font-family: 'Space Grotesk', sans-serif;
    }
    
    @keyframes scan {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    @keyframes crtFlicker {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.98; }
    }
    .crt-scan {
      animation: scan 8s linear infinite;
    }
    .crt-flicker {
      animation: crtFlicker 0.15s infinite;
    }
  `}</style>
);

// ─── Services Data with Routes ────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    title: "Embedded Systems Design",
    description: "Custom embedded hardware and firmware solutions for real-time intelligent systems.",
    accent: "#00EDC2",
    border: "rgba(0,237,194,0.4)",
    image: boardImageEmbedded,
    route: "/services/embedded-system-design",
  },
  {
    id: 2,
    title: "IoT Application Development",
    description: "Connected smart systems with cloud integration, monitoring, and remote control capabilities.",
    accent: "#00EDC2",
    border: "rgba(0,237,194,0.4)",
    image: boardImageIoT,
    route: "/services/iot-application-development",
  },
  {
    id: 3,
    title: "PCB Design & Circuit Development",
    description: "Multi-layer PCB design, schematic creation, signal integrity analysis, and DFM-compliant layouts.",
    accent: "#00EDC2",
    border: "rgba(0,237,194,0.4)",
    image: boardImagePCB,
    route: "/services/pcb-design-circuit-development",
  },
  {
    id: 4,
    title: "Product Prototyping & Hardware Development",
    description: "Rapid prototyping and end-to-end hardware development from concept to functional prototype.",
    accent: "#00EDC2",
    border: "rgba(0,237,194,0.4)",
    image: boardImageApp,
    route: "/services/product-prototype-hardware-development",
  },
  {
    id: 5,
    title: "AI & Intelligent Automation",
    description: " AI-powered analytics, edge intelligence, automation workflows, and smart monitoring systems.",
    accent: "#00EDC2",
    border: "rgba(0,237,194,0.4)",
    image: boardImageEdgeAI,
    route: "/services/AI_IntelligentAutomation",
  },
  {
    id: 6,
    title: "Software Solutions",
    description: "Custom software development including industrial systems, automation tools, and backend solutions.",
    accent: "#00EDC2",
    border: "rgba(0,237,194,0.4)",
    image: boardImageIndustrial,
    route: "/services/software-solutions",
  },
  {
    id: 7,
    title: "Portal Development",
    description: "Modern, responsive, and high-performance websites with scalable frontend and backend architecture.",
    accent: "#00EDC2",
    border: "rgba(0,237,194,0.4)",
    image: boardImageSensing,
    route: "/services/Portal-development",
  },
  {
    id: 8,
    title: "Industrial Enclosure & Product Design",
    description: "Custom product enclosures, industrial chassis, and IP-rated mechanical designs engineered for durability, thermal efficiency, and real-world deployment.",
    accent: "#00EDC2",
    border: "rgba(0,237,194,0.4)",
    image: boardImageSecurity,
    route: "/services/IndustrialEnclosure-ProductDesign",
  },
];

const GROUP_SIZE = 4;
const GROUPS = [SERVICES.slice(0, GROUP_SIZE), SERVICES.slice(GROUP_SIZE)];
const NUM_GROUPS = GROUPS.length;

const EASE = [0.22, 1, 0.36, 1];

// ─── Card Variants ────────────────────────────────────────────────────────────
const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: 44,
    filter: "blur(10px)",
    scale: 0.95,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 0.6], delay: i * 0.05 },
  }),
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.65, ease: EASE },
  }),
  exit: (i) => ({
    opacity: 0,
    y: -32,
    filter: "blur(8px)",
    scale: 0.96,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 0.6], delay: i * 0.04 },
  }),
};

// ─── Service Card with CRT glow ───────────────────────────────────────────────
const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const getMarginTop = () => {
    if (window.innerWidth < 1024) return "0px";
    switch (index) {
      case 0: return "120px";
      case 1: return "80px";
      case 2: return "-40px";
      case 3: return "-80px";
      default: return "0px";
    }
  };

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 200, damping: 20, mass: 0.55 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), springCfg);
  const tX = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), springCfg);
  const tY = useSpring(useTransform(rawY, [-0.5, 0.5], [-6, 6]), springCfg);

  const handleMove = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  }, [rawX, rawY]);

  const handleLeave = useCallback(() => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const handleNavigate = () => {
    navigate(service.route);
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      exit="exit"
      style={{ perspective: 900, marginTop: getMarginTop() }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={handleNavigate}
        className="min-[1600px]:!aspect-[15/10] min-[1920px]:!aspect-[14/10]"
        style={{
          rotateX,
          rotateY,
          translateX: tX,
          translateY: tY,
          transformStyle: "preserve-3d",
          width: "100%",
          aspectRatio: "16/10",
          display: "flex",
          flexDirection: "column",
          borderRadius: 24,
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          backgroundImage: `url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "none",
          boxShadow: hovered
            ? `0 20px 40px rgba(0,0,0,0.6)`
            : "0 10px 30px rgba(0,0,0,0.3)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Expanding Black Gradient Layer */}
        <motion.div
          initial={false}
          animate={{
            height: hovered ? "100%" : "45%",
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
          }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Content Container */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px", zIndex: 2 }}>
          <motion.div
            animate={{ width: hovered ? 60 : 40, backgroundColor: service.accent }}
            transition={{ duration: 0.3 }}
            style={{
              height: 3,
              borderRadius: 3,
              marginBottom: 16,
              boxShadow: hovered ? `0 0 12px ${service.accent}` : "none",
            }}
          />

          <h3
            className="min-[1600px]:!text-[32px]"
            style={{
              margin: 0,
              fontSize: "clamp(20px, 1.6vw, 28px)",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.01em",
              marginBottom: hovered ? 12 : 8,
              transition: "margin 0.3s ease",
            }}
          >
            {service.title}
          </h3>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ overflow: "hidden" }}
              >
                <p
                  className="min-[1600px]:!text-[18px] min-[1600px]:!leading-[1.8]"
                  style={{
                    margin: "0 0 20px",
                    fontSize: "clamp(13px, 1vw, 17px)",
                    lineHeight: 1.6,
                    color: "rgba(255, 255, 255, 0.8)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    maxWidth: "90%",
                  }}
                >
                  {service.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              className="hover:opacity-80 transition-opacity cursor-pointer min-[1600px]:!text-[20px]"
              style={{
                fontSize: "clamp(14px, 1vw, 18px)",
                fontWeight: 600,
                color: service.accent,
                letterSpacing: "0.02em",
                fontFamily: "'Space Grotesk', sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                position: "relative",
                zIndex: 10
              }}
            >
              Explore More
              <motion.svg
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
                className="min-[1600px]:!w-6 min-[1600px]:!h-6"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </span>
          </motion.div>
        </div>

        {/* Subtle Bottom Border Highlight */}
        {/* <motion.div
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
            pointerEvents: "none",
            zIndex: 3
          }}
        /> */}
      </motion.div>
    </motion.div>
  );
};

// ─── Animated Background ──────────────────────────────────────────────────────
const AnimatedBg = () => (
  <div
    aria-hidden="true"
    style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
  >
    <div className="crt-scan" style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.15) 50%)",
      backgroundSize: "100% 4px",
      pointerEvents: "none",
      opacity: 0.4,
    }} />
  </div>
);

// ─── Left Panel ───────────────────────────────────────────────────────────────
const LeftPanel = () => (
  <motion.div
    className="min-[1600px]:!flex-[0_0_20%] min-[1920px]:!flex-[0_0_15%]"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
      }
    }}
    style={{
      position: "sticky",
      top: 0,
      height: "100vh",
      flex: "0 0 38%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "150px clamp(60px, 4vw, 100px) 0px clamp(80px, 5vw, 140px)",
      zIndex: 20,
      alignSelf: "flex-start",
    }}
  >
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
      }}
      style={{ marginBottom: "32px" }}
    >
      <h2
        className="text-3xl sm:text-4xl md:text-5xl min-[1600px]:!text-[72px] min-[1920px]:!text-[84px] min-[1600px]:!leading-[1.1] font-bold tracking-tight text-white"
        style={{
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>Intelligent Technology</span>
        <br />
        <span
          style={{
            color: "#00EDC2",
            display: "inline-block",
          }}
        >
          Solutions
        </span>
      </h2>
    </motion.div>

    <motion.p
      className="text-white/75 text-xs sm:text-sm md:text-base lg:text-lg min-[1600px]:!text-[20px] min-[1920px]:!text-[24px] tracking-tight leading-relaxed min-[1600px]:!max-w-[700px] min-[1600px]:!mb-[40px]"
      variants={{
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
      }}
      style={{
        margin: "0 0 clamp(20px, 1.5vw, 32px)",
        maxWidth: 520,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      We engineer intelligent systems by combining embedded electronics, scalable software platforms, AI technologies, and cloud-connected infrastructure for next-generation products.
    </motion.p>

    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {[
        "Embedded & IoT Systems",
        "Software & Cloud Platforms",
        "AI & Automation Solutions",
        "Mobile & Web Applications",
        "End-to-End Product Engineering",
      ].map((label) => (
        <motion.div
          key={label}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
          }}
          style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 1vw, 18px)", marginBottom: "clamp(16px, 1.2vw, 24px)" }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00EDC2",
              flexShrink: 0,
              boxShadow: "0 0 10px #00EDC2",
            }}
          />
          <span
            className="min-[1600px]:!text-[18px] min-[1920px]:!text-[20px]"
            style={{
              fontSize: "clamp(14px, 1vw, 19px)",
              color: "rgba(255,255,255,0.85)",
              fontWeight: 500,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

// ─── Right Panel ──────────────────────────────────────────────────────────────
const RightPanel = ({ activeGroup }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="min-[1600px]:!pr-[40px] min-[1600px]:!pl-[20px] min-[1920px]:!pr-[60px]"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: isMobile ? "30px 16px 20px" : "150px clamp(40px, 4vw, 80px) 60px clamp(20px, 2vw, 40px)",
        alignSelf: "flex-start",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGroup}
          className="min-[1600px]:!gap-x-[30px] min-[1600px]:!gap-y-[50px] min-[1920px]:!gap-x-[40px] min-[1920px]:!gap-y-[60px]"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "clamp(40px, 3.5vw, 60px) clamp(30px, 3vw, 55px)",
            height: "auto",
            minHeight: isMobile ? "auto" : "clamp(600px, 55vh, 750px)",
          }}
        >
          {GROUPS[activeGroup].map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Mobile Full View ─────────────────────────────────────────────────────────
const MobileServicesView = () => {
  const navigate = useNavigate();

  return (
    <section id="expertise" style={{ background: "transparent", padding: "30px 20px 60px", minHeight: "100vh" }}>
      <div className="crt-scan" style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: "none",
        background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.15) 50%)",
        backgroundSize: "100% 4px",
        zIndex: 10,
      }} />

      <div className="crt-flicker">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1
            style={{
              fontSize: "clamp(36px, 8vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Our Services
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "14px",
              letterSpacing: "0.2px",
              fontWeight: 400,
              textAlign: "center",
              maxWidth: "48rem",
              lineHeight: 1.6,
              margin: "0 auto",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Building Smart Connected Systems or Intelligent Technology Solutions
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(service.route)}
              style={{
                background: `linear-gradient(135deg, rgba(0,237,194,0.1), rgba(0,0,0,0.6))`,
                borderRadius: 20,
                border: `1px solid rgba(0,237,194,0.2)`,
                overflow: "hidden",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.02, borderColor: "rgba(0,237,194,0.5)" }}
            >
              <div style={{ display: "flex", gap: 16, padding: 20 }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: "0 0 6px",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.4,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                    {service.description}
                  </p>
                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#00EDC2",
                        fontFamily: "'Space Grotesk', sans-serif",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        lineHeight: 1
                      }}
                    >
                      Explore More
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00EDC2" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "1px" }}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Root Export ──────────────────────────────────────────────────────────────
// ─── Root Export ──────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ── Scroll lock refs ───────────────────────────────────────────────────────
  // const scrollLockRef = useRef(false);
  // const lockTimerRef = useRef(null);
  // const lockedScrollTopRef = useRef(null);
  const lastGroupRef = useRef(0);
  const isAnimatingRef = useRef(false); // Track animation state

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll handling for ServicesSection — respects navbar's programmatic scroll
  useEffect(() => {
    if (isMobile) return;

    let scrollTimer = null;

    const handleScroll = () => {

      const el = sectionRef.current;
      if (!el) return;

      const { top, height } = el.getBoundingClientRect();
      const scrollableDistance = height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, -top / scrollableDistance));
      const rawIndex = progress * NUM_GROUPS;
      const groupIndex = Math.min(Math.floor(rawIndex), NUM_GROUPS - 1);

      if (groupIndex !== lastGroupRef.current) {
        lastGroupRef.current = groupIndex;
        setActiveGroup(groupIndex);
      }
    };

    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Also lock scroll when cards are animating on mount
  // useEffect(() => {
  //   if (!isMobile) {
  //     // Initial lock to prevent scroll during initial animation
  //     scrollLockRef.current = true;
  //     lockedScrollTopRef.current = window.scrollY;

  //     lockTimerRef.current = setTimeout(() => {
  //       scrollLockRef.current = false;
  //     }, 1000); // Wait for initial animations
  //   }

  //   return () => {
  //     clearTimeout(lockTimerRef.current);
  //   };
  // }, [isMobile]);

  if (isMobile) {
    return <MobileServicesView />;
  }

  return (
    <>
      <FontLoader />

      <section
        id="expertise"
        ref={sectionRef}
        style={{
          position: "relative",
          height: `${(NUM_GROUPS + 1) * 100}vh`,
          background: "transparent",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <AnimatedBg />

          {/* Centered heading */}
          <div
            style={{
              position: "absolute",
              top: "75px",
              left: 0,
              right: 0,
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 24px",
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold tracking-tight mb-1 text-white min-[1600px]:!text-[80px]"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Our Services
            </motion.h1>
            <AnimatedSplitText
              text="Building Smart Connected Systems or Intelligent Technology Solutions"
              className="text-white text-sm sm:text-base md:text-lg min-[1600px]:!text-[26px] text-center tracking-tight max-w-3xl min-[1600px]:!max-w-[1200px] leading-relaxed max-md:px-4 mx-auto flex flex-wrap justify-center"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.2px"
              }}
              delayOffset={0.2}
            />
          </div>

          {/* Side-by-side layout */}
          <div className="relative z-10 flex h-screen w-full mx-auto max-w-[1600px] lg:max-w-[1600px] xl:max-w-[1900px] 2xl:max-w-[2100px]">
            <LeftPanel />
            <RightPanel activeGroup={activeGroup} />
          </div>
        </div>
      </section>
    </>
  );
} 