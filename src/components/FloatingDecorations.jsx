import { useMemo } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * FloatingDecorations
 * A fixed, full-viewport layer of gentle ambient motion behind all content.
 *
 * PERFORMANCE: every sprite animates with pure CSS (transform + opacity) so the
 * work runs on the compositor thread, not JavaScript — this keeps dozens of
 * petals/stars/particles smooth even on phones. Per-element variety comes from
 * inline CSS custom properties + durations/delays (see keyframes in index.css).
 * Counts scale down on small screens and collapse to a calm static state under
 * reduced-motion.
 */

// Deterministic pseudo-random so layout is stable across renders.
const rand = (seed) => {
  const x = Math.sin(seed * 999.13) * 10000;
  return x - Math.floor(x);
};

function makeItems(count, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const s = i + offset;
    return {
      id: `${offset}-${i}`,
      left: rand(s) * 100, // vw %
      top: rand(s + 0.2) * 100, // vh % (for twinkle/bokeh)
      size: 0.6 + rand(s + 0.3) * 1.1, // scale multiplier
      delay: rand(s + 0.5) * 16, // s (used as negative offset)
      duration: 15 + rand(s + 0.7) * 16, // s
      drift: (rand(s + 0.9) - 0.5) * 140, // px horizontal sway
      spin: 12 + rand(s + 1.1) * 16, // s per rotation
      peak: 0.6 + rand(s + 1.3) * 0.35, // opacity peak
    };
  });
}

/* ── Individual sprites (pure SVG so they stay crisp) ─────────── */

const Petal = ({ size }) => (
  <svg viewBox="0 0 32 32" width={24 * size} height={24 * size}>
    <path
      d="M16 2c6 4 11 9 11 16 0 6-5 12-11 12S5 24 5 18C5 11 10 6 16 2z"
      fill="#F8C8DC"
      opacity="0.8"
    />
    <path d="M16 4c0 8 0 18 0 24" stroke="#FADADD" strokeWidth="1" opacity="0.6" />
  </svg>
);

const Heart = ({ size }) => (
  <svg viewBox="0 0 32 32" width={22 * size} height={22 * size}>
    <path
      d="M16 27S4 19.5 4 11.5C4 7.4 7.1 4.5 10.8 4.5c2.4 0 4.4 1.3 5.2 3.2.8-1.9 2.8-3.2 5.2-3.2C24.9 4.5 28 7.4 28 11.5 28 19.5 16 27 16 27z"
      fill="#FADADD"
      opacity="0.85"
    />
  </svg>
);

const Star = ({ size }) => (
  <svg viewBox="0 0 24 24" width={14 * size} height={14 * size}>
    <path
      d="M12 1l2.2 6.9H21l-5.6 4 2.2 6.9L12 14.7 6.4 18.8l2.2-6.9L3 7.9h6.8L12 1z"
      fill="#E8D7A5"
      opacity="0.9"
    />
  </svg>
);

const Butterfly = ({ size }) => (
  <svg viewBox="0 0 40 32" width={30 * size} height={24 * size}>
    <g opacity="0.72">
      <path d="M20 16C14 4 4 4 3 12c-1 7 8 11 17 4z" fill="#E6E6FA" />
      <path d="M20 16C26 4 36 4 37 12c1 7-8 11-17 4z" fill="#F8C8DC" />
      <path d="M20 16C15 22 6 24 5 20c-1-4 6-7 15-4z" fill="#FADADD" />
      <path d="M20 16C25 22 34 24 35 20c1-4-6-7-15-4z" fill="#FFE5D4" />
      <line x1="20" y1="8" x2="20" y2="24" stroke="#D8A7B1" strokeWidth="1.4" />
    </g>
  </svg>
);

/* ── Layers ──────────────────────────────────────────────────── */

/**
 * A sprite that travels vertically (fall or rise), sways horizontally, and
 * optionally spins — each on its own nested element so every animation is a
 * single compositor-friendly transform.
 */
function TravelSprite({ item, direction = 'fall', spin = false, children }) {
  return (
    <div
      className="gpu absolute top-0"
      style={{
        left: `${item.left}vw`,
        '--peak': item.peak,
        animation: `deco-${direction} ${item.duration}s linear ${-item.delay}s infinite`,
      }}
    >
      <div
        className="gpu"
        style={{
          '--drift': `${item.drift}px`,
          animation: `deco-sway ${item.duration}s ease-in-out ${-item.delay}s infinite`,
        }}
      >
        {spin ? (
          <div
            className="gpu"
            style={{ animation: `deco-spin ${item.spin}s linear infinite` }}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

// Softly twinkling sprite that stays in place (stars / particles).
function TwinkleSprite({ item, children }) {
  return (
    <div
      className="gpu absolute"
      style={{
        left: `${item.left}vw`,
        top: `${item.top}vh`,
        '--peak': item.peak,
        animation: `deco-twinkle ${4 + (item.duration % 5)}s ease-in-out ${-item.delay}s infinite`,
      }}
    >
      {children}
    </div>
  );
}

// Large blurred bokeh orb drifting slowly for depth (transform-only movement).
function Bokeh({ item }) {
  const size = 120 + item.size * 150;
  return (
    <div
      className="gpu absolute rounded-full"
      style={{
        left: `${item.left}vw`,
        top: `${item.top}vh`,
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 30% 30%, rgba(248,200,220,0.45), rgba(230,230,250,0.12) 60%, transparent 70%)',
        filter: 'blur(8px)',
        '--gx': `${item.drift}px`,
        '--gy': `${-item.drift * 0.5}px`,
        animation: `deco-glow-drift ${item.duration + 12}s ease-in-out ${-item.delay}s infinite`,
      }}
    />
  );
}

export default function FloatingDecorations() {
  const reduced = useReducedMotion();

  // Scale density by viewport for performance. Read once on mount.
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 640px)').matches;

  const petals = useMemo(() => makeItems(isMobile ? 5 : 10, 0), [isMobile]);
  const hearts = useMemo(() => makeItems(isMobile ? 2 : 4, 100), [isMobile]);
  const stars = useMemo(() => makeItems(isMobile ? 5 : 12, 200), [isMobile]);
  const particles = useMemo(() => makeItems(isMobile ? 6 : 14, 300), [isMobile]);
  const butterflies = useMemo(() => makeItems(isMobile ? 1 : 3, 400), [isMobile]);
  // Bokeh is the most expensive layer (blur); keep it sparse, skip on mobile.
  const bokeh = useMemo(() => makeItems(isMobile ? 0 : 3, 500), [isMobile]);

  // Reduced motion: show a few static, faint decorations for atmosphere only.
  if (reduced) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        {stars.slice(0, 8).map((s) => (
          <div
            key={s.id}
            className="absolute opacity-40"
            style={{ left: `${s.left}vw`, top: `${s.top}vh` }}
          >
            <Star size={s.size} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ contain: 'strict' }}
    >
      {/* Bokeh depth layer (furthest back) */}
      {bokeh.map((item) => (
        <Bokeh key={`bk-${item.id}`} item={item} />
      ))}

      {/* Glowing particles + stars twinkling in place */}
      {particles.map((item) => (
        <TwinkleSprite key={`pt-${item.id}`} item={item}>
          <div
            className="rounded-full bg-white"
            style={{
              width: 6 * item.size,
              height: 6 * item.size,
              boxShadow: '0 0 8px 2px rgba(248,200,220,0.9)',
            }}
          />
        </TwinkleSprite>
      ))}
      {stars.map((item) => (
        <TwinkleSprite key={`st-${item.id}`} item={item}>
          <Star size={item.size} />
        </TwinkleSprite>
      ))}

      {/* Falling cherry blossom petals (gently spinning) */}
      {petals.map((item) => (
        <TravelSprite key={`pl-${item.id}`} item={item} direction="fall" spin>
          <Petal size={item.size} />
        </TravelSprite>
      ))}

      {/* Occasional hearts rising up */}
      {hearts.map((item) => (
        <TravelSprite key={`ht-${item.id}`} item={item} direction="rise">
          <Heart size={item.size} />
        </TravelSprite>
      ))}

      {/* Butterflies drifting slowly downward (gently spinning) */}
      {butterflies.map((item) => (
        <TravelSprite key={`bf-${item.id}`} item={item} direction="fall" spin>
          <Butterfly size={item.size} />
        </TravelSprite>
      ))}
    </div>
  );
}
