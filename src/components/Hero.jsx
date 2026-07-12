import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';
import { birthdayData } from '../data/birthdayData';
import { useConfetti } from '../hooks/useConfetti';
import TreatPicker from './TreatPicker';

// Matches the key TreatPicker persists to — used to reflect a prior choice.
const TREAT_KEY = 'ayes-birthday-treat-v1';
const hasChosenTreat = () => {
  try {
    return window.localStorage.getItem(TREAT_KEY) !== null;
  } catch {
    return false;
  }
};

/**
 * Scene 2 · Birthday Greeting
 * A graceful, word-by-word "Happy Birthday" with a shimmering name, the short
 * heartfelt message revealed paragraph by paragraph, orbiting sparkles, and a
 * little cake whose candle the recipient can tap to blow out (make a wish!).
 */

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 120, damping: 12, delay: 0.15 * i },
  }),
};

function AnimatedWords({ text, className }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.28em]">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={wordVariants}
          className={`inline-block ${className || ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* The tappable birthday cake with a candle to blow out. */
function WishCake() {
  // If she already claimed a treat on a previous visit, start unlit.
  const [lit, setLit] = useState(() => !hasChosenTreat());
  const [pickerOpen, setPickerOpen] = useState(false);
  const { burst } = useConfetti();

  const handleTap = (e) => {
    if (lit) {
      setLit(false);
      const rect = e.currentTarget.getBoundingClientRect();
      burst({
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 3) / window.innerHeight,
      });
    }
    // Open the treat picker (blowing out the candle grants the wish).
    setPickerOpen(true);
  };

  return (
    <>
    <motion.button
      type="button"
      onClick={handleTap}
      aria-label={lit ? 'Blow out the candle and make a wish' : 'Open your birthday treat'}
      className="group relative mx-auto mt-10 block outline-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <svg width="130" height="140" viewBox="0 0 130 140">
        {/* Flame + glow (only when lit) */}
        {lit && (
          <>
            <motion.ellipse
              cx="65"
              cy="34"
              rx="16"
              ry="20"
              fill="#F8C8DC"
              opacity="0.35"
              animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: '65px', originY: '34px' }}
            />
            <motion.path
              d="M65 20 C71 28 72 36 65 44 C58 36 59 28 65 20 Z"
              fill="#E8D7A5"
              animate={{ scaleY: [1, 1.12, 0.96, 1], scaleX: [1, 0.94, 1.04, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: '65px', originY: '44px' }}
            />
          </>
        )}
        {/* A soft wisp of smoke after blowing out */}
        {!lit && (
          <motion.path
            d="M65 40 q-6 -8 0 -16 q6 -8 0 -16"
            stroke="#D8A7B1"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ opacity: 0.7, y: 0 }}
            animate={{ opacity: 0, y: -24 }}
            transition={{ duration: 1.6 }}
          />
        )}

        {/* Candle */}
        <rect x="61" y="44" width="8" height="26" rx="3" fill="#FADADD" />
        <rect x="61" y="44" width="8" height="26" rx="3" fill="url(#stripe)" opacity="0.4" />

        {/* Cake */}
        <rect x="30" y="70" width="70" height="30" rx="8" fill="#F8C8DC" />
        <rect x="24" y="96" width="82" height="34" rx="10" fill="#FADADD" />
        {/* Frosting drips */}
        <path
          d="M24 100 q10 12 20 0 q10 12 20 0 q10 12 20 0 q10 12 22 0 V96 H24 Z"
          fill="#FFFDF8"
          opacity="0.85"
        />
        {/* Little decorations */}
        <circle cx="40" cy="114" r="3" fill="#E6E6FA" />
        <circle cx="65" cy="118" r="3" fill="#FFE5D4" />
        <circle cx="90" cy="114" r="3" fill="#E8D7A5" />

        <defs>
          <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D8A7B1" />
            <stop offset="100%" stopColor="#FADADD" />
          </linearGradient>
        </defs>
      </svg>
      <span className="mt-1 block font-body text-xs uppercase tracking-[0.2em] text-rose/50">
        {lit ? 'tap to make a wish' : 'tap for your treat 🎟️'}
      </span>
    </motion.button>

    <TreatPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </>
  );
}

export default function Hero() {
  const { greetingName, birthdayMessage } = birthdayData;

  return (
    <section
      id="greeting"
      className="section-shell flex flex-col items-center text-center"
      aria-label="Birthday greeting"
    >
      {/* Orbiting sparkles around the title */}
      <div className="relative">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute text-champagne"
            style={{
              top: `${[10, 0, 70, 40][i]}%`,
              left: `${[-6, 92, -2, 96][i]}%`,
            }}
            animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.3, 1, 0.3], rotate: 360 }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <HiSparkles size={20 + i * 4} />
          </motion.div>
        ))}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="mb-3 font-body text-sm uppercase tracking-[0.35em] text-black/60">
            🎉 &nbsp;Happy Birthday&nbsp; 🎂
          </p>
          <h1 className="font-greeting text-6xl leading-tight text-rose sm:text-7xl md:text-8xl">
            <AnimatedWords text="Happy Birthday," />
            <span className="mt-2 block">
              <motion.span
                custom={2}
                variants={wordVariants}
                className="shimmer-name inline-block"
              >
                {greetingName}
              </motion.span>
              <motion.span custom={3} variants={wordVariants} className="inline-block">
                {' '}
                💖
              </motion.span>
            </span>
          </h1>
        </motion.div>
      </div>

      <div className="mt-10 max-w-2xl space-y-5">
        {birthdayMessage.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.35 }}
            className="text-balance font-body text-base leading-relaxed text-black/40 sm:text-lg"
          >
            {para}
          </motion.p>
        ))}
      </div>

      {/* The blow-out-the-candle moment */}
      <WishCake />
    </section>
  );
}
