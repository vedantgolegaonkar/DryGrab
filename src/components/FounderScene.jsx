import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FounderScene = () => {
  const containerRef = useRef(null);
  const bubble1Ref = useRef(null);
  const bubble2Ref = useRef(null);
  const portrait1Ref = useRef(null);
  const portrait2Ref = useRef(null);

  useEffect(() => {
    const el = containerRef.current;

    // Timeline to scale and bounce the speech bubbles when scrolled in
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo([portrait1Ref.current, portrait2Ref.current],
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)', stagger: 0.2 }
    )
    .fromTo([bubble1Ref.current, bubble2Ref.current],
      { scale: 0, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.15 },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="story" 
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[#F8F3E9] text-[#2A2118] flex flex-col justify-center overflow-hidden"
    >
      {/* Background warm clay texture wisp */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#C9794B]/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#2F6F4E]/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[#C9794B] font-display text-xs font-bold uppercase tracking-widest bg-[#C9794B]/10 px-3 py-1 rounded-full">
            Our Origin Story
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#2A2118] mt-4">
            Founded in Aurangabad
          </h2>
          <div className="flex justify-center items-center gap-1.5 text-xs font-bold text-[#C9794B] mt-2">
            <MapPin size={14} />
            <span>Aurangabad, Maharashtra, India</span>
          </div>
        </div>

        {/* Narrative layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Story text */}
          <div className="space-y-6">
            <h3 className="font-display font-extrabold text-xl sm:text-3xl text-[#2A2118] leading-tight">
              Legumes as they should be: <br />
              <span className="text-[#C9794B]">Whole, Sprouted, and Raw.</span>
            </h3>
            
            <p className="text-xs sm:text-sm text-[#2A2118]/80 leading-relaxed">
              As fitness enthusiasts and frequent travelers, siblings **Amit and Aradhya Kulkarni** struggled to find clean protein snacks on the go. Protein shakes bloated their stomachs, and energy bars were packed with emulsifiers and artificial sweeteners. 
            </p>
            <p className="text-xs sm:text-sm text-[#2A2118]/80 leading-relaxed">
              They turned to India’s traditional breakfast — sprouted lentils. Combining Amit’s athletic background and Aradhya’s expertise in agricultural processing, they developed a patented low-temperature drying system that retains 12 months of shelf-life while keeping sprout enzymes, fiber, and protein fully active.
            </p>
            <p className="text-xs sm:text-sm text-[#2A2118]/80 leading-relaxed">
              "We don’t isolate protein, we keep the legume whole. Sprout Squad is about eating food that is alive, travel-ready, and honest."
            </p>

            <div className="pt-6 border-t border-[#C9794B]/10 flex items-center gap-4">
              <div className="text-center py-2 px-4 bg-[#C9794B]/10 rounded-2xl">
                <span className="font-display font-black text-2xl text-[#C9794B] block">12M</span>
                <span className="text-[10px] uppercase font-bold text-[#2A2118]/70">Shelf Stability</span>
              </div>
              <div className="text-center py-2 px-4 bg-[#2F6F4E]/10 rounded-2xl">
                <span className="font-display font-black text-2xl text-[#2F6F4E] block">100%</span>
                <span className="text-[10px] uppercase font-bold text-[#2A2118]/70">Zero Preservatives</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Avatars & Quotes */}
          <div className="space-y-12">
            
            {/* Founder 1: Amit */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div 
                ref={portrait1Ref}
                className="w-24 h-24 rounded-full bg-[#C9794B] border-4 border-white flex justify-center items-center shadow-md shrink-0 overflow-hidden"
              >
                {/* Amit Avatar SVG */}
                <svg viewBox="0 0 100 100" className="w-20 h-20 mt-2">
                  <circle cx="50" cy="80" r="30" fill="#2A2118" />
                  <circle cx="50" cy="40" r="20" fill="#F8F3E9" />
                  {/* Hair / athletic vibe */}
                  <path d="M 30,40 Q 50,20 70,40 L 65,30 Q 50,15 35,30 Z" fill="#2A2118" />
                  <rect x="35" y="32" width="30" height="4" fill="#9ED660" /> {/* Sweatband */}
                  {/* Smile */}
                  <path d="M 45,46 Q 50,50 55,46" stroke="#2A2118" strokeWidth="2" fill="none" />
                </svg>
              </div>

              {/* Quote bubble 1 */}
              <div 
                ref={bubble1Ref}
                className="relative bg-white border border-[#C9794B]/20 rounded-2xl p-5 shadow-sm text-xs sm:text-sm leading-relaxed"
              >
                <div className="absolute hidden sm:block -left-2.5 top-8 w-4 h-4 bg-white border-l border-b border-[#C9794B]/20 transform rotate-45"></div>
                <div className="font-bold text-[#C9794B] mb-1">Amit Kulkarni, Co-Founder</div>
                "Clean eating shouldn't stop because you are traveling or in a hurry. Our tubs make high-protein sprouts as accessible as a bag of chips, but with zero guilt."
              </div>
            </div>

            {/* Founder 2: Aradhya */}
            <div className="flex flex-col sm:flex-row-reverse items-center gap-6">
              <div 
                ref={portrait2Ref}
                className="w-24 h-24 rounded-full bg-[#2F6F4E] border-4 border-white flex justify-center items-center shadow-md shrink-0 overflow-hidden"
              >
                {/* Aradhya Avatar SVG */}
                <svg viewBox="0 0 100 100" className="w-20 h-20 mt-2">
                  <circle cx="50" cy="80" r="30" fill="#2A2118" />
                  <circle cx="50" cy="40" r="18" fill="#F8F3E9" />
                  {/* Glasses & Hair */}
                  <path d="M 30,35 C 28,15 72,15 70,35 Z" fill="#2A2118" />
                  <rect x="37" y="36" width="10" height="6" fill="none" stroke="#2A2118" strokeWidth="2" />
                  <rect x="53" y="36" width="10" height="6" fill="none" stroke="#2A2118" strokeWidth="2" />
                  <line x1="47" y1="39" x2="53" y2="39" stroke="#2A2118" strokeWidth="2" />
                  {/* Smile */}
                  <path d="M 46,46 Q 50,51 54,46" stroke="#2A2118" strokeWidth="2" fill="none" />
                </svg>
              </div>

              {/* Quote bubble 2 */}
              <div 
                ref={bubble2Ref}
                className="relative bg-white border border-[#2F6F4E]/20 rounded-2xl p-5 shadow-sm text-xs sm:text-sm leading-relaxed"
              >
                <div className="absolute hidden sm:block -right-2.5 top-8 w-4 h-4 bg-white border-r border-t border-[#2F6F4E]/20 transform rotate-45"></div>
                <div className="font-bold text-[#2F6F4E] mb-1">Aradhya Kulkarni, Food Technologist</div>
                "Traditional sun-drying strips lentils of active enzymes. Our steam-stabilized dehydration traps sprout fibers at peak germination, maintaining raw digestive goodness."
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FounderScene;
