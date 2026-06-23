import React, { useState, useEffect } from 'react';
import { Volume2, X } from 'lucide-react';

const SPROUT_FACTS = [
  "Sprouting boosts fiber content by up to 226%!",
  "Just add hot water, cover, and eat in 3 minutes!",
  "Packed in a shelf-stable tub that stays fresh for 12 months.",
  "Sprouted beans have lower anti-nutrients, making them super easy on your stomach!",
  "No preservatives, no chemicals, no sugar. Just raw sprout power!",
  "Gym pack has over 120g of pure travel-ready plant protein!",
  "Amit & Aradhya started Dry Grab to solve clean snacking for gym-goers!"
];

const SprigMascot = ({ currentSection = 'hero', activePersona = 'gym' }) => {
  const [bubbleText, setBubbleText] = useState("Hey there! Welcome to Dry Grab!");
  const [showBubble, setShowBubble] = useState(true);
  const [pose, setPose] = useState('wave'); // wave, idle, point, look
  const [outfit, setOutfit] = useState('default'); // gym, campus, travel, default

  // Automatically fade out initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  // Update outfit and pose based on section and active persona
  useEffect(() => {
    if (currentSection === 'hero') {
      setPose('wave');
      setOutfit('default');
      setBubbleText("Travel-ready protein. Just add water!");
      setShowBubble(true);
      const t = setTimeout(() => setShowBubble(false), 5000);
      return () => clearTimeout(t);
    } else if (currentSection === 'problem') {
      setPose('look');
      setOutfit('default');
      setBubbleText("No time? We got you covered!");
      setShowBubble(true);
      const t = setTimeout(() => setShowBubble(false), 4000);
      return () => clearTimeout(t);
    } else if (currentSection === 'reveal') {
      setPose('idle');
      setOutfit('default');
      setBubbleText("Just 3 simple steps: Pour. Wait. Eat!");
      setShowBubble(true);
      const t = setTimeout(() => setShowBubble(false), 5000);
      return () => clearTimeout(t);
    } else if (currentSection === 'audience') {
      setPose('point');
      setOutfit(activePersona); // gym, campus, travel
      const personaTexts = {
        gym: "Gym mode! Check out my sweatband. Let's build muscle!",
        campus: "Study fuels! Easy brain food for late-night exams.",
        travel: "Travel companion! Hook me to your backpack, ready to eat anywhere!"
      };
      setBubbleText(personaTexts[activePersona] || "Fits right into your busy life!");
      setShowBubble(true);
      const t = setTimeout(() => setShowBubble(false), 5000);
      return () => clearTimeout(t);
    } else if (currentSection === 'flavors') {
      setPose('idle');
      setOutfit('default');
      setBubbleText("What flavor are we grabbing today?");
      setShowBubble(true);
      const t = setTimeout(() => setShowBubble(false), 4000);
      return () => clearTimeout(t);
    } else if (currentSection === 'shop') {
      setPose('point');
      setOutfit('default');
      setBubbleText("Join the Sprout Squad! Tap the bundles below.");
      setShowBubble(true);
      const t = setTimeout(() => setShowBubble(false), 5000);
      return () => clearTimeout(t);
    } else if (currentSection === 'footer') {
      setPose('wave');
      setOutfit('default');
      setBubbleText("See you on the trails! Keep sprouting!");
      setShowBubble(true);
    } else {
      setPose('idle');
    }
  }, [currentSection, activePersona]);

  // Click mascot to trigger a random fact
  const handleMascotClick = () => {
    const randomFact = SPROUT_FACTS[Math.floor(Math.random() * SPROUT_FACTS.length)];
    setBubbleText(randomFact);
    setShowBubble(true);
    // Auto close fact after 5 seconds
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 5000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none select-none max-w-[280px]">
      {/* Speech Bubble */}
      {showBubble && (
        <div className="relative mb-3 bg-[#F8F3E9] text-[#2A2118] border-2 border-[#2F6F4E] rounded-2xl p-3 shadow-xl pointer-events-auto transition-all duration-300 transform scale-100 origin-bottom-right max-w-[240px]">
          <button 
            onClick={() => setShowBubble(false)} 
            className="absolute top-1 right-1 text-[#2A2118] hover:text-[#C9794B] transition-colors"
          >
            <X size={14} />
          </button>
          <p className="text-xs font-semibold pr-2 leading-relaxed">
            {bubbleText}
          </p>
          {/* Bubble Tail */}
          <div className="absolute right-6 -bottom-2.5 w-4 h-4 bg-[#F8F3E9] border-r-2 border-b-2 border-[#2F6F4E] transform rotate-45"></div>
        </div>
      )}

      {/* Mascot SVG Body */}
      <div 
        onClick={handleMascotClick}
        className="pointer-events-auto cursor-pointer group flex items-end justify-center w-24 h-28 relative"
        title="Click Sprig for sprout facts!"
      >
        <svg 
          viewBox="0 0 100 120" 
          className="w-full h-full drop-shadow-lg transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
        >
          {/* Group to handle idle breathing scale animation */}
          <g className="animate-pulse-slow origin-bottom">
            
            {/* Travel Backpack straps (accessory) */}
            {outfit === 'travel' && (
              <g id="backpack">
                {/* Backpack body visible behind */}
                <rect x="25" y="55" width="50" height="40" rx="10" fill="#C9794B" />
                {/* Straps */}
                <path d="M 33,65 C 33,52 40,48 40,55" stroke="#2A2118" strokeWidth="4" fill="none" />
                <path d="M 67,65 C 67,52 60,48 60,55" stroke="#2A2118" strokeWidth="4" fill="none" />
              </g>
            )}

            {/* Sprig Body - Seed bean shape */}
            <path 
              d="M 50,40 C 25,40 25,100 50,100 C 75,100 75,40 50,40 Z" 
              fill="#2F6F4E" 
              stroke="#2A2118" 
              strokeWidth="3"
            />

            {/* Sprouted Stem/Leaves on Head */}
            <g id="sprout-top" className="origin-[50px_40px] animate-bounce-slow">
              <path d="M 50,40 Q 50,20 40,15" fill="none" stroke="#2A2118" strokeWidth="3" />
              {/* Leaf 1 */}
              <path d="M 40,15 C 33,18 28,10 40,15 C 45,20 42,25 40,15 Z" fill="#9ED660" stroke="#2A2118" strokeWidth="1.5" />
              {/* Leaf 2 */}
              <path d="M 50,40 Q 54,23 63,22" fill="none" stroke="#2A2118" strokeWidth="3" />
              <path d="M 63,22 C 70,22 68,13 63,22 C 60,28 58,28 63,22 Z" fill="#9ED660" stroke="#2A2118" strokeWidth="1.5" />
            </g>

            {/* Eyes */}
            <g id="eyes">
              {pose === 'look' ? (
                /* Looking/suspicious side-eyes */
                <>
                  <circle cx="42" cy="65" r="4.5" fill="#2A2118" />
                  <circle cx="58" cy="65" r="4.5" fill="#2A2118" />
                  <circle cx="39" cy="65" r="1.5" fill="#FFFFFF" />
                  <circle cx="55" cy="65" r="1.5" fill="#FFFFFF" />
                </>
              ) : pose === 'point' ? (
                /* Happy curved eyes */
                <>
                  <path d="M 37,67 Q 42,61 47,67" fill="none" stroke="#2A2118" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 53,67 Q 58,61 63,67" fill="none" stroke="#2A2118" strokeWidth="3" strokeLinecap="round" />
                </>
              ) : (
                /* Standard eyes with blink keyframe animation */
                <g className="animate-[blink_4s_infinite]">
                  <circle cx="40" cy="65" r="5" fill="#2A2118" />
                  <circle cx="60" cy="65" r="5" fill="#2A2118" />
                  {/* Highlights */}
                  <circle cx="38" cy="63" r="1.8" fill="#FFFFFF" />
                  <circle cx="58" cy="63" r="1.8" fill="#FFFFFF" />
                </g>
              )}
            </g>

            {/* Mouth */}
            <path 
              d="M 45,77 Q 50,83 55,77" 
              fill="none" 
              stroke="#2A2118" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
            />

            {/* Rosy cheeks */}
            <circle cx="33" cy="73" r="3.5" fill="#C9794B" opacity="0.6" />
            <circle cx="67" cy="73" r="3.5" fill="#C9794B" opacity="0.6" />

            {/* Left Arm */}
            {pose === 'wave' ? (
              /* Waving Arm (animated rotation) */
              <path 
                d="M 28,72 Q 10,65 14,50" 
                fill="none" 
                stroke="#2A2118" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                className="origin-[28px_72px] animate-[wave-hand_1.5s_infinite_alternate]"
              />
            ) : (
              /* Idle Left Arm */
              <path d="M 28,72 Q 18,78 22,86" fill="none" stroke="#2A2118" strokeWidth="3.5" strokeLinecap="round" />
            )}

            {/* Right Arm */}
            {pose === 'point' ? (
              /* Pointing Arm */
              <path d="M 72,72 Q 90,75 88,86" fill="none" stroke="#2A2118" strokeWidth="3.5" strokeLinecap="round" />
            ) : (
              /* Idle Right Arm */
              <path d="M 72,72 Q 82,78 78,86" fill="none" stroke="#2A2118" strokeWidth="3.5" strokeLinecap="round" />
            )}

            {/* Feet */}
            <g id="feet">
              <path d="M 42,99 C 42,106 32,106 35,99 Z" fill="#2A2118" />
              <path d="M 58,99 C 58,106 68,106 65,99 Z" fill="#2A2118" />
            </g>

            {/* Gym Headband (accessory) */}
            {outfit === 'gym' && (
              <g id="headband">
                {/* Red band */}
                <path d="M 28,52 Q 50,47 72,52" fill="none" stroke="#E63946" strokeWidth="8" strokeLinecap="round" />
                {/* Stripe */}
                <path d="M 30,52 Q 50,47 70,52" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {/* College Campus Cap (accessory) */}
            {outfit === 'campus' && (
              <g id="college-cap" className="origin-[50px_42px] translate-y-[-4px]">
                {/* Cap Dome */}
                <path d="M 32,46 C 32,32 68,32 68,46 Z" fill="#1D3557" stroke="#2A2118" strokeWidth="1.5" />
                {/* Visor/Brim */}
                <path d="M 26,46 Q 50,41 74,46 L 76,49 Q 50,44 24,49 Z" fill="#C9794B" stroke="#2A2118" strokeWidth="1.5" />
              </g>
            )}

          </g>
        </svg>

        {/* Floating Indicator Click Cue */}
        <span className="absolute bottom-0 right-1/2 translate-x-1/2 bg-[#C9794B] text-[#F8F3E9] text-[9px] font-bold px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Click me!
        </span>
      </div>

      {/* Embedded CSS Animations for SVG */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave-hand {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(35deg); }
        }
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
      `}} />
    </div>
  );
};

export default SprigMascot;
