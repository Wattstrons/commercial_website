import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Question = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What type of solutions does Wattstrons specialize in?",
      a: "We specialize in intelligent technology solutions including IoT systems, embedded product development, automation platforms, tracking systems, and custom software applications tailored for real-world industrial and consumer needs.",
    },
    {
      q: "Do you develop complete end-to-end products?",
      a: "Yes, we work on complete product development including hardware design, embedded programming, IoT integration, software platforms, cloud connectivity, and user interface development.",
    },
    {
      q: "Can your solutions be customized for our business requirements?",
      a: "Absolutely. Our solutions are designed to be flexible and scalable, allowing customization based on operational requirements, workflows, monitoring needs, and automation goals.",
    },
    {
      q: "What makes your products different from traditional systems?",
      a: "Our products focus on intelligent automation, real-time monitoring, connected technology, and user-friendly experiences that improve efficiency, visibility, and control compared to conventional systems.",
    },
    {
      q: "Do you support both prototype development and production-ready solutions?",
      a: "Yes, we support the complete development cycle from concept validation and prototyping to fully functional production-ready technology solutions.",
    }
  ];

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Handle hover enter
  const handleMouseEnter = index => {
    setOpenIndex(index);
  };

  // Handle hover leave
  const handleMouseLeave = () => {
    setOpenIndex(null);
  };

  /* TEXT SPLIT HELPER */
  const splitText = text => {
    const chars = text.split("");
    const mid = Math.floor(chars.length / 2);
    return { chars, mid };
  };

  const paraText =
    "Real stories from teams who streamlined their workflow and delivered more with less.";
  const para = splitText(paraText);

  // Animation variants for FAQ items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
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

  return (
    <section className="bg-transparent text-white py-6 sm:py-8 md:py-10 relative z-10">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">

        {/* ================= HEADING ================= */}
        <div className="text-center max-w-3xl 2xl:max-w-[1400px] min-[1920px]:max-w-none mx-auto mb-6 sm:mb-8 md:mb-10 2xl:mb-12 overflow-hidden">

          {/* Frequently Asked - Gradient Text */}
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "8px",
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Frequently Asked Questions
          </h1>
          {/* <h1 
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Questions
          </h1> */}

          {/* Paragraph with split animation */}
          <motion.p
            className="text-white-400 text-sm sm:text-base md:text-lg flex flex-wrap justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {para.chars.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: i < para.mid ? -30 : 30,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.015,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* ================= FAQ ACCORDION WITH HOVER ANIMATION ================= */}
        <motion.div
          className="space-y-3 sm:space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              onClick={() => toggleFAQ(i)}
              className="
                bg-[#1a1a1a]
                border border-[#2a2a2a]
                rounded-lg sm:rounded-xl
                overflow-hidden
                transition-all duration-300
                hover:border-gray-600
                cursor-pointer
              "
            >
              {/* Question */}
              <div
                className="
                  px-4 sm:px-5 md:px-6
                  py-4 sm:py-5
                  flex justify-between items-center
                  hover:bg-[#222]
                  transition-colors duration-300
                  cursor-pointer
                "
              >
                <p
                  className="
                    text-white
                    text-sm sm:text-base
                    md:text-lg
                    pr-4
                    font-medium
                  "
                >
                  {item.q}
                </p>

                <span
                  className="
                    inline-block
                    text-gray-400
                    select-none
                    transition-transform duration-300
                  "
                  style={{
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
                </span>
              </div>

              {/* Answer with animation */}
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                    className="overflow-hidden"
                  >
                    <p
                      className="
                        text-gray-400
                        text-xs sm:text-sm
                        md:text-base
                        leading-relaxed
                        px-4 sm:px-5 md:px-6
                        pb-4 sm:pb-5
                      "
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Question;