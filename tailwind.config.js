/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Soft, harmonious pastel palette — the heart of the theme
        pastel: '#F8C8DC', // Pastel Pink (primary)
        blush: '#FADADD', // Blush Pink
        ivory: '#FFFDF8', // Ivory
        lavender: '#E6E6FA', // Lavender
        peach: '#FFE5D4', // Soft Peach
        rose: '#D8A7B1', // Dusty Rose
        sage: '#D8E2DC', // Sage Green (subtle accents)
        champagne: '#E8D7A5', // Champagne Gold (highlights)
      },
      fontFamily: {
        greeting: ['"Great Vibes"', 'cursive'],
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(216, 167, 177, 0.35)',
        glow: '0 0 40px -5px rgba(248, 200, 220, 0.6)',
        card: '0 20px 60px -15px rgba(216, 167, 177, 0.3)',
        lift: '0 30px 70px -20px rgba(216, 167, 177, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'gradient-drift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        'gradient-drift': 'gradient-drift 18s ease infinite',
      },
    },
  },
  plugins: [],
};
