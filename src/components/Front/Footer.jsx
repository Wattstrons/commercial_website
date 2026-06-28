import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../../assets/icon/logo.png";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

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
          <div className="w-full">
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
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 min-[1600px]:!w-24 min-[1600px]:!h-24"
                  />
                  <h2
                    className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl min-[1600px]:!text-[50px] leading-none text-[#00EDC2] tracking-[0.1em]"
                  >
                    WATTSTRONS
                  </h2>
                </div>

                <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base min-[1600px]:!text-[22px] min-[1600px]:!max-w-[600px] min-[1600px]:mb-6 mb-2 max-w-sm font-medium">
                  Wattstrons – Transforming Ideas into Intelligent Products.
                </p>

                <p className="text-gray-400 leading-relaxed text-[11px] sm:text-xs md:text-sm min-[1600px]:!text-[18px] min-[1600px]:!max-w-[600px] min-[1600px]:mb-10 mb-4 sm:mb-6 max-w-sm">
                  We empower businesses by building cutting-edge intelligent systems, seamless digital experiences, and scalable software architectures designed for the future.
                </p>
              </div>


              {/* Pages Column */}
              <div className="flex flex-col">
                <h3 className="mb-3 sm:mb-5 min-[1600px]:mb-8 font-semibold text-sm sm:text-base md:text-lg min-[1600px]:!text-[32px]">
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
                          className="view-details-btn text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base min-[1600px]:!text-[24px] text-left cursor-pointer bg-transparent border-none p-0"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          to={`/#${item.scrollId}`}
                          className="view-details-btn text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base min-[1600px]:!text-[24px] cursor-pointer"
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
                <h3 className="mb-3 sm:mb-5 min-[1600px]:mb-8 font-semibold text-sm sm:text-base md:text-lg min-[1600px]:!text-[32px]">
                  Socials
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    { name: "Instagram", icon: <FaInstagram size={16} className="min-[1600px]:!w-8 min-[1600px]:!h-8" />, url: "https://www.instagram.com/wattstrons_10823?igsh=cG50MWpmd3Nvb201" },
                    // { name: "LinkedIn", icon: <FaLinkedin size={16} className="min-[1600px]:!w-8 min-[1600px]:!h-8" />, url: "#" },
                    { name: "WhatsApp", icon: <FaWhatsapp size={16} className="min-[1600px]:!w-8 min-[1600px]:!h-8" />, url: "https://wa.me/message/4IYHDIYZ6ZUQM1" },
                  ].map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200 text-xs sm:text-sm md:text-base min-[1600px]:!text-[24px]"
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
            <div className="border-t border-gray-800 pt-4 pb-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 max-w-[1400px] xl:max-w-[1600px] min-[1600px]:max-w-[90vw] mx-auto px-4 sm:px-6 md:px-8">
              <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm min-[1600px]:!text-[24px] text-center sm:text-left">
                © {new Date().getFullYear()} Wattstrons. All rights reserved.
              </p>

              <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-center">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((policy) => (
                  <a
                    key={policy}
                    href="#"
                    className="text-gray-400 hover:text-white text-[10px] sm:text-xs md:text-sm min-[1600px]:!text-[24px] transition-colors"
                  >
                    {policy}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Full Black Bottom Bar with Massive Logo and Company Name */}

    </>
  );
};

export default Footer;



