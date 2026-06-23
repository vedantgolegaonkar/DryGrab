import React, { useState } from 'react';
import { ShoppingCart, MessageCircle, Check, ShieldCheck } from 'lucide-react';

const ShopScene = ({ activeFlavor = 'mung', onWhatsAppRedirect }) => {
  const [selectedSingleFlavor, setSelectedSingleFlavor] = useState(activeFlavor);
  const [gymPackMix, setGymPackMix] = useState('mixed'); // mixed, all-mung, all-matki, all-chana, all-chawli

  // WhatsApp numbers & messages config
  const WHATSAPP_NUMBER = '919307472945'; // Aurangabad office contact number from brochure

  const triggerOrder = (item) => {
    let message = '';
    if (item === 'single') {
      const flavorName = selectedSingleFlavor.toUpperCase();
      message = `Hey Dry Grab! I'd like to order a Single Tub of Sprouted ${flavorName} (₹250). Please send payment details!`;
    } else if (item === 'gym') {
      let mixText = 'Mixed Pack (2 Mung, 2 Matki, 2 Chana)';
      if (gymPackMix === 'all-mung') mixText = 'All Mung Sprouts';
      if (gymPackMix === 'all-matki') mixText = 'All Matki Sprouts';
      if (gymPackMix === 'all-chana') mixText = 'All Kala Chana';
      if (gymPackMix === 'all-chawli') mixText = 'All Chawli Sprouts';
      if (gymPackMix === 'all-vaal') mixText = 'All Bitter Field';
      if (gymPackMix === 'all-mix') mixText = 'All Mix Beans';
      message = `Hey Dry Grab! I want to order the Gym Pack (6-tub bundle, ₹1250) with the following flavor selection: ${mixText}. Please confirm my order!`;
    } else if (item === 'subscription') {
      message = `Hey Dry Grab! I would like to subscribe to the Monthly Sprout Squad Plan (₹999/month). Let me know how to start!`;
    }

    const encoded = encodeURIComponent(message);
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(link, '_blank');
    if (onWhatsAppRedirect) onWhatsAppRedirect();
  };

  return (
    <section 
      id="shop" 
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[#16291E] text-[#F8F3E9] flex flex-col justify-center overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[#2F6F4E]/10 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-[#9ED660]/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#9ED660] font-display text-xs font-bold uppercase tracking-widest bg-[#9ED660]/10 px-3 py-1 rounded-full border border-[#9ED660]/20">
            Fresh Batches Daily
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-4">
            Stock Your Pantry
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-3">
            Hand-prepared and dehydrated at our headquarters in Aurangabad. Ready to ship across India.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Single Tub */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-[#2F6F4E] transition-all relative">
            <div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Individual Tryout</span>
              <h3 className="font-display font-bold text-2xl text-white">Single Tub</h3>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">Perfect for first-timers to discover their favorite legume.</p>
              
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display font-black text-4xl text-white">₹250</span>
                <span className="text-xs text-white/40">/ tub</span>
              </div>

              {/* Flavor Customizer */}
              <div className="mt-6">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider block mb-2">Select Sprout Flavor</label>
                <select 
                  value={selectedSingleFlavor}
                  onChange={(e) => setSelectedSingleFlavor(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#9ED660]"
                >
                  <option value="mung" className="bg-[#16291E]">Sprouted Mung (Moong)</option>
                  <option value="matki" className="bg-[#16291E]">Sprouted Matki (Moth)</option>
                  <option value="chana" className="bg-[#16291E]">Sprouted Black Pea (Chana)</option>
                  <option value="chawli" className="bg-[#16291E]">Sprouted Black Eyed (Chawli)</option>
                  <option value="vaal" className="bg-[#16291E]">Sprouted Bitter Field (Vaal)</option>
                  <option value="mix" className="bg-[#16291E]">Sprouted Mix Beans (All-in-One)</option>
                </select>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-white/80">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#9ED660] shrink-0" />
                  <span>Holds 3 hydrated servings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#9ED660] shrink-0" />
                  <span>12 months pantry shelf stability</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#9ED660] shrink-0" />
                  <span>Comes with spice seasoning packet</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => triggerOrder('single')}
              className="btn-magnetic w-full mt-8 bg-white/10 hover:bg-white hover:text-[#16291E] text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle size={16} />
              <span>Order on WhatsApp</span>
            </button>
          </div>

          {/* Card 2: Gym Pack (Bestseller) */}
          <div className="bg-[#2F6F4E]/30 border-2 border-[#9ED660] rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:scale-[1.02] transition-all relative">
            {/* Bestseller Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#9ED660] text-[#16291E] font-display font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
              👑 BEST VALUE (SAVE 16%)
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#9ED660] uppercase tracking-widest block mb-2">Gym Bag Essential</span>
              <h3 className="font-display font-bold text-2xl text-white">Gym Pack (6 Tubs)</h3>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">Built for gym-goers wanting pre-workout whole nutrition or student travel boxes.</p>
              
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display font-black text-4xl text-white">₹1250</span>
                <span className="text-xs text-white/50 line-through">₹1500</span>
                <span className="text-xs text-[#9ED660] font-bold">(1 Tub Free)</span>
              </div>

              {/* Flavor Selector */}
              <div className="mt-6">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider block mb-2">Choose Bundle Mix</label>
                <select 
                  value={gymPackMix}
                  onChange={(e) => setGymPackMix(e.target.value)}
                  className="w-full bg-white/10 border border-[#9ED660]/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#9ED660]"
                >
                  <option value="mixed" className="bg-[#16291E]">Mixed Pack (2 Mung, 2 Matki, 2 Chana)</option>
                  <option value="all-mung" className="bg-[#16291E]">All Mung Pack</option>
                  <option value="all-matki" className="bg-[#16291E]">All Matki Pack</option>
                  <option value="all-chana" className="bg-[#16291E]">All Kala Chana Pack</option>
                  <option value="all-chawli" className="bg-[#16291E]">All Chawli Pack</option>
                  <option value="all-vaal" className="bg-[#16291E]">All Bitter Field Pack</option>
                  <option value="all-mix" className="bg-[#16291E]">All Mix Beans Pack</option>
                </select>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-white">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#9ED660] shrink-0" />
                  <span>Get 6 Tubs + Spice Seasoning Mix</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#9ED660] shrink-0" />
                  <span className="font-bold text-[#9ED660]">FREE premium mesh travel bag</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#9ED660] shrink-0" />
                  <span>Free shipping across Maharashtra</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => triggerOrder('gym')}
              className="btn-magnetic w-full mt-8 bg-[#9ED660] hover:bg-[#9ED660]/90 text-[#16291E] font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle size={16} />
              <span>Order on WhatsApp</span>
            </button>
          </div>

          {/* Card 3: Subscription */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-[#2F6F4E] transition-all relative">
            <div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Automated Fuel</span>
              <h3 className="font-display font-bold text-2xl text-white">Monthly Squad Sub</h3>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">Never run out. Fresh batches delivered to your door every 30 days.</p>
              
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display font-black text-4xl text-white">₹999</span>
                <span className="text-xs text-white/40">/ month</span>
              </div>

              <ul className="mt-6 space-y-3 text-xs text-white/80 pt-6">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#9ED660] shrink-0" />
                  <span>4 Tubs of choice sent monthly</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#9ED660] shrink-0" />
                  <span>VIP invitations to Aurangabad farm tours</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#9ED660] shrink-0" />
                  <span>Cancel, pause, or swap flavor anytime</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => triggerOrder('subscription')}
              className="btn-magnetic w-full mt-8 bg-white/10 hover:bg-white hover:text-[#16291E] text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle size={16} />
              <span>Subscribe on WhatsApp</span>
            </button>
          </div>

        </div>

        {/* Safety trust badge */}
        <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-6 text-xs text-white/60 border-t border-white/10 pt-8">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-[#9ED660]" />
            <span>FSSAI Certified Local Prep</span>
          </div>
          <div className="hidden sm:block text-white/20">|</div>
          <div>No chemical stabilizers or preservatives added.</div>
          <div className="hidden sm:block text-white/20">|</div>
          <div>100% Sprouted Whole Indian Legumes.</div>
        </div>

      </div>
    </section>
  );
};

export default ShopScene;
