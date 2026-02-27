import React from 'react';
import { Terminal, Github, Linkedin, Mail, Cpu } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    handle: "CSS",
    name: "Dr. Jayanta Aich",
    role: "CONVENER",
    status: "ONLINE",
    skills: ["C++", "Architecture", "Cloud"],
    avatar: "AM",
    contact:true,
    phno:'NA'
  },
  {
    id: 2,
    handle: "CSS",
    name: "Mr. Samrat Kundu",
    role: "PROGRAMME COORDINATOR",
    status: "ONLINE",
    skills: ["Kali", "Network", "Crypto"],
    avatar: "SC",
    contact:true,
    phno:'+91 8293623023'
  },
  {
    id: 3,
    handle: "CSS",
    name: "Mr. Souvik Bera",
    role: "PROGRAMME COORDINATOR",
    status: "AWAY",
    skills: ["React", "Tailwind", "WebGL"],
    avatar: "DC",
    contact:true,
    phno:'+91 8327050388'
  },
  {
    id: 4,
    handle: "CSS",
    name: "Sk Rijwan",
    role: "DEVELOPER AND VOLUNTEER",
    status: "ONLINE",
    skills: ["Node.js", "PostgreSQL", "Redis"],
    avatar: "ER",
    contact:false,
    gl:"https://github.com/skrijwan100",
    ll:"https://www.linkedin.com/in/sekh-rijwan-026740311/",
    ml:"mailto:rijwansk329@gmail.com"

  },
  {
    id: 5,
    handle: "CSS",
    name: "Tarapada Garai",
    role: "DEVELOPER AND VOLUNTEER",
    status: "ONLINE",
    skills: ["Node.js", "PostgreSQL", "Redis"],
    avatar: "ER",
    contact:false,
    gl:"https://github.com/codingWithRakesh",
    ll:"https://www.linkedin.com/in/tarapada-garai-1a9a5a257/",
    ml:"mailto:tarapadagarai898@gmail.com"
  },
  // {
  //   id: 6,
  //   handle: "CSS",
  //   name: "Elena Rostova",
  //   role: "BACKEND_NINJA",
  //   status: "ONLINE",
  //   skills: ["Node.js", "PostgreSQL", "Redis"],
  //   avatar: "ER"
  // },
  // {
  //   id: 7,
  //   handle: "data_ghost",
  //   name: "Elena Rostova",
  //   role: "BACKEND_NINJA",
  //   status: "ONLINE",
  //   skills: ["Node.js", "PostgreSQL", "Redis"],
  //   avatar: "ER"
  // }
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
            Team
          </h2>
          <p className="mt-4 text-[#00ff00]/60 text-sm sm:text-base">
            {'>'} fetching active operatives... [ 0 found ]
          </p>
        </div>

        {/* Team Grid */}
        {/* <div className='text-5xl text-center'>
          Comming Soon....
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
      </div>

      {/* Avatar/Icon Placeholder */}
      

      {/* Details */}
      <div>
        <h3 className="text-2xl text-white font-bold tracking-wide mb-1 group-hover:text-[#00ff00] transition-colors">
          {member.name}
        </h3>
        <p className="text-[#00ff00] text-[16px] tracking-[0.2em] mb-4">
          [{member.role}]
        </p>

        {/* Skills Tags */}
       
      </div>

      {/* Social Links / Connect */}
      {member.contact?
      <div>Ph: {member.phno}</div>
      :<div className="mt-auto pt-4 border-t border-[#00ff00]/10 flex gap-4 text-[#00ff00]/50">
        <a href={member.gl} target='_blank' className="hover:text-[#00ff00] hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] transition-all">
          <Github size={18} />
        </a>
        <a href={member.ll} target='_blank' className="hover:text-[#00ff00] hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] transition-all">
          <Linkedin size={18} />
        </a>
        <a href={member.ml} target='_blank' className="hover:text-[#00ff00] hover:drop-shadow-[0_0_5px_rgba(0,255,0,0.8)] transition-all">
          <Mail size={18} />
        </a>
      </div>}

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