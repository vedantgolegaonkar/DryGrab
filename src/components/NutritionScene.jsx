import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ targetValue, suffix, label, desc }) => {
  const [val, setVal] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        // Animate count using GSAP
        const obj = { value: 0 };
        gsap.to(obj, {
          value: targetValue,
          duration: 2.0,
          ease: 'power3.out',
          onUpdate: () => {
            setVal(Math.floor(obj.value));
          }
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [targetValue]);

  return (
    <div 
      ref={elementRef}
      className="bg-[#F8F3E9] border border-[#2A2118]/10 rounded-3xl p-6 md:p-8 shadow-sm text-center relative overflow-hidden"
    >
      {/* Subtle background sprout emblem */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-[#2F6F4E]/5 blur-lg pointer-events-none" />
      
      <div className="font-display font-black text-5xl sm:text-6xl text-[#2F6F4E] tracking-tight">
        {val}
        <span className="text-[#C9794B]">{suffix}</span>
      </div>
      <div className="font-display font-bold text-base text-[#2A2118] mt-3">
        {label}
      </div>
      <div className="text-xs text-[#2A2118]/70 mt-1 leading-relaxed">
        {desc}
      </div>
    </div>
  );
};

const NutritionScene = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const el = chartRef.current;
    
    // Animate the bar widths in the comparison chart on scroll enter
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.comparison-bar'), 
          { width: '0%' }, 
          { width: (i, target) => target.dataset.width, duration: 1.5, ease: 'power3.out', stagger: 0.2 }
        );
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section 
      id="nutrition" 
      className="relative min-h-screen py-20 px-6 md:px-12 bg-[#F8F3E9] text-[#2A2118] flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#2F6F4E] font-display text-xs font-bold uppercase tracking-widest bg-[#2F6F4E]/10 px-3 py-1 rounded-full">
            Nutrition Science
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#2A2118] mt-4">
            Sprouted vs. Processed
          </h2>
          <p className="text-sm sm:text-base text-[#2A2118]/70 mt-3">
            Sprouting unlocks locked seed nutrients, making them highly digestible, bioavailable, and incredibly rich in plant fiber.
          </p>
        </div>

        {/* Stat Counters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <StatCard 
            targetValue={226} 
            suffix="%" 
            label="More Dietary Fiber" 
            desc="Sprouting breaks down complex starch, boosting prebiotic fibers that nourish your gut biome."
          />
          <StatCard 
            targetValue={22} 
            suffix="g" 
            label="Plant Protein Per Tub" 
            desc="Clean, slow-release protein derived from raw whole legumes. No isolates, no powders."
          />
          <StatCard 
            targetValue={12} 
            suffix=" Mo" 
            label="Nutrient Shelf Life" 
            desc="Our patented flash dehydration preserves the sprouts at peak germination without chemicals."
          />
        </div>

        {/* Comparison Chart Container */}
        <div 
          ref={chartRef}
          className="bg-[#2A2118]/5 rounded-3xl p-8 border border-[#2A2118]/10"
        >
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2A2118] mb-8 text-center md:text-left">
            Legume Snacking vs. The Rest
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left side: Fiber Comparison */}
            <div>
              <h4 className="font-display font-bold text-sm text-[#2A2118]/80 mb-6 uppercase tracking-wider">
                Fiber Content (per 100g)
              </h4>
              <div className="space-y-6">
                {/* Dry Grab */}
                <div>
                  <div className="flex justify-between text-sm font-bold mb-1.5">
                    <span className="text-[#2F6F4E]">Dry Grab (Sprouted Matki/Mung)</span>
                    <span>16.5g</span>
                  </div>
                  <div className="w-full bg-[#2A2118]/15 h-3.5 rounded-full overflow-hidden">
                    <div 
                      className="comparison-bar h-full bg-[#2F6F4E] rounded-full" 
                      data-width="100%" 
                    />
                  </div>
                </div>

                {/* Potato Chips */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-1.5 opacity-70">
                    <span>Potato Chips (Processed)</span>
                    <span>3.2g</span>
                  </div>
                  <div className="w-full bg-[#2A2118]/15 h-3.5 rounded-full overflow-hidden">
                    <div 
                      className="comparison-bar h-full bg-[#C9794B] rounded-full" 
                      data-width="19%" 
                    />
                  </div>
                </div>

                {/* Whey Isolates */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-1.5 opacity-70">
                    <span>Whey Protein Powder</span>
                    <span>0g (synthetic isolate)</span>
                  </div>
                  <div className="w-full bg-[#2A2118]/15 h-3.5 rounded-full overflow-hidden">
                    <div 
                      className="comparison-bar h-full bg-slate-400 rounded-full" 
                      data-width="2%" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Digestion & Prep Comparison */}
            <div className="flex flex-col justify-between">
              <h4 className="font-display font-bold text-sm text-[#2A2118]/80 mb-6 uppercase tracking-wider">
                Whole-Food Advantage
              </h4>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2F6F4E]/10 text-[#2F6F4E] flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                  <div>
                    <span className="font-bold">Sprouting breaks down Phytic Acid:</span> Legumes lock up minerals. Sprouting activates enzymes that break down these anti-nutrients, raising absorption of iron and zinc by up to 3x.
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2F6F4E]/10 text-[#2F6F4E] flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                  <div>
                    <span className="font-bold">Low Glycemic Index:</span> Slow complex carbohydrates provide steady energy for 4-5 hours. Ideal for student focus, long road trips, and fitness performance.
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2F6F4E]/10 text-[#2F6F4E] flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                  <div>
                    <span className="font-bold">Pure Sprout Whole-Food:</span> Unlike synthetic bars filled with glycerin, chicory root, and sugar alcohols that bloat your stomach, Dry Grab contains only sprouted legumes and natural spices.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default NutritionScene;
