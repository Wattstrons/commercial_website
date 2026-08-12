import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { BorderRotate } from "../animation/BorderRotate";
import Section from "../layout/Section";
import Container from "../layout/Container";
import ResponsiveGrid from "../layout/ResponsiveGrid";
import SectionHeader from "../layout/SectionHeader";

const ContactInformation = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });



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
        setStatusMessage({ type: "", text: "" });

        try {
            const response = await fetch('https://commercial-backend-two.vercel.app/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatusMessage({ type: "success", text: data.message || "Message sent successfully!" });
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatusMessage({ type: "error", text: data.message || "Failed to send message. Please try again." });
            }
        } catch (err) {
            console.error("Error submitting form:", err);
            setStatusMessage({ type: "err", text: "A network error occurred. Please try again later." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Section
            id="contact"
            className="relative bg-transparent text-white overflow-hidden !pt-8 lg:!pt-[32px] 2xl:!pt-[45px]"
        >
            <Container className="contact-container">
                <ResponsiveGrid columns="2" className="!grid-cols-1 sm:!grid-cols-1 md:!grid-cols-1 lg:!grid-cols-2 gap-12 lg:gap-16 2xl:gap-24">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col justify-between h-full">
                        <SectionHeader
                            title={
                                <>
                                    Let's build <br />
                                    <span className="text-[#00EDC2]">something great.</span>
                                </>
                            }
                            className="text-left mb-6 lg:mb-8 2xl:mb-10 relative z-10"
                            titleClassName="font-bold tracking-tight mb-2 text-white m-0 text-[clamp(32px,4vw,60px)] 2xl:!text-[68px] "
                            titleStyle={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
                        />

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
                                    <p className="text-[#fff] text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-widest">Email us</p>
                                    <p className="text-gray-400 font-medium break-all !text-[13px] sm:!text-[14px] lg:!text-[15px] 2xl:!text-[16px]">info@wattstrons.com</p>
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
                                    <p className="text-[#fff] text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-widest">Visit us</p>
                                    <p className="text-gray-400 font-medium !text-[13px] sm:!text-[14px] lg:!text-[15px] 2xl:!text-[16px]">Bangalore</p>
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
                                    <p className="text-[#fff] text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-widest">Chat with us</p>
                                    <p className="text-gray-400 font-medium !text-[13px] sm:!text-[14px] lg:!text-[15px] 2xl:!text-[16px]">+91 90255 71824</p>
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
                        className="relative h-full flex flex-col"
                    >
                        <BorderRotate
                            borderRadius={24}
                            animationSpeed={8}
                            className="bg-[#0A0A0A] p-6 sm:p-8 lg:p-10 2xl:p-12 rounded-2xl h-full flex flex-col justify-center"
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="group space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white group-hover:text-[#00EDC2] transition-colors duration-300">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            placeholder="Name"
                                            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#00EDC2] group-hover:border-[#00EDC2]/60 transition-all duration-300 text-white"
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="group space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white group-hover:text-[#00EDC2] transition-colors duration-300">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            placeholder="address@gmail.com"
                                            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#00EDC2] group-hover:border-[#00EDC2]/60 transition-all duration-300 text-white"
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="group space-y-2 mt-10">
                                    <label className="text-xs uppercase tracking-widest text-white group-hover:text-[#00EDC2] transition-colors duration-300">Your Message</label>
                                    <textarea
                                        rows="5"
                                        value={formData.message}
                                        placeholder="How can we help you?"
                                        className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#00EDC2] group-hover:border-[#00EDC2]/60 transition-all duration-300 resize-none text-white"
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>

                                {statusMessage.text && (
                                    <div className={`mt-8 p-4 rounded-xl text-sm font-medium ${statusMessage.type === 'success' ? 'bg-[#00EDC2]/20 text-[#00EDC2] border border-[#00EDC2]/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                        {statusMessage.text}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`view-details-btn w-full bg-[#00EDC2] py-4 rounded-xl font-bold text-black flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70 hover:shadow-[0_0_20px_rgba(0,237,194,0.6)] ${statusMessage.text ? 'mt-8' : 'mt-12'}`}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    <Send size={18} className=" " />
                                </button>
                            </form>
                        </BorderRotate>
                    </motion.div>
                </ResponsiveGrid>
            </Container>
        </Section>
    );
};

export default ContactInformation;
