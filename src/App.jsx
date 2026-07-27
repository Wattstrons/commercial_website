import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Front/Navbar'
import CustomCursor from './components/animation/CustomCursor'
import RippleBackground from './components/animation/RippleBackground'
import Footer from './components/Front/Footer'
import Home from './pages/Home'
import ScrollToTop from './components/animation/ScrollToTop'
import AI_IntelligentAutomation from './pages/Servicesprovided/AI_IntelligentAutomation'
import Embeddedsystemdesign from './pages/Servicesprovided/Embeddedsystemdesign'
import Productprototype_hardwaredevelopment from './pages/Servicesprovided/Productprototype_hardwaredevelopment'
import IoTApplicationDevelopment from './pages/Servicesprovided/IoTApplicationDevelopment'
import IndustrialEnclosure_ProductDesign from './pages/Servicesprovided/IndustrialEnclosure_ProductDesign'
import PCBDesignCircuitDevelopment from './pages/Servicesprovided/PCBDesignCircuitDevelopment'
import SoftwareSolutions from './pages/Servicesprovided/SoftwareSolutions'
import PortalDevelopment from './pages/Servicesprovided/Portaldevelopment'
import Career from './pages/Carrer'

const App = () => {
 return (
 <>
 <CustomCursor />
 <RippleBackground />
 <NavBar />
 <ScrollToTop />

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
 <Footer />
 </>
 )
}

export default App
