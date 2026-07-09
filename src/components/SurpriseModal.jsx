import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiOutlineEnvelope } from 'react-icons/hi2';
import { birthdayData } from '../data/birthdayData';

/**
 * Scene 7 · One Last Surprise
 * A beautifully styled button that opens a modal containing the long, personal
 * letter. The backdrop softly blurs the page behind it. Fully accessible:
 * focus is trapped inside, ESC and click-outside close it, and focus returns to
 * the trigger. When the letter is closed, `onClosed()` fires to cue the finale.
 */
export default function SurpriseModal({ onClosed }) {
  const { surprise, senderName } = birthdayData;
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const openModal = () => {
    setOpen(true);
    setHasOpened(true);
  };

  const closeModal = () => {
    setOpen(false);
    // Cue the grand finale once the recipient has read (and closed) the letter.
    if (hasOpened) onClosed?.();
    triggerRef.current?.focus();
  };

  // Lock scroll, trap focus, wire ESC.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';

    const node = dialogRef.current;
    const focusables = node?.querySelectorAll(
      'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <section
      id="surprise"
      className="section-shell flex flex-col items-center text-center"
      aria-label="One last surprise"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-6 font-heading text-xl italic text-rose/70">
          I saved something just for you...
        </p>
        <motion.button
          ref={triggerRef}
          type="button"
          onClick={openModal}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97 }}
          animate={{ boxShadow: [
            '0 0 0px rgba(248,200,220,0.0)',
            '0 0 40px rgba(248,200,220,0.7)',
            '0 0 0px rgba(248,200,220,0.0)',
          ] }}
          transition={{ boxShadow: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } }}
          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose via-pastel to-rose bg-[length:200%_auto] px-10 py-4 font-body text-lg font-medium text-white shadow-lift transition-all duration-500 hover:bg-right"
        >
          <HiOutlineEnvelope size={22} />
          {surprise.button} <span aria-hidden>❤️</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Blurred, dimmed backdrop */}
            <div className="absolute inset-0 bg-rose/30 backdrop-blur-2xl" />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="letter-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              className="glass relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-[32px] shadow-lift"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/50 px-7 py-5">
                <h3
                  id="letter-title"
                  className="font-greeting text-3xl text-rose sm:text-4xl"
                >
                  {surprise.modalTitle}
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close letter"
                  className="rounded-full bg-white/50 p-2 text-rose transition hover:bg-white/90"
                >
                  <HiXMark size={22} />
                </button>
              </div>

              {/* Letter body */}
              <div className="pretty-scroll space-y-4 overflow-y-auto px-7 py-6 text-left sm:px-9 sm:py-8">
                {surprise.letter.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                    className={
                      i === 0
                        ? 'font-heading text-xl italic text-rose'
                        : 'font-body text-[15px] leading-relaxed text-rose/85'
                    }
                  >
                    {para}
                  </motion.p>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + surprise.letter.length * 0.12 }}
                  className="pt-3 text-right"
                >
                  <p className="font-body text-[15px] text-rose/70">{surprise.signOff}</p>
                  <p className="font-greeting text-3xl text-rose">{senderName}</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
