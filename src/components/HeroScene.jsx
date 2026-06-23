import React, { useEffect, useRef } from 'react';
import HeroSteamCanvas from './HeroSteamCanvas';
import gsap from 'gsap';

const HeroScene = ({ onOrderClick }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Fade-in animations for the hero text
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.2, delay: 0.3 }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0 },
      '-=0.8'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8 },
      '-=0.6'
    );
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#16291E] text-[#F8F3E9]"
    >
      {/* 3D Steam Background */}
      <div className="absolute inset-0 z-0">
        <HeroSteamCanvas />
      </div>

      {/* Cinematic Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16291E] via-transparent to-[rgba(22,41,30,0.8)] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,20,15,0.7)_100%)] pointer-events-none z-10" />

      {/* Header Navigation */}
      <header className="relative w-full px-6 py-6 md:px-12 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <span className="font-display font-extrabold text-2xl tracking-tight text-[#9ED660]">DRY</span>
          <span className="font-display font-extrabold text-2xl tracking-tight text-[#F8F3E9]">GRAB</span>
          <div className="w-2 h-2 rounded-full bg-[#9ED660] animate-pulse"></div>
        </div>
        
        <nav className="hidden md:flex gap-8 items-center text-sm font-semibold tracking-wide text-[#F8F3E9]/80">
          <a href="#problem" className="hover:text-[#9ED660] transition-colors">The Problem</a>
          <a href="#reveal" className="hover:text-[#9ED660] transition-colors">How It Works</a>
          <a href="#nutrition" className="hover:text-[#9ED660] transition-colors">Science</a>
          <a href="#flavors" className="hover:text-[#9ED660] transition-colors">Flavors</a>
          <a href="#story" className="hover:text-[#9ED660] transition-colors">Our Story</a>
        </nav>

        <div>
          <button 
            onClick={onOrderClick}
            className="btn-magnetic bg-[#9ED660] text-[#16291E] font-bold px-6 py-2.5 rounded-full text-sm shadow-md hover:bg-[#F8F3E9] transition-colors pointer-events-auto"
          >
            Order on WhatsApp
          </button>
        </div>
      </header>

      {/* Hero Centerpiece Content */}
      <main className="relative flex-grow flex flex-col justify-center items-center px-4 text-center z-20 max-w-4xl mx-auto">
        <div className="mb-2">
          <span className="inline-block bg-[#2F6F4E]/80 border border-[#9ED660]/30 text-[#9ED660] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm">
            100% Natural Sprouted Legumes
          </span>
        </div>
        
        <h1 
          ref={titleRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-white max-w-3xl"
        >
          Travel-ready protein. <br />
          <span className="text-[#9ED660]">Just add water.</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="mt-6 text-base sm:text-xl text-[#F8F3E9]/80 max-w-2xl leading-relaxed"
        >
          Ditch the protein shaker and processed bars. Dry Grab brings the power of raw, sprouted Indian superfoods (Chana, Mung, Matki) inside a shelf-stable, travel-ready tub. Ready in 3 minutes.
        </p>

        <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <a 
            href="#reveal" 
            className="btn-magnetic border-2 border-[#F8F3E9] hover:bg-[#F8F3E9] hover:text-[#16291E] text-white font-bold px-8 py-3.5 rounded-full transition-all text-base"
          >
            See How It Works
          </a>
          <a 
            href="#flavors" 
            className="btn-magnetic bg-[#2F6F4E] hover:bg-[#2f6f4e]/85 text-white font-bold px-8 py-3.5 rounded-full transition-all text-base border-2 border-[#2F6F4E]"
          >
            Explore Flavors
          </a>
        </div>
      </main>

      {/* Scroll Down Cue */}
      <footer className="relative w-full py-8 flex flex-col justify-center items-center z-20">
        <a 
          href="#problem" 
          className="flex flex-col items-center gap-2 text-xs font-bold tracking-widest text-[#F8F3E9]/60 hover:text-[#9ED660] transition-colors pointer-events-auto"
        >
          <span>SCROLL TO UNLOCK</span>
          <div className="w-6 h-10 border-2 border-[#F8F3E9]/30 rounded-full flex justify-center p-1.5">
            <div className="w-1.5 h-1.5 bg-[#9ED660] rounded-full animate-bounce"></div>
          </div>
        </a>
      </footer>
    </section>
  );
};

export default HeroScene;
