import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { BorderRotate } from "../animation/BorderRotate";
import world from "../../assets/images/world.png"
import Container from "../layout/Container";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import Paragraph from "../layout/Paragraph";


// ── Placeholder globe ──
function GlobePlaceholder() {
    return (
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-55" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#00ebc0" strokeWidth="0.8" opacity="0.3" />
            {[30, 50, 70, 100, 130, 150, 170].map((y) => (
                <line key={`h${y}`} x1="10" y1={y} x2="190" y2={y} stroke="#00ebc0" strokeWidth="0.4" opacity="0.2" />
            ))}
            {[30, 50, 70, 100, 130, 150, 170].map((x) => (
                <line key={`v${x}`} x1={x} y1="10" x2={x} y2="190" stroke="#00ebc0" strokeWidth="0.4" opacity="0.2" />
            ))}
            <path d="M60,60 Q80,50 100,65 Q115,55 130,70 Q125,90 110,95 Q90,105 70,90 Z" fill="#00ebc0" opacity="0.25" />
            <path d="M50,110 Q65,100 80,115 Q75,135 55,130 Z" fill="#00ebc0" opacity="0.2" />
            <path d="M110,105 Q135,100 145,120 Q140,140 120,135 Q105,125 110,105 Z" fill="#00ebc0" opacity="0.22" />
            <path d="M130,60 Q155,55 160,75 Q150,85 135,78 Z" fill="#00ebc0" opacity="0.18" />
        </svg>
    );
}

// ── Neural Core — accepts isActive to control globe color ──
function NeuralCore({ isActive, setCardHovered }) {
    return (
        <motion.div
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
            className="
 relative flex items-center justify-center
 max-xl:mt-4 max-xl:mb-8
 w-[clamp(250px,70vw,540px)] h-[clamp(250px,70vw,350px)]
 sm:w-[clamp(280px,55vw,540px)] sm:h-[clamp(280px,55vw,350px)]
 md:w-[clamp(280px,40vw,540px)] md:h-[clamp(280px,40vw,350px)]
 xl:w-[clamp(200px,28vw,480px)] xl:h-[clamp(200px,22vw,300px)]
 
 "
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.6,
                ease: "easeOut"
            }}
        >
            {/* Layer 3: solid square, counter-clockwise */}
            <svg
                className="
 absolute animate-[spinCCW_15s_linear_infinite]
 w-[70%] h-[85%]
 sm:w-[65%] sm:h-[85%]
 "
                viewBox="0 0 280 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="8" y="8" width="264" height="264" rx="7"
                    stroke="rgba(0,235,192,0.35)" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Layer 2: dotted square, clockwise */}
            <svg
                className="
 absolute animate-[spinCW_20s_linear_infinite]
 w-[85%] h-[80%]
 sm:w-[85%] sm:h-[80%]
 "
                viewBox="0 0 360 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="20" y="20" width="320" height="320" rx="7"
                    stroke="rgba(0,235,192,0.35)" strokeWidth="2" fill="none"
                    strokeDasharray="1 10" strokeLinecap="round" />
            </svg>

            {/* Layer 1: static square with midpoint dots */}
            <svg
                className="
 absolute
 w-[110%] h-[120%]
 sm:w-[105%] sm:h-[125%]
 "
                viewBox="0 0 460 460"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="90" y="90" width="280" height="280" rx="7"
                    stroke="rgba(0,235,192,0.35)" strokeWidth="1" fill="none" />
                <circle cx="230" cy="90" r="4" fill="#00EBC0" />
                <circle cx="370" cy="230" r="4" fill="#00EBC0" />
                <circle cx="230" cy="370" r="4" fill="#00EBC0" />
                <circle cx="90" cy="230" r="4" fill="#00EBC0" />
            </svg>

            {/* Center: globe */}
            <div
                className="
 absolute rounded-md overflow-hidden flex items-center justify-center
 w-[210px] h-[210px]
 sm:w-[240px] sm:h-[240px]
 md:w-[260px] md:h-[260px]
 lg:w-[300px] lg:h-[300px]
 
 "
            >
                <img
                    src={world}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'grayscale-0' : 'grayscale'}`}
                />
            </div>
        </motion.div>
    );
}

// ── Static Card ──
function StaticCard({ side = "left", icon, title, body, onMouseEnter, onMouseLeave, index }) {
    const isLeft = side === "left";

    const cardVariants = {
        hidden: {
            opacity: 0,
            x: isLeft ? -50 : 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.08
            }
        }
    };

    return (
        <motion.div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`
 /* Flow naturally in the flex container on all screen sizes */
 relative

 /* MOBILE & TABLET (auto layout) */
 max-xl:mx-auto 
 max-sm:my-3
 sm:max-xl:my-6
 max-xl:transform-none

 /* DESKTOP (aligned by flex justify-between) */
 xl:my-auto

 /* WIDTH CONTROL */
 max-sm:w-[92%]
 sm:max-xl:w-[46%]
 xl:w-[32%] xl:max-w-[420px]
 2xl:w-[30%] 2xl:max-w-[550px]
 

 /* INTERACTIVITY */
 xl:pointer-events-auto

 /* PADDING */
 p-0

 /* SAFETY */
 max-w-[600px]
 `}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "150px" }}
            whileHover={{
                scale: 1.08,
                transition: { duration: 0.2 }
            }}
        >
            <BorderRotate
                className="
 w-full
 px-4 py-3
 md:px-6 md:py-4
 
 flex flex-col justify-between
 min-h-[230px]
 sm:min-h-[250px]
 md:min-h-[260px]
 xl:min-h-[280px]
 
 h-full
 transition-all duration-300
 "
                backgroundColor="rgba(10,10,10,0.6)"
                borderRadius={12}
            >
                <div>
                    <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 mb-2 sm:mb-3 text-center">
                        <motion.span
                            className="material-symbols-outlined text-[#00ebc0] "
                            style={{
                                fontSize: "clamp(24px, 4vw, 36px)",
                                fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48"
                            }}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                                delay: 0.3
                            }}
                        >
                            {icon}
                        </motion.span>
                        <motion.h3
                            className="text-[15px] sm:text-base md:text-lg lg:text-xl font-semibold text-white m-0"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {title}
                        </motion.h3>
                    </div>
                    <Paragraph
                        useMotion={true}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {body}
                    </Paragraph>
                </div>
                <div className="mt-1 sm:mt-2" />
            </BorderRotate>
        </motion.div>
    );
}

// ── 5 Bottom Stat Boxes with Connector Lines ──
const STATS = [
    {
        icon: "groups",
        label: "25+",
        text: "Clients"
    },
    {
        icon: "folder_copy",
        label: "40+",
        text: "Projects"
    },
    {
        icon: "workspace_premium",
        label: "3+",
        text: "Years Experience"
    },
    {
        icon: "code",
        label: "24/7",
        text: "Support"
    },
    {
        icon: "public",
        label: "99.9%",
        text: "Satisfaction"
    },

];

// ── CountUpNumber Component ──
function CountUpNumber({ value }) {
    const numMatch = value.match(/\d+/);
    const suffix = value.replace(/\d+/, "");
    const target = numMatch ? parseInt(numMatch[0], 10) : 0;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "150px" });

    useEffect(() => {
        if (isInView && target > 0) {
            const controls = animate(0, target, {
                duration: 1.5,
                ease: "easeOut",
                onUpdate: (val) => {
                    if (ref.current) {
                        ref.current.textContent = `${Math.floor(val)}${suffix}`;
                    }
                },
            });
            return () => controls.stop();
        }
    }, [isInView, target, suffix]);

    return <span ref={ref}>{target > 0 ? `0${suffix}` : value}</span>;
}

function BottomStats({ setCardHovered }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
    };

    const lineVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0.8
            }
        }
    };

    return (
        <motion.div
            className="
 w-full z-30 relative
 mt-4 lg:mt-6 pt-0 pb-0
 flex justify-center xl:justify-between items-center
 flex-wrap xl:flex-nowrap gap-4 xl:gap-0
 "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {STATS.map((s, i) => (
                <React.Fragment key={i}>
                    {/* Stat Box - Rectangular shape with icon on top, text at bottom */}
                    <motion.div
                        variants={itemVariants}
                        onMouseEnter={() => setCardHovered && setCardHovered(true)}
                        onMouseLeave={() => setCardHovered && setCardHovered(false)}
                        whileHover={{
                            scale: 1.05,
                            y: -8,
                            boxShadow: "0px 10px 20px rgba(0,235,192,0.3)",
                            transition: { duration: 0.2 }
                        }}
                        className="
 flex-shrink-0 lg:flex-shrink
 w-[calc(50%-0.5rem)] sm:w-auto lg:flex-1 lg:max-w-[220px] 
 h-[80px] sm:h-[85px] md:h-[90px] lg:h-[80px] 
 px-2 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 lg:px-3
 flex flex-col items-center justify-center
 gap-1 sm:gap-1.5 md:gap-2
 bg-[rgba(10,10,10,0.55)] backdrop-blur-md
 border border-[rgba(0,235,192,0.2)] rounded-[10px]
 cursor-default transition-all duration-300
 hover:border-[rgba(0,235,192,0.55)]
 hover:bg-[rgba(0,235,192,0.04)]
 "
                    >
                        <motion.span
                            className="
 material-symbols-outlined text-[rgb(0,235,192)] leading-none flex-shrink-0
 text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] 
 "
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            {s.icon}
                        </motion.span>
                        <div className="flex flex-nowrap items-center justify-center gap-x-1.5 text-center leading-tight whitespace-nowrap">
                            <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-white">
                                <CountUpNumber value={s.label} />
                            </span>

                            <span className="text-[14px] sm:text-[15px] lg:text-[16px] text-white">
                                {s.text}
                            </span>
                        </div>
                    </motion.div>

                    {/* Connector Line - only between boxes, not after the last one */}
                    {i < STATS.length - 1 && (
                        <motion.div
                            variants={lineVariants}
                            className="hidden xl:flex flex-1 min-w-[15px] items-center justify-center"
                        >
                            <div className="relative w-full flex items-center justify-center">
                                {/* Animated flowing line */}
                                <div className="h-[2px] w-full bg-gradient-to-r from-[#00ebc0] to-[#00ebc0]/40 rounded-full relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                                        animate={{
                                            x: ["-100%", "200%"],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                        }}
                                        style={{ width: "70%" }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </React.Fragment>
            ))}
        </motion.div>
    );
}
// ── Main Component ──
const Whoweare = () => {
    const [cardHovered, setCardHovered] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        // Styles moved to index.css
    }, []);

    return (
        <>
            <Section
                id="about"
                ref={sectionRef}
                noPadding
                className="bg-transparent text-white"
            >
                <div className="relative w-full bg-transparent flex flex-col pt-16 pb-6 lg:pt-[80px] lg:pb-8">
                    <Container className="relative flex flex-col items-center">
                        <div className="relative w-full flex flex-col">
                            {/* Heading */}
                            <SectionHeader
                                title="Who We Are"
                                titleTag="h1"
                                subtitle="Wattstrons represents the power of electrons—transforming energy into intelligent technology."
                                className="relative z-40 mb-4 lg:mb-4 flex flex-col items-center text-center px-4 sm:px-6 md:px-8"
                                titleStyle={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                subtitleStyle={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.2px" }}
                            />

                            {/* Middle Section: Globe + Cards */}
                            <div className="relative w-full flex flex-col xl:flex-row items-center justify-center min-h-0 z-20 my-6 xl:my-8">
                                <NeuralCore
                                    isActive={cardHovered}
                                    setCardHovered={setCardHovered}
                                />

                                <div className="w-full flex max-sm:flex-col sm:max-xl:flex-row sm:max-xl:justify-center sm:max-xl:gap-6 xl:absolute xl:inset-0 xl:pointer-events-none xl:px-0 xl:justify-between xl:items-center z-20 mt-8 xl:mt-0">
                                    <StaticCard
                                        side="left"
                                        icon="visibility"
                                        title="Our Vision"
                                        body="To become a leading innovation company that harnesses electronics and software to create smart, efficient, and sustainable technology solutions for the future."
                                        onMouseEnter={() => setCardHovered(true)}
                                        onMouseLeave={() => setCardHovered(false)}
                                        index={0}
                                    />
                                    <StaticCard
                                        side="right"
                                        icon="bolt"
                                        title="Our Mission"
                                        body="To design and develop high-quality electronic systems and smart engineering solutions by combining power (watts) and electrons (trons), solving real-world problems with innovation, efficiency, and reliability."
                                        onMouseEnter={() => setCardHovered(true)}
                                        onMouseLeave={() => setCardHovered(false)}
                                        index={1}
                                    />
                                </div>
                            </div>

                            <BottomStats setCardHovered={setCardHovered} />
                        </div>
                    </Container>
                </div>
            </Section>
        </>
    );
};

export default Whoweare;
