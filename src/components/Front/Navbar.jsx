import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/icon/logo.png";
import Container from "../layout/Container";

const NAVBAR_HEIGHT = 80;

const navItems = [
  { id: "home", label: "Home", scrollId: "home" },
  { id: "about", label: "About Us", scrollId: "about" },
  { id: "expertise", label: "Our Services", scrollId: "expertise" },
  { id: "projects", label: "Projects", scrollId: "projects" },
  { id: "careers", label: "Careers", to: "/careers" },
  { id: "contact", label: "Contact Us", scrollId: "contact" },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Refs — never cause re-renders
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const activeSectionRef = useRef("home"); // mirror of activeSection for use inside listeners

  const closeMenu = () => setIsMenuOpen(false);

  // Keep the ref in sync whenever state changes
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  /* ─── scrollToSection ─────────────────────────────────────────────── */
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`[Navbar] Section #${sectionId} not found`);
      return false;
    }

    // Signal all other scroll handlers to stand down
    isScrollingRef.current = true;
    window.__navIsScrolling = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(sectionId);

    // Poll until element's top edge is near the viewport top
    let pollCount = 0;
    const poll = setInterval(() => {
      pollCount++;
      const targetEl = document.getElementById(sectionId);
      if (!targetEl) {
        clearInterval(poll);
        return;
      }

      const top = targetEl.getBoundingClientRect().top;
      const arrived = Math.abs(top) < 10;
      const timedOut = pollCount > 60; // 60 × 80ms = 4.8s max
      if (arrived || timedOut) {
        clearInterval(poll);
        isScrollingRef.current = false;
        window.__navIsScrolling = false;
      }
    }, 80);

    // Hard safety release after 5s
    scrollTimeoutRef.current = setTimeout(() => {
      clearInterval(poll);
      isScrollingRef.current = false;
      window.__navIsScrolling = false;
    }, 5000);

    return true;
  }, []);

  /* ─── Get Started button ──────────────────────────────────────────── */
  const handleGetStarted = () => {
    closeMenu();
    if (isHomePage) {
      scrollToSection("expertise");
    } else {
      sessionStorage.setItem("scrollToSection", "expertise");
      navigate("/");
    }
  };

  /* ─── Navbar auto-hide on scroll ────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true);  // Show when scrolling up
      }
      
      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 20);
    };
    
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, []);

  /* ─── Scroll spy — stable listener, no activeSection in deps ────── */
  useEffect(() => {
    if (!isHomePage) return;

    const onScroll = () => {
      // Skip during programmatic scroll
      if (isScrollingRef.current) return;

      const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      const scrollPos = currentScrollY + NAVBAR_HEIGHT + 40;
      const sections = navItems.filter((i) => i.scrollId);

      let detected = "home";
      // Walk from bottom so the last one whose top ≤ scrollPos wins
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].scrollId);
        if (el) {
          const elTop = el.getBoundingClientRect().top + currentScrollY;
          if (scrollPos >= elTop) {
            detected = sections[i].scrollId;
            break;
          }
        }
      }

      if (detected !== activeSectionRef.current) {
        activeSectionRef.current = detected;
        setActiveSection(detected);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    // Run once to set correct section on mount / route change
    onScroll();

    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, [isHomePage]); // ← Only isHomePage — stable listener

  /* ─── Hash navigation (e.g. /#about) ─────────────────────────────── */
  useEffect(() => {
    if (!isHomePage || !location.hash) return;
    const hash = location.hash.replace("#", "");
    const timer = setTimeout(() => {
      scrollToSection(hash);
      window.history.replaceState(null, "", window.location.pathname);
    }, 250);
    return () => clearTimeout(timer);
  }, [location.hash, isHomePage, scrollToSection]);

  /* ─── Cross-route scroll intent (sessionStorage) ─────────────────── */
  useEffect(() => {
    if (!isHomePage) return;
    const target = sessionStorage.getItem("scrollToSection");
    if (!target) return;
    sessionStorage.removeItem("scrollToSection");

    let attempts = 0;
    const tryScroll = () => {
      if (document.getElementById(target)) {
        setTimeout(() => scrollToSection(target), 100);
      } else if (attempts < 25) {
        attempts++;
        setTimeout(tryScroll, 150);
      }
    };
    tryScroll();
  }, [isHomePage, scrollToSection]);

  /* ─── Reset active section on route change ────────────────────────── */
  useEffect(() => {
    setActiveSection(isHomePage ? "home" : null);
  }, [location.pathname, isHomePage]);

  /* ─── Close mobile menu on resize ─────────────────────────────────── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ─── Lock body scroll when mobile menu open ──────────────────────── */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  /* ─── Cleanup on unmount ──────────────────────────────────────────── */
  useEffect(() => {
    return () => { if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current); };
  }, []);

  /* ─── CSS helpers ──────────────────────────────────────────────────── */
  const navLinkClass = (isActive = false) =>
    "view-details-btn nav-link relative flex items-center px-1.5 lg:px-2 xl:px-3 py-2 font-medium transition-all duration-300 whitespace-nowrap text-[13px] lg:text-sm xl:text-base 2xl:!text-[18px] " +
    (isActive
      ? "text-[#00EDC2]"
      : "text-white hover:text-white hover:drop-shadow-[0_0_30px_#8DE05A] hover:[text-shadow:0_0_15px_#8DE05A,0_0_35px_#8DE05A]");

  /* ─── Render a single nav item ─────────────────────────────────────── */
  const renderItem = (item, mobile = false) => {
    const isActive = isHomePage
      ? item.scrollId === activeSection
      : item.to === location.pathname;

    const cls = `${navLinkClass(isActive)} ${mobile ? "block w-full text-left text-base py-3 px-4" : ""}`;

    // External route link (e.g. /careers)
    if (item.to) {
      return (
        <Link
          key={item.id}
          to={item.to}
          onClick={closeMenu}
          className={cls}
        >
          {item.label}
        </Link>
      );
    }

    // On home page → scroll button
    if (isHomePage) {
      return (
        <button
          key={item.id}
          onClick={() => {
            closeMenu();
            scrollToSection(item.scrollId);
          }}
          className={cls}
        >
          {item.label}
        </button>
      );
    }

    // On another page → navigate home then scroll
    return (
      <Link
        key={item.id}
        to="/"
        onClick={() => {
          closeMenu();
          sessionStorage.setItem("scrollToSection", item.scrollId);
        }}
        className={cls}
      >
        {item.label}
      </Link>
    );
  };

  /* ─── JSX ──────────────────────────────────────────────────────────── */
  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-transparent`}>
        <Container className="!px-4 sm:!px-6 md:!px-8 lg:!px-12 xl:!px-16">
          <div className="flex items-center justify-between py-3 md:py-4">

            {/* LOGO */}
            <Link
              to="/"
              className="view-details-btn relative flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 rounded-full transition-all duration-300 before:absolute before:inset-0 before:rounded-full before:bg-[#8DE05A] before:opacity-0 before:blur-lg before:transition-all before:duration-300 hover:before:opacity-30 group"
              onClick={() => {
                closeMenu();
                if (!isHomePage) {
                  navigate("/");
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setActiveSection("home");
                }
              }}
            >
              <img src={logo} alt="logo" className="h-8 sm:h-9 lg:h-8 xl:h-10 2xl:!h-10 w-auto relative z-10" />
              <span className="text-[#00EDC2] text-base sm:text-lg lg:text-base xl:text-xl 2xl:!text-[24px] font-bold tracking-wide relative z-10 whitespace-nowrap transition-all duration-300 group-hover:[text-shadow:0_0_15px_#8DE05A,0_0_35px_#8DE05A]">
                WATTSTRONS
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-6">
              {navItems.map((item) => renderItem(item))}
            </div>

            {/* CTA BUTTONS */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={handleGetStarted}
                className="view-details-btn relative px-4 lg:px-5 xl:px-6 py-2 rounded-full font-medium text-[13px] lg:text-sm xl:text-base 2xl:!text-[18px] text-black bg-[#00EDC2] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#8DE05A] whitespace-nowrap"
              >
                Start Your Project
              </button>
            </div>

            {/* MOBILE HAMBURGER */}
            <button
              className="lg:hidden text-white text-2xl sm:text-3xl cursor-pointer z-50 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <FiMenu />
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMenuOpen ? "visible" : "invisible"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={closeMenu}
        />

        {/* Drawer panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-black/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="h-8 w-auto" />
              <span className="text-[#00EDC2] text-lg font-semibold">WATTSTRONS</span>
            </div>
            <button
              onClick={closeMenu}
              className="text-white text-2xl cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-all"
              aria-label="Close menu"
            >
              <FiX />
            </button>
          </div>

          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex flex-col py-6">
              {navItems.map((item) => renderItem(item, true))}
            </div>

            <div className="px-4 mt-auto pb-8">
              <button
                onClick={handleGetStarted}
                className="w-full bg-[#00EDC2] cursor-pointer text-black font-medium py-3 rounded-full text-base hover:shadow-[0_0_30px_#8DE05A] transition-all duration-300 hover:scale-105"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;