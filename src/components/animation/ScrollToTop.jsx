import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
 const { pathname, hash } = useLocation();
 const navType = useNavigationType();

 // Save scroll position before unload (refresh)
 useEffect(() => {
 const handleBeforeUnload = () => {
 sessionStorage.setItem('scrollPosition', window.scrollY);
 };
 window.addEventListener('beforeunload', handleBeforeUnload);
 return () => window.removeEventListener('beforeunload', handleBeforeUnload);
 }, []);

 useEffect(() => {
 if (navType === "POP") { // Initial load or back/forward
 const savedScroll = sessionStorage.getItem('scrollPosition');
 if (savedScroll) {
 setTimeout(() => {
 window.scrollTo({ top: parseInt(savedScroll), behavior: "instant" });
 sessionStorage.removeItem('scrollPosition');
 }, 10);
 return;
 }
 if (hash) {
 setTimeout(() => {
 document.getElementById(hash.replace("#", ""))?.scrollIntoView({ behavior: "instant" });
 }, 100);
 return;
 }
 return; 
 }

 // Normal navigation
 if (hash) {
 setTimeout(() => {
 document.getElementById(hash.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
 }, 100);
 } else {
 window.scrollTo({ top: 0, left: 0, behavior: "instant" });
 }
 }, [pathname, hash, navType]);

 return null;
};

export default ScrollToTop;
