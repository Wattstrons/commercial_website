import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone, X, ClipboardList,
  PencilRuler,
  Code,
  ShieldCheck,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import ParticleCanvas from "../animation/ParticleCanvas";

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

const WHATSAPP_NUMBER = "919876543210";

const defaultProjects = [
  {
    id: 1,
    number: "1",
    icon: ClipboardList,
    title: "Requirement Analysis & Planning",
    desc: "Understanding client requirements, business goals, and project scope for proper planning.",
    gradient: "#00EDC2",
    details: [
      "Requirement gathering and discussions",
      "Business workflow analysis",
      "Technology stack selection",
      "Project roadmap and timeline planning",
      "Feature and module planning",
      "Resource allocation and estimation",
    ],
  },
  {
    id: 2,
    number: "2",
    icon: PencilRuler,
    title: "UI/UX Design & Architecture",
    desc: "Designing user-friendly interfaces and planning scalable system architecture.",
    gradient: "#00EDC2",
    details: [
      "Wireframe and UI design creation",
      "Responsive design planning",
      "User experience optimization",
      "Database architecture design",
      "API structure planning",
      "Frontend and backend workflow setup",
    ],
  },
  {
    id: 3,
    number: "3",
    icon: Code,
    title: "Development",
    desc: "Building scalable frontend, backend, database, and integration solutions.",
    gradient: "#00EDC2",
    details: [
      "Frontend application development",
      "Backend API development",
      "Database integration",
      "Authentication and security implementation",
      "Third-party service integrations",
      "Cloud and server configuration",
    ],
  },
  {
    id: 4,
    number: "4",
    icon: ShieldCheck,
    title: "Testing & Quality Assurance",
    desc: "Ensuring application quality, security, responsiveness, and performance.",
    gradient: "#00EDC2",
    details: [
      "Functional testing",
      "UI and responsive testing",
      "API and integration testing",
      "Bug fixing and debugging",
      "Performance optimization",
      "Security and validation testing",
    ],
  },
  {
    id: 5,
    number: "5",
    icon: Rocket,
    title: "Deployment & Maintenance",
    desc: "Deploying applications and providing continuous monitoring and support.",
    gradient: "#00EDC2",
    details: [
      "Production deployment setup",
      "Domain and hosting configuration",
      "Server and database monitoring",
      "Application maintenance and updates",
      "Performance monitoring",
      "Continuous support and enhancements",
    ],
  },
];

const openWhatsApp = (serviceName = "") => {
  const msg = serviceName
    ? `Hello! I'm interested in your ${serviceName} service.`
    : "Hello! I'm interested in your services.";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
};

const AccordionItem = ({ project, isActive, onClick }) => {
  const Icon = project.icon;
  const glowColor = project.gradient || "#00EDC2";

  return (
    <motion.div
      layout
      onClick={onClick}
      className="cursor-pointer transition-all duration-500 overflow-hidden"
      style={{
        background: "#0A0A0A",
        borderRadius: "16px",
        border: isActive ? `1px solid ${glowColor}` : "1px solid rgba(255,255,255,0.05)",
        boxShadow: isActive ? `0 0 20px ${glowColor}15` : "none",
        opacity: isActive ? 1 : 0.5,
      }}
    >
      <div className="px-5 py-4 md:px-6 md:py-5 flex items-center gap-4">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-10 h-10 min-[1600px]:!w-16 min-[1600px]:!h-16 rounded-full flex items-center justify-center transition-colors duration-500"
          style={{ background: isActive ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)" }}
        >
          {Icon && <Icon size={18} className="min-[1600px]:!w-8 min-[1600px]:!h-8" color={isActive ? glowColor : "rgba(255,255,255,0.5)"} />}
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg min-[1600px]:!text-[32px] font-bold flex-1 transition-colors duration-500" style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.7)" }}>
          {project.title}
        </h3>

        {/* Number */}
        <div className="text-lg md:text-xl min-[1600px]:!text-[36px] font-semibold transition-colors duration-500" style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.3)" }}>
          {project.number}
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 pt-0 md:px-6 md:pb-6 md:pt-0">
              <p className="text-sm md:text-[15px] min-[1600px]:!text-[22px] min-[1600px]:!pl-[80px] min-[1600px]:!leading-loose leading-relaxed text-white pl-[56px] pr-4">
                {project.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Main ───────────────────────────────────────────────────────────────────── */
const Ourprocess = ({
  title = "Our Process",
  subtitle = "A structured approach to deliver exceptional results.",
  steps = defaultProjects
}) => {
  const sectionRef = useRef(null);
  const lastActiveRef = useRef(0);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const el = sectionRef.current;
        if (!el) return;
        const { top, height } = el.getBoundingClientRect();
        const totalScrollable = height - window.innerHeight;
        if (totalScrollable <= 0) return;
        const progress = Math.max(0, Math.min(1, -top / totalScrollable));
        const index = Math.min(Math.floor(progress * steps.length), steps.length - 1);
        if (index !== lastActiveRef.current) {
          setDirection(index > lastActiveRef.current ? 1 : -1);
          lastActiveRef.current = index;
          setActive(index);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.body.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.body.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile, steps.length]);

  const handleAccordionClick = useCallback((idx) => {
    const el = sectionRef.current;
    if (el) {
      const { top } = el.getBoundingClientRect();
      const totalScrollable = el.offsetHeight - window.innerHeight;
      const targetScroll = window.scrollY + top + ((idx + 0.5) / steps.length) * totalScrollable;

      const startPosition = window.scrollY;
      const distance = targetScroll - startPosition;
      const duration = 800; // 0.8s
      let start = null;

      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const t = Math.min(progress / duration, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, startPosition + distance * ease);
        if (progress < duration) {
          window.requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetScroll);
        }
      });
    }
  }, [steps.length]);

  const desktopAccordionList = useMemo(() => {
    return steps.map((project, idx) => (
      <AccordionItem
        key={project.id}
        project={project}
        isActive={active === idx}
        onClick={() => handleAccordionClick(idx)}
      />
    ));
  }, [steps, active, handleAccordionClick]);

  const mobileStepsList = useMemo(() => {
    return steps.map((p) => (
      <div
        key={p.id}
        style={{
          background: "#000",
          backdropFilter: "blur(16px)",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div style={{ height: 3, background: p.gradient }} />
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {p.icon && React.createElement(p.icon, { size: 20, color: "rgba(255,255,255,0.6)" })}
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "rgba(255,255,255,0.8)" }}>
              {p.number}
            </div>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{p.title}</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: 20 }}>{p.desc}</p>
          <div style={{ marginBottom: 20 }}>
            {p.details.slice(0, 4).map((detail, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
                <CheckCircle2 size={12} color="rgba(255,255,255,0.5)" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ));
  }, [steps]);

  const memoizedParticleCanvas = useMemo(() => (
    <ParticleCanvas projects={steps} active={active} />
  ), [steps, active]);

  const words = title.split(" ");
  const lastWord = words.pop();
  const titleStart = words.join(" ");

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <section ref={sectionRef} style={{ background: "#000", padding: "32px 16px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold tracking-tight text-white" style={{ marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {title}
            </motion.h2>
            <AnimatedSplitText
              text={subtitle}
              className="text-white"
              style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 520, margin: "0 auto", fontFamily: "'Space Grotesk', sans-serif" }}
              delayOffset={0.2}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {mobileStepsList}
          </div>
        </div>
      </section>
    );
  }

  /* ── DESKTOP ── */
  return (
    <section ref={sectionRef} style={{ position: "relative", height: `${(steps.length + 1) * 100}vh`, background: "#000", overflowX: "clip" }}>
      <div className="w-full max-w-[1600px] xl:max-w-[1900px] min-[1600px]:max-w-[2100px] mx-auto" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", paddingTop: "120px" }}>

        {/* Heading like Technology Stack */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            width: "100%",
            textAlign: "center",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold tracking-tight text-white min-[1600px]:!text-[80px]"
            style={{
              margin: "0 auto",
              fontFamily: "'Space Grotesk', sans-serif",
              pointerEvents: "auto",
              width: "fit-content",
            }}
          >
            {title}
          </motion.h2>
          <div style={{ pointerEvents: "auto", width: "fit-content", margin: "0 auto" }}>
            <AnimatedSplitText
              text={subtitle}
              className="text-white min-[1600px]:!text-[26px]"
              style={{
                margin: "5px 0 10px 0",
                fontSize: "18px",
                letterSpacing: "0.3px",
                padding: "10px 0",
                fontFamily: "'Space Grotesk', sans-serif"
              }}
              delayOffset={0.2}
            />
          </div>
        </div>

        {/* LEFT — Particle */}
        <div style={{ flex: "0 0 50%", position: "relative", overflow: "hidden", zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.div
            style={{ width: "100%", height: "65vh", minHeight: "500px" }}
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {memoizedParticleCanvas}
          </motion.div>
        </div>

        {/* RIGHT — Accordion List */}
        <div style={{ flex: "0 0 50%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(24px,4vw,64px)", zIndex: 10 }}>
          <div className="min-[1600px]:!max-w-[800px] min-[1600px]:!gap-6" style={{ width: "100%", height: "65vh", minHeight: "500px", maxWidth: 560, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px" }}>
            {desktopAccordionList}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ourprocess;