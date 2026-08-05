import React, { useRef, useMemo, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Whoweare from "../components/Front/Whoweare";
import Ourservice from "../components/Front/Ourservice";
import Hero from "../components/Front/Hero";
import Featureprojects from "../components/Front/FeatureProjects";
import Question from "../components/Front/Question";
import ContactInformation from "../components/Front/Contactinformation";
import { StarsBackground } from "../components/animation/StarsBackground";

import Backgroundimage from "../assets/images/Backgroundimage.mp4";

const MemoHero = memo(Hero);

const Home = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useMemo(
    () => useTransform(scrollYProgress, [0, 0.5], [1, 0.85]),
    [scrollYProgress]
  );

  const y = useMemo(
    () => useTransform(scrollYProgress, [0, 0.5], ["0vh", "-5vh"]),
    [scrollYProgress]
  );

  const overlayOpacity = useMemo(
    () => useTransform(scrollYProgress, [0, 0.5], [0, 0.7]),
    [scrollYProgress]
  );

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        id="home"
        ref={containerRef}
        className="relative w-full h-[200vh]"
      >
        <motion.div
          layout={false}
          className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black pt-16 sm:pt-20 md:pt-24 origin-top"
          style={{
            willChange: "transform",
          }}
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          >
            <source src={Backgroundimage} type="video/mp4" />
          </video>

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{
              opacity: overlayOpacity,
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-center">
            <MemoHero />
          </div>
        </motion.div>
      </section>

      {/* Remaining Sections */}
      <div className="relative z-20 -mt-[100vh]">
        <StarsBackground>
          <div className="relative overflow-hidden rounded-t-[40px]">
            <Whoweare />
          </div>

          <div className="relative">
            <Ourservice />
            {/* <Featureprojects /> */}
            <Question />
            <ContactInformation />
          </div>
        </StarsBackground>
      </div>
    </div>
  );
};

export default Home;
