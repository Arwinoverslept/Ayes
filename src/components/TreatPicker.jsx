import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiGift, HiShare } from 'react-icons/hi2';
import { birthdayData } from '../data/birthdayData';
import { useConfetti } from '../hooks/useConfetti';

/**
 * TreatPicker — "Your Wish, Granted" 🎟️
 * Opened when the recipient blows out the birthday candle. She gets to claim
 * ONE real treat. The moment she picks, the choice LOCKS and is remembered in
 * localStorage, so it can only ever be chosen once (survives reloads/revisits).
 * Reopening later shows her reserved treat as a voucher, with the others dimmed.
 *
 * Fully accessible: focus-trapped, ESC / click-outside to close, ARIA labelled.
 */

const STORAGE_KEY = 'ayes-birthday-treat-v1';

// Read the persisted choice (index) once, safely.
function readChoice() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const n = Number.parseInt(raw, 10);
    return Number.isInteger(n) ? n : null;
  } catch {
    return null;
  }
}

export default function TreatPicker({ open, onClose }) {
  const { treats } = birthdayData;
  const { burst } = useConfetti();

  const [chosen, setChosen] = useState(() =>
    typeof window === 'undefined' ? null : readChoice()
  );
  const [copied, setCopied] = useState(false);

  const dialogRef = useRef(null);
  const alreadyChosen = chosen !== null;
  const chosenTreat = alreadyChosen ? treats.options[chosen] : null;

  const shareMessage = useMemo(() => {
    if (!chosenTreat) return '';
    return `Hi Arwin! For my birthday treat, I choose: ${chosenTreat.qty} ${chosenTreat.name} ${chosenTreat.emoji}`;
  }, [chosenTreat]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';

    const node = dialogRef.current;
    const focusables = node?.querySelectorAll(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
      if (e.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  // Commit a choice — this is the irreversible "lock".
  const pick = (index, e) => {
    if (alreadyChosen) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(index));
    } catch {
      /* storage may be unavailable (private mode) — still works for the session */
    }
    setChosen(index);

    // Celebrate from the tapped card.
    const rect = e?.currentTarget?.getBoundingClientRect?.();
    burst(
      rect
        ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
        : { x: 0.5, y: 0.5 }
    );
  };

  const sendToArwin = async () => {
    // Prefer the native share sheet (great on phones).
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Birthday Treat 🎂', text: shareMessage });
        return;
      } catch {
        /* user dismissed share — fall through to other options */
        return;
      }
    }
    // Fallback: copy to clipboard, then offer an email compose.
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked — the mailto below still works */
    }
    window.location.href = `mailto:${treats.notifyEmail}?subject=${encodeURIComponent(
      'My Birthday Treat 💕'
    )}&body=${encodeURIComponent(shareMessage)}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[55] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Blurred, dimmed backdrop */}
          <div className="absolute inset-0 bg-rose/30 backdrop-blur-2xl" />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="treat-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            className="glass relative z-10 w-full max-w-2xl overflow-hidden rounded-[32px] p-6 shadow-lift sm:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full bg-white/50 p-2 text-rose transition hover:bg-white/90"
            >
              <HiXMark size={22} />
            </button>

            {/* ── Header ── */}
            <div className="mb-7 text-center">
              <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blush to-pastel text-2xl text-rose shadow-inner">
                <HiGift />
              </span>
              <h3
                id="treat-title"
                className="font-greeting text-4xl text-rose sm:text-5xl"
              >
                {alreadyChosen ? treats.claimTitle : treats.prompt}
              </h3>
              {!alreadyChosen && (
                <p className="mx-auto mt-3 max-w-md font-body text-sm text-black/60">
                  {treats.subtitle}
                </p>
              )}
            </div>

            {/* ── Treat cards ── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {treats.options.map((treat, i) => {
                const isChosen = chosen === i;
                const isDimmed = alreadyChosen && !isChosen;
                return (
                  <motion.button
                    key={i}
                    type="button"
                    disabled={alreadyChosen}
                    onClick={(e) => pick(i, e)}
                    aria-label={
                      alreadyChosen
                        ? `${isChosen ? 'Chosen: ' : ''}${treat.qty} ${treat.name}`
                        : `Choose ${treat.qty} ${treat.name}`
                    }
                    animate={{
                      opacity: isDimmed ? 0.4 : 1,
                      scale: isDimmed ? 0.94 : 1,
                      filter: isDimmed ? 'grayscale(0.6)' : 'grayscale(0)',
                    }}
                    whileHover={alreadyChosen ? {} : { y: -8, scale: 1.04 }}
                    whileTap={alreadyChosen ? {} : { scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`group relative flex flex-col items-center gap-3 rounded-3xl border p-6 text-center transition-shadow duration-500 ${isChosen
                      ? 'border-champagne bg-white/70 shadow-glow'
                      : 'border-white/60 bg-white/40 hover:shadow-glow'
                      } ${alreadyChosen ? 'cursor-default' : 'cursor-pointer'}`}
                    style={
                      isChosen
                        ? { borderStyle: 'dashed', borderWidth: 2 }
                        : undefined
                    }
                  >
                    {/* Chosen badge */}
                    {isChosen && (
                      <motion.span
                        initial={{ scale: 0, rotate: -40 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                        className="absolute -right-2 -top-2 text-2xl"
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(216,167,177,0.55))' }}
                        aria-hidden="true"
                      >
                        🌸
                      </motion.span>
                    )}
                    <span className="text-5xl">{treat.emoji}</span>
                    <span className="font-body text-xs font-semibold uppercase tracking-wider text-rose/50">
                      {treat.qty}
                    </span>
                    <span className="font-heading text-lg leading-tight text-rose/90">
                      {treat.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* ── Claim / share (after picking) ── */}
            <AnimatePresence>
              {alreadyChosen && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mt-7 text-center"
                >
                  <p className="font-heading text-lg italic text-rose">
                    Yay! Arwin owes you {chosenTreat.qty} {chosenTreat.name}{' '}
                    {chosenTreat.emoji}
                  </p>
                  <p className="mt-1 font-body text-sm text-black/70">
                    {treats.claimNote}
                  </p>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
