

export const birthdayData = {
  recipientName: 'Chriselle Angela Opeña Cardaño',
  greetingName: 'Ayes',
  nickname: 'Pretty',
  senderName: 'Arwin Viernes',
  birthDate: 'August 13',

  gift: {
    prompt: 'Someone prepared something special just for you...',
    button: 'Open Your Gift',
  },

  birthdayMessage: [
    'I hope today brings you as much happiness as you bring to everyone around you.',
    'May your year be filled with love, laughter, exciting adventures, and dreams coming true.',
    'Never stop smiling, because your smile makes the world a little brighter. Wishing you the happiest birthday ever!',
  ],

  // ── Bonus · "Your Wish, Granted" treat picker (on the candle) ──
  // When she blows out the candle she gets to claim ONE real treat.
  // The choice locks the moment she picks and is remembered forever
  // (stored in her browser), so it can only be chosen once.
  treats: {
    prompt: 'Your wish is granted 💫',
    subtitle: 'Choose one treat, just for you. You can only pick one, so choose your heart’s desire.',
    options: [
      { emoji: '🍣', qty: '1×', name: 'Sushi Mix Platter' },
      { emoji: '🥐', qty: '1×', name: 'Pastry from Paul Le Café' },
      { emoji: '🍜', qty: '1×', name: 'Mendokoro Ramenba Ramen' },
    ],
    // Shown after she picks.
    claimTitle: 'Your treat is reserved! 🎟️',
    claimNote: 'Screenshot this and send it to Arwin to claim it',
    sendLabel: 'Send my choice to Arwin',
    // Used as a fallback when the phone’s share sheet isn’t available.
    notifyEmail: 'arwinbulongviernes@gmail.com',
  },

  // ── Favorites gallery captions ────────────────────────────
  // Optional captions for the photos in `src/assets/favorites/`, keyed by the
  // file's number (e.g. 01.JPG → "01"). Any photo not listed here simply shows
  // no caption. Shown on hover (desktop) and in the lightbox.
  favoriteCaptions: {
    '01': 'Gandaaaaa.',
    '02': 'Ganda talaga potek.',
    '03': 'One of my favorite photos of you.',
    '04': 'My favorite photo of you.',
    '05': 'Cute na Ayes.',
    '06': 'Lugi sa mga mata mo.',
    '08': 'Ang bait tignan HAHAHA',
    '13': 'Talo po sa Smile.',
    '17': 'Kumakain na Ayes.',
    '18': 'May Question Mark na Subtitle na Mukha ni Ayes',
    '19': 'Ganda matulog e. Ano gagawin jan.',
    '20': 'ETOOOOO. LITERAL NA CUTE NA AYES',
    '21': 'Tita Ayes and Aurora',
    '22': 'Fluffy naman ng Pisngi na yan',
    '24': 'Lugi sa EYES part 2.',
    '25': 'Lugi sa EYES part 3.',
    '31': 'Mejo makulit na Ayes',
  },

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
      emoji: '💕', text: 'Know that you are loved, ALWAYS in ALL WAYS.'
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
      'Heyhey! I hope youll have a great day today. (Kung late mo na nakita to, I hope you had a great day). Happy Birtday, Pretty!',
      'I have a few wishes for you. First, I hope you get to experience the same joy you bring to everyone whos lucky enough to know you. I hope all your dreams come true, no matter how big or small they may be, because you truly deserve every happiness life has to offer. I also wish you good health, both physically and mentally, so you can continue doing the things you love and enjoy every moment to the fullest. I also hope you continue to grow into an even more amazing person you already are, without ever losing the kindness that makes you so special. Most of all, I hope youre always surrounded by people who genuinely love and support you. I hope you never lose that beautiful smile, and I hope this new chapter of your life brings you happiness, peace, success, and countless unforgettable memories.',
      'I hope this little surprise made you smile. Take care always okay? Again, Happy Birthday, Pretty.',
    ],
    signOff: 'Best Wishes,',
  },

  // ── Scene 8 · Grand Finale ────────────────────────────────
  finale: {
    message: 'May all your dreams come true. Happy Birthday, Pretty!',
    replayButton: 'Replay the magic',
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    line: 'Made just for you.',
  },
};

export default birthdayData;
