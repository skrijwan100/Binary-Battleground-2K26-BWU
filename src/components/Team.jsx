import React from 'react';
import { Terminal, Github, Linkedin, Mail, Cpu } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    handle: "root_admin",
    name: "Alex Mercer",
    role: "SYS_ARCHITECT",
    status: "ONLINE",
    skills: ["C++", "Architecture", "Cloud"],
    avatar: "AM"
  },
  {
    id: 2,
    handle: "sec_ops_01",
    name: "Sarah Connor",
    role: "PEN_TESTER",
    status: "ONLINE",
    skills: ["Kali", "Network", "Crypto"],
    avatar: "SC"
  },
  {
    id: 3,
    handle: "ui_wizard",
    name: "David Chen",
    role: "FRONTEND_DEV",
    status: "AWAY",
    skills: ["React", "Tailwind", "WebGL"],
    avatar: "DC"
  },
  {
    id: 4,
    handle: "data_ghost",
    name: "Elena Rostova",
    role: "BACKEND_NINJA",
    status: "ONLINE",
    skills: ["Node.js", "PostgreSQL", "Redis"],
    avatar: "ER"
  },
  {
    id: 5,
    handle: "data_ghost",
    name: "Elena Rostova",
    role: "BACKEND_NINJA",
    status: "ONLINE",
    skills: ["Node.js", "PostgreSQL", "Redis"],
    avatar: "ER"
  },
  {
    id: 6,
    handle: "data_ghost",
    name: "Elena Rostova",
    role: "BACKEND_NINJA",
    status: "ONLINE",
    skills: ["Node.js", "PostgreSQL", "Redis"],
    avatar: "ER"
  },
  {
    id: 7,
    handle: "data_ghost",
    name: "Elena Rostova",
    role: "BACKEND_NINJA",
    status: "ONLINE",
    skills: ["Node.js", "PostgreSQL", "Redis"],
    avatar: "ER"
  }
];

const Team = () => {
  return (
    <div className="min-h-screen  p-6 sm:p-12 font-mono relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-[#00ff00] rounded-full opacity-[0.02] blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Terminal Header */}
        <div className="mb-16 border-l-2 border-[#00ff00] pl-6 py-2">
          <div className="flex items-center gap-3 text-[#00ff00] mb-2">
            <Terminal size={20} className="animate-pulse" />
            <span className="text-xs sm:text-sm tracking-[0.3em] uppercase opacity-80">Execution Context</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            Command_Center
          </h2>
          <p className="mt-4 text-[#00ff00]/60 text-sm sm:text-base">
            {'>'} fetching active operatives... [ {teamMembers.length} found ]
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* Footer decoration */}
        <div className="mt-16 flex justify-center text-[#00ff00]/30 text-xs tracking-widest">
          <span>// END_OF_ROSTER</span>
        </div>
      </div>
    </div>
  );
};

const TeamCard = ({ member }) => {
  return (
    <div className="relative group bg-[#050505] border border-[#00ff00]/20 rounded-sm p-6 transition-all duration-300 hover:border-[#00ff00]/80 hover:shadow-[0_0_20px_rgba(0,255,0,0.15)] hover:-translate-y-1">
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff00] opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff00] opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff00] opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff00] opacity-50 group-hover:opacity-100 transition-opacity"></div>

      {/* Top Bar: Status */}
      <div className="flex justify-between items-center mb-6 text-xs">
        <span className="text-[#00ff00]/50 tracking-wider">@{member.handle}</span>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'ONLINE' ? 'bg-[#00ff00] animate-pulse shadow-[0_0_5px_#00ff00]' : 'bg-yellow-500'}`}></div>
          <span className={`text-[10px] tracking-widest ${member.status === 'ONLINE' ? 'text-[#00ff00]' : 'text-yellow-500'}`}>
            {member.status}
          </span>
        </div>
      </div>

      {/* Avatar/Icon Placeholder */}
      <div className="mb-6 relative w-24 h-24 bg-black border border-[#00ff00]/30 flex items-center justify-center overflow-hidden group-hover:border-[#00ff00] transition-colors">
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00ff00]/10 to-transparent -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none"></div>
        <span className="text-4xl text-white font-bold tracking-widest drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] z-10">
          {member.avatar}
        </span>
      </div>

      {/* Details */}
      <div>
        <h3 className="text-xl text-white font-bold tracking-wide mb-1 group-hover:text-[#00ff00] transition-colors">
          {member.name}
        </h3>
        <p className="text-[#00ff00] text-xs tracking-[0.2em] mb-4">
          [{member.role}]
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {member.skills.map((skill, index) => (
            <span key={index} className="text-[10px] text-[#00ff00]/70 border border-[#00ff00]/20 px-2 py-1 bg-[#00ff00]/5">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links / Connect */}
      <div className="mt-auto pt-4 border-t border-[#00ff00]/10 flex gap-4 text-[#00ff00]/50">
        <a href="#" className="hover:text-[#00ff00] hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] transition-all">
          <Github size={18} />
        </a>
        <a href="#" className="hover:text-[#00ff00] hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] transition-all">
          <Linkedin size={18} />
        </a>
        <a href="#" className="hover:text-[#00ff00] hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] transition-all">
          <Mail size={18} />
        </a>
      </div>

      {/* Embedded CSS for scanline animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}} />
    </div>
  );
};

export default Team;