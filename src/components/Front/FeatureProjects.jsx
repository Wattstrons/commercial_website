import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Cpu, Eye } from "lucide-react";
import { BorderRotate } from "../animation/BorderRotate";
import { GlowCard } from "../animation/spotlight-card";

// Import local images
import buckImage from "../../assets/images/buck.png";
import irrigationImage from "../../assets/images/Gardrix.png";
import learnKitImage from "../../assets/images/Kit32.png";
import fuelImage from "../../assets/images/fuel.png";

const Featureprojects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const projects = [

    {
      id: 1,
      title: "LearnKit32",
      image: learnKitImage,
      desc: "A hands-on embedded systems and IoT development platform designed for practical electronics, sensor interfacing, and real-world applications.",
      highlights: ["Integrated sensors", "Education oriented", "Rapid prototyping"],
      tech: ["IoT", "Embedded C", "ESP32"],
      icon: "🎓",
      cta: "View Details",
    },
    {
      id: 2,
      title: "Terndra",
      image: buckImage,
      desc: "An intelligent vehicle monitoring platform focused on real-time tracking, smart alerts, route monitoring, and connected fleet analytics.",
      highlights: ["High efficiency & compact design", "Multiple voltage levels", "Industrial reliability"],
      tech: ["Power Electronics", "DC-DC Conversion", "PCB Design"],
      icon: "⚡",
      cta: "View Details",
    },
    {
      id: 3,
      title: "Gardrix",
      image: irrigationImage,
      desc: "A responsive irrigation automation system designed for intelligent watering, environmental monitoring, and smart plant care automation.",
      highlights: ["Sensor-driven logic", "Remote monitoring", "Water optimization"],
      tech: ["IoT Sensors", "Cloud Integration", "MQTT"],
      icon: "🌱",
      cta: "View Details",
    },
    {
      id: 4,
      title: "Gledkon",
      image: fuelImage,
      desc: "A smart financial tracking platform focused on expense monitoring, spending analysis, monthly bill maintain and personalized financial insights.",
      highlights: ["Real-time alerts", "Theft logic", "Fleet scalability"],
      tech: ["GSM/GPRS", "Ultrasonic Sensing", "C++"],
      icon: "🛡️",
      cta: "View Details",
    },
  ];



  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for cards (similar to FAQ items)
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
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

  // Header animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  // Image zoom variants (only on hover)
  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Glow animation for background blobs
  const glowAnimation = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.15, 0.1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Split text animation for subtitle (like FAQ page)
  const splitText = (text) => {
    const chars = text.split("");
    const mid = Math.floor(chars.length / 2);
    return { chars, mid };
  };

  const subtitleText = "Explore our on going work across embedded systems, IoT, and software development.";
  const subtitle = splitText(subtitleText);

  return (
    <section
      id="projects"
      className="bg-transparent text-white py-12 sm:py-16 md:py-20 lg:py-24 min-[1600px]:!py-[40px] relative z-20 overflow-hidden"
    >

      <style>{`
        @media (min-width: 1600px) {
          .feature-projects-container {
            padding-left: clamp(30px, 4vw, 10px) !important;
            padding-right: clamp(10px, 3vw, 10px) !important;
          }
        }
      `}</style>
      <div 
        className="feature-projects-container w-full max-w-[1600px] xl:max-w-[1900px] min-[1600px]:max-w-[2100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] min-[1600px]:!px-[80px] min-[1920px]:!px-[100px] relative z-10"
      >

        {/* Header with animation when in view */}
        <motion.div
          className="text-center mb-6"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "4px",
              color: "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            className="min-[1600px]:!text-[80px]"
          >
            Ongoing projects
          </h1>


          {/* Subtitle with character-by-character animation (like FAQ page) */}
          <motion.p
            className="text-white text-sm sm:text-base md:text-lg min-[1600px]:!text-[26px] flex flex-wrap justify-center min-[1600px]:mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {subtitle.chars.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: i < subtitle.mid ? -20 : 20,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.2 + i * 0.01,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Projects Grid with staggered entrance animation (like FAQ items) */}
        <motion.div
          className="grid 
grid-cols-1 
sm:grid-cols-2 
md:grid-cols-2 
lg:grid-cols-3 
xl:grid-cols-4 
gap-5 sm:gap-6 md:gap-7 lg:gap-8 min-[1600px]:!gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(project.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => setSelectedProject(project)}
              className="h-full"
            >
              <GlowCard
                glowColor="cyan"
                customSize={true}
                className="project-card h-full w-full overflow-hidden group transition-all duration-500 ease-out bg-[#111111] p-0"
              >
                <div className="flex flex-col h-full w-full">
                  <div className="relative h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[50vh] xl:h-[55vh] 2xl:h-[45vh] min-[1600px]:h-[50vh] p-[16px] shrink-0">
                    <div className="w-full h-full overflow-hidden rounded-[20px]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-5 sm:px-6 md:px-7 pb-6 pt-4 flex flex-col gap-2 flex-1">
                    <h3 className="text-lg min-[1600px]:text-3xl font-bold text-gray-100 group-hover:text-white transition-colors leading-tight">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-gray-400 text-xs min-[1600px]:text-base uppercase tracking-wider">
                        {project.subtitle}
                      </p>
                    )}
                    <p className="text-white text-[13px] min-[1600px]:text-[18px] leading-relaxed flex-1">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>


      </div>

      {/* Modal */}
      {/* <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className="relative w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl bg-[#0A0A0A] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 z-50 p-2.5 bg-black/50 hover:bg-white/10 rounded-full transition-colors border border-white/10 backdrop-blur-md"
              >
                <X size={18} />
              </button>

              <div className="w-full md:w-[45%] h-56 sm:h-64 md:h-auto relative flex-shrink-0">
                <img
                  src={selectedProject.image}
                  className="w-full h-full object-cover opacity-50 saturate-[0.4]"
                  alt={selectedProject.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent" />
              </div>

              <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-modal-scroll">
                <div className="text-4xl mb-3">{selectedProject.icon}</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-[#80D25D] to-[#23B0ED] bg-clip-text text-transparent">
                  {selectedProject.title}
                </h2>
              
                <p className="text-gray-100 text-xs mb-4 uppercase tracking-widest">{selectedProject.subtitle}</p>
                <p className="text-gray-100 text-sm leading-relaxed mb-6">{selectedProject.desc}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-[#80D25D] font-bold uppercase tracking-widest text-[10px] mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.highlights?.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                          <CheckCircle2 size={13} className="text-[#80D25D] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#23B0ED] font-bold uppercase tracking-widest text-[10px] mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech?.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 flex items-center gap-1.5">
                          <Cpu size={10} /> {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 px-5 py-3 bg-gradient-to-r from-[#80D25D] to-[#23B0ED] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm">
                    View Case Study <ArrowRight size={15} />
                  </button>
                  <button className="flex-1 px-5 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-sm">
                    Source Code
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence> */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .custom-modal-scroll::-webkit-scrollbar { width: 5px; }
        .custom-modal-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 10px; }
        .custom-modal-scroll::-webkit-scrollbar-thumb { background: #80D25D; border-radius: 10px; }
        .custom-modal-scroll::-webkit-scrollbar-thumb:hover { background: #23B0ED; }
      `}</style>
    </section>
  );
};

export default Featureprojects;