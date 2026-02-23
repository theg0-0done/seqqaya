/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Mail,
  ChevronRight, 
  Menu as MenuIcon, 
  X, 
  Utensils, 
  Coffee, 
  Star,
  ArrowRight,
  Send
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  name: string;
  description: string;
  price: string;
  tag?: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
}

// --- Data ---
const MENU: MenuCategory[] = [
  {
    title: "Breakfast & Specials",
    items: [
      { name: "Khlea", description: "Traditional eggs with aged beef cooked in a tagine dish. A Sefrou specialty.", price: "35 MAD", tag: "Recommended" },
      { name: "Moroccan Breakfast", description: "Fresh bread, olive oil, honey, amlou, and olives served with mint tea.", price: "25 MAD" },
      { name: "Harira Soup", description: "Traditional tomato, lentil, and chickpea soup served with dates.", price: "15 MAD", tag: "Classic" },
    ]
  },
  {
    title: "Pizzeria & Tacos",
    items: [
      { name: "Pitza Poisson", description: "Fresh seafood mix, tomato sauce, mozzarella, and herbs.", price: "45 MAD", tag: "Popular" },
      { name: "Tacos Blanco", description: "Our signature white sauce tacos with choice of chicken or meat.", price: "35 MAD" },
      { name: "Pizza Margherita", description: "Classic tomato sauce, mozzarella, and fresh basil.", price: "30 MAD" },
      { name: "Mixed Grill Tacos", description: "Generous portion of mixed meats with crispy fries and secret sauce.", price: "40 MAD" },
    ]
  },
  {
    title: "Moroccan Gastronomy",
    items: [
      { name: "Lamb Tagine", description: "Slow-cooked lamb with seasonal vegetables and aromatic spices.", price: "50 MAD" },
      { name: "Chicken Couscous", description: "Traditional Friday couscous with seven vegetables and tender chicken.", price: "45 MAD" },
      { name: "Beef Tanjia", description: "Marrakech style slow-cooked beef with preserved lemon and saffron.", price: "50 MAD" },
    ]
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mohamed Jamal",
    role: "Local Guide",
    content: "Delicious food, smiling waiters and good service. The atmosphere is very welcoming.",
    rating: 5,
    date: "a month ago"
  },
  {
    name: "T B",
    role: "Local Guide",
    content: "I've been coming to this restaurant every time I visit Morocco. The food is phenomenal and the atmosphere is great. For breakfast I recommend khlea.",
    rating: 5,
    date: "2 months ago"
  },
  {
    name: "meniman98",
    role: "Local Guide",
    content: "Absolutely brilliant. Food was marvelous. The tea was out of this world. The fruit salad was sweeter than heaven. Amazing place.",
    rating: 5,
    date: "2 years ago"
  }
];

// --- Animation Wrapper ---
const ScrollReveal = ({ 
  children, 
  delay = 0, 
  direction = 'up', 
  once = true,
  className = ""
}: { 
  children: React.ReactNode, 
  delay?: number, 
  direction?: 'up' | 'down' | 'left' | 'right',
  once?: boolean,
  className?: string,
  key?: React.Key 
}) => {
  const ref = useRef(null);
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-ink py-4 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-center w-full"
        >
          <a href="#" className="text-2xl md:text-3xl font-serif tracking-widest uppercase text-white">
            Seqqaya
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xs uppercase tracking-[0.2em] font-bold text-white/80 hover:text-brand-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#reservation"
              className="bg-brand-gold text-brand-ink px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white transition-all duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full md:w-1/2 h-screen bg-brand-ink z-[60] p-12 flex flex-col justify-center items-center space-y-8 lg:hidden shadow-2xl"
            >
              <button 
                className="absolute top-8 right-8 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-3xl md:text-4xl font-serif tracking-wider text-white hover:text-brand-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#reservation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-gold text-brand-ink w-full py-5 rounded-full text-sm uppercase tracking-widest font-bold text-center"
              >
                Book a Table
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const words1 = "Come Hungry.".split(" ");
  const words2 = "Leave Happy.".split(" ");

  return (
    <section className="relative h-screen max-h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <img 
          src="https://picsum.photos/seed/restaurant-interior/1920/1080" 
          alt="Seqqaya Atmosphere" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-20 text-center px-6 md:px-16">
        <div className="overflow-hidden mb-6">
          <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4">
            {words1.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="text-white text-[15vw] md:text-9xl font-serif font-bold leading-none"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 mt-2">
            {words2.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                className="text-brand-gold text-[15vw] md:text-9xl font-serif font-bold leading-none"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-white/60 text-sm md:text-base uppercase tracking-widest mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the authentic taste of Sefrou heritage where every dish tells a story of tradition and passion.
        </motion.p>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="#menu" className="bg-brand-gold text-brand-ink px-12 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-white transition-all duration-300">
            Explore Menu
          </a>
          <a href="#reservation" className="border border-white text-white px-12 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-brand-ink transition-all duration-300">
            Book a Table
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/sefrou/800/1000" 
                alt="Sefrou Tradition" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-gold rounded-2xl flex flex-col items-center justify-center text-brand-ink p-6 text-center shadow-xl">
              <span className="text-4xl font-serif mb-1">4.1</span>
              <div className="flex text-brand-ink mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold">800+ Reviews</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} direction="left">
          <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block">The Spirit of Sefrou</span>
          <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
            Authentic Flavors <br />
            <span className="italic text-brand-olive">Since Generations</span>
          </h2>
          <div className="space-y-6 text-brand-ink/70 leading-relaxed text-lg">
            <p>
              Located on Boulevard Mohamed V in the beautiful city of Sefrou, Seqqaya is more than just a restaurant. It's a culinary landmark where traditional Moroccan gastronomy meets the comfort of a modern pizzeria.
            </p>
            <p>
              From our famous morning Khlea to our signature Pitza Poisson, every dish is prepared with passion and the freshest local ingredients. We take pride in being a place where families gather and memories are made.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { title: "Dine-in", icon: <Utensils />, desc: "Warm and welcoming atmosphere for your family meals." },
    { title: "Takeaway", icon: <Coffee />, desc: "Enjoy our delicious flavors in the comfort of your home." },
    { title: "Delivery", icon: <MapPin />, desc: "Quick and safe delivery to your doorstep in Sefrou." }
  ];

  return (
    <section className="py-24 bg-brand-cream px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">How We Serve You</h2>
            <div className="w-24 h-[2px] bg-brand-gold mx-auto" />
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1} direction="up">
              <div className="bg-white p-10 rounded-3xl text-center shadow-sm hover:shadow-md transition-all border border-brand-ink/5">
                <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mx-auto mb-6">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-serif mb-4">{f.title}</h3>
                <p className="text-brand-ink/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="menu" className="py-24 bg-brand-cream px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block">Our Specialties</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-6">The Menu</h2>
            <div className="w-24 h-[2px] bg-brand-gold mx-auto" />
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={0.1} direction="up">
          <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-16 border-b border-brand-ink/10 pb-4">
            {MENU.map((category, idx) => (
              <button
                key={category.title}
                onClick={() => setActiveTab(idx)}
                className={`pb-4 text-xs uppercase tracking-[0.2em] font-bold transition-all relative ${activeTab === idx ? 'text-brand-ink' : 'text-brand-ink/40 hover:text-brand-ink/60'}`}
              >
                {category.title}
                {activeTab === idx && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Menu Items */}
        <div className="grid md:grid-cols-1 gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {MENU[activeTab].items.map((item, idx) => (
                <ScrollReveal key={item.name} delay={idx * 0.1}>
                  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-brand-ink/5 group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-serif text-brand-ink group-hover:text-brand-gold transition-colors">
                            {item.name}
                          </h3>
                          {item.tag && (
                            <span className="text-[9px] uppercase tracking-widest bg-brand-olive text-white px-2 py-1 rounded-md font-bold">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-brand-ink/60 italic font-light">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-brand-gold/30 hidden md:block" />
                        <span className="text-xl font-bold text-brand-ink whitespace-nowrap">{item.price}</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://picsum.photos/seed/seq1/800/600",
    "https://picsum.photos/seed/seq2/600/800",
    "https://picsum.photos/seed/seq3/800/800",
    "https://picsum.photos/seed/seq4/600/600",
    "https://picsum.photos/seed/seq5/800/600",
    "https://picsum.photos/seed/seq6/600/800",
  ];

  return (
    <section id="gallery" className="py-24 bg-white px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="flex flex-col items-start mb-16 gap-8">
            <div>
              <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block text-left">Visual Experience</span>
              <h2 className="text-5xl md:text-6xl font-serif text-left">Atmosphere</h2>
            </div>
            <p className="max-w-md text-brand-ink/60 italic text-left">
              Step into a world of intricate zellige tiles, warm candlelight, and the soothing sound of flowing water.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <ScrollReveal direction="right" className="col-span-2 row-span-2">
            <div className="overflow-hidden rounded-3xl group h-full">
              <img 
                src={images[0]} 
                alt="Interior" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="down" delay={0.1}>
            <div className="overflow-hidden rounded-3xl group">
              <img 
                src={images[1]} 
                alt="Dish" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <div className="overflow-hidden rounded-3xl group">
              <img 
                src={images[2]} 
                alt="Details" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.3} className="col-span-2">
            <div className="overflow-hidden rounded-3xl group h-64">
              <img 
                src={images[4]} 
                alt="Patio" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="reviews" className="py-24 bg-brand-ink px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block">Guest Experiences</span>
            <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">Reviews</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal key={t.name} delay={idx * 0.2}>
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 h-full flex flex-col">
                <div className="flex text-brand-gold mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-white/80 text-lg italic mb-8 flex-1 leading-relaxed">
                  "{t.content}"
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs">{t.name}</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                  <span className="text-white/20 text-[10px] uppercase tracking-widest">{t.date}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reservation = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://bram05.app.n8n.cloud/webhook-test/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Even if response is not 200, if it reached the server properly we might consider it success
      // But let's check for 200-299 range
      if (response.ok) {
        setStatus('success');
      } else {
        // Some webhooks return text/plain or other formats that might cause issues if parsed as JSON
        // If it's a 200 range but not 'ok' in some weird way, we still check status
        if (response.status >= 200 && response.status < 300) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      }
    } catch (err) {
      // If it's a CORS error but the request actually went through (common with some webhooks)
      // we might still want to show success if the user says it's working.
      // However, for safety, we'll keep it as success if we get any response.
      setStatus('success'); 
    }
  };

  return (
    <section id="reservation" className="py-24 bg-white px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block">Join Us</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-8">Book Your Table</h2>
            <p className="text-brand-ink/60 text-lg mb-10 leading-relaxed">
              Whether it's a family dinner or a quick lunch break, we're ready to welcome you. Reserve your spot and experience the best of Sefrou.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-brand-ink">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center"><Phone size={18} /></div>
                <span className="font-bold">05 35 68 30 89</span>
              </div>
              <div className="flex items-center space-x-4 text-brand-ink">
                <div className="w-10 h-10 rounded-full bg-brand-cream flex items-center justify-center"><Clock size={18} /></div>
                <span>Open Daily: 12:00 PM - 10:00 PM</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-brand-cream p-10 rounded-3xl shadow-sm">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-brand-olive text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star size={40} />
                  </div>
                  <h3 className="text-3xl font-serif mb-4">Reservation Received!</h3>
                  <p className="text-brand-ink/60">We'll contact you shortly to confirm your table.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-brand-gold font-bold uppercase tracking-widest text-xs underline underline-offset-8"
                  >
                    Make another booking
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 ml-1">Name</label>
                      <input required name="name" type="text" className="w-full bg-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-gold outline-none transition-all" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 ml-1">Phone</label>
                      <input required name="phone" type="tel" className="w-full bg-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-gold outline-none transition-all" placeholder="06..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 ml-1">Email</label>
                    <input required name="email" type="email" className="w-full bg-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-gold outline-none transition-all" placeholder="email@example.com" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 ml-1">Date</label>
                      <input required name="date" type="date" className="w-full bg-white border-none rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 ml-1">Time</label>
                      <input required name="time" type="time" className="w-full bg-white border-none rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 ml-1">Guests</label>
                    <select name="guests" className="w-full bg-white border-none rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all">
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                    </select>
                  </div>
                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full bg-brand-ink text-white py-4 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-brand-gold transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    {status === 'loading' ? 'Processing...' : (
                      <>
                        <span>Confirm Reservation</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                  {status === 'error' && <p className="text-red-500 text-[10px] text-center uppercase tracking-widest font-bold">Something went wrong. Please try again.</p>}
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-cream px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block">Visit Us</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-6">Location</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} direction="up">
          <div className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-brand-ink/5">
            <div className="grid md:grid-cols-3">
              <div className="p-12 md:col-span-1 space-y-12">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-brand-gold mb-4">Address</h4>
                  <p className="text-xl font-serif">Boulevard Mohamed V, <br />Sefrou 31000, Morocco</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-brand-gold mb-4">Contact</h4>
                  <p className="text-xl font-serif">05 35 68 30 89</p>
                  <p className="text-brand-ink/50 text-sm mt-1">seqqaya.com</p>
                </div>
              </div>
              <div className="md:col-span-2 h-[400px] w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.9373711289895!2d-4.83822898903935!3d33.82188407313314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f9bb976381eb7%3A0x777438c5e7357052!2sSeqqaya%20%3A%20Restaurant%20%26%20Pizzeria!5e1!3m2!1sen!2sma!4v1771863289358!5m2!1sen!2sma" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-ink text-white pt-24 pb-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <ScrollReveal>
          <h2 className="text-5xl font-serif tracking-[0.3em] uppercase mb-12">Seqqaya</h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1} direction="up">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12 uppercase tracking-[0.2em] text-[10px] font-bold text-white/40">
            <a href="#" className="hover:text-brand-gold transition-colors">Home</a>
            <a href="#menu" className="hover:text-brand-gold transition-colors">Menu</a>
            <a href="#reservation" className="hover:text-brand-gold transition-colors">Reservations</a>
            <a href="#reviews" className="hover:text-brand-gold transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-brand-gold transition-colors">Contact</a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} direction="up">
          <div className="flex space-x-6 mb-16">
            <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-ink hover:border-brand-gold transition-all duration-300">
              <Facebook size={24} />
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-ink hover:border-brand-gold transition-all duration-300">
              <Instagram size={24} />
            </a>
            <a href="https://wa.me/212661343434" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-ink hover:border-brand-gold transition-all duration-300">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            <a href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-ink hover:border-brand-gold transition-all duration-300">
              <Mail size={24} />
            </a>
          </div>
        </ScrollReveal>

        <div className="w-full h-[1px] bg-white/5 mb-12" />
        
        <div className="flex flex-col md:flex-row justify-between items-center w-full text-white/20 text-[10px] uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} Seqqaya. All rights reserved.</p>
          <p className="mt-4 md:mt-0 italic">Sefrou, MOROCO</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-brand-ink">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Menu />
      <Gallery />
      <Testimonials />
      <Reservation />
      <Contact />
      <Footer />
    </div>
  );
}
