/**
 * AnimatedGradient
 * The soft, living pastel wash at the very back of the page.
 *
 * PERFORMANCE: the base gradient is static (animating `background-position`
 * forces a full-screen repaint every frame). The "living" feel instead comes
 * from two large radial glow orbs that drift via `transform` only — cheap and
 * GPU-composited. Paused automatically under reduced motion.
 */
export default function AnimatedGradient() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base static gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(120deg, #FFFDF8 0%, #FADADD 25%, #F8C8DC 45%, #E6E6FA 65%, #FFE5D4 85%, #FFFDF8 100%)',
          opacity: 0.9,
        }}
      />

      {/* Soft drifting radial glows for depth (transform-only movement) */}
      <div
        className="gpu absolute -left-40 -top-40 h-[60vmax] w-[60vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(248,200,220,0.55), transparent 60%)',
          filter: 'blur(30px)',
          '--gx': '60px',
          '--gy': '40px',
          animation: 'deco-glow-drift 26s ease-in-out infinite',
        }}
      />
      <div
        className="gpu absolute -bottom-40 -right-40 h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(230,230,250,0.5), transparent 60%)',
          filter: 'blur(30px)',
          '--gx': '-50px',
          '--gy': '-40px',
          animation: 'deco-glow-drift 32s ease-in-out infinite',
        }}
      />

      {/* Faint ivory vignette to keep text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, transparent 40%, rgba(255,253,248,0.35) 100%)',
        }}
      />
    </div>
  );
}
