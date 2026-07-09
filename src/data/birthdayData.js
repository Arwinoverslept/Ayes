/**
 * ─────────────────────────────────────────────────────────────
 *  💖  THE ONLY FILE YOU NEED TO EDIT  💖
 * ─────────────────────────────────────────────────────────────
 *  Change anything here and the whole website updates — you never
 *  have to touch the UI components.
 *
 *  • Photos: drop image files into `public/photos/` then set the
 *    `src` paths below (e.g. "/photos/memory-1.jpg").
 *    Leave `src: null` to show a pretty placeholder instead.
 * ─────────────────────────────────────────────────────────────
 */

export const birthdayData = {
  // ── Who this is for / from ────────────────────────────────
  recipientName: 'Chriselle Angela Opeña Cardaño',
  // Shown in the big greeting (keep it short & sweet).
  greetingName: 'Ayes',
  // A term of endearment used in a few warm spots.
  nickname: 'Pretty',
  senderName: 'Arwin',
  birthDate: 'August 13',

  // ── Scene 1 · The Gift ────────────────────────────────────
  gift: {
    prompt: 'Someone prepared something special just for you...',
    button: 'Open Your Gift',
  },

  // ── Scene 2 · Birthday Greeting ───────────────────────────
  // The short message. Each paragraph fades in one after another,
  // so you can split it into multiple strings for extra grace.
  birthdayMessage: [
    'I hope today brings you as much happiness as you bring to everyone around you.',
    'May your year be filled with love, laughter, exciting adventures, and dreams coming true.',
    'Never stop smiling, because your smile makes the world a little brighter. Wishing you the happiest birthday ever!',
  ],

  // ── Scene 3 · Favorites (photo gallery) ───────────────────
  // This section shows EVERY image you drop into `src/assets/favorites/`
  // automatically — there's nothing to configure here.

  // ── Scene 4 · Things I Love About You ─────────────────────
  // `icon` matches a key in src/components/Reasons.jsx iconMap.
  reasons: [
    { icon: 'heart', text: 'Your Kindness' },
    { icon: 'flower', text: 'Your Beautiful Heart' },
    { icon: 'smile', text: 'Your Gorgeous Smile' },
    { icon: 'sparkles', text: 'Your Stunning Beauty' },
    { icon: 'brain', text: 'Your Intelligence' },
    { icon: 'laugh', text: 'Your Sense of Humor' },
    { icon: 'tulip', text: 'Your Caring Nature' },
    { icon: 'sun', text: 'Your Positive Energy' },
    { icon: 'grin', text: 'The Way You Make Me Smile' },
    { icon: 'eye', text: 'Your Beautiful Eyes' },
    { icon: 'butterfly', text: 'Simply Being You' },
  ],

  // ── Scene 6 · Birthday Wishes ─────────────────────────────
  wishes: [
    { emoji: '🌸', text: 'Wishing you endless happiness today and always.' },
    { emoji: '💖', text: 'May your heart always be filled with love and joy.' },
    { emoji: '✨', text: 'May every dream you chase find its way to you.' },
    {
      emoji: '🎂',
      text: 'Here’s to another year of beautiful memories and new adventures.',
    },
    {
      emoji: '🌷',
      text: 'May your smile continue to brighten every room you walk into.',
    },
    {
      emoji: '🦋',
      text: 'Wishing you good health, peace, and countless reasons to laugh.',
    },
    {
      emoji: '🌟',
      text: 'May this year bring you closer to everything your heart desires.',
    },
    {
      emoji: '💕', text: 'Never forget how deeply loved and appreciated you are.'
    },
    {
      emoji: '🎁',
      text: 'May every day ahead be as wonderful and special as you are.',
    },
    {
      emoji: '🎉',
      text: 'Happy Birthday! May today be filled with love, laughter, and unforgettable moments.',
    },
  ],

  // ── Scene 7 · One Last Surprise (the letter) ──────────────
  surprise: {
    button: 'One Last Surprise',
    modalTitle: 'A Letter For You',
    // ✍️  REPLACE THIS with your own letter when it's ready.
    //     Each string is its own paragraph.
    letter: [
      'Hey Ayes,',
      'Thank you for your kindness, your patience, your laughter, and that smile that quietly fixes whatever needs fixing in me. Thank you for being exactly, wonderfully you.',
      'On your birthday, my only wish is that you feel even a fraction of the joy you give to everyone lucky enough to know you. You deserve the whole world, and I hope this year begins to give it to you.',
      'Happy Birthday, Pretty. Here’s to you — today, and every day after.',
    ],
    signOff: 'With all my heart,',
  },

  // ── Scene 8 · Grand Finale ────────────────────────────────
  finale: {
    message: 'May all your dreams come true. Happy Birthday, Pretty!',
    replayButton: 'Replay the magic',
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    line: 'Made with love, just for you.',
  },
};

export default birthdayData;
