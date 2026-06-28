import {
  Eye,
  Recycle,
  Laptop,
  Link,
  Share2,
  FileEdit,
  TrendingUp,
  Sparkles,
  ClipboardList,
  PencilRuler,
  Code,
  ShieldCheck,
  Rocket,
  Cpu,
  Wifi,
  Smartphone,
  Server,
  Zap,
  Microscope,
  Database,
  Monitor,
  Settings,
  Lightbulb,
  FileText,
  Network,
  Crosshair,
  Search,
  Package,
  BrainCircuit,
  CircuitBoard,
  Atom,
  BadgeCheck,
  Send,
  PenTool,
  Box,
  Wrench,
  Activity,
  RefreshCw,
  LayoutGrid,
  Route,
  SearchCheck,
  Factory,
  Radio,
  CloudCog,
  LineChart,
  Globe,
  Brain,
  Bot,
  BookOpen,
  Blocks,
  TerminalSquare,
  SearchCode,
  CloudUpload,
  Link2
} from "lucide-react";

import embeddedAboutUsImg from "../assets/ourservice/embeddedaboutus.png";
import iNstinImg from "../assets/ourservice/i_nstin.png";
import iotAboutUsImg from "../assets/ourservice/iotaboutus.png";
import pcbAboutUsImg from "../assets/ourservice/pcbaboutus.png";
import productAboutUsImg from "../assets/ourservice/productaboutus.png";
import aiAboutUsImg from "../assets/ourservice/aiaboutus.png";
import softwareAboutUsImg from "../assets/ourservice/softwareaboutus.png";
import portalAboutUsImg from "../assets/ourservice/portalaboutus.png";
import industrialAboutUsImg from "../assets/ourservice/industrialaboutus.png";
import alanKayImg from "../assets/ourservice/alankay.png";
import mattMullenwegImg from "../assets/ourservice/MattMullenweg.png";
import dieterRamsImg from "../assets/ourservice/DieterRams.png";
import steveJobsImg from "../assets/ourservice/SteveJobs.png";
import stm32Logo from "../assets/icon/stm32.png";
import seekLogo from "../assets/icon/seeklogo.png";
import loraLogo from "../assets/icon/loro.png";
import threeDLogo from "../assets/icon/3d.png";
import henryFordImg from "../assets/ourservice/HenryFord.png";
import stephenHawkingImg from "../assets/ourservice/StephenHawking.jpg";
import edwardBerardImg from "../assets/ourservice/Edward V. Berard,.jpg";

import portal1 from "../assets/servicehero/portal-1.png";
import portal2 from "../assets/servicehero/portal-2.png";
import portal3 from "../assets/servicehero/portal-3.png";

import ai1 from "../assets/servicehero/ai-1.png";
import ai2 from "../assets/servicehero/ai-2.png";
import ai3 from "../assets/servicehero/ai-3.png";

import embedded1 from "../assets/servicehero/embedded-1.png";
import embedded2 from "../assets/servicehero/embedded-2.png";
import embedded3 from "../assets/servicehero/embedded-3.png";

import iot1 from "../assets/servicehero/iot-1.png";
import iot2 from "../assets/servicehero/iot-2.png";
import iot3 from "../assets/servicehero/iot-3.png";

import industrial1 from "../assets/servicehero/industrial-1.png";
import industrial2 from "../assets/servicehero/industrial-2.png";
import industrial3 from "../assets/servicehero/industrial-3.png";

import pcb1 from "../assets/servicehero/pcb-1.png";
import pcb2 from "../assets/servicehero/pcb-2.png";
import pcb3 from "../assets/servicehero/pcb-3.png";

import product1 from "../assets/servicehero/product-1.png";
import product2 from "../assets/servicehero/product-2.png";
import product3 from "../assets/servicehero/product-3.png";

import software1 from "../assets/servicehero/software-1.png";
import software2 from "../assets/servicehero/software-2.png";
import software3 from "../assets/servicehero/software-3.png";

export const PortalDevelopmentData = {
  hero: {
    titleWord1: "Portal",
    titleWord2: "Development",
    subtitle: "Building intelligent portals that connect users, devices, data, and operations through a unified digital experience.",
    backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    backgroundImages: [portal1, portal2, portal3]
  },
  about: {
    sectionTitle: "Smart Portals for Connected Systems",
    sectionSubtitle: "Transforming Device Data into Actionable Insights and Operational Control",
    image: portalAboutUsImg,
    contentTitle: "Centralized Digital Portals",
    contentDesc: "At Wattstrons, we develop custom portals that serve as the central control hub for connected products and intelligent systems. From real-time monitoring and device management to analytics and user administration, our portals provide seamless visibility, control, and decision-making capabilities for businesses and end users.",
    bulletPoints: [
      "Device Monitoring Portals",
      "Management & Control Dashboards",
      "Analytics & Reporting",
      "User & Access Management"
    ]
  },
  techStack: {
    sectionTitle: "Technology Stack",
    sectionSubtitle: "Advanced platforms for device management and operational control.",
    items: [
      { title: "Device Management Portals", desc: "Developing platforms for monitoring, configuring, and managing connected devices." },
      { title: "Real-Time Dashboards", desc: "Creating live dashboards for operational visibility and system monitoring." },
      { title: "Data Visualization", desc: "Transforming complex device data into meaningful charts, reports, and insights." },
      { title: "Alert & Notification Systems", desc: "Implementing real-time alerts, warnings, and event-based notifications." },
      { title: "Remote Device Control", desc: "Enabling secure remote configuration and operational control of connected systems." },
      { title: "User & Role Management", desc: "Building secure multi-user environments with customizable access controls." },
      { title: "Analytics & Reporting", desc: "Providing historical analysis, performance tracking, and business intelligence." },
      { title: "Enterprise Integration", desc: "Connecting portals with ERP, CRM, cloud services, and third-party platforms." }
    ]
  },
  process: {
    header: { title: "Our Process", subtitle: "A structured approach to design, development, and delivering exceptional results" },
    steps: [
      { id: 1, number: "01", icon: ClipboardList, title: "Discover", desc: "Identifying users, workflows, and operational requirements.", gradient: "#00EDC2", details: [] },
      { id: 2, number: "02", icon: PencilRuler, title: "Design", desc: "Creating intuitive portal structures and user experiences.", gradient: "#00EDC2", details: [] },
      { id: 3, number: "03", icon: Code, title: "Integrate", desc: "Connecting devices, data sources, and backend systems.", gradient: "#00EDC2", details: [] },
      { id: 4, number: "04", icon: Smartphone, title: "Visualize", desc: "Building dashboards, analytics, and monitoring capabilities.", gradient: "#00EDC2", details: [] },
      { id: 5, number: "05", icon: CloudUpload, title: "Empower", desc: "Delivering actionable insights and operational control.", gradient: "#00EDC2", details: [] },
    ]
  },
  technologies: {
    sectionTitle: "Technologies",
    logos: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NextJS-Light.svg" },
      { name: "JavaScript", logo: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg" },
      { name: "TypeScript", logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
      { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
      { name: "Python", logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
      { name: "Express.js", logo: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/ExpressJS-Light.svg" },
      { name: "MongoDB", logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
      { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Docker", logo: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
      { name: "MQTT", logo: "https://mqtt.org/assets/img/mqtt-logo-transp.svg" }
    ]
  },
  quotes: [
    { role: "TECHNOLOGIST", name: "Matt Mullenweg", image: mattMullenwegImg, quote: "Technology is best when it brings people together.", bullets: ["Functional Design", "Performance Driven"] },
  ],
  cta: { titlePart1: "Your Next Project", titlePart2: "Starts Here", subtitle: "Let's make it happen.", buttonText: "Connect With Us" }
};

export const AI_IntelligentAutomationData = {
  hero: {
    titleWord1: "AI & Intelligent",
    titleWord2: "Automation",
    subtitle: "Empowering products and systems with intelligent decision-making, automation, and real-time AI capabilities.",
    backgroundImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=2070&q=80",
    backgroundImages: [ai1, ai2, ai3]
  },
  about: {
    sectionTitle: "Intelligence Built Into Every Solution",
    sectionSubtitle: "Developing AI-Powered Systems for Smarter Products and Automation",
    image: aiAboutUsImg,
    contentTitle: "Developing AI-Powered Systems",
    contentDesc: "At Wattstrons, we develop intelligent AI solutions that transform data into actionable insights and automated decisions. From machine learning model development and computer vision systems to Edge AI deployment on embedded devices, we build scalable AI-powered products that enhance efficiency, enable autonomy, and create smarter user experiences.",
    bulletPoints: [
      "AI Model Development",
      "Edge AI Deployment",
      "Computer Vision Solutions",
      "Intelligent Automation"
    ]
  },
  techStack: {
    sectionTitle: "Technology Stack",
    sectionSubtitle: "Advanced methodologies for driving machine intelligence.",
    items: [
      { title: "AI Model Development", desc: "Building machine learning and deep learning models tailored to specific business requirements." },
      { title: "Edge AI Integration", desc: "Deploying optimized AI models on embedded systems, edge devices, and intelligent hardware." },
      { title: "Computer Vision Systems", desc: "Developing image processing, object detection, classification, and visual intelligence solutions." },
      { title: "Predictive Analytics", desc: "Transforming data into forecasts, insights, and intelligent recommendations." },
      { title: "Intelligent Decision Systems", desc: "Creating AI-driven systems capable of autonomous analysis and decision-making." },
      { title: "AI-Powered Product Development", desc: "Integrating artificial intelligence into products, devices, and connected systems." },
      { title: "Data Processing & Optimization", desc: "Preparing, analyzing, and optimizing data pipelines for reliable AI performance." },
      { title: "Automation & Control", desc: "Developing intelligent workflows and automated operational systems powered by AI." }
    ]
  },
  process: {
    header: { title: "Our Process", subtitle: "A structured approach to developing intelligent automation systems" },
    steps: [
      { id: 1, number: "01", icon: FileEdit, title: "Define", desc: "Identifying the problem, objectives, and AI opportunities.", gradient: "#00EDC2", details: [] },
      { id: 2, number: "02", icon: BookOpen, title: "Learn", desc: "Training models using structured and real-world data.", gradient: "#00EDC2", details: [] },
      { id: 3, number: "03", icon: SearchCode, title: "Validate", desc: "Testing accuracy, reliability, and operational performance.", gradient: "#00EDC2", details: [] },
      { id: 4, number: "04", icon: Link, title: "Integrate", desc: "Deploying intelligence into products, applications, and edge devices.", gradient: "#00EDC2", details: [] },
      { id: 5, number: "05", icon: LineChart, title: "Scale", desc: "Expanding capabilities through optimization and continuous learning.", gradient: "#00EDC2", details: [] },
    ]
  },
  technologies: {
    sectionTitle: "Technologies",
    logos: [
      { name: "Python", logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
      { name: "TensorFlow", logo: "https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg" },
      { name: "PyTorch", logo: "https://cdn.worldvectorlogo.com/logos/pytorch-2.svg" },
      { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      { name: "NVIDIA Jetson", logo: "https://cdn.worldvectorlogo.com/logos/nvidia.svg" },
      { name: "Raspberry Pi", logo: "https://cdn.worldvectorlogo.com/logos/raspberry-pi.svg" },
      { name: "STM32", logo: stm32Logo },
      { name: "ESP32", logo: "https://cdn.worldvectorlogo.com/logos/espressif-systems.svg" },
      { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
      { name: "Microsoft Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Google Cloud", logo: "https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg" },
      { name: "Docker", logo: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
      { name: "MongoDB", logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
      { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
      { name: "Linux", logo: "https://cdn.worldvectorlogo.com/logos/linux-tux.svg" },
      { name: "Git", logo: "https://cdn.worldvectorlogo.com/logos/git-icon.svg" }
    ]
  },
  quotes: [
    { role: "THEORETICAL PHYSICIST", name: "Stephen Hawking", image: stephenHawkingImg, quote: "The development of full artificial intelligence could be the greatest event in the history of our civilization.", bullets: ["Artificial Intelligence", "Future of Civilization"] },
  ],
  cta: { titlePart1: "Your Next Project", titlePart2: "Starts Here", subtitle: "Let's make it happen.", buttonText: "Connect With Us" }
};

export const embeddedSystemDesignData = {
  hero: {
    titleWord1: "Embedded System",
    titleWord2: "Design",
    subtitle: "Designing intelligent embedded solutions through custom hardware, firmware, and system-level engineering.",
    backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=2070&q=80",
    backgroundImages: [embedded1, embedded2, embedded3]
  },
  about: {
    sectionTitle: "Embedded Engineering Excellence",
    sectionSubtitle: "Transforming Innovative Ideas into Intelligent Embedded Products",
    image: embeddedAboutUsImg,
    contentTitle: "Building Modern Embedded Systems",
    contentDesc: "At Wattstrons, we specialize in designing and developing intelligent embedded systems that power next-generation products. By combining hardware expertise, firmware development, and system integration, we create reliable, scalable, and high-performance solutions tailored to real-world application",
    bulletPoints: [
      "Custom Hardware Design",
      "	Embedded Firmware Development",
      "Smart System Integration",
      "Product Prototyping & Validation",
    ]
  },
  techStack: {
    sectionTitle: "Embedded Systems Technology Stack",
    sectionSubtitle: "Core technologies powering next-generation embedded solutions.",
    items: [
      { title: "Embedded Hardware Design", desc: "Custom circuit design, component selection, schematic development, and PCB design for reliable products." },
      { title: "Firmware Development", desc: "Development of efficient and optimized firmware for microcontrollers and embedded platforms." },
      { title: "Sensor & Actuator Integration", desc: "Seamless integration of sensors, actuators, displays, and peripheral devices for real-world applications." },
      { title: "Communication Protocols", desc: "Implementation of UART, SPI, I2C, CAN, Modbus, Ethernet, and wireless communication protocols." },
      { title: "RTOS Development", desc: "Development of multitasking embedded applications using FreeRTOS and real-time operating systems." },
      { title: "Wireless Connectivity", desc: "Integration of Wi-Fi, Bluetooth, LoRa, Zigbee, GSM, GPS, and IoT communication technologies." },
      { title: "Embedded Linux Development", desc: "Custom Linux-based solutions for gateways, edge devices, and intelligent embedded platforms." },
      { title: "System Integration & Testing", desc: "Comprehensive validation, debugging, optimization, and performance testing for production-ready systems." }
    ]
  },
  process: {
    header: { title: "Our Process", subtitle: "A structured approach to design, development, and delivering exceptional results" },
    steps: [
      { id: 1, number: "1", icon: Lightbulb, title: "Ideate", desc: "We analyze the vision and define the product strategy.", gradient: "#00EDC2", details: [] },
      { id: 2, number: "2", icon: Cpu, title: "Architect", desc: "We design intelligent hardware and embedded systems.", gradient: "#00EDC2", details: [] },
      { id: 3, number: "3", icon: Sparkles, title: "Innovate", desc: "We develop firmware, integrate technologies, and build prototypes.", gradient: "#00EDC2", details: [] },
      { id: 4, number: "4", icon: BadgeCheck, title: "Perfect", desc: "We validate, optimize, and ensure product reliability.", gradient: "#00EDC2", details: [] },
      { id: 5, number: "5", icon: Rocket, title: "Launch", desc: "We support deployment, production, and long-term growth.", gradient: "#00EDC2", details: [] },
    ]
  },
  technologies: {
    sectionTitle: "Technologies",
    logos: [
      { name: "STM32", logo: stm32Logo },
      { name: "ESP32", logo: "https://cdn.worldvectorlogo.com/logos/espressif-systems.svg" },
      { name: "Arduino", logo: "https://cdn.worldvectorlogo.com/logos/arduino-1.svg" },
      { name: "Raspberry Pi", logo: "https://cdn.worldvectorlogo.com/logos/raspberry-pi.svg" },
      { name: "C", logo: "https://cdn.worldvectorlogo.com/logos/c-1.svg" },
      { name: "C++", logo: "https://cdn.worldvectorlogo.com/logos/c.svg" },
      { name: "Python", logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
      { name: "FreeRTOS", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Logo_freeRTOS.png" },
      { name: "Linux", logo: "https://cdn.worldvectorlogo.com/logos/linux-tux.svg" },
      { name: "MQTT", logo: "https://mqtt.org/assets/img/mqtt-logo-transp.svg" },
      { name: "Bluetooth", logo: "https://cdn.worldvectorlogo.com/logos/bluetooth.svg" },
      { name: "Wi-Fi", logo: "https://cdn.worldvectorlogo.com/logos/wi-fi.svg" },
      { name: "Altium Designer", logo: seekLogo },
      { name: "KiCad", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/KiCad-Logo.svg" },
      { name: "VS Code", logo: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg" },
      { name: "Git", logo: "https://cdn.worldvectorlogo.com/logos/git-icon.svg" }
    ]
  },
  quotes: [
    {  name: "Albert Einstein", image: iNstinImg,  quote: "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.", bullets: [] },
  ],
  cta: { titlePart1: "Your Next Project", titlePart2: "Starts Here", subtitle: "Let's make it happen.", buttonText: "Connect With Us" }
};

export const iotApplicationDevelopmentData = {
  hero: {
    titleWord1: "IoT Application",
    titleWord2: "Service",
    subtitle: "Connecting devices, data, and intelligence to create smarter products and operations.",
    backgroundImage: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=2070&q=80",
    backgroundImages: [iot1, iot2, iot3]
  },
  about: {
    sectionTitle: "Connected Intelligence & Automation",
    sectionSubtitle: "Building Intelligent IoT Solutions for Connected Experiences",
    image: iotAboutUsImg,
    contentTitle: "Building Intelligence & Automation",
    contentDesc: "At Wattstrons, we develop end-to-end IoT solutions that connect devices, sensors, cloud platforms, and applications into a unified ecosystem. From hardware integration and connectivity management to cloud infrastructure and real-time analytics, we help businesses unlock actionable insights, automate operations, and create intelligent connected products that scale with confidence.",
    bulletPoints: [
      "Device & Sensor Integration",
      "IoT Platform Development",
      "Cloud Connectivity & Data Management",
      "Real-Time Monitoring & Automation"
    ]
  },
  techStack: {
    sectionTitle: "Technology Stack",
    sectionSubtitle: "Core technologies powering scalable and secure IoT ecosystems.",
    items: [
      { title: "Connected Device Development", desc: "Designing and integrating smart devices, sensors, gateways, and edge systems." },
      { title: "Device Management Platforms", desc: "Building platforms for device onboarding, provisioning, monitoring, and lifecycle management." },
      { title: "Cloud Infrastructure Development", desc: "Developing scalable cloud backends for data storage, processing, and analytics." },
      { title: "Connectivity & Communication", desc: "Implementing secure communication between devices, gateways, and cloud services." },
      { title: "Real-Time Monitoring Systems", desc: "Building solutions for continuous monitoring, alerts, and operational visibility." },
      { title: "Data Analytics & Insights", desc: "Transforming device data into actionable business intelligence and performance metrics." },
      { title: "Automation & Remote Control", desc: "Developing intelligent workflows for automated actions and remote device operations." }
    ]
  },
  process: {
    header: { title: "Our Process", subtitle: "A structured approach to designing, developing, and scaling IoT ecosystems" },
    steps: [
      { id: 1, number: "01", icon: Radio, title: "Discover", desc: "Defining business goals and connectivity strategy.", gradient: "#00EDC2", details: [] },
      { id: 2, number: "02", icon: Wifi, title: "Connect", desc: "Integrating devices, sensors, and communication networks.", gradient: "#00EDC2", details: [] },
      { id: 3, number: "03", icon: Monitor, title: "Visualize", desc: "Building dashboards, applications, and monitoring systems.", gradient: "#00EDC2", details: [] },
      { id: 4, number: "04", icon: Settings, title: "Automate", desc: "Implementing intelligent workflows and real-time actions.", gradient: "#00EDC2", details: [] },
      { id: 5, number: "05", icon: TrendingUp, title: "Evolve", desc: "Scaling the ecosystem with analytics, AI, and continuous improvements.", gradient: "#00EDC2", details: [] },
    ]
  },
  technologies: {
    sectionTitle: "Technologies",
    logos: [
      { name: "ESP32", logo: "https://cdn.worldvectorlogo.com/logos/espressif-systems.svg" },
      { name: "Arduino", logo: "https://cdn.worldvectorlogo.com/logos/arduino-1.svg" },
      { name: "Raspberry Pi", logo: "https://cdn.worldvectorlogo.com/logos/raspberry-pi.svg" },
      { name: "STM32", logo: stm32Logo },
      { name: "MQTT", logo: "https://mqtt.org/assets/img/mqtt-logo-transp.svg" },
      { name: "Bluetooth", logo: "https://cdn.worldvectorlogo.com/logos/bluetooth.svg" },
      { name: "Wi-Fi", logo: "https://cdn.worldvectorlogo.com/logos/wi-fi.svg" },
      { name: "LoRa", logo: loraLogo },
      { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
      { name: "Microsoft Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Google Cloud", logo: "https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg" },
      { name: "Firebase", logo: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg" },
      { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "MongoDB", logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
      { name: "Python", logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" }
    ]
  },
  quotes: [
    { role: "COMPUTER SCIENTIST", name: "Alan Kay", image: alanKayImg, quote: "The best way to predict the future is to invent it.", bullets: ["Innovation & Design", "Inventing the Future"] },
  ],
  cta: { titlePart1: "Your Next Project", titlePart2: "Starts Here", subtitle: "Let's make it happen.", buttonText: "Connect With Us" }
};

export const IndustrialEnclosureProductDesignData = {
  hero: {
    titleWord1: "Industrial Enclosure &",
    titleWord2: "Product Design",
    subtitle: "Designing durable, functional, and production-ready enclosures that transform electronics into real-world products.",
    backgroundImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=2070&q=80",
    backgroundImages: [industrial1, industrial2, industrial3]
  },
  about: {
    sectionTitle: "Engineering Products Beyond Electronics",
    sectionSubtitle: "Creating Mechanical Designs Built for Performance, Protection, and Production",
    image: industrialAboutUsImg,
    contentTitle: "Product Ready Enclosures",
    contentDesc: "At Wattstrons, we design and develop custom industrial enclosures and product housings that combine functionality, aesthetics, and durability. From concept design and 3D modeling to prototype fabrication and production-ready solutions, we create enclosures engineered for protection, thermal efficiency, manufacturability, and seamless integration with electronic systems.",
    bulletPoints: [
      "Product Enclosure Design",
      "3D CAD Modeling",
      "Thermal & Structural Optimization",
      "Prototype Fabrication"
    ]
  },
  techStack: {
    sectionTitle: "Technology Stack",
    sectionSubtitle: "Powerful tools for mechanical engineering and prototyping.",
    items: [
      { title: "Product Concept Design", desc: "Transforming product ideas into practical and manufacturable designs." },
      { title: "Industrial Enclosure Engineering", desc: "Designing robust enclosures for industrial, commercial, and consumer applications." },
      { title: "3D Modeling & CAD Design", desc: "Creating detailed mechanical models and engineering drawings." },
      { title: "Sheet Metal & Plastic Design", desc: "Developing manufacturing-ready designs for metal and molded plastic enclosures." },
      { title: "Thermal Management Design", desc: "Optimizing airflow, heat dissipation, and thermal performance." },
      { title: "IP-Rated Enclosure Development", desc: "Designing protective enclosures for challenging environmental conditions." },
      { title: "Prototype Fabrication", desc: "Producing and validating physical enclosure prototypes." },
      { title: "Manufacturing & Production Support", desc: "Preparing engineering files and documentation for fabrication and assembly." }
    ]
  },
  process: {
    header: { title: "Our Process", subtitle: "A structured approach to design, development, and delivering exceptional results" },
    steps: [
      { id: 1, number: "01", icon: BookOpen, title: "Concept", desc: "Defining product vision, requirements, and industrial design goals.", gradient: "#00EDC2", details: [] },
      { id: 2, number: "02", icon: PenTool, title: "Engineer", desc: "Designing the enclosure structure, mounting systems, and mechanical architecture.", gradient: "#00EDC2", details: [] },
      { id: 3, number: "03", icon: Wrench, title: "Refine", desc: "Optimizing ergonomics, thermal performance, and manufacturability.", gradient: "#00EDC2", details: [] },
      { id: 4, number: "04", icon: Eye, title: "Validate", desc: "Building prototypes and verifying design performance.", gradient: "#00EDC2", details: [] },
      { id: 5, number: "05", icon: Factory, title: "Realize", desc: "Delivering fabrication-ready designs for production.", gradient: "#00EDC2", details: [] },
    ]
  },
  technologies: {
    sectionTitle: "Technologies",
    logos: [
      { name: "SolidWorks", logo: "https://cdn.worldvectorlogo.com/logos/solidworks.svg" },
      { name: "AutoCAD", logo: "https://img.icons8.com/color/512/autocad.png" },
      { name: "CATIA", logo: "https://upload.wikimedia.org/wikipedia/commons/6/60/DS-CATIA-Logo.png" },
      { name: "Blender", logo: "https://cdn.worldvectorlogo.com/logos/blender-2.svg" },
      { name: "KeyShot", logo: "https://avatars.githubusercontent.com/u/11883584?s=200&v=4" },
      { name: "3D Printing", logo: threeDLogo },
      { name: "CNC Machining", logo: "https://cdn.worldvectorlogo.com/logos/autodesk.svg" }
    ]
  },
  quotes: [
    { role: "INDUSTRIAL DESIGNER", name: "Dieter Rams", image: dieterRamsImg, quote: "Industrial design is the art of making products usable, useful, and desirable.", bullets: ["Usability & Utility", "Desirable Product Design"] },
  ],
  cta: { titlePart1: "Your Next Project", titlePart2: "Starts Here", subtitle: "Let's make it happen.", buttonText: "Connect With Us" }
};

export const pcbDesignCircuitDevelopmentData = {
  hero: {
    titleWord1: "PCB Design &",
    titleWord2: "Circuit Development",
    subtitle: "Transforming concepts into reliable, manufacturable electronic hardware through precision circuit and PCB engineering.",
    backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=2070&q=80",
    backgroundImages: [pcb1, pcb2, pcb3]
  },
  about: {
    sectionTitle: "Precision Hardware Engineering",
    sectionSubtitle: "Designing Robust Electronic Circuits for Next-Generation Products",
    image: pcbAboutUsImg,
    contentTitle: "Building Hardware Engineering",
    contentDesc: "At Wattstrons, we provide end-to-end PCB design and circuit development services for embedded systems, IoT devices, industrial automation, and consumer electronics. From schematic design and component selection to multilayer PCB layout and prototype validation, we engineer reliable hardware solutions optimized for performance, manufacturability, and scalability.",
    bulletPoints: [
      "Circuit Design & Simulation",
      "PCB Layout & Optimization",
      "Component Selection & BOM Engineering",
      "Prototype Validation & Testing"
    ]
  },
  techStack: {
    sectionTitle: "Technology Stack",
    sectionSubtitle: "Advanced hardware engineering processes and methodologies.",
    items: [
      { title: "Circuit Design & Schematic Development", desc: "Creating complete electronic circuit architectures based on product requirements." },
      { title: "Multilayer PCB Design", desc: "Developing optimized PCB layouts for compact, high-performance electronic systems." },
      { title: "High-Speed Signal Routing", desc: "Implementing routing strategies for signal integrity and electromagnetic compatibility." },
      { title: "Power Supply Design", desc: "Engineering efficient power management, battery systems, and voltage regulation circuits." },
      { title: "Design Verification & Simulation", desc: "Performing electrical simulations and validation to ensure reliable operation." },
      { title: "Manufacturing Support", desc: "Preparing production-ready design files, documentation, and fabrication support." }
    ]
  },
  process: {
    header: { title: "Our Process", subtitle: "A structured approach to hardware engineering and circuit design" },
    steps: [
      { id: 1, number: "01", icon: FileText, title: "Product Definition", desc: "Understanding application requirements and system objectives.", gradient: "#00EDC2", details: [] },
      { id: 2, number: "02", icon: Network, title: "Circuit Engineering", desc: "Designing schematics and selecting optimal electronic components.", gradient: "#00EDC2", details: [] },
      { id: 3, number: "03", icon: CircuitBoard, title: "PCB Design & Optimization", desc: "Creating production-ready PCB layouts with performance-focused routing.", gradient: "#00EDC2", details: [] },
      { id: 4, number: "04", icon: ShieldCheck, title: "Verification & Testing", desc: "Validating hardware through simulation, prototype testing, and debugging.", gradient: "#00EDC2", details: [] },
      { id: 5, number: "05", icon: Package, title: "Production Readiness", desc: "Delivering fabrication files, assembly packages, and manufacturing support.", gradient: "#00EDC2", details: [] },
    ]
  },
  technologies: {
    sectionTitle: "Technologies",
    logos: [
      { name: "Altium Designer", logo: seekLogo },
      { name: "KiCad", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/KiCad-Logo.svg" },
      { name: "EasyEDA", logo: "https://github.com/easyeda.png" },
      { name: "MATLAB", logo: "https://cdn.worldvectorlogo.com/logos/matlab.svg" },
      { name: "Git", logo: "https://cdn.worldvectorlogo.com/logos/git-icon.svg" },
      { name: "Linux", logo: "https://cdn.worldvectorlogo.com/logos/linux-tux.svg" }
    ]
  },
  quotes: [
    { role: "VISIONARY", name: "Steve Jobs", image: steveJobsImg, quote: "Design is not just what it looks like and feels like. Design is how it works.", bullets: ["Functional Design", "Performance Driven"] },
  ],
  cta: { titlePart1: "Your Next Project", titlePart2: "Starts Here", subtitle: "Let's make it happen.", buttonText: "Connect With Us" }
};

export const productPrototypeHardwareDevelopmentData = {
  hero: {
    titleWord1: "Product Prototyping &",
    titleWord2: "Hardware Development",
    subtitle: "Building proof-of-concept prototypes that lay the foundation for successful products.",
    backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=2070&q=80",
    backgroundImages: [product1, product2, product3]
  },
  about: {
    sectionTitle: "From Concept to Working Prototype",
    sectionSubtitle: "Accelerating Product Innovation Through Rapid Hardware Development",
    image: productAboutUsImg,
    contentTitle: "Building Working Prototypes",
    contentDesc: "At Wattstrons, we help businesses, startups, and innovators transform ideas into tangible products through comprehensive prototyping and hardware development services. From concept validation and electronic design to prototype fabrication and testing, we build reliable hardware solutions that reduce development risks, accelerate innovation, and prepare products for real-world deployment.",
    bulletPoints: [
      "Concept Validation & Feasibility",
      "Rapid Prototype Development",
      "Hardware & Electronics Development",
      "Testing & Product Refinement"
    ]
  },
  techStack: {
    sectionTitle: "Technology Stack",
    sectionSubtitle: "Tools and methodologies for rapid product iteration.",
    items: [
      { title: "Product Concept Development", desc: "Transforming ideas into structured product requirements and technical specifications." },
      { title: "Electronic Hardware Design", desc: "Developing custom electronic systems, circuits, and embedded hardware platforms." },
      { title: "Prototype Fabrication", desc: "Building functional prototypes for proof-of-concept and real-world validation." },
      { title: "Sensor & Component Integration", desc: "Integrating sensors, displays, wireless modules, and peripheral devices." },
      { title: "Embedded Firmware Development", desc: "Developing firmware that powers and controls hardware functionality." },
      { title: "Mechanical & Enclosure Integration", desc: "Designing product enclosures and ensuring seamless hardware integration." },
      { title: "Testing & Performance Validation", desc: "Evaluating reliability, functionality, and product readiness through rigorous testing." },
      { title: "Production Preparation", desc: "Preparing products for manufacturing, assembly, and large-scale deployment." }
    ]
  },
  process: {
    header: { title: "Our Process", subtitle: "A structured approach to iterative hardware prototyping" },
    steps: [
      { id: 1, number: "01", icon: Search, title: "Vision", desc: "Converting ideas into a clear product roadmap.", gradient: "#00EDC2", details: [] },
      { id: 2, number: "02", icon: PencilRuler, title: "Design", desc: "Engineering the hardware architecture and system foundation.", gradient: "#00EDC2", details: [] },
      { id: 3, number: "03", icon: Blocks, title: "Build", desc: "Developing working prototypes and proof-of-concept models.", gradient: "#00EDC2", details: [] },
      { id: 4, number: "04", icon: Microscope, title: "Validate", desc: "Testing functionality, reliability, and user requirements.", gradient: "#00EDC2", details: [] },
      { id: 5, number: "05", icon: Send, title: "Deliver", desc: "Preparing production-ready solutions for commercialization.", gradient: "#00EDC2", details: [] },
    ]
  },
  technologies: {
    sectionTitle: "Technologies",
    logos: [
      { name: "STM32", logo: stm32Logo },
      { name: "ESP32", logo: "https://cdn.worldvectorlogo.com/logos/espressif-systems.svg" },
      { name: "Arduino", logo: "https://cdn.worldvectorlogo.com/logos/arduino-1.svg" },
      { name: "Raspberry Pi", logo: "https://cdn.worldvectorlogo.com/logos/raspberry-pi.svg" },
      { name: "Altium Designer", logo: seekLogo },
      { name: "KiCad", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/KiCad-Logo.svg" },
      { name: "EasyEDA", logo: "https://github.com/easyeda.png" },
      { name: "C", logo: "https://cdn.worldvectorlogo.com/logos/c-1.svg" },
      { name: "C++", logo: "https://cdn.worldvectorlogo.com/logos/c.svg" },
      { name: "Python", logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
      { name: "MATLAB", logo: "https://cdn.worldvectorlogo.com/logos/matlab.svg" },
      { name: "Linux", logo: "https://cdn.worldvectorlogo.com/logos/linux-tux.svg" },
      { name: "Git", logo: "https://cdn.worldvectorlogo.com/logos/git-icon.svg" }
    ]
  },
  quotes: [
    { role: "INDUSTRIALIST", name: "Henry Ford", image: henryFordImg, quote: "Nothing is particularly hard if you divide it into small jobs.", bullets: ["Efficiency & Process", "Concept Validation"] },
  ],
  cta: { titlePart1: "Your Next Project", titlePart2: "Starts Here", subtitle: "Let's make it happen.", buttonText: "Connect With Us" }
};

export const softwareSolutionsData = {
  hero: {
    titleWord1: "Software",
    titleWord2: "Solutions",
    subtitle: "Developing intelligent software platforms that power devices, automation systems, and connected operations.",
    backgroundImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=2070&q=80",
    backgroundImages: [software1, software2, software3]
  },
  about: {
    sectionTitle: "Software That Powers Smart Systems",
    sectionSubtitle: "Building Reliable Software for Hardware, Automation, and Industrial Applications",
    image: softwareAboutUsImg,
    contentTitle: "Scalable Enterprise Software",
    contentDesc: "At Wattstrons, we develop custom software solutions that seamlessly connect hardware, devices, and operational systems. From industrial automation software and monitoring platforms to device management systems and backend infrastructure, we create scalable solutions that improve efficiency, enable real-time visibility, and support intelligent decision-making.",
    bulletPoints: [
      "Device Management Platforms",
      "Industrial & Automation Systems",
      "Monitoring & Control Dashboards",
      "Backend & System Integration"
    ]
  },
  techStack: {
    sectionTitle: "Technology Stack",
    sectionSubtitle: "Full-stack expertise for robust digital products.",
    items: [
      { title: "Device Control Software", desc: "Developing applications for configuration, monitoring, and remote management of hardware devices." },
      { title: "Industrial Automation Systems", desc: "Building software that automates processes, workflows, and operational activities." },
      { title: "Monitoring & Visualization Platforms", desc: "Creating dashboards and interfaces for real-time system monitoring and analytics." },
      { title: "Backend System Development", desc: "Developing secure and scalable backend services that support connected ecosystems." },
      { title: "API & System Integration", desc: "Connecting devices, software platforms, and third-party services through seamless integrations." },
      { title: "Data Processing & Management", desc: "Handling operational data collection, storage, and analysis for informed decision-making." },
      { title: "Workflow Automation", desc: "Designing intelligent software workflows that improve productivity and reduce manual effort." }
    ]
  },
  process: {
    header: { title: "Our Process", subtitle: "A structured approach to custom software engineering" },
    steps: [
      { id: 1, number: "01", icon: Activity, title: "Analyze", desc: "Understanding operational challenges, workflows, and software requirements.", gradient: "#00EDC2", details: [] },
      { id: 2, number: "02", icon: TerminalSquare, title: "Design", desc: "Defining software architecture, user flows, and system integrations.", gradient: "#00EDC2", details: [] },
      { id: 3, number: "03", icon: Laptop, title: "Develop", desc: "Building robust applications, backend services, and control systems.", gradient: "#00EDC2", details: [] },
      { id: 4, number: "04", icon: Link2, title: "Integrate", desc: "Connecting software with devices, platforms, and business systems.", gradient: "#00EDC2", details: [] },
      { id: 5, number: "05", icon: Recycle, title: "Optimize", desc: "Enhancing performance, reliability, and long-term scalability.", gradient: "#00EDC2", details: [] },
    ]
  },
  technologies: {
    sectionTitle: "Technologies",
    logos: [
      { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
      { name: "Python", logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
      { name: "Java", logo: "https://cdn.worldvectorlogo.com/logos/java-4.svg" },
      { name: ".NET", logo: "https://cdn.worldvectorlogo.com/logos/dot-net-core-7.svg" },
      { name: "MongoDB", logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Redis", logo: "https://cdn.worldvectorlogo.com/logos/redis.svg" },
      { name: "Neo4j", logo: "https://cdn.worldvectorlogo.com/logos/neo4j.svg" },
      { name: "Docker", logo: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
      { name: "Linux", logo: "https://cdn.worldvectorlogo.com/logos/linux-tux.svg" },
      { name: "Git", logo: "https://cdn.worldvectorlogo.com/logos/git-icon.svg" },
      { name: "MQTT", logo: "https://mqtt.org/assets/img/mqtt-logo-transp.svg" }
    ]
  },
  quotes: [
    { role: "SOFTWARE ENGINEER", name: "Edward V. Berard", image: edwardBerardImg, quote: "Walking on water and developing software from a specification are easy if both are frozen.", bullets: ["Agile Development", "Adaptability"] },
  ],
  cta: { titlePart1: "Your Next Project", titlePart2: "Starts Here", subtitle: "Let's make it happen.", buttonText: "Connect With Us" }
};

