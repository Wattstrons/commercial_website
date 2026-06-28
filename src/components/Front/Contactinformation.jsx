import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { BorderRotate } from "../animation/BorderRotate";

const ContactInformation = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const whatsappMessage = `*New Contact*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/9025571824?text=${whatsappMessage}`, '_blank');
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative bg-transparent text-white py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="contact-container w-full max-w-[1600px] xl:max-w-[1900px] min-[1600px]:max-w-[2100px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[80px] min-[1600px]:!px-[80px] min-[1920px]:!px-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-24">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08 }}
              transition={{
                duration: 0.6,
                scale: { duration: 0.5, ease: "anticipate" }
              }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl min-[1600px]:!text-[96px] min-[1600px]:!leading-[1.1] font-bold tracking-tighter mb-6 lg:mb-8 2xl:mb-10 cursor-pointer"
              style={{ transformOrigin: "left center" }}
            >
              Let's build <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="inline-block text-[#00EDC2]"
              >
                something great.
              </motion.span>
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6 lg:space-y-8 2xl:space-y-10"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-4 lg:gap-6 2xl:gap-8">
                <motion.div
                  animate={floatingAnimation}
                  className="w-12 h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-[#00EDC2] flex-shrink-0"
                >
                  <Mail size={24} />
                </motion.div>
                <div>
                  <p className="text-[#fff] text-[10px] sm:text-xs uppercase tracking-widest">Email us</p>
                  <p className="text-sm text-gray-400 lg:text-base xl:text-lg 2xl:text-xl font-medium break-all">info@wattsrons.com</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-4 lg:gap-6 2xl:gap-8">
                <motion.div
                  animate={floatingAnimation}
                  transition={{ delay: 0.5 }}
                  className="w-12 h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-[#00EDC2] flex-shrink-0"
                >
                  <MapPin size={24} />
                </motion.div>
                <div>
                  <p className="text-[#fff] text-[10px] sm:text-xs uppercase tracking-widest">Visit us</p>
                  <p className="text-sm text-gray-400 lg:text-base xl:text-lg 2xl:text-xl font-medium">Bangalore</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-4 lg:gap-6 2xl:gap-8">
                <motion.div
                  animate={floatingAnimation}
                  transition={{ delay: 1 }}
                  className="w-12 h-12 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-[#00EDC2] flex-shrink-0"
                >
                  <MessageSquare size={24} />
                </motion.div>
                <div>
                  <p className="text-[#fff] text-[10px] sm:text-xs uppercase tracking-widest">Chat with us</p>
                  <p className="text-sm text-gray-400 lg:text-base xl:text-lg 2xl:text-xl font-medium">+91 90255 71824</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <BorderRotate
              borderRadius={24}
              animationSpeed={8}
              className="bg-[#0A0A0A] p-6 sm:p-8 lg:p-10 2xl:p-12 min-[1600px]:!p-16 rounded-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-5 min-[1600px]:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 min-[1600px]:gap-8">
                  <div className="group space-y-2 min-[1600px]:space-y-4">
                    <label className="text-xs min-[1600px]:!text-lg uppercase tracking-widest text-white group-hover:text-[#00EDC2] transition-colors duration-300">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      placeholder="John Doe"
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 min-[1600px]:px-6 min-[1600px]:py-5 min-[1600px]:!text-xl outline-none focus:border-[#00EDC2] group-hover:border-[#00EDC2]/60 transition-all duration-300 text-white"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="group space-y-2 min-[1600px]:space-y-4">
                    <label className="text-xs min-[1600px]:!text-lg uppercase tracking-widest text-white group-hover:text-[#00EDC2] transition-colors duration-300">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      placeholder="john@example.com"
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 min-[1600px]:px-6 min-[1600px]:py-5 min-[1600px]:!text-xl outline-none focus:border-[#00EDC2] group-hover:border-[#00EDC2]/60 transition-all duration-300 text-white"
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="group space-y-2 min-[1600px]:space-y-4">
                  <label className="text-xs min-[1600px]:!text-lg uppercase tracking-widest text-white group-hover:text-[#00EDC2] transition-colors duration-300">Your Message</label>
                  <textarea
                    rows="5"
                    value={formData.message}
                    placeholder="How can we help you?"
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 min-[1600px]:px-6 min-[1600px]:py-5 min-[1600px]:!text-xl outline-none focus:border-[#00EDC2] group-hover:border-[#00EDC2]/60 transition-all duration-300 resize-none text-white"
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="view-details-btn w-full bg-[#00EDC2] py-4 min-[1600px]:py-6 rounded-xl font-bold text-black min-[1600px]:!text-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70 hover:shadow-[0_0_20px_rgba(0,237,194,0.6)]"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={18} className="min-[1600px]:!w-8 min-[1600px]:!h-8" />
                </button>
              </form>
            </BorderRotate>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;