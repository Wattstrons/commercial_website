import React, { useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, X, Send, Loader2, FileText, Calendar, DollarSign, Laptop, Clock, Share2, Check } from "lucide-react";
import careersImage from "../assets/images/careers.png";

// Job Description Modal Component
const JobDescriptionModal = ({ job, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Job details with descriptions
  const getJobDetails = (jobTitle) => {
    const jobDetails = {
      "Embedded Systems Engineer": {
        description: "We are looking for a passionate Embedded Systems Engineer Intern to work on real-world embedded, IoT, and automation projects. You will gain hands-on experience in firmware development, hardware interfacing, debugging, and product development.",
        responsibilities: [
          "Develop firmware for microcontrollers such as STM32, ESP32, and ARM-based platforms",
          "Interface sensors, actuators, and communication modules",
          "Assist in hardware bring-up, testing, and debugging",
          "Work with communication protocols such as UART, SPI, I2C, CAN, and MQTT",
          "Support prototype development and product validation",
          "Prepare technical documentation and project reports"
        ],
        requirements: [
          "Pursuing or completed BE/B.Tech in ECE, EEE, E&I, Mechatronics, or related fields",
          "Knowledge of C/C++ programming",
          "Basic understanding of microcontrollers and embedded systems",
          "Familiarity with electronic circuits and debugging tools",
          "Strong problem-solving and analytical skills",
          "Passion for learning and innovation"
        ],
        benefits: [
          "Hands-on experience on live industry projects",
          "Mentorship from experienced engineers",
          "Exposure to IoT and automation technologies",
          "Internship certificate and performance-based opportunities",
          "Career growth in embedded product development"
        ]
      },
      "PCB Design Engineer": {
        description: "We are seeking a PCB Design Engineer Intern who is enthusiastic about electronics hardware design. You will assist in schematic design, PCB layout, component selection, and prototype validation.",
        responsibilities: [
          "Create electronic schematics and PCB layouts",
          "Assist in component selection and BOM preparation",
          "Perform design rule checks and PCB verification",
          "Support prototype assembly and hardware testing",
          "Collaborate with firmware and hardware teams",
          "Maintain design documentation and revision records"
        ],
        requirements: [
          "Pursuing or completed BE/B.Tech in ECE, EEE, or related fields",
          "Knowledge of PCB design tools such as Altium Designer, KiCad, or EasyEDA",
          "Understanding of analog and digital electronics",
          "Familiarity with PCB manufacturing processes",
          "Attention to detail and design best practices",
          "Strong willingness to learn"
        ],
        benefits: [
          "Real-world PCB design experience",
          "Exposure to product development lifecycle",
          "Opportunity to work on commercial hardware products",
          "Mentorship from experienced hardware engineers",
          "Internship certificate and growth opportunities"
        ]
      },
      "Internet of Things Developer": {
        description: "We are looking for an IoT Developer to help build connected solutions involving embedded devices, cloud platforms, and smart automation systems. You will work on end-to-end IoT applications and real-world deployments.",
        responsibilities: [
          "Develop and test IoT applications and device integrations",
          "Work with ESP32, sensors, gateways, and communication modules",
          "Implement MQTT, HTTP, REST APIs, and cloud connectivity",
          "Monitor and analyze device data for optimization",
          "Assist in dashboard development and system integration",
          "Troubleshoot hardware and software issues"
        ],
        requirements: [
          "Pursuing or completed BE/B.Tech in ECE, CSE, IT, or related fields",
          "Knowledge of IoT concepts and networking fundamentals",
          "Basic programming skills in C/C++, Python, or JavaScript",
          "Familiarity with cloud platforms is an advantage",
          "Understanding of MQTT, Wi-Fi, and sensor integration",
          "Strong analytical and problem-solving abilities"
        ],
        benefits: [
          "Hands-on experience with IoT products and deployments",
          "Exposure to cloud and edge computing technologies",
          "Opportunity to work on innovative automation projects",
          "Mentorship and technical training",
          "Internship certificate and future career opportunities"
        ]
      },
      "MERN Stack Developer": {
        description: "We are looking for a motivated MERN Stack Developer Intern to contribute to modern web applications, dashboards, and cloud-connected platforms. You will work alongside our engineering team to develop scalable and user-friendly software solutions.",
        responsibilities: [
          "Develop responsive web applications using React.js",
          "Build RESTful APIs using Node.js and Express.js",
          "Design and manage MongoDB databases",
          "Integrate frontend applications with backend services",
          "Debug, test, and optimize application performance",
          "Collaborate with designers and engineers on product development"
        ],
        requirements: [
          "Pursuing or completed BE/B.Tech/BCA/MCA in CSE, IT, or related fields",
          "Knowledge of HTML, CSS, JavaScript, and React.js",
          "Familiarity with Node.js, Express.js, and MongoDB",
          "Understanding of REST APIs and Git version control",
          "Problem-solving mindset and eagerness to learn",
          "Ability to work independently and within a team"
        ],
        benefits: [
          "Work on real-world software products",
          "Exposure to full-stack development workflows",
          "Mentorship from experienced developers",
          "Flexible and collaborative work environment",
          "Internship certificate and performance-based opportunities"
        ]
      }
    };
    return jobDetails[jobTitle] || jobDetails["Frontend React Developer"];
  };

  const jobDetails = getJobDetails(job.title);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 " style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white">{job.title}</h3>
            <div className="flex gap-4 mt-2">
              <p className="text-sm text-white/60 flex items-center gap-1">
                <MapPin size={14} /> {job.location}
              </p>
              <p className="text-sm text-white/60 flex items-center gap-1">
                <Briefcase size={14} /> {job.type}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} className="text-white/60 hover:text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* About the Role */}
          <div>
            <h4 className="text-lg font-semibold text-[#00EDC2] mb-3 flex items-center gap-2">
              <FileText size={20} />
              About the Role
            </h4>
            <p className="text-white/80 leading-relaxed">
              {jobDetails.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div>
            <h4 className="text-lg font-semibold text-[#00EDC2] mb-3">Key Responsibilities</h4>
            <ul className="space-y-2">
              {jobDetails.responsibilities.map((resp, idx) => (
                <li key={idx} className="text-white/70 flex items-start gap-2">
                  <span className="text-[#00EDC2] mt-1">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-lg font-semibold text-[#00EDC2] mb-3">Requirements</h4>
            <ul className="space-y-2">
              {jobDetails.requirements.map((req, idx) => (
                <li key={idx} className="text-white/70 flex items-start gap-2">
                  <span className="text-[#00EDC2] mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-lg font-semibold text-[#00EDC2] mb-3">
              What We Offer
            </h4>
            <ul className="space-y-2">
              {jobDetails.benefits.map((benefit, idx) => (
                <li key={idx} className="text-white/70 flex items-start gap-2">
                  <span className="text-[#00EDC2] mt-1">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Apply Button */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                onClose();
                // Trigger apply modal after closing JD modal
                setTimeout(() => {
                  const applyButton = document.querySelector(`[data-job-id="${job.id}"] .apply-now-btn`);
                  if (applyButton) applyButton.click();
                }, 100);
              }}
              className="w-full py-3 rounded-xl bg-[#00EDC2] text-black font-medium hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,237,194,0.4)] focus:ring-2 focus:ring-[#00EDC2] active:scale-95 transition-all cursor-pointer"
            >
              Apply for this Position
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Job Application Modal Component
const JobApplicationModal = ({ job, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    resumeFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${job.title} - Wattstrons`,
      text: `🚀 We're hiring! Check out this ${job.title} position at Wattstrons.\n\n📍 ${job.location}\n💼 ${job.type}\n💻 ${job.mode}\n⏱️ ${job.duration}\n\nApply now 👇`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } else {
        const textToCopy = `${shareData.text}\n${shareData.url}`;
        await navigator.clipboard.writeText(textToCopy);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'resumeFile') {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 1 * 1024 * 1024) {
          setSubmitStatus({ type: "error", message: "File size must be less than 1MB." });
          e.target.value = null; // reset
          setTimeout(() => setSubmitStatus(null), 3000);
          return;
        }
        setFormData({ ...formData, resumeFile: file });
      }
    } else if (e.target.name === 'phone') {
      // Only allow numbers and limit to 10 digits
      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, phone: value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const sendApplicationToAPI = async () => {
    const data = new FormData();
    data.append('jobTitle', job.title);
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('experience', formData.experience);
    if (formData.resumeFile) {
      data.append('resume', formData.resumeFile);
    }

    const response = await fetch('https://commercial-backend-ozzm.onrender.com/api/career', {
      method: 'POST',
      body: data
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit application');
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.resumeFile) {
      setSubmitStatus({ type: "error", message: "Please fill in all required fields and upload a resume." });
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: "error", message: "Please enter a valid email address." });
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    if (formData.phone.length !== 10) {
      setSubmitStatus({ type: "error", message: "Phone number must be exactly 10 digits." });
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      await sendApplicationToAPI();
      setSubmitStatus({ type: "success", message: "Application sent successfully!" });

      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          experience: "",
          coverLetter: "",
          resumeFile: null,
        });
        setSubmitStatus(null);
        setTimeout(() => {
          onClose();
          setIsSubmitting(false);
        }, 2000);
      }, 1000);
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Something went wrong. Please try again." });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-white">Apply for {job.title}</h3>
            <p className="text-sm text-white/60 mt-1">{job.location} • {job.type}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title={shareSuccess ? "Link copied!" : "Share this position"}
              className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${shareSuccess
                  ? "bg-[#00EDC2]/20 text-[#00EDC2]"
                  : "hover:bg-white/10 text-white/60 hover:text-[#00EDC2]"
                }`}
            >
              {shareSuccess ? <Check size={18} /> : <Share2 size={18} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X size={20} className="text-white/60 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Modal Body - Form */}
        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2 cursor-pointer">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#00EDC2]/50 focus:ring-1 focus:ring-[#00EDC2]/50 focus:outline-none transition-colors cursor-pointer"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2 cursor-pointer">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#00EDC2]/50 focus:ring-1 focus:ring-[#00EDC2]/50 focus:outline-none transition-colors cursor-pointer"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2 cursor-pointer">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength="10"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#00EDC2]/50 focus:ring-1 focus:ring-[#00EDC2]/50 focus:outline-none transition-colors cursor-pointer"
              placeholder="1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2 cursor-pointer">
              Years of Experience
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#00EDC2]/50 focus:ring-1 focus:ring-[#00EDC2]/50 focus:outline-none transition-colors appearance-none cursor-pointer"
              style={{
                colorScheme: 'dark',
              }}
            >
              <option value="" className="bg-[#0a0a0a] text-white/80">Select experience</option>
              <option value="Fresher" className="bg-[#0a0a0a] text-white">Fresher (0-1 years)</option>
              <option value="1-3 years" className="bg-[#0a0a0a] text-white">1-3 years</option>
              <option value="3-5 years" className="bg-[#0a0a0a] text-white">3-5 years</option>
              <option value="5+ years" className="bg-[#0a0a0a] text-white">5+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2 cursor-pointer">
              Upload Resume/CV (PDF, DOC, DOCX - Max 1MB) <span className="text-red-400">*</span>
            </label>
            <input
              type="file"
              name="resumeFile"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#00EDC2]/50 focus:ring-1 focus:ring-[#00EDC2]/50 focus:outline-none transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00EDC2]/10 file:text-[#00EDC2] hover:file:bg-[#00EDC2]/20"
            />
            <p className="text-xs text-white/40 mt-1">
              Please upload a document file containing your resume
            </p>
          </div>



          {submitStatus && (
            <div className={`p-3 rounded-lg ${submitStatus.type === "success"
              ? "bg-green-500/20 border border-green-500/50 text-green-400"
              : "bg-red-500/20 border border-red-500/50 text-red-400"
              }`}>
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-[#00EDC2] text-black font-medium hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,237,194,0.4)] focus:ring-2 focus:ring-[#00EDC2] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Sending Application...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Application               </>
            )}
          </button>

          <p className="text-xs text-white/40 text-center">
            By submitting, you agree to our privacy policy.
          </p>
        </form>
      </motion.div>
    </div>
  );
};

const JobCard = ({ job, onApply }) => {
  const ref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJdModalOpen, setIsJdModalOpen] = useState(false);

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
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const handleApplyClick = () => {
    setIsModalOpen(true);
    if (onApply) onApply(job);
  };

  const handleJdClick = () => {
    setIsJdModalOpen(true);
  };

  return (
    <>
      <motion.div
        style={{ perspective: 900 }}
        className="h-full"
        data-job-id={job.id}
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            rotateX,
            rotateY,
            translateX: tX,
            translateY: tY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#111111] border border-white/10 rounded-3xl p-8 hover:border-[#00EDC2]/50 transition-colors duration-300 flex flex-col justify-between min-h-[340px] h-full"
        >
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 transform-gpu" style={{ transform: "translateZ(30px)" }}>
              {job.title === "PCB Design Engineer" ? (
                <>PCB Design <br /> Engineer</>
              ) : (
                job.title
              )}
            </h3>

            <div className="space-y-4 text-white/60 mb-8 transform-gpu" style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop size={18} />
                <span>{job.mode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{job.duration}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 transform-gpu" style={{ transform: "translateZ(40px)" }}>
            <button
              onClick={handleApplyClick}
              className="apply-now-btn w-full text-center py-3 rounded-xl bg-[#00EDC2] text-black font-medium hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,237,194,0.4)] focus:ring-2 focus:ring-[#00EDC2] active:scale-95 transition-all cursor-pointer"
            >
              Apply Now
            </button>
            <button
              onClick={handleJdClick}
              className="w-full py-3 rounded-xl border border-white/15 text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              Job Description
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Apply Modal */}
      <JobApplicationModal
        job={job}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Job Description Modal */}
      <JobDescriptionModal
        job={job}
        isOpen={isJdModalOpen}
        onClose={() => setIsJdModalOpen(false)}
      />
    </>
  );
};

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Embedded Systems Engineer",
      location: "Bangalore, India",
      type: "Full-Time",
      mode: "Hybrid",
      duration: "0-4 years",
      link: "#",
    },
    {
      id: 2,
      title: "PCB Design Engineer",
      location: "Bangalore, India",
      type: "Full-Time",
      mode: "Hybrid",
      duration: "0-6 years",
      link: "#",
    },
    {
      id: 3,
      title: "Internet of Things Developer",
      location: "Bangalore, India",
      type: "Full-Time",
      mode: "Hybrid",
      duration: "0-2 years",
      link: "#",
    },
    {
      id: 4,
      title: "MERN Stack Developer",
      location: "Bangalore, India",
      type: "Full-Time",
      mode: "Hybrid",
      duration: "0-3 years",
      link: "#",
    },
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-[#00f5a0] selection:text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Hero Section */}
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={careersImage}
            alt="Careers at Wattstrons"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1600px] xl:max-w-[1900px] mx-auto px-6 lg:px-[80px] xl:px-[100px] h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight">
              Careers at Wattstrons
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
              Join a workplace where your ideas matter, your skills grow, and your innovations shape the future.
            </p>

            <button
              onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 px-6 py-3 bg-[#00EDC2] text-black rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,237,194,0.9)] focus:ring-2 focus:ring-[#00EDC2] active:scale-95 cursor-pointer"
            >
              <span className="font-medium text-sm md:text-base">View Open Positions</span>
              <div className="bg-black text-white rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight size={16} />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="w-full h-1 bg-[#00EDC2]" />

      <div id="openings" className="max-w-[1600px] xl:max-w-[1900px] mx-auto px-6 lg:px-[80px] xl:px-[100px] py-20">
        <h2 className="text-5xl font-bold text-white mb-12 text-center">
          Current Openings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={handleApply} />
          ))}
        </div>
      </div>

      {/* Global styles to hide scrollbars */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Optional: Custom scrollbar for better UX (only shows on hover) */
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 237, 194, 0.5);
          border-radius: 10px;
        }
        
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 237, 194, 0.8);
        }
      `}</style>
    </div>
  );
};

export default Careers;
