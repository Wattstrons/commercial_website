import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Section from "../layout/Section";
import Container from "../layout/Container";
import SectionHeader from "../layout/SectionHeader";
import Paragraph from "../layout/Paragraph";

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
    <Section className="bg-transparent text-white relative z-10">
      <Container className="question-container">

        {/* ================= HEADING ================= */}
        <SectionHeader
          title="Frequently Asked Questions"
          titleTag="h1"
          subtitle="Everything you need to know about our innovative technology solutions and intelligent products."
          titleStyle={{
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        />

        {/* ================= FAQ ACCORDION WITH HOVER ANIMATION ================= */}
        <motion.div
          className="space-y-2 sm:space-y-3 min-[1600px]:space-y-4"
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
                  py-3 lg:py-4 xl:py-5
                  flex justify-between items-center
                  hover:bg-[#222]
                  transition-colors duration-300
                  cursor-pointer
                "
              >
                <Paragraph
                  className="font-medium pr-4"
                >
                  {item.q}
                </Paragraph>

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
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 min-[1600px]:!w-8 min-[1600px]:!h-8" />
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
                    <Paragraph
                      className="!text-gray-400 px-4 sm:px-5 md:px-6 pb-3 lg:pb-4 xl:pb-5"
                    >
                      {item.a}
                    </Paragraph>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};

export default Question;