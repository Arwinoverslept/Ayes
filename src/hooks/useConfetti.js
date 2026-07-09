import { useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useReducedMotion } from './useReducedMotion';

// On-theme confetti colors — soft pinks, gold, lavender.
const PALETTE = ['#F8C8DC', '#FADADD', '#E8D7A5', '#E6E6FA', '#FFE5D4', '#D8A7B1'];

/**
 * Central confetti helper. Returns a set of tasteful, reusable bursts so the
 * celebration feels designed rather than random. All bursts no-op when the
 * user prefers reduced motion.
 *
 *  origin — { x, y } in normalized 0..1 coords (defaults to center-ish).
 */
export function useConfetti() {
  const reduced = useReducedMotion();

  /** A gentle burst from a specific point (e.g. the gift box). */
  const burst = useCallback(
    (origin = { x: 0.5, y: 0.5 }) => {
      if (reduced) return;
      confetti({
        particleCount: 140,
        spread: 90,
        startVelocity: 45,
        gravity: 0.9,
        scalar: 1.05,
        ticks: 260,
        origin,
        colors: PALETTE,
        disableForReducedMotion: true,
      });
      // A soft trailing shimmer of little hearts/stars.
      confetti({
        particleCount: 40,
        spread: 120,
        startVelocity: 25,
        gravity: 0.7,
        scalar: 1.4,
        ticks: 300,
        origin,
        colors: PALETTE,
        shapes: ['circle'],
        disableForReducedMotion: true,
      });
    },
    [reduced]
  );

  /** Side cannons — used to frame the finale. */
  const cannons = useCallback(() => {
    if (reduced) return;
    const common = {
      particleCount: 60,
      spread: 70,
      startVelocity: 55,
      ticks: 300,
      colors: PALETTE,
      disableForReducedMotion: true,
    };
    confetti({ ...common, angle: 60, origin: { x: 0, y: 0.7 } });
    confetti({ ...common, angle: 120, origin: { x: 1, y: 0.7 } });
  }, [reduced]);

  /**
   * Sustained fireworks for the grand finale. Runs for `duration` ms and
   * returns a stop() function so callers can cancel early if needed.
   */
  const fireworks = useCallback(
    (duration = 4000) => {
      if (reduced) return () => {};
      const end = Date.now() + duration;
      let raf;
      const frame = () => {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 75,
          startVelocity: 50,
          origin: { x: 0, y: 0.8 },
          colors: PALETTE,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 75,
          startVelocity: 50,
          origin: { x: 1, y: 0.8 },
          colors: PALETTE,
          disableForReducedMotion: true,
        });
        // Occasional aerial burst in the upper area.
        if (Math.random() > 0.7) {
          confetti({
            particleCount: 50,
            spread: 360,
            startVelocity: 30,
            gravity: 0.9,
            scalar: 1.1,
            origin: { x: 0.2 + Math.random() * 0.6, y: Math.random() * 0.5 },
            colors: PALETTE,
            disableForReducedMotion: true,
          });
        }
        if (Date.now() < end) raf = requestAnimationFrame(frame);
      };
      frame();
      return () => cancelAnimationFrame(raf);
    },
    [reduced]
  );

  return { burst, cannons, fireworks };
}

export default useConfetti;
