import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';
import { birthdayData } from '../data/birthdayData';
import { useConfetti } from '../hooks/useConfetti';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Scene 8 · Grand Finale
 * A full-screen celebration overlay. When shown, it fires confetti, side
 * cannons, and sustained fireworks, and layers floating hearts + rising
 * balloons + twinkling sparkles behind the closing message. Controlled by the
 * parent via `show`; closes back to the page.
 */

const HEARTS = Array.from({ length: 16 }, (_, i) => i);
const BALLOONS = ['#F8C8DC', '#FADADD', '#E6E6FA', '#FFE5D4', '#D8A7B1', '#E8D7A5', '#F8C8DC'];

export default function Celebration({ show, onClose }) {
  const { finale } = birthdayData;
  const { burst, cannons, fireworks } = useConfetti();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = 'hidden';

    burst({ x: 0.5, y: 0.5 });
    cannons();
    const stop = fireworks(5000);

    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);

    return () => {
      stop?.();
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Grand finale celebration"
        >
          {/* Dreamy blurred backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(255,253,248,0.92), rgba(248,200,220,0.85) 55%, rgba(216,167,177,0.9))',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* Rising balloons */}
          {!reduced &&
            BALLOONS.map((color, i) => (
              <motion.div
                key={`b-${i}`}
                className="absolute bottom-0"
                style={{ left: `${6 + i * 13}%` }}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: '-115vh', opacity: [0, 1, 1, 0.7] }}
                transition={{ duration: 6 + i * 0.5, delay: i * 0.2, ease: 'easeOut' }}
              >
                <div
                  className="h-14 w-12 rounded-[48%] shadow-md"
                  style={{ background: `radial-gradient(circle at 32% 28%, #ffffff90, ${color})` }}
                />
                <div className="mx-auto h-12 w-px bg-rose/40" />
              </motion.div>
            ))}

          {/* Floating hearts */}
          {!reduced &&
            HEARTS.map((i) => {
              const left = (i * 61) % 100;
              const size = 14 + (i % 4) * 8;
              return (
                <motion.span
                  key={`h-${i}`}
                  className="absolute bottom-0 select-none"
                  style={{ left: `${left}%`, fontSize: size }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: '-110vh', opacity: [0, 1, 1, 0], x: [0, (i % 2 ? 30 : -30), 0] }}
                  transition={{
                    duration: 7 + (i % 5),
                    delay: (i % 6) * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {['💖', '💕', '🌸', '✨'][i % 4]}
                </motion.span>
              );
            })}

          {/* Closing message */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}
            className="relative z-10 max-w-2xl"
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="mb-4 font-body text-sm uppercase tracking-[0.35em] text-rose/60">
                ✨ &nbsp;one more thing&nbsp; ✨
              </p>
              <h2 className="font-greeting text-5xl leading-tight text-rose drop-shadow-sm sm:text-6xl md:text-7xl">
                {finale.message}
              </h2>
              <p className="mt-6 font-heading text-2xl text-rose/80">🎉 🎂 🎈</p>
            </motion.div>

            <button
              type="button"
              onClick={onClose}
              className="mt-10 rounded-full glass px-8 py-3 font-body text-sm font-medium text-rose transition hover:shadow-glow hover:-translate-y-0.5"
            >
              Close
            </button>
          </motion.div>

          {/* Corner close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close celebration"
            className="absolute right-5 top-5 z-20 rounded-full bg-white/50 p-2.5 text-rose backdrop-blur transition hover:bg-white/90"
          >
            <HiXMark size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
