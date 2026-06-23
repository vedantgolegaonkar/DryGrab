import React, { useEffect, useRef, useState } from 'react';
import RevealTubCanvas from './RevealTubCanvas';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Pour',
    description: 'Empty the tub of Dry Grab sprouted legumes into a bowl or cup. The dry sprouts are raw, crunchy, and packed with locked-in nutrients.',
    instruction: 'Pour dry sprouts into bowl'
  },
  {
    number: '02',
    title: 'Just Add Water',
    description: 'Pour hot water directly over the sprouts to submerge them. Cover the top and let the patented steam-hydration process do the magic for 3 minutes.',
    instruction: 'Add hot water & wait 3 min'
  },
  {
    number: '03',
    title: 'Eat & Recharge',
    description: 'Remove the lid. Inhale the warm, savory aroma. Enjoy your freshly hydrated, warm sprouted chana/mung. Travel-ready protein, made instantly.',
    instruction: 'Eat immediately!'
  }
];

const RevealScene = ({ activeFlavor = 'mung' }) => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pinEl = pinRef.current;

    // ScrollTrigger to pin the section and track progress
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=200%', // Total scroll length of pin
      pin: pinEl,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const prog = self.progress;
        setScrollProgress(prog);

        // Map progress to active step (0, 1, or 2)
        if (prog < 0.33) {
          setActiveStep(0);
        } else if (prog < 0.68) {
          setActiveStep(1);
        } else {
          setActiveStep(2);
        }
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#F8F3E9] z-20">
      {/* Pinned Wrapper */}
      <div 
        ref={pinRef} 
        className="w-full h-screen flex items-center px-6 md:px-16 overflow-hidden bg-[radial-gradient(circle_at_70%_50%,rgba(158,214,96,0.12)_0%,transparent_60%)] relative"
      >
        <div className="max-w-7xl w-full mx-auto relative h-full flex flex-col lg:flex-row items-center justify-between">
          
          {/* Left Pane: Pinned 3-Step Texts */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center gap-6 md:gap-8 z-20 py-8 lg:py-0">
            <div>
              <span className="text-[#2F6F4E] font-display text-xs font-bold uppercase tracking-widest bg-[#2F6F4E]/10 px-3 py-1 rounded-full">
                The Prep Ritual
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#2A2118] mt-3">
                How It Works
              </h2>
              <p className="text-sm text-[#2A2118]/70 mt-2">
                No stove. No chopping. Instant fresh protein, anywhere.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`border-l-4 pl-6 transition-all duration-500 ${
                    idx === activeStep 
                      ? 'border-[#2F6F4E] opacity-100 scale-100' 
                      : 'border-black/10 opacity-30 scale-95 origin-left'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-lg text-[#C9794B]">
                      {step.number}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2A2118]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2A2118]/80 mt-2 max-w-md">
                    {step.description}
                  </p>
                  <div className="mt-2 text-xs font-extrabold text-[#2F6F4E] uppercase tracking-wide">
                    {step.instruction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Pane: 3D rotating container (takes full height and 60% width on desktop) */}
          <div className="relative lg:absolute lg:right-0 lg:top-0 w-full lg:w-[60%] h-[45vh] lg:h-full flex justify-center items-center z-10">
            {/* Ambient Background Glow matching the active flavor */}
            <div className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full filter blur-[80px] opacity-40 bg-[#2F6F4E] pointer-events-none" />

            {/* ThreeJS Container */}
            <div className="w-full h-full flex justify-center items-center">
              <RevealTubCanvas scrollProgress={scrollProgress} activeFlavor={activeFlavor} />
            </div>

            {/* Steam instruction tooltip popping up */}
            {activeStep === 1 && (
              <div className="absolute top-6 lg:top-24 bg-[#16291E] text-[#9ED660] font-bold text-xs px-4 py-2 rounded-xl shadow-lg border border-[#9ED660]/20 animate-pulse pointer-events-none z-30">
                ♨ Patented Steam Expanding
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RevealScene;
