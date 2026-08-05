import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useTransform,
    useScroll,
} from "framer-motion";
import Container from "../layout/Container";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import Paragraph from "../layout/Paragraph";

import boardImageEmbedded from "../../assets/ourservice/embedded.png";
import boardImageIoT from "../../assets/ourservice/Iot.png";
import boardImagePCB from "../../assets/ourservice/PCBDesigning.png";
import boardImageApp from "../../assets/ourservice/prototyping.png";
import boardImageEdgeAI from "../../assets/ourservice/ESD.png";
import boardImageIndustrial from "../../assets/ourservice/softwaredevelopment.jpg";
import boardImageSensing from "../../assets/ourservice/portaldevelopment.jpg";
import boardImageSecurity from "../../assets/ourservice/IndustrialEnclosure_ProductDesign.png";

// ─── Font Loader with CRT effect and Space Grotesk ───────────────────────────
const FontLoader = () => (
    <style>{`
 @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

 * {
 font-family: 'Space Grotesk', sans-serif;
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
            case 0: return "60px";
            case 1: return "30px";
            case 2: return "-20px";
            case 3: return "-40px";
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
            className="[perspective:900px]"
            style={{ marginTop: getMarginTop() }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={handleLeave}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: EASE }}
                onClick={handleNavigate}
                className="relative flex w-full [aspect-ratio:4/3] flex-col overflow-hidden rounded-3xl border-0 bg-cover bg-center bg-no-repeat cursor-pointer transition-shadow duration-[400ms] ease-linear 2xl:!aspect-[4/3] "
                style={{
                    rotateX,
                    rotateY,
                    translateX: tX,
                    translateY: tY,
                    transformStyle: "preserve-3d",
                    backgroundImage: `url(${service.image})`,
                    boxShadow: hovered
                        ? `0 20px 40px rgba(0,0,0,0.6)`
                        : "0 10px 30px rgba(0,0,0,0.3)",
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
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
                />

                {/* Content Container */}
                <div className="absolute inset-x-0 bottom-0 z-[2] p-[clamp(20px,2vw,32px)]">
                    <motion.div
                        animate={{ width: hovered ? 60 : 40, backgroundColor: service.accent }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 h-[3px] rounded-[3px]"
                        style={{ boxShadow: hovered ? `0 0 12px ${service.accent}` : "none" }}
                    />

                    <h3
                        className={`m-0 font-bold text-white tracking-[-0.01em] leading-[1.15] text-[clamp(18px,1.5vw,28px)] transition-[margin] duration-300 ease-in-out ${hovered ? "mb-3" : "mb-2"
                            }`}
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
                                className="overflow-hidden"
                            >
                                <Paragraph
                                    className="m-0 mb-4 max-w-[95%] "
                                >
                                    {service.description}
                                </Paragraph>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div className="flex items-center gap-2">
                        <span
                            className="relative z-10 flex cursor-pointer items-center gap-2 text-[clamp(14px,1vw,18px)] font-semibold tracking-[0.02em] transition-opacity hover:opacity-80 "
                            style={{ color: service.accent }}
                        >
                            Explore More
                            <motion.svg
                                animate={{ x: hovered ? 4 : 0 }}
                                transition={{ duration: 0.3 }}
                                className=" "
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
            </motion.div>
        </motion.div>
    );
};

// ─── Animated Background ──────────────────────────────────────────────────────
const AnimatedBg = () => (
    <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
    >
        {/* CRT Scanline has been removed to stop the black scanning effect */}
    </div>
);

// ─── Left Panel ───────────────────────────────────────────────────────────────
const LeftPanel = () => (
    <motion.div
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
        className="sticky top-0 z-20 flex h-screen [flex:0.85] flex-col justify-center self-start pt-[120px] xl:pt-[150px] 2xl:pt-[120px] pr-[clamp(40px,3vw,60px)] pb-0 pl-0"
    >
        <motion.div
            variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
            }}
            className="mb-8"
        >
            <h2 className="m-0 text-xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-2xl md:text-3xl 2xl:!text-5xl ">
                <span className="whitespace-nowrap">Intelligent Technology</span>
                <br />
                <span className="inline-block text-[#00EDC2]">
                    Solutions
                </span>
            </h2>
        </motion.div>

        <Paragraph
            useMotion={true}
            className="m-0 mb-[clamp(20px,1.5vw,32px)] max-w-[520px] text-white"
            variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } }
            }}
        >
            We engineer intelligent systems by combining embedded electronics, scalable software platforms, AI technologies, and cloud-connected infrastructure for next-generation products.
        </Paragraph>

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
                    className="mb-[clamp(16px,1.2vw,24px)] flex items-center gap-[clamp(12px,1vw,18px)]"
                >
                    <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#00EDC2] shadow-[0_0_10px_#00EDC2]" />
                    <span className="text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed text-white">
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
        const checkMobile = () => setIsMobile(window.innerWidth < 1280);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div
            className={`sticky top-0 z-0 flex h-screen [flex:1.15] flex-col justify-center self-start overflow-hidden ${isMobile ? "px-0 pt-[30px] pb-5" : "pt-[120px] xl:pt-[150px] 2xl:pt-[120px] pr-0 pb-5 pl-[clamp(20px,2vw,40px)]"
                }`}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeGroup}
                    className={`grid h-auto gap-6 ${isMobile
                        ? "grid-cols-1"
                        : "grid-cols-2 gap-x-[clamp(20px,2vw,40px)] gap-y-[clamp(24px,2.5vw,40px)]"
                        }`}
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
        <Section id="expertise" className="bg-transparent min-h-screen !py-8 relative overflow-hidden">
            <Container>
                {/* CRT Scanline has been removed from mobile view as well */}

                <div>
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-[clamp(32px,7vw,42px)] font-bold tracking-[-0.02em] text-white">
                            Our Services
                        </h1>
                        <Paragraph className="mx-auto max-w-3xl text-center font-normal tracking-[0.2px]">
                            Building Smart Connected Systems or Intelligent Technology Solutions
                        </Paragraph>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SERVICES.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => navigate(service.route)}
                                whileHover={{ scale: 1.02, borderColor: "rgba(0,237,194,0.5)" }}
                                className="cursor-pointer overflow-hidden rounded-[20px] border border-[rgba(0,237,194,0.2)] h-full flex flex-col"
                                style={{
                                    background: "linear-gradient(135deg, rgba(0,237,194,0.1), rgba(0,0,0,0.6))",
                                }}
                            >
                                <div className="flex flex-col sm:flex-row gap-4 p-5 h-full">
                                    <div className="h-[140px] w-full sm:h-[80px] sm:w-[80px] flex-shrink-0 overflow-hidden rounded-xl">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 justify-between">
                                        <div>
                                            <h3 className="m-0 mb-1.5 text-lg font-bold text-white leading-tight">
                                                {service.title}
                                            </h3>
                                            <Paragraph className="m-0 text-[14px]">
                                                {service.description}
                                            </Paragraph>
                                        </div>
                                        <div className="mt-3 flex items-center gap-1.5">
                                            <span className="flex cursor-pointer items-center whitespace-nowrap text-[13px] font-semibold leading-none text-[#00EDC2]">
                                                Explore More
                                            </span>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00EDC2" strokeWidth="2.5" className="mt-[1px] flex-shrink-0">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function ServicesSection() {
    const sectionRef = useRef(null);
    const [activeGroup, setActiveGroup] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const lastGroupRef = useRef(0);
    const isAnimatingRef = useRef(false); // Track animation state

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1280);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Scroll handling for ServicesSection — respects navbar's programmatic scroll
    useEffect(() => {
        if (isMobile) return;

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

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const headingY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

    if (isMobile) {
        return <MobileServicesView />;
    }

    return (
        <>
            <FontLoader />

            <Section
                noPadding
                id="expertise"
                ref={sectionRef}
                className="relative bg-transparent"
                style={{ height: `${NUM_GROUPS * 100}vh` }}
            >
                <div className="sticky top-0 h-screen overflow-hidden">
                    <AnimatedBg />

                    {/* Centered heading */}
                    <div className="pointer-events-none absolute inset-x-0 top-[15px] xl:top-[20px] 2xl:top-[45px] z-40 flex flex-col items-center px-6 text-center">
                        <SectionHeader
                            title="Our Services"

                            titleTag="h1"
                            subtitle="Building Smart Connected Systems or Intelligent Technology Solutions"
                            titleStyle={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            subtitleStyle={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.2px" }}
                        />
                    </div>

                    {/* Side-by-side layout */}
                    <Container className="relative z-10 flex h-screen">
                        <LeftPanel />
                        <RightPanel activeGroup={activeGroup} />
                    </Container>
                </div>
            </Section>
        </>
    );
}       
