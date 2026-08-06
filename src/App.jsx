import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Front/Navbar'
import CustomCursor from './components/animation/CustomCursor'
import RippleBackground from './components/animation/RippleBackground'
import Footer from './components/Front/Footer'
import Home from './pages/Home'
import ScrollToTop from './components/animation/ScrollToTop'

// Lazy loaded routes
const AI_IntelligentAutomation = lazy(() => import('./pages/Servicesprovided/AI_IntelligentAutomation'))
const Embeddedsystemdesign = lazy(() => import('./pages/Servicesprovided/Embeddedsystemdesign'))
const Productprototype_hardwaredevelopment = lazy(() => import('./pages/Servicesprovided/Productprototype_hardwaredevelopment'))
const IoTApplicationDevelopment = lazy(() => import('./pages/Servicesprovided/IoTApplicationDevelopment'))
const IndustrialEnclosure_ProductDesign = lazy(() => import('./pages/Servicesprovided/IndustrialEnclosure_ProductDesign'))
const PCBDesignCircuitDevelopment = lazy(() => import('./pages/Servicesprovided/PCBDesignCircuitDevelopment'))
const SoftwareSolutions = lazy(() => import('./pages/Servicesprovided/SoftwareSolutions'))
const PortalDevelopment = lazy(() => import('./pages/Servicesprovided/Portaldevelopment'))
const Career = lazy(() => import('./pages/Carrer'))

// Minimal loading spinner for Suspense fallback
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center bg-black">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
  </div>
);

const App = () => {
 return (
 <>
 <CustomCursor />
 <RippleBackground />
 <NavBar />
 <ScrollToTop />

 <Suspense fallback={<LoadingFallback />}>
   <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/careers" element={<Career />} />

   {/* Services Routes */}
   <Route path="/services/AI_IntelligentAutomation" element={<AI_IntelligentAutomation />} />
   <Route path="/services/embedded-system-design" element={<Embeddedsystemdesign />} />
   <Route path="/services/product-prototype-hardware-development" element={<Productprototype_hardwaredevelopment />} />
   <Route path="/services/iot-application-development" element={<IoTApplicationDevelopment />} />
   <Route path="/services/IndustrialEnclosure-ProductDesign" element={<IndustrialEnclosure_ProductDesign />} />
   <Route path="/services/pcb-design-circuit-development" element={<PCBDesignCircuitDevelopment />} />
   <Route path="/services/software-solutions" element={<SoftwareSolutions />} />
   <Route path="/services/Portal-development" element={<PortalDevelopment />} />
   
   </Routes>
 </Suspense>
 <Footer />
 </>
 )
}

export default App
