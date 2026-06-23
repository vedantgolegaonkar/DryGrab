import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProblemScene = () => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const word3Ref = useRef(null);
  const resolutionRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinEl = pinRef.current;

    // Timeline for the kinetic typography
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=150%', // Scroll length of pin
        scrub: 1,      // Smooth scrubbing
        pin: pinEl,    // Pin the layout element
        anticipatePin: 1
      }
    });

    // Reset initial styles in JS to avoid flash of unstyled content
    gsap.set([word1Ref.current, word2Ref.current, word3Ref.current, resolutionRef.current], {
      opacity: 0.1,
      scale: 0.85,
      y: 30
    });

    // 1. Word 1: Hungry
    tl.to(word1Ref.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      color: '#9ED660', // Lime Pop
      duration: 1
    })
    .to(word1Ref.current, {
      opacity: 0.1,
      scale: 0.95,
      color: '#F8F3E9',
      duration: 1
    })

    // 2. Word 2: No Stove
    .to(word2Ref.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      color: '#9ED660',
      duration: 1
    }, '-=0.3')
    .to(word2Ref.current, {
      opacity: 0.1,
      scale: 0.95,
      color: '#F8F3E9',
      duration: 1
    })

    // 3. Word 3: No Time
    .to(word3Ref.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      color: '#9ED660',
      duration: 1
    }, '-=0.3')
    .to(word3Ref.current, {
      opacity: 0.1,
      scale: 0.95,
      color: '#F8F3E9',
      duration: 1
    })

    // 4. Resolution Slam-in
    .to(resolutionRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.5,
      ease: 'back.out(1.7)'
    }, '-=0.2');

    return () => {
      // Clean up triggers on unmount
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[250vh] bg-[#16291E] z-30">
      {/* Pinned section */}
      <div 
        ref={pinRef} 
        className="w-full h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-gradient-to-b from-[#16291E] to-[#0d1812]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,111,78,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl w-full flex flex-col gap-6 text-center select-none">
          {/* Typography Beats */}
          <div 
            ref={word1Ref} 
            className="font-display text-6xl sm:text-8xl md:text-9xl font-black tracking-tight"
          >
            HUNGRY?
          </div>
          
          <div 
            ref={word2Ref} 
            className="font-display text-6xl sm:text-8xl md:text-9xl font-black tracking-tight"
          >
            NO STOVE?
          </div>
          
          <div 
            ref={word3Ref} 
            className="font-display text-6xl sm:text-8xl md:text-9xl font-black tracking-tight"
          >
            NO TIME?
          </div>

          {/* Resolution statement */}
          <div 
            ref={resolutionRef} 
            className="mt-8 font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8F3E9] px-4"
          >
            Hunger solved. <br className="sm:hidden" />
            <span className="text-[#9ED660]">Nutrition secured.</span>
          </div>
        </div>

        {/* Scroll tracker helper line */}
        <div className="absolute bottom-12 w-0.5 h-16 bg-white/10 rounded-full overflow-hidden">
          <div className="w-full h-1/2 bg-[#9ED660] animate-[pulse-slow_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default ProblemScene;
