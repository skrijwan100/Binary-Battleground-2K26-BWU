import React, { useState } from 'react';
import { Terminal, Image as ImageIcon, Maximize2, Lock, Unlock } from 'lucide-react';
import pic1 from "../assets/pic1.jpg"
import pic2 from "../assets/pic2.jpg"
import pic3 from "../assets/pic3.jpg"
import pic4 from "../assets/pic4.jpg"
import pic5 from "../assets/pic5.jpg"
import pic6 from "../assets/pic6.jpg"

// Mock data for the gallery using thematic tech images
const galleryItems = [
  { 
    id: 1, 
    title: "SYS_OVERRIDE_01", 
    type: "IMAGE_DAT", 
    date: "2026.03.11", 
    size: "2.4 MB",
    url: pic1
  },
  { 
    id: 2, 
    title: "SERVER_ROOM_MAINFRAME", 
    type: "ARCHIVE", 
    date: "2025.12.04", 
    size: "8.1 MB",
    url: pic2
  },
  { 
    id: 3, 
    title: "TEAM_ASSEMBLY_LOG", 
    type: "VISUAL", 
    date: "2025.11.22", 
    size: "4.7 MB",
    url: pic3
  },
  { 
    id: 4, 
    title: "CORE_ACCESS_CIRCUIT", 
    type: "SYSTEM", 
    date: "2026.01.15", 
    size: "1.2 MB",
    url: pic4 
  },
  { 
    id: 5, 
    title: "LATE_NIGHT_COMPILE", 
    type: "LOG", 
    date: "2026.02.28", 
    size: "3.5 MB",
    url:pic5
  },
  { 
    id: 6, 
    title: "CYBER_RIG_SETUP", 
    type: "MEM_DUMP", 
    date: "2026.03.14", 
    size: "5.9 MB",
    url: pic6
  }
];

const Gallery= () => {
  return (
    <div className="min-h-screen  p-6 sm:p-12 font-mono relative overflow-hidden">
      
      {/* Background ambient glow matching the theme */}
      <div className="absolute bottom-0 left-0 w-150 h-150 bg-[#00ff00] rounded-full opacity-[0.02] blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Terminal Header */}
        <div className="mb-12 border-l-2 border-[#00ff00] pl-6 py-2">
          <div className="flex items-center gap-3 text-[#00ff00] mb-2">
            <Terminal size={20} className="animate-pulse" />
            <span className="text-xs sm:text-sm tracking-[0.3em] uppercase opacity-80">Directory_Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] flex items-center gap-4">
            Visual_Archives
            <span className="text-xl text-[#00ff00]/40 font-normal tracking-widest animate-pulse">_</span>
          </h2>
          <div className="mt-4 flex gap-4 text-[#00ff00]/60 text-sm sm:text-base">
            <span>{'>'} cd ./gallery</span>
            <span>{'>'} ls -la</span>
            <span className="text-[#00ff00] animate-pulse">...</span>
          </div>
          <p className="mt-2 text-[#00ff00]/40 text-xs">
            [ {galleryItems.length} encrypted records found in memory block ]
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-20 flex flex-col items-center justify-center border-t border-[#00ff00]/10 pt-8 text-[#00ff00]/30 text-xs tracking-widest space-y-2">
          <span>// END_OF_DIRECTORY</span>
          <span className="opacity-50">process finished with exit code 0</span>
        </div>

      </div>
    </div>
  );
};

const GalleryCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group bg-[#050505] p-2 border border-[#00ff00]/20 transition-all duration-500 hover:border-[#00ff00] hover:shadow-[0_0_30px_rgba(0,255,0,0.15)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Corner Elements */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#00ff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#00ff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#00ff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#00ff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-black/50 cursor-pointer">
        
        {/* Main Image - Has a heavy green filter and grayscale when inactive, clears up on hover */}
        <img 
          src={item.url} 
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-700 ease-in-out
            ${isHovered ? 'scale-105 grayscale-0 opacity-100' : 'scale-100 '}
          `}
        />

        {/* Scanline overlay running continuously */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)]bg-size-[100%_4px] pointer-events-none opacity-50"></div>
       

      </div>

      {/* Bottom Bar Info (Always visible) */}
      <div className="mt-3 flex justify-between items-end border-t border-[#00ff00]/20 pt-3">
        <div>
          <h3 className="text-white text-sm sm:text-base font-bold tracking-wider uppercase group-hover:text-[#00ff00] transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-[#00ff00]/60 text-xs tracking-[0.2em] mt-1">
            [{item.type}]
          </p>
        </div>
        
        <button className="text-[#00ff00]/40 hover:text-[#00ff00] transition-colors p-1" title="Expand View">
          <Maximize2 size={18} />
        </button>
      </div>

    </div>
  );
};

export default Gallery;