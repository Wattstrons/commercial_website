import React, { useRef, useMemo, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Hero from "../components/Front/Hero";
// Lazy-load below-the-fold components
const Whoweare = lazy(() => import("../components/Front/Whoweare"));
const Ourservice = lazy(() => import("../components/Front/Ourservice"));
const Question = lazy(() => import("../components/Front/Question"));
const ContactInformation = lazy(() => import("../components/Front/Contactinformation"));

import Backgroundimage from "../assets/images/Backgroundimage.mp4";

const Home = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["0vh", "-5vh"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.7]);

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
            <Hero />
          </div>
        </motion.div>
      </section>

      {/* Remaining Sections */}
      <div className="relative z-20 -mt-[100vh]">
        <div className="relative w-full bg-black">
          <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
            <div className="relative overflow-hidden rounded-t-[40px]">
              <Whoweare />
            </div>

            <div className="relative">
              <Ourservice />
              <Question />
              <ContactInformation />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
