import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Scenes & Components
import HeroScene from './components/HeroScene';
import ProblemScene from './components/ProblemScene';
import RevealScene from './components/RevealScene';
import NutritionScene from './components/NutritionScene';
import FlavorsScene from './components/FlavorsScene';
import AudienceScene from './components/AudienceScene';
import FounderScene from './components/FounderScene';
import SquadScene from './components/SquadScene';
import ShopScene from './components/ShopScene';
import FooterScene from './components/FooterScene';
import SprigMascot from './components/SprigMascot';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeFlavor, setActiveFlavor] = useState('mung');
  const [activePersona, setActivePersona] = useState('gym');
  const [currentSection, setCurrentSection] = useState('hero');

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard fast-out/slow-in
      smoothWheel: true,
      wheelMultiplier: 1.0
    });

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    // Section Observer to trigger Mascot expression changes
    const sections = ['hero', 'problem', 'reveal', 'nutrition', 'flavors', 'audience', 'story', 'squad', 'shop', 'footer'];
    
    const triggers = sections.map((id) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCurrentSection(id),
        onEnterBack: () => setCurrentSection(id)
      });
    });

    // Cleanup
    return () => {
      lenis.destroy();
      triggers.forEach(t => t.kill());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // WhatsApp helper click trigger
  const handleOrderRedirect = () => {
    // Analytics/Visual logs could go here
    console.log(`WhatsApp Order Redirect triggered! activeFlavor: ${activeFlavor}, activePersona: ${activePersona}`);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F8F3E9] text-[#2A2118] overflow-x-hidden selection:bg-[#9ED660]/30 selection:text-[#16291E]">
      
      {/* Dynamic grain overlay across the website */}
      <div className="noise-overlay pointer-events-none" />

      {/* Main Assembly */}
      <div id="hero">
        <HeroScene onOrderClick={() => {
          const el = document.getElementById('shop');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />
      </div>

      <div id="problem">
        <ProblemScene />
      </div>

      <div id="reveal">
        <RevealScene activeFlavor={activeFlavor} />
      </div>

      <div id="nutrition">
        <NutritionScene />
      </div>

      <div id="flavors">
        <FlavorsScene activeFlavor={activeFlavor} setActiveFlavor={setActiveFlavor} />
      </div>

      <div id="audience">
        <AudienceScene activePersona={activePersona} setActivePersona={setActivePersona} />
      </div>

      <div id="story">
        <FounderScene />
      </div>

      <div id="squad">
        <SquadScene />
      </div>

      <div id="shop">
        <ShopScene activeFlavor={activeFlavor} onWhatsAppRedirect={handleOrderRedirect} />
      </div>

      <div id="footer">
        <FooterScene />
      </div>

      {/* Persistent Mascot overlay */}
      <SprigMascot currentSection={currentSection} activePersona={activePersona} />

    </div>
  );
}

export default App;
