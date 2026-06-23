import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Gift, Sparkles } from 'lucide-react';

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

const reviews = [
  {
    name: 'Vikram Singh',
    role: 'Sahyadri Trek Guide',
    rating: 5,
    content: "I pack the Gym Bundle for all my mountain treks now. They weigh next to nothing, and I just ask the village dhabas for hot water. High protein and raw fibers keep the team energized."
  },
  {
    name: 'Priya Rajan',
    role: 'Sports Nutritionist',
    rating: 5,
    content: "Most D2C brands sell chemical isolates that bloat the gut. Dry Grab is the first brand keeping sprouted matki and mung whole, locking in raw enzymes. I recommend this to all my gym clients."
  },
  {
    name: 'Manish Kulkarni',
    role: 'Daily Gym-goer',
    rating: 5,
    content: "No stove and no prep in the morning makes this the ultimate breakfast hack. Sprouted Kala Chana has an amazing crunch and keeps me full all the way until lunchtime."
  }
];

const mockInstaPosts = [
  {
    handle: '@himalayan_wanderer',
    caption: 'Water boiled on my pocket stove, sprouts hydrated in 3 minutes. Peak breakfast views! 🏔️ #SproutSquad #DryGrab',
    likes: 245,
    tag: 'Traveler',
    color: 'from-amber-200 to-orange-400'
  },
  {
    handle: '@fit_sneha',
    caption: 'Swapped my post-workout whey isolate shakes for sprouted mung. Say goodbye to bloating and stomach cramps! 💪 #CleanFuel',
    likes: 412,
    tag: 'Fitness',
    color: 'from-green-200 to-emerald-400'
  },
  {
    handle: '@hostel_survivor',
    caption: 'Late night exam cramming. Boiler kettle ready, matki sprouts covered and prepped. Bye-bye junk instant noodles! 📚 #HostelLife',
    likes: 189,
    tag: 'Campus',
    color: 'from-blue-200 to-indigo-400'
  }
];

const SquadScene = () => {
  const [activeReview, setActiveReview] = useState(0);

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section 
      id="squad" 
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[#F8F3E9] text-[#2A2118] flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#2F6F4E] font-display text-xs font-bold uppercase tracking-widest bg-[#2F6F4E]/10 px-3 py-1 rounded-full">
            Sprout Squad
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#2A2118] mt-4">
            Loved By Active Minds
          </h2>
          <p className="text-sm sm:text-base text-[#2A2118]/70 mt-3">
            Join the Sprout Squad of fitness enthusiasts, college hostelers, and mountain travelers eating smart.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-[#2A2118]/10 shadow-sm mb-16">
          {/* Quotes Icon */}
          <div className="absolute top-6 left-6 text-[#2F6F4E]/15 font-serif text-8xl leading-none select-none pointer-events-none">
            “
          </div>
          
          <div className="relative z-10">
            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(reviews[activeReview].rating)].map((_, i) => (
                <Star key={i} size={18} fill="#9ED660" stroke="#9ED660" />
              ))}
            </div>

            {/* Content */}
            <p className="text-sm sm:text-lg text-center font-medium leading-relaxed italic text-[#2A2118]/90">
              "{reviews[activeReview].content}"
            </p>

            {/* Author */}
            <div className="text-center mt-8">
              <h4 className="font-display font-bold text-base text-[#2F6F4E]">
                {reviews[activeReview].name}
              </h4>
              <span className="text-xs text-[#2A2118]/60">
                {reviews[activeReview].role}
              </span>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevReview}
              className="w-10 h-10 rounded-full border border-[#2A2118]/10 flex items-center justify-center hover:bg-[#2F6F4E] hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextReview}
              className="w-10 h-10 rounded-full border border-[#2A2118]/10 flex items-center justify-center hover:bg-[#2F6F4E] hover:text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Instagram/UGC Mock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {mockInstaPosts.map((post, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#2A2118]/10 rounded-2xl overflow-hidden hover:shadow-md transition-all group"
            >
              {/* Image Placeholder with high gradient */}
              <div className={`h-48 bg-gradient-to-tr ${post.color} flex justify-center items-center relative overflow-hidden`}>
                <div className="absolute top-3 left-3 bg-[#16291E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {post.tag}
                </div>
                <InstagramIcon size={40} className="text-white opacity-40 group-hover:scale-110 transition-transform" />
              </div>
              
              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-bold text-[#2A2118] mb-2">
                  <span>{post.handle}</span>
                  <span className="text-[#C9794B]">♥ {post.likes} likes</span>
                </div>
                <p className="text-xs text-[#2A2118]/70 leading-relaxed">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Loyalty Program Perks Card */}
        <div className="w-full rounded-3xl bg-[#16291E] text-[#F8F3E9] p-8 md:p-12 border border-[#9ED660]/10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-[#9ED660]">
              <Sparkles size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Sprout Squad Loyalty Program</span>
            </div>
            
            <h3 className="font-display font-black text-2xl sm:text-3xl leading-tight">
              Eat Healthy. Get Rewarded.
            </h3>
            
            <p className="text-xs sm:text-sm text-[#F8F3E9]/80 leading-relaxed max-w-xl">
              Join the squad today and earn points automatically. Every tub purchases fuels your wallet, giving you direct access to member-only benefits.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <Award size={24} className="text-[#9ED660] mx-auto mb-2" />
              <span className="font-bold text-xs block text-white">10% Back</span>
              <span className="text-[9px] text-white/50">Cash-back on orders</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <Gift size={24} className="text-[#C9794B] mx-auto mb-2" />
              <span className="font-bold text-xs block text-white">VIP Flavors</span>
              <span className="text-[9px] text-white/50">Lobia & Green Pea beta</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SquadScene;
