import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import AnimatedGradient from './components/AnimatedGradient';
import FloatingDecorations from './components/FloatingDecorations';
import ScrollProgress from './components/ScrollProgress';
import GiftBox from './components/GiftBox';
import Hero from './components/Hero';
import Favorites from './components/Favorites';
import Reasons from './components/Reasons';
import Wishes from './components/Wishes';
import SurpriseModal from './components/SurpriseModal';
import Celebration from './components/Celebration';
import Footer from './components/Footer';

/**
 * App
 * Orchestrates the progressive story:
 *   1. Locked state → only the GiftBox is visible.
 *   2. On open → the intro dissolves and the full experience fades up.
 *   3. Closing the surprise letter triggers the finale.
 *   4. "Replay the magic" restarts the whole experience from the closed gift.
 *
 * The living background (gradient + decorations) is always present so every
 * scene shares the same dreamy atmosphere.
 */
// Persisted keys the app writes to localStorage (kept here so the reset
// shortcut always clears everything the experience remembers).
const PERSISTED_KEYS = ['ayes-birthday-treat-v1'];

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [finale, setFinale] = useState(false);

  // Testing helper: visiting the site with "?reset" clears any saved state
  // (e.g. the treat choice) so all options can be tried again, then strips the
  // param so a normal refresh doesn't keep resetting. Harmless in production —
  // it only runs when the param is deliberately present.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('reset')) {
      try {
        PERSISTED_KEYS.forEach((key) => window.localStorage.removeItem(key));
      } catch {
        /* storage unavailable — nothing to clear */
      }
      params.delete('reset');
      const clean =
        window.location.pathname + (params.toString() ? `?${params}` : '');
      window.history.replaceState(null, '', clean);
    }
  }, []);

  const handleOpenGift = useCallback(() => {
    setUnlocked(true);
    // Gently invite exploration by easing the greeting into view.
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        document
          .getElementById('greeting')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 700);
    });
  }, []);

  const showFinale = useCallback(() => setFinale(true), []);
  const hideFinale = useCallback(() => setFinale(false), []);

  // "Replay the magic" — relive the whole experience from the closed gift.
  const handleRestart = useCallback(() => {
    setFinale(false);
    setUnlocked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-[100svh] w-full overflow-x-hidden">
      {/* Living background — always on */}
      <AnimatedGradient />
      <FloatingDecorations />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          /* ── Scene 1 · The Gift (locked) ── */
          <motion.div
            key="gift"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            <GiftBox onOpen={handleOpenGift} />
          </motion.div>
        ) : (
          /* ── Scenes 2–8 · The Experience ── */
          <motion.main
            key="story"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <ScrollProgress />
            <Hero />
            <Favorites />
            <Reasons />
            <Wishes />
            <SurpriseModal onClosed={showFinale} />
            <Footer onReplay={handleRestart} />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Grand finale overlay (Scene 8) */}
      <Celebration show={finale} onClose={hideFinale} />
    </div>
  );
}
