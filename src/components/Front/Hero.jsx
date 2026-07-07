import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "../layout/Container";
import Section from "../layout/Section";
import Paragraph from "../layout/Paragraph";

const Hero = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleScroll = (sectionId) => {
    if (isHomePage) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const headingLines = [
    "Designing the Future with ",
    " Intelligent Systems",
  ];

  return (
    <Section
      noPadding
      className="
        w-full h-full flex-1
        min-h-[calc(60vh-60px)]
        sm:min-h-[calc(70vh-70px)]
        md:min-h-[calc(78vh-80px)]
        lg:min-h-[calc(82vh-80px)]
        flex flex-col overflow-x-hidden relative
      "
    >
      <div
        className="
          relative w-full h-full flex-1
          min-h-[calc(60vh-60px)]
          sm:min-h-[calc(70vh-70px)]
          md:min-h-[calc(78vh-80px)]
          lg:min-h-[calc(82vh-80px)]
          overflow-hidden cursor-default
          flex items-center justify-center
          py-8 sm:py-10 md:py-12 lg:py-0
        "
      >
        <Container className="relative z-10">
          <div
            className="
              w-full max-w-7xl mx-auto text-center
              animate-[crtFlicker_0.15s_infinite]
            "
          >
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ delay: 1.0, duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="inline-block transition-transform duration-500 ease-out hover:scale-105 transform-gpu cursor-default">
                <h1
                  className="
                    text-white mb-3 sm:mb-4 md:mb-6 leading-tight
                    text-[clamp(1.6rem,5vw,4.5rem)]
                    [text-shadow:0_0_5px_rgba(0,237,194,0.5)]
                    min-[1920px]:text-[clamp(4rem,5vw,6rem)]
                    min-[1280px]:max-[1919px]:text-[clamp(3rem,4.5vw,4.5rem)]
                    max-[359px]:!text-2xl
                  "
                >
                  {headingLines.map((line, lineIdx) => (
                    <div key={lineIdx} className="block">
                      {line.split(" ").map((word, wordIdx) => {
                        const globalIndex =
                          lineIdx === 0
                            ? wordIdx
                            : headingLines[0].split(" ").length + wordIdx;
                        return (
                          <motion.span
                            key={globalIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: globalIndex * 0.05,
                              ease: "easeOut",
                            }}
                            className={`
                              inline-block
                              mr-1 sm:mr-2 px-0.5 sm:px-1 md:px-2
                              max-[359px]:!mr-[0.2rem] max-[359px]:!px-[0.1rem]
                              ${word.includes("Intelligent") ||
                                word.includes("Systems")
                                ? "text-[rgb(0,237,194)]"
                                : "text-white"
                              }
                            `}
                          >
                            {word}
                          </motion.span>
                        );
                      })}
                    </div>
                  ))}
                </h1>
              </div>

              <div
                className="
                  max-w-4xl 2xl:max-w-none mx-auto
                  mb-6 sm:mb-8 md:mb-10 lg:mb-12
                  px-2 sm:px-4
                "
              >
                <Paragraph
                  useMotion={true}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                  className="block transform-gpu 2xl:text-center 2xl:w-full"
                >
                  We design and engineer hardware and software solutions that
                  transform ideas into intelligent, real-world products.
                </Paragraph>
              </div>

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
                "
              >
                <button
                  onClick={() => handleScroll("expertise")}
                  className="
                    relative w-full sm:w-auto
                    px-6 sm:px-8 md:px-10
                    py-3 sm:py-3.5 md:py-4
                    rounded-full font-medium
                    text-[#00EDC2]
                    bg-transparent
                    border shadow-[0_0_25px_rgba(0,237,194,0.25)]
                    transition-all duration-300
                    hover:scale-105
                    text-sm sm:text-base
                  "
                >
                  <span className="relative z-10">Explore Solutions</span>
                  <span
                    className="
                      absolute inset-0 rounded-full
                      pointer-events-none
                      shadow-[0_0_25px_rgba(0,237,194,0.25)]
                    "
                  ></span>
                </button>

                <button
                  onClick={() => handleScroll("contact")}
                  className="
                    relative w-full sm:w-auto
                    flex items-center justify-center
                    gap-2 sm:gap-3
                    px-6 sm:px-8 md:px-10
                    py-3 sm:py-3.5 md:py-4
                    rounded-full font-medium
                    text-[#00ebc0]
                    border border-[#00EDC2]/40
                    bg-transparent
                    transition-all duration-300
                    hover:scale-105
                    hover:border-[#00EDC2]
                    hover:shadow-[0_0_25px_rgba(0,237,194,0.6)]
                    text-sm sm:text-base
                  "
                >
                  Connect with us
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default Hero;