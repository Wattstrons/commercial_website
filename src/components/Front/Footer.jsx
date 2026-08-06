import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../../assets/icon/logo.png";
import Container from "../layout/Container";

const InstagramIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const WhatsappIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const Footer = () => {
 const location = useLocation();
 const isHomePage = location.pathname === "/";

 const navItems = [
 { label: "Home", scrollId: "home" },
 { label: "About Us", scrollId: "about" },
 { label: "Our Services", scrollId: "expertise" },
 { label: "Projects", scrollId: "projects" },
 { label: "Contact Us", scrollId: "contact" },
 ];

 return (
 <>
 <footer className="w-full bg-[#0B0B0B] text-white">
 <div
 className="w-full"
 style={{
 background: `
 radial-gradient(
 80% 50% at 50% 0%,
 rgba(128,210,93,0.20),
 rgba(128,210,93,0.05),
 transparent
 )
 `,
 }}
 >
 <Container>
 <div
 className="
 grid 
 grid-cols-1 
 sm:grid-cols-2 
 md:grid-cols-[2fr_1fr_1fr] 
 gap-6 sm:gap-6 
 md:gap-8 lg:gap-10 
 w-full px-4 sm:px-6 md:px-8
 py-8 sm:py-10 
 md:py-12 lg:py-14
 "
 >
 {/* Brand Column */}
 <div className="sm:col-span-2 md:col-span-1 md:col-start-1">
 <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
 <img
 src={logo}
 alt="Wattstrons logo"
 className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 "
 />
 <h2
 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-none text-[#00EDC2] tracking-[0.1em]"
 >
 WATTSTRONS
 </h2>
 </div>

 <p className="text-gray-300 leading-relaxed !text-[clamp(13px,1.2vw,18px)] mb-2 max-w-sm font-medium">
 Wattstrons – Transforming Ideas into Intelligent Products.
 </p>

 <p className="text-gray-400 leading-relaxed text-[14px] sm:text-[15px] lg:text-[16px] mb-4 sm:mb-6 max-w-sm">
 We empower businesses by building cutting-edge intelligent systems, seamless digital experiences, and scalable software architectures designed for the future.
 </p>
 </div>


 {/* Pages Column */}
 <div className="flex flex-col">
 <h3 className="mb-3 sm:mb-5 font-semibold text-sm sm:text-base md:text-lg ">
 Explore
 </h3>
 <ul className="space-y-2 sm:space-y-3">
 {navItems.map((item) => (
 <li key={item.label}>
 {isHomePage ? (
 <button
 onClick={() => {
 document.getElementById(item.scrollId)?.scrollIntoView({ behavior: "smooth" });
 }}
 className="view-details-btn text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base text-left cursor-pointer bg-transparent border-none p-0"
 >
 {item.label}
 </button>
 ) : (
 <Link
 to={`/#${item.scrollId}`}
 className="view-details-btn text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base cursor-pointer"
 >
 {item.label}
 </Link>
 )}
 </li>
 ))}
 </ul>
 </div>

 {/* Socials Column */}
 <div className="flex flex-col">
 <h3 className="mb-3 sm:mb-5 font-semibold text-sm sm:text-base md:text-lg ">
 Socials
 </h3>
 <ul className="space-y-3 sm:space-y-4">
 {[
 { name: "Instagram", icon: <InstagramIcon size={16} className=" " />, url: "https://www.instagram.com/wattstrons_10823?igsh=cG50MWpmd3Nvb201" },
 // { name: "LinkedIn", icon: <LinkedinIcon size={16} className=" " />, url: "#" },
 { name: "WhatsApp", icon: <WhatsappIcon size={16} className=" " />, url: "https://wa.me/message/4IYHDIYZ6ZUQM1" },
 ].map((social) => (
 <li key={social.name}>
 <a
 href={social.url}
 target="_blank"
 rel="noopener noreferrer"
 className="group flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200 text-xs sm:text-sm md:text-base "
 >
 <span className="text-gray-500 group-hover:text-[#80D25D] transition-colors duration-200">
 {social.icon}
 </span>
 {social.name}
 </a>
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Bottom Copyright Section */}
 <div className="border-t border-gray-800 pt-4 pb-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 max-w-[1400px] xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8">
 <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm text-center sm:text-left">
 © {new Date().getFullYear()} Wattstrons. All rights reserved.
 </p>

 <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-center">
 {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((policy) => (
 <a
 key={policy}
 href="#"
 className="text-gray-400 hover:text-white text-[10px] sm:text-xs md:text-sm transition-colors"
 >
 {policy}
 </a>
 ))}
 </div>
 </div>
 </Container>
 </div>
 </footer>
 {/* Full Black Bottom Bar with Massive Logo and Company Name */}

 </>
 );
};

export default Footer;



