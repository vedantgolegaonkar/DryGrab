import React from 'react';
import { Dumbbell, GraduationCap, PlaneTakeoff, ShieldAlert } from 'lucide-react';

const personaData = {
  gym: {
    id: 'gym',
    title: 'Gym-Goers & Athletes',
    badge: 'Clean Post-Workout Fuel',
    tagline: 'Skip the isolates. Feed muscles real food.',
    description: 'Throw a tub of Dry Grab in your gym bag. The moment your workout finishes, just add warm water at the water station. You get 22g+ of whole-food amino acids, complex carbs for glycogen replenishment, and high fiber to prevent digestion issues associated with processed whey isolate powders.',
    quote: '"Finally, a post-workout carb+protein that is whole-food, not chemical powder!"',
    quoteAuthor: 'Kabir D., Aurangabad Powerlifter',
    highlightStats: '22g Protein • Slow-release Carbs',
    colorTheme: 'text-[#9ED660]',
    bgColor: 'rgba(158,214,96,0.08)',
    accentBg: 'bg-[#9ED660]/20 text-[#16291E]',
    illustration: (
      <svg viewBox="0 0 100 100" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-md">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#2F6F4E" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="25" y="47" width="50" height="6" rx="3" fill="#2A2118" />
        <circle cx="20" cy="50" r="10" fill="#C9794B" />
        <circle cx="80" cy="50" r="10" fill="#C9794B" />
        <rect x="18" y="40" width="4" height="20" rx="2" fill="#2A2118" />
        <rect x="78" y="40" width="4" height="20" rx="2" fill="#2A2118" />
        <circle cx="50" cy="30" r="5" fill="#9ED660" />
      </svg>
    )
  },
  campus: {
    id: 'campus',
    title: 'College Campus & Hostel Hacks',
    badge: 'Hostel Focus Food',
    tagline: 'Ditch the MSG-loaded instant noodles.',
    description: 'Hostel food is either oily or low-protein, and instant noodles block your digestion. Dry Grab is the ultimate midnight study companion. Needs zero stoves — just add boiling water from your electric kettle. High fiber keeps you full, and low-GI legumes prevent sugar crashes so you stay focused through your exams.',
    quote: '"No cook setup, fits in my drawer, and takes 3 minutes. Saving my semester!"',
    quoteAuthor: 'Ananya S., College Student',
    highlightStats: '100% Zero-Prep • Steady Energy',
    colorTheme: 'text-[#C9794B]',
    bgColor: 'rgba(201,121,75,0.08)',
    accentBg: 'bg-[#C9794B]/20 text-[#2A2118]',
    illustration: (
      <svg viewBox="0 0 100 100" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-md">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#2F6F4E" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="20" y="60" width="60" height="8" rx="2" fill="#2A2118" />
        <rect x="25" y="52" width="50" height="8" rx="2" fill="#C9794B" />
        <rect x="35" y="44" width="30" height="8" rx="2" fill="#2F6F4E" />
        <path d="M 50,36 L 50,22 L 65,28 Z" fill="#9ED660" stroke="#2A2118" strokeWidth="2" />
        <circle cx="50" cy="22" r="3" fill="#2A2118" />
      </svg>
    )
  },
  travel: {
    id: 'travel',
    title: 'Adventurers & Travelers',
    badge: 'Adventure-Proof Protein',
    tagline: 'Light bag, full stomach. Anywhere in the world.',
    description: 'Whether trekking in the Sahyadris or on an overnight train, finding clean, hygienic high-protein food is a challenge. Dry Grab is packed in watertight, ultra-durable plastic tubs that hook onto your pack. Just ask flight attendants or tea stalls for hot water. 12-month shelf life means it goes wherever you go.',
    quote: '"Hygienic protein meals on hikes used to be heavy tins. Dry Grab changed everything."',
    quoteAuthor: 'Rohan K., Solo Backpacker',
    highlightStats: 'Lightweight Tub • 12M Shelf-Life',
    colorTheme: 'text-[#2F6F4E]',
    bgColor: 'rgba(47,111,78,0.08)',
    accentBg: 'bg-[#2F6F4E]/20 text-[#F8F3E9]',
    illustration: (
      <svg viewBox="0 0 100 100" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-md">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#2A2118" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 15,75 L 40,35 L 60,65 L 75,45 L 90,75 Z" fill="#C9794B" stroke="#2A2118" strokeWidth="2" />
        <circle cx="70" cy="25" r="8" fill="#9ED660" />
        <path d="M 25,75 C 35,70 65,70 75,75" stroke="#2A2118" strokeWidth="3" fill="none" />
      </svg>
    )
  }
};

const AudienceScene = ({ activePersona = 'gym', setActivePersona }) => {
  const current = personaData[activePersona] || personaData.gym;

  return (
    <section 
      id="audience" 
      className="relative min-h-screen py-20 px-6 md:px-12 bg-[#F8F3E9] text-[#2A2118] flex flex-col justify-center transition-all duration-500"
      style={{ backgroundColor: activePersona === 'gym' ? '#F8F3E9' : activePersona === 'campus' ? '#FBF9F5' : '#F6F8F6' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#2F6F4E] font-display text-xs font-bold uppercase tracking-widest bg-[#2F6F4E]/10 px-3 py-1 rounded-full">
            Target Audience
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#2A2118] mt-4">
            Built For Your Active Life
          </h2>
          <p className="text-sm sm:text-base text-[#2A2118]/70 mt-3">
            Choose your profile below to see how Dry Grab seamlessly fits into your daily routine and lifestyle.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-2 md:gap-4 mb-16 max-w-lg mx-auto bg-[#2A2118]/5 p-2 rounded-full border border-[#2A2118]/10">
          <button
            onClick={() => setActivePersona('gym')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-display font-bold text-xs sm:text-sm transition-all duration-300 ${
              activePersona === 'gym' 
                ? 'bg-[#2F6F4E] text-white shadow-md' 
                : 'text-[#2A2118]/60 hover:text-[#2A2118]'
            }`}
          >
            <Dumbbell size={16} />
            <span className="hidden sm:inline">Gym</span>
          </button>
          
          <button
            onClick={() => setActivePersona('campus')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-display font-bold text-xs sm:text-sm transition-all duration-300 ${
              activePersona === 'campus' 
                ? 'bg-[#2F6F4E] text-white shadow-md' 
                : 'text-[#2A2118]/60 hover:text-[#2A2118]'
            }`}
          >
            <GraduationCap size={16} />
            <span className="hidden sm:inline">Campus</span>
          </button>
          
          <button
            onClick={() => setActivePersona('travel')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-display font-bold text-xs sm:text-sm transition-all duration-300 ${
              activePersona === 'travel' 
                ? 'bg-[#2F6F4E] text-white shadow-md' 
                : 'text-[#2A2118]/60 hover:text-[#2A2118]'
            }`}
          >
            <PlaneTakeoff size={16} />
            <span className="hidden sm:inline">Travel</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div 
          className="rounded-3xl p-8 md:p-12 border border-[#2A2118]/10 shadow-sm grid grid-cols-1 lg:grid-cols-5 gap-12 items-center transition-all duration-500"
          style={{ backgroundColor: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}
        >
          
          {/* Left / Top - Text and stats */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <span className={`text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${current.accentBg}`}>
                {current.badge}
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[#2A2118] mt-4 leading-tight">
                {current.title}
              </h3>
              <p className="text-sm font-bold text-[#C9794B] mt-1.5">
                {current.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#2A2118]/80 leading-relaxed">
              {current.description}
            </p>

            {/* Testimonial Quote */}
            <div className="border-l-2 border-[#2F6F4E] pl-4 italic">
              <p className="text-xs text-[#2A2118]/80">
                {current.quote}
              </p>
              <span className="text-[10px] font-bold text-[#2F6F4E] block mt-1 not-italic">
                — {current.quoteAuthor}
              </span>
            </div>

            {/* Micro Stats */}
            <div className="pt-4 border-t border-[#2A2118]/5 flex items-center justify-between">
              <span className="text-xs font-black text-[#2A2118] uppercase tracking-wider">
                Key Vibe:
              </span>
              <span className="text-xs font-extrabold text-[#2F6F4E] bg-[#2F6F4E]/10 px-3 py-1 rounded-full">
                {current.highlightStats}
              </span>
            </div>
          </div>

          {/* Right / Bottom - Graphic Illustration */}
          <div className="lg:col-span-2 flex justify-center items-center">
            <div className="relative p-6 rounded-full bg-white shadow-inner">
              {current.illustration}
              {/* Outfit tag alert */}
              <div className="absolute -bottom-4 right-1/2 translate-x-1/2 bg-[#2A2118] text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9ED660]"></span>
                Sprig changed outfits!
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AudienceScene;
