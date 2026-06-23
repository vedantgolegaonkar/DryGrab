import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const TwitterIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const FooterScene = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative bg-[#0d1812] text-[#F8F3E9]/80 py-16 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      {/* Background soft glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#2F6F4E]/10 filter blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-2xl tracking-tight text-[#9ED660]">DRY</span>
              <span className="font-display font-extrabold text-2xl tracking-tight text-[#F8F3E9]">GRAB</span>
            </div>
            
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm">
              Manufactured under the registered brand name of DRYGRAB by <strong>DivIndia Global Exports LLP</strong>. We make raw, sprouted legumes shelf-stable, travel-ready, and instant, with zero flavours, preservatives, or colors.
            </p>

            <div className="flex gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#9ED660] hover:bg-white/10 transition-all">
                <InstagramIcon size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#9ED660] hover:bg-white/10 transition-all">
                <TwitterIcon size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#9ED660] hover:bg-white/10 transition-all">
                <YoutubeIcon size={16} />
              </a>
            </div>
          </div>

          {/* Branded Hashtags */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#9ED660]">
              The Squad Vibe
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">#SproutSquad</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">#JustAddWater</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">#TravelReadyProtein</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">#AurangabadMade</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#9ED660]">
              Corporate Office
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              <strong>DivIndia Global Exports LLP</strong> <br />
              Office No.: 408, Elite Square,<br />
              Gat No 57, Beed Bypass Rd,<br />
              Aurangabad, Maharashtra - 431005 <br />
              LLPIN: ABA-7075
            </p>
            <p className="text-xs text-white/60">
              Email: drygrabdivindia@gmail.com <br />
              Phone: +91 9307472945 <br />
              FSSAI Lic No: 11522999000347
            </p>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} Dry Grab. Built for active lives. Crafted with</span>
            <Heart size={12} fill="#C9794B" stroke="#C9794B" className="mx-0.5" />
            <span>in India.</span>
          </div>

          <div className="flex gap-6 items-center">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            
            <button 
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors shrink-0"
              title="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterScene;
