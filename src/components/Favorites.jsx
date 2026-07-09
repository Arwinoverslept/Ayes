import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight, HiXMark } from 'react-icons/hi2';
import { FiImage } from 'react-icons/fi';

/**
 * Scene 4 · Favorites
 * A simple, elegant gallery that automatically displays EVERY image dropped
 * into `src/assets/favorites/`. No config needed — Vite scans the folder at
 * build time (import.meta.glob), so adding photos "just works". Images lay out
 * in a natural masonry, scale gently on hover, and open in a lightbox.
 */

// Auto-discover all images in the favorites folder, sorted by filename.
const modules = import.meta.glob(
  '../assets/favorites/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP,GIF,AVIF}',
  { eager: true, import: 'default' }
);

const FAVORITES = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({
    src,
    // A gentle fallback alt text from the filename.
    alt: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
  }));

function EmptyState() {
  return (
    <div className="mx-auto max-w-lg">
      <div className="glass flex flex-col items-center gap-4 rounded-3xl px-8 py-12 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blush to-pastel text-rose">
          <FiImage size={30} />
        </span>
        <p className="font-heading text-xl italic text-rose">
          Your favorite photos will appear here 🌸
        </p>
        <p className="font-body text-sm leading-relaxed text-rose/70">
          Drop any images into the{' '}
          <code className="rounded bg-white/60 px-1.5 py-0.5 text-rose">
            src/assets/favorites/
          </code>{' '}
          folder and they’ll show up automatically — no editing needed.
        </p>
      </div>
    </div>
  );
}

export default function Favorites() {
  const photos = useMemo(() => FAVORITES, []);
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, next, prev]);

  return (
    <section id="favorites" className="section-shell" aria-label="Favorites">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mb-14 text-center"
      >
        <h2 className="section-title">Pretty Ayes</h2>
        <p className="mx-auto mt-4 max-w-md font-body text-rose/60">
          A collection of Ayes moments💗.
        </p>
      </motion.div>

      {photos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="columns-2 gap-4 sm:gap-5 lg:columns-3 [&>*]:mb-4 sm:[&>*]:mb-5">
          {photos.map((photo, i) => (
            <motion.button
              type="button"
              key={photo.src}
              onClick={() => setActive(i)}
              aria-label={`Open photo ${i + 1}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative block w-full overflow-hidden rounded-3xl shadow-soft outline-none ring-champagne/50 focus-visible:ring-2"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="w-full rounded-3xl object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Soft glow tint on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-rose/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
          >
            <div className="absolute inset-0 bg-rose/40 backdrop-blur-xl" />

            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="absolute right-5 top-5 z-10 rounded-full bg-white/50 p-2.5 text-rose backdrop-blur transition hover:bg-white/80"
            >
              <HiXMark size={24} />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous photo"
                  className="absolute left-4 z-10 rounded-full bg-white/50 p-2.5 text-rose backdrop-blur transition hover:bg-white/80 sm:left-8"
                >
                  <HiChevronLeft size={26} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next photo"
                  className="absolute right-4 z-10 rounded-full bg-white/50 p-2.5 text-rose backdrop-blur transition hover:bg-white/80 sm:right-8"
                >
                  <HiChevronRight size={26} />
                </button>
              </>
            )}

            <motion.figure
              key={active}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-0 max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl shadow-lift"
            >
              <img
                src={photos[active].src}
                alt={photos[active].alt}
                className="max-h-[85vh] w-full object-contain"
              />
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
