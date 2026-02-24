import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trophy, Terminal, Calendar, ShieldAlert, Cpu, Code2, Globe, Users, Zap, ExternalLink, Github, Twitter, Linkedin, Menu, X } from 'lucide-react';
import bwu from "./assets/bwulogo.png"
import Countdown from './components/Countdown';
import Team from './components/Team';
import Gallery from './components/Gallery';
import tech from "./assets/techclub-iic.jpg"
// Fallback for the BWU logo to ensure the code runs here. 
// Replace this with: import bwu from "./assets/bwulogo.png" in your local project.

// --- CUSTOM STYLES FOR GLITCH & SCROLLBAR ---
const GlobalStyles = () => (
  <style>{`
    :root {
      --neon-green: #00ff00;
      --dark-green: #0a1f0a;
    }
    body {
      background-color: #030303;
      color: #ffffff;
      overflow-x: hidden;
      cursor: none; /* Hide default cursor for custom one */
    }
    /* Re-enable default cursor and touch interactions on touch devices */
    @media (pointer: coarse) {
      body {
        cursor: auto;
      }
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #000;
    }
    ::-webkit-scrollbar-thumb {
      background: #00ff00;
      border-radius: 10px;
    }
    
    .glitch-text {
      position: relative;
    }
    .glitch-text::before, .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.8;
      word-break: break-word;
    }
    .glitch-text::before {
      left: 2px;
      text-shadow: -2px 0 #00ff00;
      clip: rect(24px, 550px, 90px, 0);
      animation: glitch-anim 3s infinite linear alternate-reverse;
    }
    .glitch-text::after {
      left: -2px;
      text-shadow: -2px 0 #00aa00;
      clip: rect(85px, 550px, 140px, 0);
      animation: glitch-anim 2.5s infinite linear alternate-reverse;
    }
    @keyframes glitch-anim {
      0% { clip: rect(10px, 9999px, 44px, 0); }
      20% { clip: rect(80px, 9999px, 12px, 0); }
      40% { clip: rect(33px, 9999px, 88px, 0); }
      60% { clip: rect(98px, 9999px, 21px, 0); }
      80% { clip: rect(14px, 9999px, 75px, 0); }
      100% { clip: rect(62px, 9999px, 50px, 0); }
    }
    
    .scanline {
      width: 100%;
      height: 100px;
      z-index: 50;
      position: absolute;
      pointer-events: none;
      background: linear-gradient(0deg, rgba(0,255,0,0) 0%, rgba(0,255,0,0.1) 50%, rgba(0,255,0,0) 100%);
      opacity: 0.1;
      animation: scanline 8s linear infinite;
    }
    @keyframes scanline {
      0% { top: -100px; }
      100% { top: 100%; }
    }
    
    .glass-panel {
      background: rgba(10, 30, 10, 0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 255, 0, 0.15);
      box-shadow: 0 0 30px rgba(0, 255, 0, 0.05) inset;
    }
  `}</style>
);

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device to disable custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a' || e.target.closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-green-500 rounded-full pointer-events-none z-100 mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 border border-green-500/30 rounded-full pointer-events-none z-99 shadow-[0_0_20px_rgba(0,255,0,0.3)] hidden md:block"
        animate={{
          x: mousePosition.x - 48,
          y: mousePosition.y - 48,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
};

// --- 3D PARTICLE NETWORK BACKGROUND (Raw Canvas for performance) ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 3D Sphere generation
    const nodeCount = window.innerWidth < 768 ? 75 : 150; // Less particles on mobile for performance
    const radius = Math.min(canvas.width, canvas.height) * 0.4;

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);

      particles.push({
        x3d: radius * Math.sin(phi) * Math.cos(theta),
        y3d: radius * Math.sin(phi) * Math.sin(theta),
        z3d: radius * Math.cos(phi),
        size: Math.random() * 2 + 1,
        baseColor: `rgba(0, 255, 0, ${Math.random() * 0.5 + 0.2})`
      });
    }

    let rotationX = 0;
    let rotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - canvas.width / 2) * 0.0005;
      mouseY = (e.clientY - canvas.height / 2) * 0.0005;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = 'rgba(3, 3, 3, 0.2)'; // Trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rotationX += 0.002 + mouseY;
      rotationY += 0.003 + mouseX;

      const projectedNodes = [];

      // Rotate and Project
      particles.forEach((p) => {
        // Rotate X
        let y1 = p.y3d * Math.cos(rotationX) - p.z3d * Math.sin(rotationX);
        let z1 = p.y3d * Math.sin(rotationX) + p.z3d * Math.cos(rotationX);

        // Rotate Y
        let x2 = p.x3d * Math.cos(rotationY) + z1 * Math.sin(rotationY);
        let z2 = -p.x3d * Math.sin(rotationY) + z1 * Math.cos(rotationY);

        const fov = 400;
        const scale = fov / (fov + z2);

        const xProj = (x2 * scale) + (canvas.width / 2);
        const yProj = (y1 * scale) + (canvas.height / 2);

        projectedNodes.push({ x: xProj, y: yProj, z: z2, scale: scale, color: p.baseColor, size: p.size });
      });

      // Sort by Z to draw distant nodes first
      projectedNodes.sort((a, b) => b.z - a.z);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const dx = projectedNodes[i].x - projectedNodes[j].x;
          const dy = projectedNodes[i].y - projectedNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80 * projectedNodes[i].scale) {
            const opacity = (1 - (dist / (80 * projectedNodes[i].scale))) * 0.3;
            ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(projectedNodes[i].x, projectedNodes[i].y);
            ctx.lineTo(projectedNodes[j].x, projectedNodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projectedNodes.forEach((node) => {
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff00';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * node.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-60 pointer-events-none" />;
};

// --- COMPONENTS ---

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let timeout;
    let currentIndex = 0;

    const startTyping = () => {
      timeout = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(timeout);
        }
      }, 50);
    };

    const initialDelay = setTimeout(startTyping, delay);
    return () => {
      clearTimeout(initialDelay);
      clearInterval(timeout);
    };
  }, [text, delay]);

  return (
    <span className="font-mono text-green-400">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-5 sm:h-6 bg-green-500 ml-1 align-middle"
      />
    </span>
  );
};

const MagneticButton = ({ children, onClick }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current || window.innerWidth < 768) return; // Disable magnetic effect on mobile
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className="interactive relative group overflow-hidden px-6 py-3 sm:px-8 sm:py-4 bg-green-500/10 border border-green-500 text-green-400 font-bold uppercase tracking-widest rounded-sm transition-colors duration-300 hover:bg-green-500 hover:text-black hover:shadow-[0_0_30px_#00ff00] text-sm sm:text-base w-full sm:w-auto"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
    </motion.button>
  );
};

const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return; // Disable tilt on mobile
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX(((y - centerY) / centerY) * -10);
    setRotateY(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000 }}
      className={`glass-panel interactive p-6 sm:p-8 rounded-xl border border-green-500/20 hover:border-green-500/50 transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- SECTIONS ---

const HeroSection = () => {
  return (
    <section className="relative min-h-[102vh] flex items-center justify-center pt-24 sm:pt-20 overflow-hidden z-10">
      <div className="scanline"></div>

      <div className="text-center z-20 max-w-5xl px-4 sm:px-6 relative w-full">
        {/* Floating Code Snippets */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 font-mono text-xs text-green-500/40 hidden lg:block text-left"
        >
          {`function hack(sys) {
  if (sys.vulnerable) {
    return sys.bypass();
  }
}`}
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 -right-20 font-mono text-xs text-green-500/40 hidden lg:block text-left"
        >
          {`while(true) {
  solve(problem);
  rank++;
}`}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8 sm:mb-6 inline-block px-4 py-2 border border-green-500/50 rounded-xl sm:rounded-full bg-green-500/10 text-green-400 font-mono text-[11px] sm:text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,0,0.2)] max-w-full"
        >
          <span className="text-center block leading-relaxed sm:leading-none wrap-break-word">Organize by Brainware university CSS Department</span>
        </motion.div>

        {/* Responsive text sizing instead of vw to prevent horizontal scroll on long words */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 uppercase tracking-tighter text-white leading-[1.2] sm:leading-none flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-y-2 md:gap-x-4 w-full wrap-break-word">
          <span className="glitch-text inline-block break-all sm:break-normal" data-text="Binary">Binary</span>
          <span className="glitch-text inline-block break-all sm:break-normal" data-text="Battleground">Battleground</span>
          <span className="glitch-text inline-block" data-text="2K26">2K26</span>
        </h1>
        <div className="h-12 sm:h-8 mb-10 text-5xl sm:text-xl md:text-2xl sm:mt-0 px-4 ">
          <span className='text-5xl font-bold text-green-500'>13 MARCH</span>
        </div>

        <div className="h-12 sm:h-8 mb-10 text-sm sm:text-xl md:text-2xl mt-4 sm:mt-0 px-4">
          <TypewriterText text='"Code. Compile. Conquer."' delay={1500} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 3, type: "spring" }}
          className="px-4"
        >
          <MagneticButton onClick={() => alert("Registration Initialized...")}>
            Register Now
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-green-500/50 hidden sm:block"
        >
          <ChevronDown size={32} />
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section className="py-20 sm:py-24 relative z-10 container mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-widest"><span className="text-green-500">_</span>System.Info</h2>
        <div className="w-16 sm:w-24 h-1 bg-green-500 mx-auto rounded shadow-[0_0_10px_#00ff00]"></div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { icon: <Code2 size={40} />, title: "Competitive Challenges", desc: "Algorithmic puzzles designed to test the limits of your logic." },
          { icon: <Globe size={40} />, title: "Real-time Leaderboard", desc: "Watch your rank update dynamically as you compile and conquer." },
          { icon: <Cpu size={40} />, title: "Industry Level", desc: "Problems crafted by senior engineers from top tech conglomerates." },
          { icon: <Trophy size={40} />, title: "Certificates & Prizes", desc: "Massive prize pool, exclusive merch, and verified certificates." }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, z: -100, rotateX: 20, scale:0.80 }}
            whileInView={{ opacity: 1, z: 0, rotateX: 0 , scale:1}}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="h-full"
          >
            <TiltCard className="h-full flex flex-col items-center text-center group">
              <div className="mb-4 sm:mb-6 p-4 rounded-full bg-black border border-green-500/30 text-green-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_#00ff00] transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">{item.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{item.desc}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const TimelineSection = () => {
  const steps = [
    { title: "Registration Opens", date: " February 25, 2026", desc: "Secure your spot in the mainframe." },
    { title: "Registration Close", date: "March 10, 2026", desc: "Register yourself before you miss the date" },
    { title: "1st Round", date: "March 13", desc: "Top 20 player will select for next round." },
    { title: "2nd Round", date: "March 13, 2026", desc: "The great filter. Top 10 advance student." },
    { title: "Final Round", date: "March 13, 2026", desc: "Select top 3 Depend on total score" },
    { title: "Winner Announcement", date: "March 13, 2026", desc: " Price distribution End closing ceremony" }
  ];

  return (
    <section className="py-20 sm:py-24 relative z-10 container mx-auto px-4 sm:px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-widest"><span className="text-green-500">_</span>Execution.Timeline</h2>
      </div>

      <div className="max-w-3xl mx-auto relative overflow-hidden sm:overflow-visible">
        {/* Vertical Line */}
        <div className="absolute left-4.75 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-900 md:-translate-x-1/2 z-0"></div>

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`relative z-10 flex flex-col md:flex-row items-start md:items-center mb-10 sm:mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? 'pl-12' : 'pr-12 text-right'}`}>
              <div className="glass-panel p-6 rounded-lg inline-block w-full">
                <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                <p className="text-green-400 font-mono text-sm mb-2">{step.date}</p>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            </div>

            {/* Glowing Node */}
            <motion.div
              whileInView={{ boxShadow: "0 0 20px 5px rgba(0,255,0,0.5)", backgroundColor: "#00ff00" }}
              viewport={{ once: false, margin: "-50%" }}
              className="w-10 h-10 rounded-full bg-black border-2 border-green-500 absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center shrink-0 transition-colors duration-500"
            >
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </motion.div>

            {/* Mobile Content */}
            <div className="md:hidden pl-14 w-full">
              <div className="glass-panel p-5 rounded-lg w-full">
                <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                <p className="text-green-400 font-mono text-sm mb-2">{step.date}</p>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const RulesSection = () => {
  return (
    <>
      <h1 className='text-5xl text-center font-extrabold text-green-500 '>RULE</h1>
      <section className="py-10 sm:py-5 relative  z-10 container mx-auto px-4 sm:px-6 flex   justify-center">

        <div className="w-full max-w-4xl">
          <motion.div
                initial={{ opacity: 0, scale: 0.80 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="bg-black/80 rounded-xl overflow-hidden border border-green-500/40 shadow-[0_0_30px_rgba(0,255,0,0.1)] relative"
          >
            {/* Terminal Header */}
            <div className="bg-green-900/30 px-3 py-2 sm:px-4 flex items-center border-b border-green-500/40">
              <div className="flex space-x-1.5 sm:space-x-2 shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto text-green-500/70 font-mono text-[10px] sm:text-xs md:text-sm flex items-center overflow-hidden whitespace-nowrap px-2">
                <Terminal size={14} className="mr-1.5 sm:mr-2 shrink-0" /> root@bainary-battleground:~
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-6 md:p-8 font-mono text-green-400 text-[13px]  sm:text-sm md:text-base leading-relaxed overflow-x-auto w-full">
              <p className="mb-4 text-gray-500">Initializing environment variables...</p>
              <p className="mb-2"><span className="text-blue-400">const</span> EVENT_CONFIG = {'{'}</p>
              <ul className="pl-4 sm:pl-6 mb-2 space-y-2 whitespace-nowrap sm:whitespace-norma">
                <li><span className="text-white">Date:</span> <span className="text-yellow-300">"13 March"</span>,</li>
                <li><span className="text-white">Duration:</span> <span className="text-yellow-300">"10 AM - 5 PM"</span>,</li>
                <li><span className="text-white">Platform:</span> <span className="text-yellow-300">"HackerRank"</span>,</li>
                <li><span className="text-white">Languages:</span> [<span className="text-yellow-300">"C", "C++", C# ,"Java", "Python", "Javascript"</span>],</li>
                <li><span className="text-white">Eligibility:</span> <span className="text-yellow-300">The competition is open to all students of BCA and MCA in Brainware University</span>,</li>
                <li><span className="text-white">Internet_Allowed:</span> <span className="text-red-400">false</span>,</li>
                <li><span className="text-white">Team_Format:</span> <span className="text-yellow-300">"Individual"</span>,</li>
                <li><span className="text-white">Plagiarism_Check:</span> <span className="text-red-400">"Strict"</span></li>
              </ul>
              <p className="mb-4">{'}'};</p>

              <p className="mb-2 text-gray-500 wrap-break-word whitespace-normal">// Warning: Breach of protocol results in immediate disqualification.</p>
              <div className="flex">
                <span className="text-green-500 mr-2">{'>'}</span>
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                  className="w-1.5 sm:w-2 h-4 sm:h-5 bg-green-500 inline-block align-middle"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="sm:py-7 relative mb-4  z-10 container mx-auto px-4 sm:px-6 flex   justify-center">

        <div className="w-full max-w-4xl">
          <motion.div
               initial={{ opacity: 0, scale: 0.80 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="bg-black/80 rounded-xl overflow-hidden border border-green-500/40 shadow-[0_0_30px_rgba(0,255,0,0.1)] relative"
          >
            {/* Terminal Header */}
            <div className="bg-green-900/30 px-3 py-2 sm:px-4 flex items-center border-b border-green-500/40">
              <div className="flex space-x-1.5 sm:space-x-2 shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto text-green-500/70 font-mono text-[10px] sm:text-xs md:text-sm flex items-center overflow-hidden whitespace-nowrap px-2">
                <Terminal size={14} className="mr-1.5 sm:mr-2 shrink-0" /> root@bainary-battleground:~
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-6 md:p-8 font-mono text-green-400 text-[13px] sm:text-sm md:text-base leading-relaxed overflow-x-auto w-full">
              <p className="mb-4 text-gray-500">Initializing environment variables...</p>
              <p className="mb-2"><span className="text-blue-400">const</span> EVENT_PROGRESSION_SCHEME = {'{'}</p>
              <p className='text-yellow-300'>In every round, the participants of that round can attempt to solve as many of the problem statements as possible, on successful satisfaction of all the test cases the participants will receive all allotted points for that problem statement. In case of partial satisfaction of the test cases, the participants will receive partial points.
                The winners of each round will be determined by the leaderboard positions for that round:
                <br />
                <span className='font-bold text-amber-500'> ●	The top 20 participants from the first round will move on to the second round.</span> <br />
                <span className='font-bold text-amber-500'>●	The top 10 participants from the second round will move on to the final round.</span> <br />
                <span className='font-bold text-amber-500'>●	The top 3 participants from the final round will be declared the winners.</span> <br />

                If in any round multiple participants obtain the same number of points, then the tie is broken by the total time taken to submit the last solution resulting in higher points. In extreme cases a short viva conducted by the coordinators may be used to determine the winner in a tiebreaker.
              </p>
              <p className="mb-4">{'}'};</p>

              <p className="mb-2 text-gray-500 wrap-break-word whitespace-normal">// Warning: Breach of protocol results in immediate disqualification.</p>
              <div className="flex">
                <span className="text-green-500 mr-2">{'>'}</span>
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                  className="w-1.5 sm:w-2 h-4 sm:h-5 bg-green-500 inline-block align-middle"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className=" sm:py-7 relative z-10 container mx-auto px-4 sm:px-6 flex   justify-center">

        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.80, translateY:100 }}
            whileInView={{ opacity: 1, scale: 1 ,translateY:0}}
            viewport={{ once: false }}
            className="bg-black/80 rounded-xl overflow-hidden border border-green-500/40 shadow-[0_0_30px_rgba(0,255,0,0.1)] relative"
          >
            {/* Terminal Header */}
            <div className="bg-green-900/30 px-3 py-2 sm:px-4 flex items-center border-b border-green-500/40">
              <div className="flex space-x-1.5 sm:space-x-2 shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto text-green-500/70 font-mono text-[10px] sm:text-xs md:text-sm flex items-center overflow-hidden whitespace-nowrap px-2">
                <Terminal size={14} className="mr-1.5 sm:mr-2 shrink-0" /> root@bainary-battleground:~
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-6 md:p-8 font-mono text-green-400 text-[13px] sm:text-sm md:text-base leading-relaxed overflow-x-auto w-full">
              <p className="mb-4 text-gray-500">Initializing environment variables...</p>
              <p className="mb-2"><span className="text-blue-400">const</span> COMPETITION_FORMAT= {'{'}</p>
              <p className='text-yellow-300'>The competition will be held through the HackerRank online platform. The participation is restricted to solo participants only and there will be 3 rounds: <br />
                <span className='text-amber-500'>●	The First round will involve 5 simple difficulty problem statements having 5 points each.</span>  <br />
                <span className='text-amber-500'>●	The Second round will involve 2 pattern printing and 2 problem statements having 10 points each.</span> <br />
                <span className='text-amber-500'>●	The Final round will involve 3 hard difficulty string / array/ DSA based problem statement having 20 points.</span>

              </p>
              <p className="mb-4">{'}'};</p>

              <p className="mb-2 text-gray-500 wrap-break-word whitespace-normal">// Warning: Breach of protocol results in immediate disqualification.</p>
              <div className="flex">
                <span className="text-green-500 mr-2">{'>'}</span>
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                  className="w-1.5 sm:w-2 h-4 sm:h-5 bg-green-500 inline-block align-middle"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className=" sm:py-7 relative mt-4 z-10 container mx-auto px-4 sm:px-6 flex   justify-center">

        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.80 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="bg-black/80 rounded-xl overflow-hidden border border-green-500/40 shadow-[0_0_30px_rgba(0,255,0,0.1)] relative"
          >
            {/* Terminal Header */}
            <div className="bg-green-900/30 px-3 py-2 sm:px-4 flex items-center border-b border-green-500/40">
              <div className="flex space-x-1.5 sm:space-x-2 shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto text-green-500/70 font-mono text-[10px] sm:text-xs md:text-sm flex items-center overflow-hidden whitespace-nowrap px-2">
                <Terminal size={14} className="mr-1.5 sm:mr-2 shrink-0" /> root@bainary-battleground:~
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-6 md:p-8 font-mono text-green-400 text-[13px] sm:text-sm md:text-base leading-relaxed overflow-x-auto w-full">
              <p className="mb-4 text-gray-500">Initializing environment variables...</p>
              <p className="mb-2"><span className="text-blue-400">const</span> GENERAL_RULES= {'{'}</p>
              <p className='text-yellow-300'>University ID card is mandatory. <br />
Use of mobile phones is strictly prohibited. <br />
Internet browsing outside the competition platform is not allowed. <br />
Any malpractice will lead to immediate disqualification. <br />
The decision of the judges will be final. <br />

              </p>
              <p className="mb-4">{'}'};</p>

              <p className="mb-2 text-gray-500 wrap-break-word whitespace-normal">// Warning: Breach of protocol results in immediate disqualification.</p>
              <div className="flex">
                <span className="text-green-500 mr-2">{'>'}</span>
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                  className="w-1.5 sm:w-2 h-4 sm:h-5 bg-green-500 inline-block align-middle"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const PrizesSection = () => {
  const prizes = [
    { rank: "2nd", title: "Certificate", amount: "Madal", delay: 0.2, height: "h-72", color: "from-gray-300 to-gray-500", glow: "rgba(200,200,200,0.5)" },
    { rank: "1st", title: "Winner Certificate", amount: "Winner Medal", delay: 0, height: "h-80", color: "from-yellow-300 to-yellow-600", glow: "rgba(255,215,0,0.6)" },
    { rank: "3rd", title: "Certificate", amount: "Madal", delay: 0.4, height: "h-64", color: "from-orange-400 to-orange-700", glow: "rgba(205,127,50,0.5)" }
  ];

  return (
    <section className="py-20 sm:py-24 relative z-10 container mx-auto px-4 sm:px-6 overflow-hidden">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-widest"><span className="text-green-500">_</span>Bounty.Pool</h2>
      </div>

      {/* Changed flex order on mobile so 1st prize shows on top */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-10 md:gap-6 max-w-5xl mx-auto h-auto md:h-112.5">
        {/* Mobile logic: Sort array so 1st prize is first visually on mobile, but keep original mapped order for desktop structure */}
        {prizes.map((prize, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: prize.delay, type: "spring", bounce: 0.4 }}
            className={`w-full sm:w-3/4 md:w-1/3 relative ${i === 1 ? 'z-20 md:-translate-y-8 order-first md:order-0' : 'z-10 order-0'}`}
          >
            {/* Rising Energy Particles Effect (CSS simulated) */}
            <div className="absolute inset-x-0 bottom-full h-24 sm:h-32 overflow-hidden pointer-events-none hidden sm:block">
              <motion.div
                animate={{ y: [0, -100], opacity: [0.8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-1 h-10 mx-auto rounded-full bg-white shadow-[0_0_10px_white]"
                style={{ boxShadow: `0 0 15px ${prize.glow}` }}
              />
            </div>

            <TiltCard className={`w-full flex flex-col items-center justify-start pt-6 sm:pt-8 pb-4 bg-linear-to-t ${prize.color} bg-opacity-10 backdrop-blur-xl border border-white/20 relative overflow-hidden ${prize.height}`}>
              {/* Inner Glow Overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 z-0"></div>

              <div className="relative z-10 text-center">
                <Trophy size={i === 1 ? 56 : 40} className="mx-auto mb-3 sm:mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] sm:w-auto sm:h-auto w-12 h-12" />
                <h3 className="text-xl sm:text-2xl font-black text-white mb-1 uppercase tracking-widest">{prize.rank}</h3>
                <p>Prize</p>
                <p className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">{prize.amount}</p>
                <p>&</p>
                <p className="text-xs sm:text-sm font-mono text-white/80 mb-2 sm:mb-4">{prize.title}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FaqSection = () => {
  const faqs = [
    { q: "Who can participate?", a: "The competition is open to all students of BCA and MCA in Brainware University" },
    { q: "do i have to bring my laptop", a: "No, collage will Provide you Desktop" },
    { q: "Is team participation allowed?", a: "This is a solo mission. Lone wolves only. Team collaborations will flag the anti-cheat system." },
    { q: "How are the challenges graded?", a: "Automated test cases. Time complexity, space complexity, and optimal logic paths determine your final score." },
    { q: "Is collage provided food for us ?", a: "No, food will be provided." }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 sm:py-24 relative z-10 container mx-auto px-4 sm:px-6 max-w-3xl">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-widest"><span className="text-green-500">_</span>Query.Database</h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel overflow-hidden rounded-lg border border-green-500/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left px-4 sm:px-6 py-4 flex items-center justify-between focus:outline-none interactive group"
            >
              <span className="font-bold text-sm sm:text-lg group-hover:text-green-400 transition-colors pr-4">{faq.q}</span>
              <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} className="shrink-0">
                <ChevronDown className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 sm:px-6 pb-4 text-gray-400 text-xs sm:text-sm md:text-base border-t border-green-500/10 pt-3 sm:pt-4 font-mono"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-black pt-16 sm:pt-20 pb-8 sm:pb-10 border-t border-green-500/20 overflow-hidden z-10">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxSDB6TTAgMGgxdjQwSDB6IiBmaWxsPSJyZ2JhKDAsIDI1NSwgMCwgMC4wNSkiLz4KPC9zdmc+')] transform-[perspective(500px)_rotateX(60deg)] origin-bottom opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 sm:mb-12">
          <div className="mb-6 md:mb-0 text-center md:text-left w-full md:w-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-2 glitch-text wrap-break-word" data-text="Bainary Battlegraound">Bainary Battlegraound</h2>
            <p className="text-green-500/70 font-mono text-xs sm:text-sm">Initializing Future Devs_</p>
          </div>

          <div className="flex space-x-4 sm:space-x-6">
            <img className='h-16' src={tech} alt="Tech clud" />
            {/* {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="interactive p-2.5 sm:p-3 rounded-full bg-green-900/20 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_#00ff00] transition-all duration-300">
                <Icon size={18} className="sm:w-5 sm:h-5" />
              </a>
            ))} */}
          </div>
        </div>

        <div className="text-center pt-6 sm:pt-8 border-t border-green-500/10 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs font-mono text-gray-600 gap-y-2">
          <p>&copy; 2026 Bainary Battlegraound. All systems operational.</p>
          <p className="flex items-center">
            Powered by <ShieldAlert size={12} className="mx-1 text-green-500" /> Brainware University CSS Department
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#030303] min-h-screen font-sans selection:bg-green-500 selection:text-black">
      <GlobalStyles />
      <CustomCursor />
      <ParticleBackground />

      {/* Sticky Glassmorphic Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-t-0 border-l-0 border-r-0 py-3 sm:py-4 px-4 sm:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-black text-lg sm:text-xl tracking-tighter text-white flex items-center shrink-0">
            <img src={bwu} alt="BWU Logo" className='h-6 sm:h-8 object-contain' />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 font-mono text-sm">
            {['About', 'Timeline', 'Rules', 'Prizes', 'Gallery', 'Team', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLocaleLowerCase()}`} className="interactive text-gray-300 hover:text-green-400 transition-colors uppercase relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="interactive px-4 py-2 border border-green-500 text-green-400 font-mono text-sm hover:bg-green-500 hover:text-black transition-colors rounded-sm shadow-[0_0_10px_rgba(0,255,0,0.1)]">
              Register
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="md:hidden text-green-500 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a1f0a]/95 backdrop-blur-lg border-b border-green-500/30 overflow-hidden absolute top-full left-0 w-full"
            >
              <div className="flex flex-col px-6 py-6 space-y-4 font-mono">
                {['About', 'Timeline', 'Rules', 'Prizes', 'Gallery', 'Team', 'FAQ'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLocaleLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-green-400 transition-colors uppercase text-sm border-b border-green-500/10 pb-2"
                  >
                    {item}
                  </a>
                ))}
                <button className="mt-4 px-4 py-3 bg-green-500/10 border border-green-500 text-green-400 font-bold uppercase text-sm w-full hover:bg-green-500 hover:text-black transition-colors">
                  Register Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <HeroSection />
        <Countdown />
        <div id='about'>

        <AboutSection />
        </div>
        <div id='timeline'>
        <TimelineSection />

        </div>
        <div id='rules'>

        <RulesSection />
        </div>
        <div id='prizes'>

        <PrizesSection />
        </div>
        <div id='gallery'>

        <Gallery />
        </div>
        <div id='faq'>

        <FaqSection />
        </div>
        <div id='team'>
        <Team />

        </div>
      </main>

      <Footer />
    </div>
  );
}