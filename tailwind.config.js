/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pool: {
          deep:   '#003366',   // Deep Pacific navy
          azure:  '#00AEEF',   // Azure Spark
          sky:    '#A5D8F0',   // Sky Blue
          stone:  '#E8EDF2',   // Sunwashed Stone
          gold:   '#FDB813',   // Golden Hour
          silver: '#C8CDD4',   // Cool Silver
          white:  '#FFFFFF',
          'deep-700': '#002244',
          'deep-800': '#001833',
          'azure-hover': '#0099D6',
        },
      },
      fontFamily: {
        display: ['var(--font-raleway)', 'Raleway', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.03em',
        display: '-0.04em',
        wide: '0.06em',
      },
      lineHeight: {
        body: '1.75',
        relaxed: '1.7',
        tight: '1.1',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,51,102,0.06), 0 4px 16px rgba(0,51,102,0.08)',
        'card-hover': '0 4px 20px rgba(0,51,102,0.12), 0 16px 48px rgba(0,51,102,0.15)',
        azure: '0 4px 24px rgba(0,174,239,0.3)',
        'azure-lg': '0 8px 40px rgba(0,174,239,0.4)',
        deep: '0 4px 24px rgba(0,51,102,0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(0,51,102,0.92) 0%, rgba(0,51,102,0.72) 55%, rgba(0,51,102,0.30) 100%)',
        'section-gradient': 'linear-gradient(180deg, #F7FAFD 0%, #FFFFFF 100%)',
        'azure-gradient': 'linear-gradient(135deg, #00AEEF 0%, #0099D6 100%)',
        'deep-gradient': 'linear-gradient(135deg, #003366 0%, #001833 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};
