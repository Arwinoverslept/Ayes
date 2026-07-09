# 💖 A Birthday Experience for Chriselle

A premium, interactive birthday greeting — an unfolding digital gift built with
love. Soft pastel-pink aesthetic, dreamy animations, and a story that reveals
itself scene by scene.

Made with **React + Vite**, **Tailwind CSS**, **Framer Motion**, **React Icons**,
and **Canvas Confetti**.

---

## ✨ Getting started

```bash
npm install
npm run dev      # start the dev server (opens http://localhost:5173)
```

To build for production / hosting:

```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build locally
```

---

## 🎁 The experience (scene by scene)

1. **The Gift** — a floating gift box; tap it to open (confetti + balloons).
2. **Greeting** — an animated "Happy Birthday, Chriselle 💖" + a heartfelt note,
   with a little cake candle you can tap to blow out and make a wish.
3. **Our Favorite Memories** — a masonry photo gallery with a lightbox.
4. **Our Story, So Far** — a scroll-revealed memory timeline.
5. **Things I Love About You** — glowing quality cards.
6. **Birthday Wishes** — gently floating wish cards.
7. **One Last Surprise** — a modal with a long personal letter.
8. **Grand Finale** — full-screen fireworks, hearts, and balloons.

---

## 📝 Customizing everything

**All content lives in one file:** [`src/data/birthdayData.js`](src/data/birthdayData.js).

Edit names, the message, the letter, memories, wishes, and photo captions there —
the whole site updates automatically. You never need to touch the UI components.

### Adding real photos
1. Drop image files into [`public/photos/`](public/photos/) (see the README there).
2. Set the matching `src` paths in `birthdayData.js`, e.g.
   `{ src: "/photos/memory-1.jpg", caption: "..." }`.
3. Any photo left as `src: null` shows a soft placeholder automatically.

### The letter
Replace the placeholder paragraphs in `birthdayData.surprise.letter` with your
own words — each string is one paragraph.

---

## 🎨 Design notes

- **Palette:** pastel pink primary, with blush, ivory, lavender, peach, dusty
  rose, sage, and champagne gold — all defined as Tailwind tokens in
  `tailwind.config.js`.
- **Fonts:** Great Vibes (greeting), Playfair Display (headings), Poppins (body).
- **Accessibility:** keyboard-navigable lightbox & modal, focus trapping, ARIA
  labels, and full `prefers-reduced-motion` support.
- **Performance:** transform/opacity-only animations, lazy-loaded images, and
  decoration density that scales down on mobile.

Happy Birthday. 🎂
