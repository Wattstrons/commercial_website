import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import Ourprocess from "./Front/Ourprocess";
import Section from "./layout/Section";
import Container from "./layout/Container";
import SectionHeader, { AnimatedSplitText } from "./layout/SectionHeader";

// ── Animated helpers ──────────────────────────────────────────────────

const AnimatedLetters = ({ text, className = "", style = {}, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <span ref={ref} style={{ display: "inline-block", ...style }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, charIndex) => {
            const i = globalCharIndex++;
            return (
              <motion.span
                key={i}
                style={{ display: "inline-block", whiteSpace: "pre" }}
                initial={{ y: "110%", opacity: 0, rotateX: -40 }}
                animate={isInView ? { y: "0%", opacity: 1, rotateX: 0 } : {}}
                transition={{ duration: 0.55, delay: delay + i * 0.028, ease: [0.22, 1, 0.36, 1] }}
                className={className}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <motion.span
              style={{ display: "inline-block", whiteSpace: "pre" }}
              initial={{ y: "110%", opacity: 0, rotateX: -40 }}
              animate={isInView ? { y: "0%", opacity: 1, rotateX: 0 } : {}}
              transition={{ duration: 0.55, delay: delay + (globalCharIndex++) * 0.028, ease: [0.22, 1, 0.36, 1] }}
              className={className}
            >
              {" "}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
};

const AnimatedWords = ({ text, className = "", style = {}, delay = 0, tag = "span" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const Tag = tag;
  return (
    <Tag ref={ref} style={{ display: "block", overflow: "hidden", ...style }}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className={className}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

const AnimatedPara = ({ children, delay = 0, className = "", style = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.p
      ref={ref}
      style={style}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.p>
  );
};

// ── Sub-components ────────────────────────────────────────────────────

const BulletItem = ({ text, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-3 min-[1600px]:!gap-6"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="w-2.5 h-2.5 min-[1600px]:!w-3 min-[1600px]:!h-3 rounded-full flex-shrink-0"
        style={{ background: "#00EDC2", boxShadow: "0 0 10px rgba(0,237,194,0.4)" }}
      />
      <span className="text-white text-base font-medium min-[1600px]:!text-[20px]">{text}</span>
    </motion.div>
  );
};

const BentoCard = ({ className = "", innerClassName = "", children }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [isHovered, setIsHovered] = useState(false);

  const moveX = useMotionValue(0);
  const moveY = useMotionValue(0);
  const shadowX = useMotionValue(0);
  const shadowY = useMotionValue(0);

  const hoverTransform = useMotionTemplate`translate(${moveX}px, ${moveY}px)`;
  const hoverShadow = useMotionTemplate`${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.7)`;

  // Global mouse tracking for border glow — works across ALL cards
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!cardRef.current) return;
      const { left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  // Card-specific mouse tracking for movement (only when hovered)
  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    // Calculate offset from card center (-1 to 1 range)
    const normalX = (relX / rect.width - 0.5) * 2;
    const normalY = (relY / rect.height - 0.5) * 2;

    const mx = normalX * 6;
    const my = normalY * 6;

    moveX.set(mx);
    moveY.set(my);
    shadowX.set(-mx * 1.5);
    shadowY.set(-my * 1.5);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    moveX.set(0);
    moveY.set(0);
    shadowX.set(0);
    shadowY.set(0);
  }

  // Layer A – wide soft border glow (reaches across to neighboring cards)
  const borderGlowWide = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.6), transparent 45%)`;

  // Layer B – tight bright border glow (makes border appear thicker near cursor)
  const borderGlowTight = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,1), transparent 40%)`;

  // Inner spotlight
  const innerSpotlight = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 50%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`relative h-full w-full ${className}`}
    >
      {/* Invisible spacer to maintain layout height exactly as it is in the normal (unhovered) state */}
      <div className="w-full h-full opacity-0 pointer-events-none p-[2px]">
        <div className={`flex flex-col h-full w-full ${innerClassName || "p-4"}`}>
          {children}
        </div>
      </div>

      <div
        ref={cardRef}
        className="absolute group rounded-[20px] overflow-hidden"
        style={{
          top: isHovered ? "-3px" : "0px",
          bottom: isHovered ? "-3px" : "0px",
          left: isHovered ? "-3px" : "0px",
          right: isHovered ? "-3px" : "0px",
          padding: isHovered ? "5px" : "2px",
          background: isHovered
            ? "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.08) 100%)"
            : "#111116",
          transform: hoverTransform,
          boxShadow: hoverShadow,
          transition: "top 0.5s cubic-bezier(0.16, 1, 0.3, 1), bottom 0.5s cubic-bezier(0.16, 1, 0.3, 1), left 0.5s cubic-bezier(0.16, 1, 0.3, 1), right 0.5s cubic-bezier(0.16, 1, 0.3, 1), padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Layer 1: Wide soft cursor-tracking border glow (GLOBAL — works across all cards) */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] rounded-[20px]"
          style={{
            background: borderGlowWide,
          }}
        />

        {/* Layer 2: Tight bright cursor-tracking border glow (GLOBAL — works across all cards) */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] rounded-[20px]"
          style={{
            background: borderGlowTight,
          }}
        />

        {/* Layer 3: Card body */}
        <div
          className={`relative z-10 overflow-hidden rounded-[18px] bg-[#111116] flex flex-col h-full w-full ${innerClassName || "p-4"}`}
        >
          {/* Inner cursor-tracking spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 rounded-[18px]"
            style={{
              background: innerSpotlight,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {children}
        </div>
      </div>
    </motion.div>
  );
};

// ── Quote Slider Component ──────────────────────────────────────────

const QuoteSlider = ({ quotes }) => {
  const quoteRef = useRef(null);
  const { scrollYProgress: quoteScroll } = useScroll({
    target: quoteRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop: image shrinks to 40vw.
  const quoteWidth = useTransform(quoteScroll, [0, 0.9], isMobile ? ["100%", "90%"] : ["100%", "40%"]);
  const quoteHeight = useTransform(quoteScroll, [0, 0.9], isMobile ? ["100vh", "40vh"] : ["100vh", "70vh"]);
  const quoteTop = useTransform(quoteScroll, [0, 0.9], isMobile ? ["0vh", "10vh"] : ["0vh", "15vh"]);
  const quoteLeft = useTransform(quoteScroll, [0, 0.9], isMobile ? ["0%", "5%"] : ["0%", "5%"]);
  const quoteRadius = useTransform(quoteScroll, [0, 0.9], ["0px", "0px"]);

  const quoteTextOpacity = useTransform(quoteScroll, [0.3, 0.9], [0, 1]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % quotes.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);

  const current = quotes[currentIndex];

  if (!current) return null;

  return (
    <Section noPadding ref={quoteRef} className="relative bg-black" style={{ height: "200vh" }}>
      <Container className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black relative !px-0">

        {/* Animated Image */}
        <motion.div
          style={{
            width: quoteWidth,
            height: quoteHeight,
            top: quoteTop,
            left: quoteLeft,
            borderRadius: quoteRadius,
          }}
          className="absolute z-20 overflow-hidden flex-shrink-0 bg-black cursor-pointer"
        >
          <motion.img
            key={current.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={current.image}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          {/* Dark Overlay (fixed) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />

          <motion.div style={{ opacity: quoteTextOpacity }} className="absolute inset-0 w-full h-full">
            <div className="absolute bottom-8 left-8 md:left-12 z-10">
              <motion.div
                key={`role-${currentIndex}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[#00EDC2] text-xs md:text-sm min-[1600px]:!text-[20px] font-bold tracking-widest uppercase mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {current.role}
              </motion.div>
              <motion.div
                key={`name-${currentIndex}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white text-3xl md:text-5xl min-[1600px]:!text-[64px] font-bold tracking-wide"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {current.name}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Content Box */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            style={{
              opacity: quoteTextOpacity,
              top: isMobile ? "50vh" : "15vh",
              left: isMobile ? "5%" : "45%",
              width: isMobile ? "90%" : "50%",
              height: isMobile ? "45vh" : "70vh",
            }}
            className="absolute bg-black p-8 md:py-16 md:pr-16 md:pl-8 flex flex-col justify-center pointer-events-auto"
          >
            <AnimatedSplitText
              key={`quote-${currentIndex}`}
              text={`"${current.quote}"`}
              className="text-white/90 text-xl md:text-3xl lg:text-4xl min-[1600px]:!text-[56px] min-[1600px]:!leading-tight font-medium leading-relaxed mb-6 md:mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              delayOffset={0.2}
            />

          </motion.div>
        </div>

      </Container>
    </Section>
  );
};
// ── Premium CTA Component ───────────────────────────────────────────

const PremiumCTA = ({ cta, serviceName }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleServiceSubmit = async () => {
    if (!userName.trim() || !userEmail.trim() || !userMessage.trim()) {
      setFormError("Please fill in all fields before submitting.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: userName.trim(),
          userEmail: userEmail.trim(),
          userMessage: userMessage.trim(),
          serviceName: serviceName || 'General Service'
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to submit inquiry');
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setUserName("");
        setUserEmail("");
        setUserMessage("");
        setSubmitSuccess(false);
        setIsFormOpen(false);
        setIsSubmitting(false);
      }, 2000);
    } catch (err) {
      setFormError("Failed to send inquiry. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Section noPadding id="contact-section" className="bg-black pt-0 pb-8 md:pb-12" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative group overflow-hidden w-full mx-auto">
            {/* Inner card content (no background/borders) */}
            <div className="relative pt-0 pb-12 px-0">

              {/* Orbiting rings — matches box4 style */}
              <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                {/* Core pulse */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-[80px] h-[80px] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(0,237,194,0.12) 0%, transparent 70%)" }}
                />
                {/* Ring 1 */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-white/[0.03] border-t-[#00EDC2]/20"
                />
                {/* Ring 2 */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-dashed border-white/[0.03] border-b-[#00EDC2]/10"
                />
                {/* Ring 3 */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-white/[0.02] border-l-[#00EDC2]/5"
                />
                {/* Orbiting dot 1 */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
                  style={{ transformOrigin: "center" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00EDC2]/60 shadow-[0_0_8px_rgba(0,237,194,0.4)]" />
                </motion.div>
                {/* Orbiting dot 2 */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
                  style={{ transformOrigin: "center" }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00EDC2]/40 shadow-[0_0_6px_rgba(0,237,194,0.3)]" />
                </motion.div>
              </div>

              {/* Bottom green ambient glow */}
              <div className="absolute inset-x-0 bottom-0 h-[350px] bg-gradient-to-t from-[#00EDC2]/8 via-[#00EDC2]/3 to-transparent blur-2xl z-0 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Title with animated letters */}
                <h2
                  className="font-bold text-white leading-[1.1] mb-2 min-[1600px]:!text-[80px]"
                  style={{
                    fontSize: "clamp(32px, 5vw, 48px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  <AnimatedLetters
                    text={cta?.titlePart1 || "Ready to Build Something"}
                    delay={0.2}
                  />
                  <span className="block mt-2">
                    <AnimatedLetters
                      text={cta?.titlePart2 || "Extraordinary?"}
                      delay={0.5}
                      style={{
                        color: "#00EDC2",
                      }}
                    />
                  </span>
                </h2>

                {/* Subtitle */}
                <AnimatedPara
                  delay={0.7}
                  className="min-[1600px]:!text-[26px] min-[1600px]:!max-w-[900px]"
                  style={{
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: "1.8",
                    maxWidth: "600px",
                    margin: "0 auto",
                    marginTop: "24px",
                    letterSpacing: "0.3px",
                  }}
                >
                  {cta?.subtitle || "From concept to launch, we create digital experiences that drive real business growth."}
                </AnimatedPara>

                {/* CTA Button */}
                <motion.div
                  key="start-btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6"
                >
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="group/btn relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-semibold text-base overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,237,194,0.25)] active:scale-[0.98] min-[1600px]:!text-[20px] min-[1600px]:!px-12 min-[1600px]:!py-6"
                    style={{ background: "#00EDC2", color: "#000" }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        animation: "shimmer 2s infinite",
                      }}
                    />
                    <span className="relative z-10 tracking-wide">{cta?.buttonText || "Let's Talk"}</span>
                    <motion.span
                      className="relative z-10 text-lg min-[1600px]:!text-[24px]"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </button>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Modal */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[24px] p-6 md:p-8 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors z-10"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h3 className="text-2xl font-bold text-white mb-2 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Start Your Project
                </h3>
                <p className="text-white/50 text-sm text-center mb-6">
                  Tell us a little bit about what you need.
                </p>

                <div className="flex flex-col gap-4 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-1 ml-1 font-medium">Name</label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#00EDC2]/50 transition-colors placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1 ml-1 font-medium">Email</label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#00EDC2]/50 transition-colors placeholder:text-white/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-1 ml-1 font-medium">Project Description</label>
                    <textarea
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Briefly describe your project requirements..."
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm md:text-base focus:outline-none focus:border-[#00EDC2]/50 transition-colors placeholder:text-white/30 resize-none shadow-inner"
                    />
                  </div>
                  {formError && (
                    <div className="text-red-400 text-sm mt-1 mb-2 text-center">
                      {formError}
                    </div>
                  )}
                  {submitSuccess && (
                    <div className="text-[#00EDC2] text-sm mt-1 mb-2 text-center font-medium bg-[#00EDC2]/10 py-2 rounded-lg border border-[#00EDC2]/30">
                      Inquiry sent successfully! We will contact you soon.
                    </div>
                  )}
                  <button
                    onClick={handleServiceSubmit}
                    disabled={isSubmitting || submitSuccess}
                    className="group/submit relative inline-flex justify-center items-center gap-2 mt-2 px-8 py-4 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,237,194,0.2)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "#00EDC2", color: "#000" }}
                  >
                    <span className="relative z-10 tracking-wide">
                      {isSubmitting ? "Sending..." : submitSuccess ? "Sent!" : "Submit Inquiry"}
                    </span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shimmer keyframe */}
        <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      </Container>
    </Section>
  );
};

// ── Main ──────────────────────────────────────────────────────────────

const ServiceTemplate = ({ data }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (data.hero.backgroundImages && data.hero.backgroundImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % data.hero.backgroundImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data.hero.backgroundImages]);

  const { scrollYProgress: containerScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(containerScroll, [0, 0.5], [1, 0.85]);
  const filter = useTransform(containerScroll, [0, 0.5], ["blur(0px)", "blur(8px)"]);
  const y = useTransform(containerScroll, [0, 0.5], ["0vh", "-5vh"]);

  const overlayBorderRadius = useTransform(containerScroll, [0, 0.5], ["40px", "0px"]);
  const overlayBoxShadow = useTransform(containerScroll, [0, 0.5], [
    "0px -20px 40px rgba(0, 0, 0, 0)",
    "0px -30px 60px rgba(0, 0, 0, 0.6)"
  ]);

  const { hero, about, techStack, process, technologies, quotes, cta } = data;

  return (
    <div className="bg-black min-h-screen" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`}</style>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <Section noPadding ref={containerRef} className="relative w-full h-[200vh]">
        <motion.div
          className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center origin-top z-0"
          style={{
            scale,
            filter,
            y,
            transformOrigin: "top",
            willChange: "transform, filter",
            transformStyle: "preserve-3d"
          }}
        >
          {/* Static Background Image or Video */}
          <div className="absolute inset-0 z-0">
            {hero.backgroundVideo ? (
              <video
                src={hero.backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
                poster={hero.backgroundImage || (hero.backgroundImages && hero.backgroundImages[0]) || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="}
                className="w-full h-full object-cover"
              />
            ) : hero.backgroundImages && hero.backgroundImages.length > 0 ? (
              <AnimatePresence>
                <motion.img
                  key={currentImageIndex}
                  src={hero.backgroundImages[currentImageIndex]}
                  alt="Service Hero"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                />
              </AnimatePresence>
            ) : (
              <img
                src={hero.backgroundImage}
                alt="Service Hero"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black opacity-65 z-10" />
          </div>

          {/* Hero text */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-[1600px]:!px-[80px] pointer-events-none w-full h-full">
            <div className="w-full">
              <div
                className="font-bold tracking-wide min-[1600px]:!text-[100px] min-[1600px]:!leading-[1.1]"
                style={{ fontSize: isMobile ? "clamp(26px, 7.5vw, 36px)" : "64px", marginBottom: "0px", lineHeight: "1.3" }}
              >
                <AnimatedLetters text={hero.titleWord1} delay={0} />
                {isMobile ? <br /> : " "}
                {hero.titleWord2 && <AnimatedLetters text={hero.titleWord2} delay={0.15} />}
              </div>
              <AnimatedWords
                text={hero.subtitle}
                delay={0.4}
                className="min-[1600px]:!text-[26px]"
                style={{ fontSize: isMobile ? "15px" : "18px", lineHeight: "1.8", color: "#d1d5db", whiteSpace: isMobile ? "normal" : "nowrap" }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
                className="
                  flex flex-col sm:flex-row flex-wrap
                  items-center justify-center
                  gap-3 sm:gap-4 md:gap-6
                  transform-gpu
                  px-2 sm:px-0
                  mt-4 sm:mt-5 md:mt-6
                  pointer-events-auto
                "
              >
                <button
                  onClick={() => {
                    const target = document.getElementById('contact-section');
                    if (!target) return;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1200; // 1.2s smooth scroll
                    let start = null;

                    window.requestAnimationFrame(function step(timestamp) {
                      if (!start) start = timestamp;
                      const progress = timestamp - start;
                      const t = Math.min(progress / duration, 1);
                      // easeInOutCubic
                      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                      window.scrollTo(0, startPosition + distance * ease);

                      if (progress < duration) {
                        window.requestAnimationFrame(step);
                      } else {
                        window.scrollTo(0, targetPosition);
                      }
                    });
                  }}
                  className="
                    relative w-full sm:w-auto
                    px-6 sm:px-8 md:px-10 min-[1600px]:!px-16
                    py-3 sm:py-3.5 md:py-4 min-[1600px]:!py-6
                    rounded-full font-semibold
                    text-black
                    border-none
                    transition-all duration-300
                    hover:scale-105
                    text-sm sm:text-base min-[1600px]:!text-2xl
                    cursor-pointer
                  "
                  style={{
                    background: "#00EDC2",
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Building
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-lg"
                    >
                      →
                    </motion.span>
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Section>

      <div className="relative z-20 -mt-[100vh]">
        <motion.div
          className="bg-black relative overflow-hidden"
          style={{
            borderTopLeftRadius: overlayBorderRadius,
            borderTopRightRadius: overlayBorderRadius,
            boxShadow: overlayBoxShadow
          }}
        >
          {/* ── ABOUT ─────────────────────────────────────────────── */}
          <Section className="relative z-10">
            <Container>
              {/* Header */}
              <SectionHeader
                title={about.sectionTitle}
                subtitle={about.sectionSubtitle}
                className="text-center mb-16 relative z-10"
                titleStyle={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: "1.2" }}
                subtitleStyle={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.2px" }}
              />

              <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-[1600px]:!gap-24">

                {/* Left Side Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10"
                >
                  <img
                    src={about.image}
                    alt={about.sectionTitle}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>

                {/* Right Side Content */}
                <motion.div
                  className="flex flex-col items-start text-left"
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
                >
                  <motion.h2
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    style={{
                      fontSize: isMobile ? "30px" : "44px",
                      fontWeight: "700", marginBottom: "16px",
                      color: "#fff", lineHeight: "1.2",
                    }}
                    className="min-[1600px]:!text-[50px]"
                  >
                    {about.contentTitle}
                  </motion.h2>
                  <AnimatedPara
                    className="mt-2 min-[1600px]:!text-[22px] min-[1600px]:!max-w-[1000px]"
                    style={{ fontSize: isMobile ? "15px" : "17px", color: "#cbd5e1", lineHeight: "1.8", marginBottom: "40px", maxWidth: "600px", textAlign: "left" }}
                    delay={0.2}
                  >
                    {about.contentDesc}
                  </AnimatedPara>

                  <div className="flex flex-col gap-5 min-[1600px]:!gap-8 w-full">
                    {about.bulletPoints.map((item, i) => (
                      <BulletItem key={i} text={item} index={i} />
                    ))}
                  </div>
                </motion.div>

              </div>
            </Container>
          </Section>
        </motion.div>

        <div className="bg-black relative">

          {/* ── TECH STACK ─────────────────────────────────────────── */}
          <Section noPadding className="bg-black pt-[40px] pb-6 relative overflow-hidden">
            <Container>
              <SectionHeader
                title={techStack.sectionTitle}
                subtitle={techStack.sectionSubtitle}
                className="text-center mb-5 relative z-10"
                titleStyle={{ fontFamily: "'Space Grotesk', sans-serif" }}
                subtitleStyle={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.2px" }}
              />

              {techStack.boxes ? (
                <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-4 md:auto-rows-[150px] lg:auto-rows-[170px] min-[1600px]:!auto-rows-[250px] gap-4 relative z-10">

                  {/* Box 1: High Performance */}
                  <BentoCard className="md:col-span-1 md:row-span-1 min-h-[150px]" innerClassName="p-0 overflow-hidden group">
                    <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                      <div className="flex items-baseline opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-[60px] md:text-[80px] min-[1600px]:!text-[120px] font-bold font-sans tracking-tighter text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
                          {techStack.boxes.box1.number}
                        </span>
                        <span className="text-white/20 text-lg md:text-xl font-bold ml-1 min-[1600px]:!text-[32px]">
                          {techStack.boxes.box1.subNumber}
                        </span>
                      </div>
                      {/* Sparkle icon top right */}
                      <div className="absolute top-5 right-5 text-white/30">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" /></svg>
                      </div>
                    </div>
                    <div className="absolute bottom-5 left-5 z-20">
                      <h3 className="text-white font-bold text-lg mb-0.5 min-[1600px]:!text-[36px]">{techStack.boxes.box1.title}</h3>
                      <p className="text-white/40 text-xs pr-4 min-[1600px]:!text-[22px]">{techStack.boxes.box1.desc}</p>
                    </div>
                  </BentoCard>

                  {/* Box 2: Core Stack Grid */}
                  <BentoCard className="md:col-span-1 md:row-span-1 min-h-[150px]" innerClassName="p-0 overflow-hidden group">
                    <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
                    <div className="absolute inset-0 pt-5 px-6 z-10 flex justify-center">
                      <div className="grid grid-cols-5 gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500 w-full max-w-[85%] mt-2">
                        {technologies.logos.slice(0, 10).map((tech, i) => (
                          <div key={i} className="aspect-square rounded-[6px] border border-white/5 flex items-center justify-center bg-white/5" style={{ boxShadow: "inset 0 0 10px rgba(255,255,255,0.02)" }}>
                            <img src={tech.logo} alt={tech.name} className="w-1/2 h-1/2 object-contain" />
                          </div>
                        ))}
                        {Array.from({ length: Math.max(0, 10 - technologies.logos.length) }).map((_, i) => (
                          <div key={`empty-${i}`} className="aspect-square rounded-[6px] border border-white/5 flex items-center justify-center bg-white/5" style={{ boxShadow: "inset 0 0 10px rgba(255,255,255,0.02)" }}>
                            <div className="w-1/2 h-1/2 rounded-sm bg-white/5" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-5 left-5 z-20 w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pt-8">
                      <h3 className="text-white font-bold text-lg mb-0.5 min-[1600px]:!text-[36px]">{techStack.boxes.box2.title}</h3>
                      <p className="text-white/40 text-xs pr-4 min-[1600px]:!text-[22px]">{techStack.boxes.box2.desc}</p>
                    </div>
                  </BentoCard>

                  {/* Box 3: Frontend Engineering */}
                  <BentoCard className="md:col-span-2 md:row-span-2 min-h-[300px]" innerClassName="p-0 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#0a0a0a] to-[#050505] z-0" />

                    <div className="absolute top-8 left-8 right-8 bottom-[100px] rounded-2xl border border-white/10 bg-[#050505] shadow-2xl overflow-hidden z-10 group-hover:-translate-y-1 transition-transform duration-700">
                      <div className="h-6 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="ml-4 text-white/30 text-[10px] min-[1600px]:!text-[20px] font-mono">system.config</div>
                      </div>
                      <div className="p-6 font-mono text-xs min-[1600px]:!text-[22px] leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="text-blue-400 mt-1">const <span className="text-yellow-200">System</span> <span className="text-pink-500">=</span> <span className="text-blue-400">()</span> <span className="text-pink-500">{`=>`}</span> {`{`}</div>
                        <div className="ml-4">
                          <div className="text-pink-500">return <span className="text-blue-400">(</span></div>
                          <div className="ml-4 text-cyan-300">{`<Architecture>`}</div>
                          <div className="ml-8 text-white font-sans text-xs min-[1600px]:!text-[20px] my-2 text-white/60">High Performance Core Running...</div>
                          <div className="ml-4 text-cyan-300">{`</Architecture>`}</div>
                          <div className="text-blue-400">)</div>
                        </div>
                        <div>{`}`}</div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 z-20 w-full bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pt-12 pr-6">
                      <h3 className="text-white font-bold text-xl mb-1 min-[1600px]:!text-[40px]">{techStack.boxes.box3.title}</h3>
                      <p className="text-white/40 text-sm max-w-[80%] min-[1600px]:!text-[24px]">{techStack.boxes.box3.desc}</p>
                    </div>
                  </BentoCard>

                  {/* Box 4: Scalable Architecture */}
                  <BentoCard className="md:col-span-2 md:row-span-2 min-h-[300px]" innerClassName="p-0 overflow-hidden group">
                    <div className="absolute inset-0 bg-[#050505] z-0" />
                    <div className="absolute inset-0 flex items-center justify-center z-0 mt-[-40px]">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[180px] h-[180px] rounded-full blur-[40px]"
                        style={{ background: "#d4af37" }}
                      />
                      <div className="absolute w-[200px] h-[200px] rounded-full border border-white/5 group-hover:border-white/20 transition-colors duration-700" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
                      <svg className="absolute w-[200px] h-[200px] opacity-10 group-hover:opacity-30 transition-opacity duration-700" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" />
                        <path d="M 50 2 A 48 48 0 0 0 50 98 A 48 48 0 0 0 50 2" fill="none" stroke="white" strokeWidth="0.5" />
                        <path d="M 2 50 A 48 48 0 0 0 98 50 A 48 48 0 0 0 2 50" fill="none" stroke="white" strokeWidth="0.5" />
                        <ellipse cx="50" cy="50" rx="48" ry="24" fill="none" stroke="white" strokeWidth="0.5" />
                        <ellipse cx="50" cy="50" rx="24" ry="48" fill="none" stroke="white" strokeWidth="0.5" />
                      </svg>
                      <div className="absolute w-1 h-1 bg-white rounded-full top-[30%] left-[40%] blur-[1px] opacity-80" />
                      <div className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full top-[60%] right-[35%] blur-[2px] opacity-60" />
                      <div className="absolute w-2 h-2 bg-orange-300 rounded-full bottom-[40%] left-[45%] blur-[3px] opacity-40" />
                    </div>
                    <div className="absolute bottom-6 left-6 z-20 w-full bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pt-12 pr-6">
                      <h3 className="text-white font-bold text-xl mb-1 min-[1600px]:!text-[40px]">{techStack.boxes.box4.title}</h3>
                      <p className="text-white/40 text-sm max-w-[80%] min-[1600px]:!text-[24px]">{techStack.boxes.box4.desc}</p>
                    </div>
                  </BentoCard>

                  {/* Box 5: UI/UX Design */}
                  <BentoCard className="md:col-span-1 md:row-span-1 min-h-[150px]" innerClassName="p-0 overflow-hidden group">
                    <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pb-8">
                      <div className="w-[70%] h-[40px] bg-[#111] border border-white/10 rounded-sm flex items-center justify-around px-2 shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:bg-[#151515] transition-colors duration-500">
                        <div className="w-5 h-5 rounded-full border-[2px] border-white/20 bg-black flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white/10" /></div>
                        <div className="w-5 h-5 rounded-full border-[2px] border-white/20 bg-black flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white/10" /></div>
                        <div className="w-6 h-4 rounded-[2px] border-[1px] border-white/20 bg-black" />
                        <div className="w-6 h-4 rounded-[2px] border-[1px] border-white/20 bg-black" />
                      </div>
                    </div>
                    <div className="absolute bottom-5 left-5 z-20 w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pt-8">
                      <h3 className="text-white font-bold text-lg mb-0.5 min-[1600px]:!text-[36px]">{techStack.boxes.box5.title}</h3>
                      <p className="text-white/40 text-xs pr-4 min-[1600px]:!text-[22px]">{techStack.boxes.box5.desc}</p>
                    </div>
                  </BentoCard>

                  {/* Box 6: Mobile Solutions */}
                  <BentoCard className="md:col-span-1 md:row-span-1 min-h-[150px]" innerClassName="p-0 overflow-hidden group">
                    <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pb-8" style={{ perspective: '500px' }}>
                      <div className="w-[70%] h-[50px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-md flex flex-wrap gap-2 p-2 justify-center shadow-2xl group-hover:-translate-y-1 transition-transform duration-500" style={{ transform: 'rotateX(15deg)' }}>
                        <div className="w-4 h-4 rounded-full border border-white/30 bg-black shadow-[inset_0_0_4px_rgba(255,255,255,0.2)]" />
                        <div className="w-4 h-4 rounded-full border border-white/30 bg-black shadow-[inset_0_0_4px_rgba(255,255,255,0.2)]" />
                        <div className="w-4 h-4 rounded-full border border-white/30 bg-black shadow-[inset_0_0_4px_rgba(255,255,255,0.2)]" />
                        <div className="w-4 h-4 rounded-full border border-white/30 bg-black shadow-[inset_0_0_4px_rgba(255,255,255,0.2)]" />
                        <div className="w-4 h-4 rounded-full border border-white/30 bg-black shadow-[inset_0_0_4px_rgba(255,255,255,0.2)]" />
                        <div className="w-4 h-4 rounded-full border border-white/30 bg-black shadow-[inset_0_0_4px_rgba(255,255,255,0.2)]" />
                      </div>
                    </div>
                    <div className="absolute bottom-5 left-5 z-20 w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pt-8">
                      <h3 className="text-white font-bold text-lg mb-0.5 min-[1600px]:!text-[36px]">{techStack.boxes.box6.title}</h3>
                      <p className="text-white/40 text-xs pr-4 min-[1600px]:!text-[22px]">{techStack.boxes.box6.desc}</p>
                    </div>
                  </BentoCard>

                </div>
              ) : techStack.items ? (
                <div className="w-full mx-auto flex flex-wrap justify-center gap-4 relative z-10">
                  {techStack.items.map((item, i) => (
                    <div key={i} className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] flex">
                      <BentoCard className="min-h-[180px] min-[1600px]:!min-h-[250px] w-full" innerClassName="p-6 flex flex-col justify-start group overflow-hidden">
                        <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
                        <div className="relative z-10">
                          <h3 className="text-white font-bold text-lg mb-2 min-[1600px]:!text-[30px]">{item.title}</h3>
                          <p className="text-white/40 text-sm leading-relaxed min-[1600px]:!text-[18px]">{item.desc}</p>
                        </div>
                      </BentoCard>
                    </div>
                  ))}
                </div>
              ) : null}
            </Container>
          </Section>

          {/* ── TECHNOLOGIES GRID ─────────────────────────────────── */}
          <Section noPadding className="bg-black pt-0 pb-0 relative overflow-hidden">
            <Container>
              <SectionHeader
                title={technologies.sectionTitle}
                className="text-center mb-0"
                titleStyle={{ fontFamily: "'Space Grotesk', sans-serif" }}
              />

              {/* Infinite Marquee Container */}
              <div className="relative w-full mx-auto overflow-hidden flex flex-col gap-8 md:gap-12 pt-4 pb-10">
                {/* Left and Right Fades */}
                <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                {/* Row 1 - Scrolls Left */}
                <div
                  className="flex gap-12 md:gap-24 min-[1600px]:!gap-32 pr-12 md:pr-24 min-[1600px]:!pr-32 w-max animate-scroll-left"
                  style={{ animationDuration: '100s' }}
                >
                  {[...technologies.logos, ...technologies.logos, ...technologies.logos, ...technologies.logos, ...technologies.logos, ...technologies.logos, ...technologies.logos, ...technologies.logos].map((tech, i) => (
                    <div
                      key={`row1-${i}`}
                      className="flex flex-col items-center justify-center gap-4"
                    >
                      <div
                        className="rounded-[24px] flex items-center justify-center border border-white/[0.04] min-[1600px]:!w-[180px] min-[1600px]:!h-[180px]"
                        style={{
                          width: isMobile ? 70 : 110,
                          height: isMobile ? 70 : 110,
                          background: "rgba(255,255,255,0.02)",
                        }}
                      >
                        <img src={tech.logo} alt={tech.name} className="w-[60%] h-[60%] object-contain" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </Section>

          {/* ── OUR PROCESS ───────────────────────────────────────── */}
          <Ourprocess title={process.header.title} subtitle={process.header.subtitle} steps={process.steps} />

          {/* ── QUOTE SLIDER ─────────────────────────────────────────────── */}
          <QuoteSlider quotes={quotes} />

          {/* ── PREMIUM CTA SECTION ──────────────────────────────────────────────── */}
          <PremiumCTA cta={cta} serviceName={`${data.hero?.titleWord1 || ''} ${data.hero?.titleWord2 || ''}`.trim()} />

        </div>
      </div>
    </div>
  );
};

export default ServiceTemplate;
