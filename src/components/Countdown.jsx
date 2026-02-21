import React, { useState, useEffect } from 'react';

const Countdown = () => {
  // Set target date to March 13, 2026, 00:00:00
  const TARGET_DATE = new Date('2026-03-10T00:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        // If countdown finishes
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Initial call
    updateCountdown();
    
    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [TARGET_DATE]);

  // Helper to format numbers with leading zero
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  // Prevent hydration errors by not rendering exact time until client-side loads
  if (!isClient) return <div className="min-h-screen bg-black"></div>;

  return (
    <div className="min-h-[70vh]  flex items-center justify-center p-4 font-mono relative overflow-hidden">
      
      {/* Decorative background glow to match the screenshot's sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#00ff00] rounded-full opacity-[0.03] blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Top Decorative Terminal Text */}
        <div className="mb-8 flex flex-col items-center text-[#00ff00] text-sm sm:text-base tracking-[0.2em] space-y-2 opacity-80">
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 text bg-[#00ff00] rounded-full animate-pulse"></span>
           <span className='text-4xl font-bold'>REGISTRATION CLOSE IN</span> 
          </p>
          <p className="text-xs text-[#00ff00]/50">target_date: "2026-03-13T00:00:00Z"</p>
        </div>

        {/* Countdown Container */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 p-6 sm:p-10 border border-[#00ff00]/30 bg-black/40 backdrop-blur-md rounded-xl shadow-[0_0_30px_rgba(0,255,0,0.05)] relative">
          
          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff00]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff00]"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff00]"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff00]"></div>

          <TimeBlock value={formatTime(timeLeft.days)} label="Days" />
          <Separator />
          <TimeBlock value={formatTime(timeLeft.hours)} label="Hours" />
          <Separator />
          <TimeBlock value={formatTime(timeLeft.minutes)} label="Minutes" />
          <Separator />
          <TimeBlock value={formatTime(timeLeft.seconds)} label="Seconds" />
          
        </div>

        {/* Bottom decorative element matching the "while(true)" from the screenshot */}
        <div className="mt-10 text-[#00ff00]/40 text-xs sm:text-sm font-mono tracking-widest">
          {'>'} while (time {'<'} launch) {'{'} prepare(); {'}'} <span className="animate-ping inline-block w-1.5 h-4 bg-[#00ff00]/60 align-middle ml-1"></span>
        </div>
      </div>
    </div>
  );
};

// Sub-component for individual time blocks
const TimeBlock = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center relative group">
    {/* Inner Box */}
    <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-[#050505] border border-[#00ff00]/40 rounded flex items-center justify-center shadow-[0_0_15px_rgba(0,255,0,0.1)] transition-all duration-300 group-hover:border-[#00ff00] group-hover:shadow-[0_0_25px_rgba(0,255,0,0.3)] group-hover:-translate-y-1 relative overflow-hidden">
      
      {/* Scanline effect on hover */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#00ff00]/10 to-transparent -translate-y-full group-hover:animate-[scan_1.5s_ease-in-out_infinite]"></div>
      
      {/* Number */}
      <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wider z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
        {value}
      </span>
    </div>
    
    {/* Label below */}
    <span className="mt-3 text-[#00ff00] text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold opacity-90 group-hover:opacity-100 group-hover:text-shadow-[0_0_8px_rgba(0,255,0,0.8)] transition-all duration-300">
      {label}
    </span>
    
    {/* Custom animation keyframes for the scanline */}
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes scan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
    `}} />
  </div>
);

// Sub-component for the colon separator
const Separator = () => (
  <div className="hidden sm:flex flex-col items-center justify-center h-28 md:h-32 pb-8">
    <span className="text-[#00ff00] text-3xl sm:text-4xl md:text-5xl font-bold animate-pulse drop-shadow-[0_0_10px_rgba(0,255,0,0.6)]">
      :
    </span>
  </div>
);

export default Countdown;