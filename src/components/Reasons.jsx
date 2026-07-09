import { motion } from 'framer-motion';
import {
  HiHeart,
  HiSparkles,
  HiSun,
  HiFaceSmile,
  HiEye,
} from 'react-icons/hi2';
import {
  FaRegLaughBeam,
  FaBrain,
  FaFeatherAlt,
} from 'react-icons/fa';
import { PiFlowerLotusFill, PiFlowerTulipFill, PiButterflyFill } from 'react-icons/pi';
import { birthdayData } from '../data/birthdayData';

/**
 * Scene 5 · Things I Love About You
 * Elegant glass cards, one per quality. Hovering gently lifts a card and blooms
 * a soft glow. Icons map from friendly keys defined in birthdayData.reasons.
 */

// Map data `icon` keys → React Icon components (keeps the data file human-friendly).
const iconMap = {
  heart: HiHeart,
  flower: PiFlowerLotusFill,
  smile: HiFaceSmile,
  sparkles: HiSparkles,
  brain: FaBrain,
  laugh: FaRegLaughBeam,
  tulip: PiFlowerTulipFill,
  sun: HiSun,
  grin: FaRegLaughBeam,
  eye: HiEye,
  butterfly: PiButterflyFill,
  feather: FaFeatherAlt,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

export default function Reasons() {
  const { reasons } = birthdayData;

  return (
    <section id="reasons" className="section-shell" aria-label="Things I love about you">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mb-14 text-center"
      >
        <h2 className="section-title">Things I Love About You</h2>
        <p className="mx-auto mt-4 max-w-md font-body text-rose/60">
          There are countless reasons — here are just a few. 💗
        </p>
      </motion.div>

      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {reasons.map((reason, i) => {
          const Icon = iconMap[reason.icon] || HiHeart;
          return (
            <motion.li
              key={i}
              variants={item}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative"
            >
              {/* Glow that blooms on hover */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-pastel/50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="glass flex h-full items-center gap-4 rounded-3xl p-6 transition-shadow duration-500 group-hover:shadow-glow">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blush to-pastel text-2xl text-rose shadow-inner">
                  <Icon />
                </span>
                <span className="font-heading text-lg text-rose/90">{reason.text}</span>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
