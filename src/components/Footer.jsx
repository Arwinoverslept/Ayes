import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';
import { birthdayData } from '../data/birthdayData';

/**
 * Footer
 * A soft sign-off with a "Replay the magic" button that re-triggers the grand
 * finale so the recipient can relive the celebration any time.
 */
export default function Footer({ onReplay }) {
  const { footer, finale, senderName, birthDate } = birthdayData;

  return (
    <footer className="relative mx-auto w-full max-w-4xl px-6 pb-16 pt-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="glass rounded-[32px] px-6 py-10"
      >
        <button
          type="button"
          onClick={onReplay}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pastel to-rose px-7 py-3 font-body text-sm font-medium text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
        >
          <HiSparkles className="transition-transform duration-500 group-hover:rotate-12" />
          {finale.replayButton}
        </button>

        <p className="mt-8 font-heading text-lg italic text-rose/80">{footer.line}</p>
        <p className="mt-2 font-body text-sm text-rose/60">
          {senderName} &nbsp;·&nbsp; {birthDate}
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-rose/40">
          <span>🌸</span>
          <span className="h-px w-16 bg-rose/20" />
          <span>💖</span>
          <span className="h-px w-16 bg-rose/20" />
          <span>🌸</span>
        </div>
      </motion.div>
    </footer>
  );
}
