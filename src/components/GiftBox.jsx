import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfetti } from '../hooks/useConfetti';
import { birthdayData } from '../data/birthdayData';

/**
 * Scene 1 · The Gift
 * The locked landing state. Only the floating gift box, a line of anticipation
 * above, and the "Open Your Gift" button below. Clicking (box or button) plays
 * the open sequence — lid lifts, confetti bursts from the box, balloons rise,
 * sparkles bloom — then calls `onOpen()` to reveal the rest of the experience.
 */

const BALLOON_COLORS = ['#F8C8DC', '#FADADD', '#E6E6FA', '#FFE5D4', '#D8A7B1', '#E8D7A5'];

function Balloon({ index, color }) {
  const left = 8 + (index * 84) / 6 + (index % 2 === 0 ? 4 : -4);
  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left: `${left}%` }}
      initial={{ y: 40, opacity: 0, scale: 0.7 }}
      animate={{ y: '-115vh', opacity: [0, 1, 1, 0.8], scale: 1 }}
      transition={{
        duration: 5 + index * 0.4,
        delay: 0.25 + index * 0.12,
        ease: 'easeOut',
      }}
    >
      <div className="relative">
        <div
          className="h-16 w-14 rounded-[48%] shadow-md"
          style={{
            background: `radial-gradient(circle at 32% 28%, #ffffff90, ${color})`,
          }}
        />
        <div
          className="absolute left-1/2 top-[62px] h-14 w-px -translate-x-1/2"
          style={{ background: 'rgba(216,167,177,0.6)' }}
        />
      </div>
    </motion.div>
  );
}

export default function GiftBox({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const { burst } = useConfetti();

  const handleOpen = (e) => {
    if (opening) return;
    setOpening(true);

    // Confetti originates from the gift box itself for a rewarding feel.
    const rect = e?.currentTarget?.getBoundingClientRect?.();
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.5 };
    burst(origin);

    // Let the open animation + balloons play, then reveal the story.
    window.setTimeout(() => onOpen?.(), 1700);
  };

  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-6 text-center"
      aria-label="Open your gift"
    >
      {/* Balloons rise on open */}
      <AnimatePresence>
        {opening && (
          <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
            {BALLOON_COLORS.map((color, i) => (
              <Balloon key={i} index={i} color={color} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Prompt above */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="mb-10 max-w-md font-heading text-lg italic text-rose/80 sm:text-xl"
      >
        {birthdayData.gift.prompt}
      </motion.p>

      {/* The floating, clickable gift box */}
      <motion.button
        type="button"
        onClick={handleOpen}
        aria-label={birthdayData.gift.button}
        className="group relative outline-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          opening
            ? { scale: [1, 1.08, 0.9], y: 0 }
            : { scale: 1, opacity: 1, y: [0, -14, 0] }
        }
        transition={
          opening
            ? { duration: 0.6 }
            : {
                scale: { type: 'spring', stiffness: 120, damping: 12, delay: 0.5 },
                opacity: { duration: 0.6, delay: 0.5 },
                y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 },
              }
        }
        whileHover={opening ? {} : { scale: 1.05 }}
        whileTap={opening ? {} : { scale: 0.97 }}
      >
        {/* Glow beneath the box */}
        <div
          className="absolute inset-0 -z-10 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(248,200,220,0.9), transparent 65%)',
            transform: 'scale(1.4)',
            opacity: 0.7,
          }}
        />

        {/* Gift box SVG — lid animates open */}
        <svg width="200" height="210" viewBox="0 0 200 210" className="drop-shadow-xl">
          <defs>
            <linearGradient id="boxBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8C8DC" />
              <stop offset="100%" stopColor="#D8A7B1" />
            </linearGradient>
            <linearGradient id="boxLid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FADADD" />
              <stop offset="100%" stopColor="#F8C8DC" />
            </linearGradient>
            <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E8D7A5" />
              <stop offset="50%" stopColor="#F5E9C4" />
              <stop offset="100%" stopColor="#E8D7A5" />
            </linearGradient>
          </defs>

          {/* Sparkles that bloom on open */}
          <AnimatePresenceSparkles opening={opening} />

          {/* Box body */}
          <rect x="35" y="80" width="130" height="110" rx="10" fill="url(#boxBody)" />
          {/* Vertical ribbon on body */}
          <rect x="88" y="80" width="24" height="110" fill="url(#ribbon)" opacity="0.95" />

          {/* Lid group — rotates open around its back-left corner */}
          <motion.g
            style={{ originX: '50px', originY: '80px' }}
            animate={
              opening
                ? { rotate: -32, x: -6, y: -10 }
                : { rotate: 0, x: 0, y: 0 }
            }
            transition={{ type: 'spring', stiffness: 90, damping: 11, delay: 0.15 }}
          >
            <rect x="28" y="58" width="144" height="34" rx="9" fill="url(#boxLid)" />
            <rect x="88" y="58" width="24" height="34" fill="url(#ribbon)" opacity="0.95" />
            {/* Bow */}
            <g transform="translate(100 58)">
              <path
                d="M0 0 C-26 -30 -46 -6 0 4 C46 -6 26 -30 0 0 Z"
                fill="#FADADD"
                stroke="#E8D7A5"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="1" r="7" fill="#E8D7A5" />
            </g>
          </motion.g>
        </svg>
      </motion.button>

      {/* Button below */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1 }}
        className="mt-12"
      >
        <button
          type="button"
          onClick={handleOpen}
          disabled={opening}
          className="glass rounded-full px-9 py-3.5 font-body text-base font-medium text-rose transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-0"
        >
          {birthdayData.gift.button}
        </button>
        <p className="mt-4 font-body text-xs uppercase tracking-[0.25em] text-rose/50">
          tap the box
        </p>
      </motion.div>
    </section>
  );
}

/* Little sparkles inside the SVG that pop when the lid opens. */
function AnimatePresenceSparkles({ opening }) {
  const spots = [
    { x: 100, y: 40, d: 0.2 },
    { x: 70, y: 30, d: 0.35 },
    { x: 130, y: 32, d: 0.5 },
    { x: 100, y: 15, d: 0.4 },
    { x: 55, y: 48, d: 0.6 },
    { x: 148, y: 50, d: 0.55 },
  ];
  return (
    <>
      {spots.map((s, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={opening ? { opacity: [0, 1, 0], scale: [0, 1.3, 0], y: -20 } : {}}
          transition={{ duration: 1.1, delay: s.d }}
          style={{ originX: `${s.x}px`, originY: `${s.y}px` }}
        >
          <path
            d={`M${s.x} ${s.y - 7} L${s.x + 2} ${s.y - 2} L${s.x + 7} ${s.y} L${s.x + 2} ${s.y + 2} L${s.x} ${s.y + 7} L${s.x - 2} ${s.y + 2} L${s.x - 7} ${s.y} L${s.x - 2} ${s.y - 2} Z`}
            fill="#E8D7A5"
          />
        </motion.g>
      ))}
    </>
  );
}
