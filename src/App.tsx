import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  MapPin, 
  Cake, 
  Music, 
  Pause, 
  Ticket,
  Sparkles,
  Star,
  Flower,
  Zap,
  Lock
} from 'lucide-react';

// Lock Screen Component
const LockScreen = ({ onUnlock }: { onUnlock: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUnlock = () => {
    if (password === '1431911') {
      onUnlock();
    } else {
      setError(true);
      setShowError(true);
      setTimeout(() => {
        setError(false);
      }, 600);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  // Floating particles for lock screen
  const lockParticles = [
    { emoji: '💖', left: '8%', top: '12%', delay: 0, duration: 7 },
    { emoji: '✨', left: '82%', top: '18%', delay: 0.5, duration: 8 },
    { emoji: '🌸', left: '12%', top: '70%', delay: 1, duration: 6 },
    { emoji: '💕', left: '78%', top: '75%', delay: 1.5, duration: 9 },
    { emoji: '🔐', left: '5%', top: '45%', delay: 2, duration: 7 },
    { emoji: '✨', left: '92%', top: '50%', delay: 0.3, duration: 8 },
    { emoji: '💖', left: '45%', top: '8%', delay: 0.8, duration: 6 },
    { emoji: '🌸', left: '25%', top: '85%', delay: 1.2, duration: 7 },
    { emoji: '💕', left: '65%', top: '88%', delay: 1.8, duration: 8 },
    { emoji: '✨', left: '35%', top: '20%', delay: 0.6, duration: 9 },
    { emoji: '🔐', left: '88%', top: '35%', delay: 2.2, duration: 6 },
    { emoji: '🌸', left: '55%', top: '65%', delay: 1.4, duration: 7 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] h-screen w-full bg-gradient-to-br from-rose-100 to-teal-50 flex flex-col items-center justify-center font-['Quicksand']"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Floating background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {lockParticles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute text-xl md:text-2xl"
            style={{ left: particle.left, top: particle.top }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.3, 1],
              y: [0, -25, 0, 15, 0],
              x: [0, 15, -15, 8, 0],
              rotate: [0, 15, -15, 5, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </div>

      {/* Central Lock Card */}
      <motion.div
        className="relative z-10 backdrop-blur-xl bg-white/30 rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 mx-4 max-w-md w-full"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-200/40 via-pink-200/40 to-teal-200/40 rounded-3xl blur-xl -z-10" />

        {/* Lock Icon */}
        <motion.div
          className="flex justify-center mb-6"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-5 rounded-full shadow-lg shadow-rose-300/50">
            <Lock size={40} className="text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2 font-['Quicksand']">
          Enter The Secret Code 🔑
        </h2>
        <p className="text-center text-rose-400 text-sm mb-8 font-['Quicksand']">
          Only someone special knows this...
        </p>

        {/* Input Field */}
        <motion.div
          animate={error ? { x: [-12, 12, -12, 12, -6, 6, 0] } : {}}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Passcode..."
            className={`w-full px-6 py-4 bg-white/80 rounded-2xl border-2 text-center text-lg font-semibold tracking-[0.3em] text-gray-700 placeholder-rose-300 outline-none transition-all duration-300 font-['Quicksand'] ${
              error
                ? 'border-red-400 shadow-red-200/50 shadow-lg'
                : 'border-rose-200 focus:border-rose-400 focus:shadow-rose-200/50 focus:shadow-lg'
            }`}
          />
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {showError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-400 text-sm text-center mt-3 font-medium font-['Quicksand']"
            >
              Wrong passcode! Hint: 143 + Your Bday? 🥺
            </motion.p>
          )}
        </AnimatePresence>

        {/* Unlock Button */}
        <motion.button
          onClick={handleUnlock}
          className="w-full mt-6 bg-gradient-to-r from-rose-400 to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-rose-300/50 text-lg font-['Quicksand'] transition-all duration-300"
          whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(251, 113, 133, 0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          Unlock My Heart 💖
        </motion.button>

        {/* Subtle bottom text */}
        <p className="text-center text-rose-300/70 text-xs mt-6 italic font-['Quicksand']">
          made with love, just for you 🤍
        </p>
      </motion.div>
    </motion.div>
  );
};

// Welcome Screen Floating Particles
const WelcomeParticles = () => {
  const particles = [
    { emoji: '🌟', left: '10%', top: '15%', delay: 0, size: 'text-2xl' },
    { emoji: '💜', left: '85%', top: '20%', delay: 0.5, size: 'text-3xl' },
    { emoji: '✨', left: '15%', top: '60%', delay: 1, size: 'text-xl' },
    { emoji: '🌹', left: '75%', top: '70%', delay: 1.5, size: 'text-2xl' },
    { emoji: '💕', left: '5%', top: '40%', delay: 2, size: 'text-2xl' },
    { emoji: '🌟', left: '90%', top: '45%', delay: 0.3, size: 'text-xl' },
    { emoji: '✨', left: '50%', top: '10%', delay: 0.8, size: 'text-lg' },
    { emoji: '💜', left: '30%', top: '80%', delay: 1.2, size: 'text-xl' },
    { emoji: '🌹', left: '20%', top: '25%', delay: 1.8, size: 'text-lg' },
    { emoji: '💕', left: '70%', top: '85%', delay: 0.6, size: 'text-2xl' },
    { emoji: '✨', left: '60%', top: '30%', delay: 2.2, size: 'text-lg' },
    { emoji: '🌟', left: '40%', top: '75%', delay: 1.4, size: 'text-xl' },
    { emoji: '💜', left: '55%', top: '55%', delay: 0.9, size: 'text-lg' },
    { emoji: '🌹', left: '88%', top: '60%', delay: 2.5, size: 'text-xl' },
    { emoji: '✨', left: '8%', top: '85%', delay: 1.7, size: 'text-2xl' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute ${particle.size}`}
          style={{ left: particle.left, top: particle.top }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
            y: [0, -20, 0, 10, 0],
            x: [0, 10, -10, 5, 0],
            rotate: [0, 10, -10, 5, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Welcome Screen Component
const WelcomeScreen = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 h-screen w-full bg-rose-50 flex flex-col items-center justify-center font-['Quicksand']"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <WelcomeParticles />
      
      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Floating Rose Emoji */}
        <motion.div
          className="text-7xl md:text-8xl mb-6"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌹
        </motion.div>
        
        {/* Main Name - Cursive */}
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl text-rose-500 mb-6 font-['Great_Vibes']"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Aadnya
        </motion.h1>
        
        {/* Subtext - Simple Font */}
        <motion.div
          className="space-y-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-rose-400 text-lg md:text-xl font-medium font-['Quicksand']">
            This is made just for you 🤍
          </p>
          <p className="text-rose-300 text-sm md:text-base font-['Quicksand']">
            A little something from my heart to yours
          </p>
        </motion.div>
        
        {/* Open Button - Simple Font, Bold */}
        <motion.button
          onClick={onOpen}
          className="bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-rose-300 text-lg md:text-xl font-['Quicksand']"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(251, 113, 133, 0.4)' }}
          whileTap={{ scale: 0.98 }}
        >
          Open My Heart 🤍
        </motion.button>
        
        {/* Footer - Simple Font, Italic */}
        <motion.p
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-rose-200 text-sm italic font-['Quicksand']"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          tap to begin ✨
        </motion.p>
      </div>
    </motion.div>
  );
};

// Floating Hearts Component
const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    size: Math.random() * 20 + 15,
    duration: Math.random() * 10 + 15,
  }));

  const balloons = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    size: Math.random() * 30 + 25,
    duration: Math.random() * 15 + 20,
    color: ['#FFB6C1', '#FFD700', '#FFC0CB', '#FF91A4'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={`heart-${heart.id}`}
          className="absolute text-pink-400"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, Math.sin(heart.id) * 50, 0],
            rotate: [0, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart
            size={heart.size}
            fill="currentColor"
            className="opacity-60"
          />
        </motion.div>
      ))}
      {balloons.map((balloon) => (
        <motion.div
          key={`balloon-${balloon.id}`}
          className="absolute"
          style={{
            left: `${balloon.left}%`,
            bottom: '-80px',
          }}
          animate={{
            y: [0, -window.innerHeight - 300],
            x: [0, 30, -30, 0],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width={balloon.size}
            height={balloon.size * 1.5}
            viewBox="0 0 40 60"
          >
            <ellipse
              cx="20"
              cy="18"
              rx="16"
              ry="18"
              fill={balloon.color}
              opacity="0.8"
            />
            <path
              d="M20 36 Q20 45 18 55"
              stroke="#666"
              strokeWidth="1"
              fill="none"
            />
            <polygon
              points="16,35 20,40 24,35"
              fill={balloon.color}
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// Time Together Counter - Soft UI Design
const TimeTogether = () => {
  const startDate = new Date('2024-03-19T00:00:00');
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { value: timeElapsed.days, label: 'Days', icon: Heart },
    { value: timeElapsed.hours, label: 'Hours', icon: Flower },
    { value: timeElapsed.minutes, label: 'Minutes', icon: Sparkles },
    { value: timeElapsed.seconds, label: 'Seconds', icon: Zap },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-10 max-w-4xl mx-auto border border-white font-['Quicksand']">
      {/* For Aadnya Title - Cursive */}
      <h3 className="text-3xl md:text-4xl text-rose-500 text-center mb-4 font-['Great_Vibes']">
        For Aadnya
      </h3>
      
      {/* Header Text - Simple, Bold, Uppercase */}
      <p className="text-rose-400 font-bold tracking-wider uppercase text-sm md:text-base mb-6 text-center font-['Quicksand']">
        ✨ SINCE WE FIRST MET — 19 MARCH 2024 ✨
      </p>
      
      {/* Counter Boxes */}
      <div className="flex justify-center items-center gap-2 md:gap-4">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center">
            {/* Time Box */}
            <motion.div
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-rose-50 rounded-2xl shadow-sm w-20 h-24 md:w-24 md:h-28 flex flex-col items-center justify-center border border-rose-100">
                {/* Numbers - Simple, Extra Bold */}
                <motion.span
                  key={unit.value}
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl md:text-4xl font-extrabold text-rose-500 font-['Quicksand']"
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.span>
              </div>
              {/* Label Below Box - Simple, Bold */}
              <div className="text-[10px] md:text-xs font-bold text-rose-400 uppercase mt-2 flex items-center gap-1 font-['Quicksand']">
                <unit.icon size={12} fill={unit.label === 'Days' ? 'currentColor' : 'none'} />
                <span>{unit.label}</span>
              </div>
            </motion.div>
            
            {/* Separator (colon) - not after last item */}
            {index < timeUnits.length - 1 && (
              <span className="text-2xl md:text-3xl font-bold text-rose-300 mx-1 md:mx-2 mb-6">:</span>
            )}
          </div>
        ))}
      </div>
      
      {/* Footer Text - Simple, Italic */}
      <p className="text-rose-300 italic text-sm mt-6 text-center font-medium font-['Quicksand']">
        ...and every single second has been special 🤍
      </p>
    </div>
  );
};

// Timeline Component
const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const events = [
    {
      date: 'March 19, 2010',
      title: "Aadnya's Birthday",
      description: 'The day an angel was born 👼',
      icon: Cake,
      color: 'bg-pink-400',
    },
    {
      date: 'March 19',
      title: 'First Met',
      description: 'Our paths crossed for the first time',
      icon: MapPin,
      color: 'bg-amber-400',
    },
    {
      date: 'May 4, 2024',
      title: 'Relationship Started',
      description: 'The beginning of forever ❤️',
      icon: Heart,
      color: 'bg-red-400',
    },
  ];

  return (
    <div ref={ref} className="relative max-w-2xl mx-auto font-['Quicksand']">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-300 via-pink-400 to-red-400 rounded-full" />
      
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.3, duration: 0.6 }}
          className={`relative flex items-center mb-12 ${
            index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
            <div className="glass p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              {/* Date - Simple Font */}
              <span className="text-sm font-semibold text-pink-500 font-['Quicksand']">{event.date}</span>
              {/* Title - Simple Font, Bold */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-1 font-['Quicksand']">{event.title}</h3>
              {/* Description - Simple Font */}
              <p className="text-gray-600 text-sm mt-2 font-['Quicksand']">{event.description}</p>
            </div>
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
            <motion.div
              className={`${event.color} p-3 rounded-full shadow-lg`}
              whileHover={{ scale: 1.2 }}
              animate={{ 
                boxShadow: ['0 0 0 0 rgba(255, 107, 138, 0.4)', '0 0 0 15px rgba(255, 107, 138, 0)', '0 0 0 0 rgba(255, 107, 138, 0)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <event.icon size={24} className="text-white" />
            </motion.div>
          </div>
          
          <div className="w-1/2" />
        </motion.div>
      ))}
    </div>
  );
};

// Our Story Section with Animated Hearts
const OurStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto"
    >
      <div className="glass rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/50 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-amber-200/50 to-transparent rounded-full blur-2xl" />
        
        {/* Title - Cursive, text-4xl */}
        <h2 className="text-3xl sm:text-4xl text-center text-pink-600 mb-8 font-['Great_Vibes']">
          The Day My Heart Raced
        </h2>
        
        {/* Animated Hearts with Movie Theme */}
        <div className="flex justify-center items-center gap-4 mb-8 relative">
          <motion.div
            animate={{ scale: [1, 1.15, 1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative"
          >
            <Heart size={60} className="text-pink-500 fill-pink-500" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 107, 138, 0.6))' }} />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <Ticket size={32} className="text-amber-500 mb-2" />
            <div className="text-2xl">🍿</div>
          </motion.div>
          
          <motion.div
            animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="relative"
          >
            <Heart size={60} className="text-red-500 fill-red-500" style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.6))' }} />
          </motion.div>
        </div>
        
        {/* Story Text - Simple Font, readable, leading-relaxed */}
        <div className="relative z-10 text-gray-700 leading-relaxed space-y-4 text-sm sm:text-base font-['Quicksand']">
          <p>
            It was our farewell day. You texted me that you were at the theater with friends. 
            I asked if I could come, and you said <span className="italic text-pink-600">"If you wish."</span>
          </p>
          <p>
            I arrived when the movie was half over. We sat separately at first, but then I reached 
            for your hand. My heart was beating so fast, and I could tell you were shy too.
          </p>
          <p>
            In the interval, we took that perfect photo. When the movie started again, I held your 
            hand, and this time you held mine back—<span className="font-semibold text-pink-600">so tightly</span>.
          </p>
          <p className="text-center font-medium text-pink-600 text-lg">
            It felt like you were saying <span className="italic">"Don't leave me, I am yours."</span>
          </p>
          <p className="text-center text-lg font-semibold text-gray-800">
            That was the moment I knew, Aadnya. 💕
          </p>
        </div>
        
        {/* Sparkles decoration */}
        <motion.div
          className="absolute top-4 left-4"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles size={24} className="text-amber-400" />
        </motion.div>
        <motion.div
          className="absolute bottom-4 right-4"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <Star size={24} className="text-pink-400 fill-pink-400" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Quiz Component
const Quiz = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [_correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
  const [completed, setCompleted] = useState(false);
  const [shake, setShake] = useState(false);

  const questions = [
    {
      question: "What is my favorite hobby?",
      options: ["Cooking", "Playing Games", "Reading Books", "Dancing"],
      correct: 1,
    },
    {
      question: "Why do you trust me?",
      options: ["Because I am smart", "Because I love you endlessly", "Because I am tall"],
      correct: 1,
    },
    {
      question: "What makes our relationship special?",
      options: ["We never fight (Lies! 😂)", "We are perfectly normal", "We fight daily but love harder 🥊❤️"],
      correct: 2,
    },
  ];

  const handleAnswer = (index: number) => {
    if (index === questions[currentQuestion].correct) {
      setShowResult('correct');
      setCorrectAnswers(prev => prev + 1);
      
      setTimeout(() => {
        if (currentQuestion === questions.length - 1) {
          setCompleted(true);
          // Trigger confetti
          const duration = 5000;
          const end = Date.now() + duration;

          const frame = () => {
            confetti({
              particleCount: 5,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ['#FFB6C1', '#FFD700', '#FF69B4', '#FFC0CB'],
            });
            confetti({
              particleCount: 5,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ['#FFB6C1', '#FFD700', '#FF69B4', '#FFC0CB'],
            });

            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          };
          frame();
        } else {
          setCurrentQuestion(prev => prev + 1);
          setShowResult(null);
        }
      }, 1000);
    } else {
      setShowResult('wrong');
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setShowResult(null);
      }, 500);
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto font-['Quicksand']"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: 3 }}
        >
          <Heart size={80} className="text-pink-500 fill-pink-500 mx-auto mb-6" />
        </motion.div>
        {/* Title - Cursive */}
        <h3 className="text-3xl sm:text-4xl text-pink-600 mb-4 font-['Great_Vibes']">
          You Know Me So Well! 💕
        </h3>
        {/* Body text - Simple Font */}
        <p className="text-gray-600 font-medium font-['Quicksand']">
          You got all {questions.length} questions right! We're truly meant for each other.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`glass rounded-3xl p-6 sm:p-10 max-w-lg mx-auto font-['Quicksand'] ${shake ? 'animate-shake' : ''}`}
    >
      {/* Title - Cursive, text-4xl */}
      <h2 className="text-3xl sm:text-4xl text-center text-pink-600 mb-2 font-['Great_Vibes']">
        How Well Do You Know Chandan?
      </h2>
      {/* Subtitle - Simple Font */}
      <p className="text-center text-gray-500 mb-8 font-medium font-['Quicksand']">Question {currentQuestion + 1} of {questions.length}</p>
      
      <div className="mb-6">
        <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Questions - Simple Font, Medium weight */}
      <h3 className="text-xl font-medium text-gray-800 mb-6 text-center font-['Quicksand']">
        {questions[currentQuestion].question}
      </h3>
      
      {/* Options - Simple Font, Medium weight */}
      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`w-full p-4 rounded-xl text-left transition-all font-medium font-['Quicksand'] ${
              showResult === 'correct' && index === questions[currentQuestion].correct
                ? 'bg-green-400 text-white'
                : showResult === 'wrong' && index === questions[currentQuestion].correct
                ? 'bg-green-200'
                : 'bg-white/50 hover:bg-white/80 text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={showResult !== null}
          >
            {option}
          </motion.button>
        ))}
      </div>
      
      {showResult === 'correct' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-green-600 font-semibold mt-4 font-['Quicksand']"
        >
          {currentQuestion === 2 ? '✨ Exactly! 😂 ✨' : '✨ Correct! You know me so well! ✨'}
        </motion.p>
      )}
    </motion.div>
  );
};

// Music Button
const MusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a romantic melody (using a public domain audio)
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle autoplay restriction
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-pink-400 to-pink-600 text-white p-4 rounded-full shadow-lg font-['Quicksand'] font-bold"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: isPlaying 
          ? ['0 0 0 0 rgba(255, 107, 138, 0.4)', '0 0 0 20px rgba(255, 107, 138, 0)', '0 0 0 0 rgba(255, 107, 138, 0)']
          : '0 4px 20px rgba(255, 107, 138, 0.4)',
      }}
      transition={{ duration: 1.5, repeat: isPlaying ? Infinity : 0 }}
    >
      {isPlaying ? <Pause size={24} /> : <Music size={24} />}
    </motion.button>
  );
};

// Section Wrapper for animations
const Section = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`py-16 sm:py-24 px-4 ${className}`}
    >
      {children}
    </motion.section>
  );
};

// Main App
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUnlock = () => {
    setIsAuthenticated(true);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Lock Screen - appears first before anything */}
      <AnimatePresence>
        {!isAuthenticated && <LockScreen onUnlock={handleUnlock} />}
      </AnimatePresence>

      {/* Welcome Screen - appears after authentication */}
      <AnimatePresence>
        {isAuthenticated && !isOpen && <WelcomeScreen onOpen={handleOpen} />}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-amber-50 relative overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isAuthenticated && isOpen ? 1 : 0 }}
        transition={{ duration: 0.8, delay: isAuthenticated && isOpen ? 0.3 : 0 }}
      >
        <FloatingHearts />
        {isAuthenticated && isOpen && <MusicButton />}
      
      {/* Hero Section */}
      <Section className="min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-6"
          >
            <Heart size={60} className="text-pink-500 fill-pink-500 mx-auto animate-heartbeat" />
          </motion.div>
          
          {/* Main Title - Cursive, text-7xl, text-rose-500 */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl text-rose-500 mb-4 font-['Great_Vibes']">
            Aadnya & Chandan
          </h1>
          
          {/* Subtitle - Simple, tracking-widest, uppercase */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-pink-400 font-medium mb-12 tracking-widest uppercase font-['Quicksand']"
          >
            Forever Starts Here ✨
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-4xl px-4"
        >
          <TimeTogether />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-pink-400"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </Section>
      
      {/* Timeline Section */}
      <Section>
        {/* Section Heading - Cursive */}
        <h2 className="text-3xl sm:text-4xl text-center text-pink-600 mb-16 font-['Great_Vibes']">
          Our Beautiful Journey 💫
        </h2>
        <Timeline />
      </Section>
      
      {/* Our Story Section */}
      <Section>
        <OurStory />
      </Section>
      
      {/* Quiz Section */}
      <Section className="pb-32">
        <Quiz />
      </Section>
      
      {/* Footer */}
      <footer className="text-center py-8 text-pink-400 font-['Quicksand']">
        <p className="flex items-center justify-center gap-2 font-medium">
          Made with <Heart size={16} className="fill-pink-500 text-pink-500" /> for my love
        </p>
        <p className="text-sm mt-2 text-pink-300">Aadnya ❤️ Chandan • Forever & Always</p>
      </footer>
      </motion.div>
    </>
  );
}
