const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    'libs/frontend/src/**/!(*.stories|*.spec).{ts,tsx,html}',
  ],
  
  theme: {
    screens: {
      mobile: '420px',
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    fontFamily: {
      sans: ['SF Pro Display', 'sans-serif'],
    },
    extend: {
      fontSize: {
        '1xs': '11px',
      },
      colors: {
        'indigo-900': '#363452',
        'indigo-950': '#2D2B44',
        'indigo-1000': '#222133',
        'indigo-1100': '#181727',
      },
      height: {
        '60px': '60px',
        '20rem': '20rem',
        '25rem': '25rem',
      },
      maxWidth: {
        '16rem': '16rem',
      },
      minWidth: {
        '15rem': '15rem',
      },
      maxHeight: {
        '90vh': '90vh',
        '80vh': '80vh',
        '70vh': '70vh',
        '85%': '85%',
      },
      minHeight: {
        '10rem': '10rem',
        '18rem': '18rem',
        '24rem': '24rem',
        '80%': '80%',
      },
      width: {
        '20rem': '20rem',
        '30rem': '30rem',
        '40rem': '40rem',
      },
      padding: {
        '6%': '6%',
        '60px': '60px',
        '20%': '20%',
        '10%': '10%',
      },
      zIndex: {
        9999: '9999',
      },
    },
    default: {
      button: {
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.4,
        },
      },
    },
  },
  plugins: [],
};
