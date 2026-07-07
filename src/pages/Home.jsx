import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Whoweare from '../components/Front/Whoweare'
import Backgroundimage from "../assets/images/Backgroundimage.mp4";
import Ourservice from "../components/Front/Ourservice"
import Hero from '../components/Front/Hero'  // Fixed path - added 'Front/'
import Featureprojects from '../components/Front/FeatureProjects'  // Fixed path - added 'Front/'
import Question from '../components/Front/Question'  // Fixed path - added 'Front/'
import ContactInformation from '../components/Front/Contactinformation'  // Fixed path - added 'Front/'
import { StarsBackground } from '../components/animation/StarsBackground'

const Home = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Hero goes backward
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const filter = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(8px)"]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["0vh", "-5vh"]);

  // Incoming Whoweare layer animations
  const overlayBorderRadius = useTransform(scrollYProgress, [0, 0.5], ["40px", "0px"]);
  const overlayBoxShadow = useTransform(scrollYProgress, [0, 0.5], [
    "0px -20px 40px rgba(0, 0, 0, 0)",
    "0px -30px 60px rgba(0, 0, 0, 0.6)"
  ]);

  return (
    <div>
      <section
        id="home"
        ref={containerRef}
        className="relative w-full h-[200vh]"
      >
        <motion.div
          className="bg-black sticky top-0 left-0 w-full h-screen overflow-hidden pt-16 sm:pt-20 md:pt-24 origin-top z-0"
          style={{ 
            scale, 
            filter,
            y,
            willChange: "transform, filter",
            transformStyle: "preserve-3d"
          }}
        >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={Backgroundimage} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute  "></div>

        {/* Content Container */}
          <div className="relative z-10 w-full h-full flex flex-col">
            <div className="flex-1 w-full flex flex-col">
              <Hero />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 
        This wrapper brings the content up to overlap the 200vh Hero section.
        CRITICAL: No overflow-hidden here, or it breaks Ourservice.jsx's sticky positioning! 
      */}
      <div className="relative z-20 -mt-[100vh]">
        <StarsBackground>
          {/* We apply the cinematic clipping and shadow ONLY to Whoweare */}
          <motion.div
            className="bg-transparent relative overflow-hidden"
            style={{
              borderTopLeftRadius: overlayBorderRadius,
              borderTopRightRadius: overlayBorderRadius,
              boxShadow: overlayBoxShadow
            }}
          >
            <Whoweare />
          </motion.div>
          
          {/* Remaining sections are rendered normally without overflow clipping */}
          <div className="bg-transparent relative">
            <Ourservice />
            <Featureprojects />
            <Question />
            <ContactInformation />
          </div>
        </StarsBackground>
      </div>
    </div>
  )
}

export default Home