import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import world from "../../assets/images/world.png";
import { BorderRotate } from "../animation/BorderRotate";

const AnimatedSplitText = ({ text, delayOffset = 0.2, className = "", style = {} }) => {
  const words = text.split(" ");
  let globalCharIndex = 0;
  const totalChars = text.replace(/\s+/g, "").length;
  const mid = Math.floor(totalChars / 2);

  return (
    <motion.p
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split("");
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
            {wordChars.map((char, i) => {
              const charIndex = globalCharIndex++;
              return (
                <motion.span
                  key={charIndex}
                  variants={{
                    hidden: { opacity: 0, x: charIndex < mid ? -20 : 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3, delay: delayOffset + charIndex * 0.01 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </motion.p>
  );
};

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
        max-lg:mt-4 max-lg:mb-8
        w-[clamp(280px,75vw,600px)] h-[clamp(280px,75vw,400px)]
        sm:w-[clamp(320px,60vw,600px)] sm:h-[clamp(320px,60vw,400px)]
        md:w-[clamp(320px,45vw,600px)] md:h-[clamp(320px,45vw,400px)]
        lg:w-[clamp(250px,30vw,600px)] lg:h-[clamp(250px,30vw,400px)]
        min-[1600px]:!w-[550px] min-[1600px]:!h-[550px]
      "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.3
      }}
    >
      {/* Layer 3: solid square, counter-clockwise */}
      <svg
        className="
          absolute animate-[spinCCW_15s_linear_infinite] drop-shadow-[0_0_6px_rgba(0,235,192,0.4)]
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
          absolute animate-[spinCW_20s_linear_infinite] drop-shadow-[0_0_6px_rgba(0,235,192,0.5)]
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
          absolute drop-shadow-[0_0_8px_rgba(0,235,192,0.8)]
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
          w-[240px] h-[240px]
          sm:w-[280px] sm:h-[280px]
          md:w-[300px] md:h-[300px]
          lg:w-[340px] lg:h-[340px]
          min-[1600px]:!w-[380px] min-[1600px]:!h-[380px]
        "
      >
        <img
          src={world}
          alt=""
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
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: index * 0.08
      }
    }
  };

  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        absolute

        /* MOBILE & TABLET (auto layout) */
        max-lg:relative 
        max-lg:mx-auto 
        max-sm:my-3
        sm:max-lg:my-6
        max-lg:left-auto 
        max-lg:right-auto 
        max-lg:transform-none

        /* POSITIONING — match container padding */
        ${isLeft
          ? "lg:left-[80px] min-[1600px]:!left-[80px] min-[1920px]:!left-[100px]"
          : "lg:right-[80px] min-[1600px]:!right-[80px] min-[1920px]:!right-[100px]"
        }
        lg:top-1/2 lg:-translate-y-1/2

        /* WIDTH CONTROL */
        max-sm:w-[92%]
        sm:max-lg:w-[46%]
        lg:w-[32%] lg:max-w-[420px]
        xl:w-[32%] xl:max-w-[480px]
        2xl:w-[30%] 2xl:max-w-[550px]
        min-[1600px]:w-[32%] min-[1600px]:max-w-[700px]

        /* INTERACTIVITY */
        lg:pointer-events-auto

        /* PADDING */
        p-0

        /* SAFETY */
        max-w-[600px]
      `}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
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
          min-[1600px]:!px-12 min-[1600px]:!py-10
          backdrop-blur-xl
          flex flex-col justify-between
          h-[230px]
          sm:h-[250px]
          md:h-[260px]
          lg:h-[280px]
          min-[1600px]:!h-[360px]
          transition-all duration-300
        "
        backgroundColor="rgba(10,10,10,0.6)"
        borderRadius={12}
      >
        <div>
          <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4 text-center">
            <motion.span
              className="material-symbols-outlined text-[#00ebc0] min-[1600px]:!text-[64px]"
              style={{
                fontSize: "clamp(32px, 5vw, 45px)",
                fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48"
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3
              }}
            >
              {icon}
            </motion.span>
            <motion.h3
              className="text-base sm:text-lg md:text-xl lg:text-2xl min-[1600px]:!text-[36px] font-semibold text-white m-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {title}
            </motion.h3>
          </div>
          <motion.p
            className="text-white text-xs sm:text-sm md:text-base lg:text-[15px] min-[1600px]:!text-[20px] leading-relaxed font-light m-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {body}
          </motion.p>
        </div>
        <div className="mt-3 sm:mt-4" />
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

  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && target > 0) {
      const controls = animate(0, target, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (val) => setCount(Math.floor(val)),
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return <span ref={ref}>{target > 0 ? `${count}${suffix}` : value}</span>;
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
        type: "spring",
        stiffness: 100,
        damping: 12
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
        absolute bottom-10
        max-lg:relative max-lg:bottom-auto max-lg:mt-8 max-lg:mb-12
        w-full flex justify-between items-center
        max-lg:justify-center
        gap-0 max-lg:gap-0
        max-lg:flex-wrap lg:flex-nowrap max-lg:gap-3 max-sm:gap-2
        px-4 sm:px-6 lg:px-[80px] min-[1600px]:!px-[80px] min-[1920px]:!px-[100px]
      "
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
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
              w-[calc(50%-0.5rem)] sm:w-[140px] md:w-[160px] lg:w-auto lg:flex-1 lg:max-w-[170px] min-[1600px]:!max-w-[220px]
              h-[80px] sm:h-[85px] md:h-[90px] lg:h-[100px] min-[1600px]:!h-[140px]
              px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3
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
                text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] min-[1600px]:!text-[40px]
              "
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {s.icon}
            </motion.span>
            <div className="flex flex-wrap items-center justify-center gap-x-1 text-center leading-tight">
              <span className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] min-[1600px]:!text-[28px] font-bold text-white">
                <CountUpNumber value={s.label} />
              </span>

              <span className="text-[11px] sm:text-[12px] md:text-[13px] min-[1600px]:!text-[18px] text-white">
                {s.text}
              </span>
            </div>
          </motion.div>

          {/* Connector Line - only between boxes, not after the last one */}
          {i < STATS.length - 1 && (
            <motion.div
              variants={lineVariants}
              className="hidden lg:flex flex-1 min-w-[15px] items-center justify-center"
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
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spinCW { 
        from { transform: rotate(0deg); }   
        to { transform: rotate(360deg); } 
      }
      @keyframes spinCCW { 
        from { transform: rotate(0deg); }   
        to { transform: rotate(-360deg); } 
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="bg-transparent text-white relative w-full min-h-screen"
      >
        <div className="relative flex flex-col min-h-screen w-full overflow-hidden max-lg:overflow-visible bg-transparent">
          <main className="w-full max-w-[1600px] xl:max-w-[1900px] min-[1600px]:max-w-[2100px] mx-auto flex-1 relative flex flex-col items-center justify-center overflow-hidden max-lg:overflow-visible max-lg:justify-start max-lg:py-12 sm:max-lg:py-16 md:max-lg:py-16">

            {/* Heading */}
            <motion.div
              className="
                absolute lg:top-[clamp(5rem,8vh,7rem)]
                max-lg:relative max-lg:top-auto max-lg:mb-6 sm:max-lg:mb-8
                left-0 right-0 z-40
                flex flex-col items-center text-center
                px-4 sm:px-6 md:px-8
              "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl min-[1600px]:!text-[80px] font-bold tracking-tight mb-3 sm:mb-4 text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Who We Are
              </h1>

              <AnimatedSplitText
                text="Wattstrons represents the power of electrons—transforming energy into intelligent technology."
                className="text-white text-xs sm:text-sm md:text-base lg:text-lg min-[1600px]:!text-[26px] text-center tracking-tight leading-relaxed max-md:px-2 w-full flex flex-wrap justify-center max-w-[950px] min-[1600px]:!max-w-[1600px]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.2px"
                }}
                delayOffset={0.2}
              />
            </motion.div>

            {/* Globe */}
            <NeuralCore
              isActive={cardHovered}
              setCardHovered={setCardHovered}
            />

            <div className="w-full flex max-sm:flex-col sm:max-lg:flex-row sm:max-lg:justify-center sm:max-lg:gap-4 lg:absolute lg:inset-0 lg:pointer-events-none lg:px-0 px-4 sm:px-6 lg:px-[80px] z-20">
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

            <BottomStats setCardHovered={setCardHovered} />
          </main>
        </div>
      </section>
    </>
  );
};

export default Whoweare;