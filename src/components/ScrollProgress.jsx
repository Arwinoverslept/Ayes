import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * ScrollProgress
 * An organic scroll indicator — a delicate vine that "grows" down the left edge
 * as the recipient scrolls, with a glowing petal bud riding its tip. A gentle,
 * on-theme alternative to a plain progress bar. Hidden on very small screens to
 * keep the mobile view clean.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const height = useTransform(progress, [0, 1], ['0%', '100%']);
  const budTop = useTransform(progress, [0, 1], ['0%', '96%']);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-3 top-0 z-40 hidden h-screen w-6 sm:block"
    >
      {/* Faint track */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-rose/10" />

      {/* Growing vine */}
      <motion.div
        style={{ height }}
        className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #F8C8DC, #D8A7B1)',
            boxShadow: '0 0 8px rgba(248,200,220,0.8)',
          }}
        />
      </motion.div>

      {/* Glowing petal bud at the tip */}
      <motion.div
        style={{ top: budTop }}
        className="absolute left-1/2 -translate-x-1/2"
      >
        <motion.span
          className="block text-lg"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(248,200,220,0.9))' }}
        >
          🌸
        </motion.span>
      </motion.div>
    </div>
  );
}
