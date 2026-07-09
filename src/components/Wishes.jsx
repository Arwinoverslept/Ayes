import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Scene 6 · Birthday Wishes
 * Soft glass cards, each carrying a short heartfelt wish. Every card floats
 * independently with its own slow, gentle rhythm so the whole grid feels alive
 * and dreamy — never mechanical.
 *
 * PERFORMANCE: the idle float uses a CSS keyframe (`floaty`) on a wrapper so it
 * runs on the compositor thread, while Framer Motion handles only the entrance
 * and hover. Motion is disabled under reduced-motion.
 */

// Gentle, varied float parameters per card (deterministic).
const floatFor = (i) => ({
  fy: (i % 2 === 0 ? -12 : -8) - (i % 3) * 2, // px
  duration: 4.5 + (i % 4) * 0.8, // s
  delay: (i % 5) * 0.4, // s
});

export default function Wishes() {
  const { wishes } = birthdayData;
  const reduced = useReducedMotion();

  return (
    <section id="wishes" className="section-shell" aria-label="Birthday wishes">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mb-14 text-center"
      >
        <h2 className="section-title">Birthday Wishes</h2>
        <p className="mx-auto mt-4 max-w-md font-body text-rose/60">
          A little bouquet of wishes, just for you. 🌷
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishes.map((wish, i) => {
          const f = floatFor(i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 110, damping: 15, delay: (i % 3) * 0.1 }}
            >
              {/* CSS-driven idle float wrapper (compositor thread) */}
              <div
                className="gpu h-full"
                style={
                  reduced
                    ? undefined
                    : {
                        '--fy': `${f.fy}px`,
                        animation: `floaty ${f.duration}s ease-in-out ${f.delay}s infinite`,
                      }
                }
              >
                <motion.article
                  whileHover={{ scale: 1.04, rotate: i % 2 === 0 ? 1 : -1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="glass group relative h-full overflow-hidden rounded-[28px] p-6 shadow-card transition-shadow duration-500 hover:shadow-glow"
                >
                  {/* Corner glow accent */}
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-pastel/40 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="mb-3 block text-3xl">{wish.emoji}</span>
                  <p className="font-body text-[15px] leading-relaxed text-rose/85">
                    {wish.text}
                  </p>
                </motion.article>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
