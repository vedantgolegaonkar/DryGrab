import React from 'react';

const flavorDetails = {
  mung: {
    id: 'mung',
    name: 'Sprouted Mung',
    localName: 'Moong',
    description: 'The ultimate classic sprout. Crisp, slightly sweet, and loaded with essential amino acids. The perfect post-workout morning fuel.',
    protein: '24.2g',
    fiber: '16.5g',
    iron: '6.7mg',
    colorClass: 'from-[#2F6F4E] to-[#1E4D34]',
    glowColor: 'rgba(47,111,78,0.3)',
    borderColor: 'border-[#2F6F4E]',
    textColor: 'text-[#9ED660]',
    badgeBg: 'bg-[#2F6F4E]/20 text-[#2F6F4E]',
    tagline: 'High Protein Hero'
  },
  matki: {
    id: 'matki',
    name: 'Sprouted Matki',
    localName: 'Moth Beans',
    description: 'An ancient Marathwada favorite. Rich, earthy, and highly textured. Extremely rich in calcium, iron, and slow-burning complex carbs.',
    protein: '22.8g',
    fiber: '15.2g',
    iron: '7.8mg',
    colorClass: 'from-[#C9794B] to-[#99552E]',
    glowColor: 'rgba(201,121,75,0.3)',
    borderColor: 'border-[#C9794B]',
    textColor: 'text-[#F8F3E9]',
    badgeBg: 'bg-[#C9794B]/20 text-[#C9794B]',
    tagline: 'Iron Powerhouse'
  },
  chana: {
    id: 'chana',
    name: 'Sprouted Kala Chana',
    localName: 'Brown Chickpeas',
    description: 'Robust, crunchy, and packed with traditional power. Double the fiber of regular chickpeas. Built for gym-goers wanting maximum satiety.',
    protein: '20.1g',
    fiber: '18.6g',
    iron: '5.5mg',
    colorClass: 'from-[#3D2F28] to-[#261E1A]',
    glowColor: 'rgba(61,47,40,0.3)',
    borderColor: 'border-[#3D2F28]',
    textColor: 'text-[#9ED660]',
    badgeBg: 'bg-[#3D2F28]/20 text-[#F8F3E9]',
    tagline: 'Dietary Fiber King'
  },
  chawli: {
    id: 'chawli',
    name: 'Sprouted Chawli',
    localName: 'Black-Eyed Peas',
    description: 'Light, delicate, and easy to digest. Possesses a creamy texture that pairs beautifully with tangy chaat masalas. Travel-ready digestion.',
    protein: '21.5g',
    fiber: '14.0g',
    iron: '6.1mg',
    colorClass: 'from-[#D2B48C] to-[#B3936B]',
    glowColor: 'rgba(210,180,140,0.3)',
    borderColor: 'border-[#D2B48C]',
    textColor: 'text-[#2A2118]',
    badgeBg: 'bg-[#D2B48C]/30 text-[#2A2118]',
    tagline: 'Light & Energizing'
  }
};

const FlavorsScene = ({ activeFlavor = 'mung', setActiveFlavor }) => {
  const current = flavorDetails[activeFlavor] || flavorDetails.mung;

  return (
    <section 
      id="flavors" 
      className="relative min-h-screen py-20 px-6 md:px-12 bg-[#F8F3E9] text-[#2A2118] transition-all duration-700"
    >
      {/* Background Dynamic Blur Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full filter blur-[120px] transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: current.glowColor }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#2F6F4E] font-display text-xs font-bold uppercase tracking-widest bg-[#2F6F4E]/10 px-3 py-1 rounded-full">
            Flagship Range
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#2A2118] mt-4">
            Pick Your Sprout Power
          </h2>
          <p className="text-sm sm:text-base text-[#2A2118]/70 mt-3">
            Choose your legume based on your fitness goals and flavor profile. Every tub comes dehydrated at the height of germination.
          </p>
        </div>

        {/* 4 Flavors Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {Object.values(flavorDetails).map((flavor) => {
            const isSelected = flavor.id === activeFlavor;
            return (
              <button
                key={flavor.id}
                onClick={() => setActiveFlavor(flavor.id)}
                className={`text-left rounded-3xl p-5 md:p-6 transition-all duration-300 transform border-2 flex flex-col justify-between h-[160px] md:h-[220px] shadow-sm select-none ${
                  isSelected 
                    ? `${flavor.borderColor} bg-white scale-[1.03] shadow-md` 
                    : 'border-[#2A2118]/10 bg-white/50 hover:bg-white hover:scale-100'
                }`}
              >
                <div className="w-full">
                  <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${flavor.badgeBg}`}>
                    {flavor.tagline}
                  </span>
                  <h3 className="font-display font-extrabold text-lg md:text-2xl mt-3 text-[#2A2118] leading-tight">
                    {flavor.name}
                  </h3>
                  <p className="text-xs text-[#2A2118]/60 italic font-semibold">
                    ({flavor.localName})
                  </p>
                </div>

                <div className="flex justify-between items-center w-full mt-4 border-t border-black/5 pt-3">
                  <span className="text-[10px] md:text-xs font-bold text-[#2A2118]/70">
                    Protein: {flavor.protein}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: flavor.id === 'mung' ? '#2F6F4E' : flavor.id === 'matki' ? '#C9794B' : flavor.id === 'chana' ? '#3D2F28' : '#D2B48C' }}></span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Details Panel for Selected Flavor */}
        <div className={`w-full rounded-3xl overflow-hidden bg-[#2A2118] text-[#F8F3E9] shadow-xl grid grid-cols-1 lg:grid-cols-5 p-8 gap-8 items-center border border-[#9ED660]/10`}>
          
          <div className="lg:col-span-3 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[#9ED660] animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9ED660]">Active Selection</span>
            </div>
            
            <h3 className="font-display font-black text-3xl sm:text-4xl text-[#F8F3E9] leading-tight">
              {current.name} <span className="text-xs text-white/50 font-normal italic">({current.localName})</span>
            </h3>
            
            <p className="text-sm sm:text-base text-white/80 mt-4 leading-relaxed max-w-xl">
              {current.description}
            </p>
            
            <div className="mt-8 flex gap-4">
              <a 
                href="#shop" 
                className="btn-magnetic bg-[#9ED660] hover:bg-[#9ED660]/90 text-[#16291E] font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition-all text-center"
              >
                Shop {current.name} Bundles
              </a>
              <a 
                href="#reveal" 
                className="btn-magnetic border border-[#F8F3E9]/30 hover:bg-[#F8F3E9]/10 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm transition-all text-center"
              >
                Watch Re-hydration
              </a>
            </div>
          </div>

          {/* Stats Breakdown on Dark Box */}
          <div className="lg:col-span-2 bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col justify-between h-full">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#9ED660] mb-4">
              Nutrition Per 100g (Hydrated)
            </h4>

            <div className="space-y-4">
              {/* Protein */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Plant Protein</span>
                  <span className="text-[#9ED660]">{current.protein}</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#9ED660]" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* Fiber */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Dietary Fiber</span>
                  <span className="text-[#9ED660]">{current.fiber}</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C9794B]" style={{ width: '90%' }}></div>
                </div>
              </div>

              {/* Iron */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Iron</span>
                  <span className="text-[#9ED660]">{current.iron}</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-white/40 mt-6 border-t border-white/10 pt-4 leading-relaxed">
              *Dry Grab patented low-temperature drying locks in these active enzymes. Nutrients match fresh home-sprouted legumes exactly.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FlavorsScene;
