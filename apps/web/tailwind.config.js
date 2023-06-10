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
    extend: {
      screens: {
        '3xl': '2100px',
      },
      zIndex: {
        '-1': '-1',
      },
      fontFamily: {
        body: ['Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10px': '0.625rem',
      },
      colors: {
        seafoam: '#C9EEBE',
        champange: '#F7EDE3',
        brand: colors.indigo,
        social: {
          facebook: '#3b5998',
          'facebook-hover': '#35508a',
          twitter: '#1da1f2',
          instagram: '#e1306c',
          youtube: '#ff0000',
          google: '#4285f4',
          'google-hover': '#3574de',
        },
      },
      minHeight: {
        580: '580px',
        140: '35rem', // 560px
        40: '10rem', // 140px
        6: '2.5rem',
      },
      height: {
        4.5: '1.125rem',
        13: '3.125rem',
        22: '5.25rem',
        double: '200%',
      },
      maxHeight: {
        '70vh': '70vh',
        '85vh': '85vh',
        140: '35rem', // 560px
      },
      maxWidth: {
        1920: '1920px',
      },
      minWidth: {
        150: '150px',
      },
      borderRadius: {
        DEFAULT: '5px',
      },
      inset: {
        22: '5.25rem',
      },
      strokeWidth: {
        2.5: '2.5',
      },
      boxShadow: {
        200: 'rgba(0, 0, 0, 0.16) 0px 3px 6px',
        300: 'rgba(0, 0, 0, 0.16) 0px 0px 6px',
        350: 'rgba(0, 0, 0, 0.16) 0px 3px 6px',
        400: 'rgba(0, 0, 0, 0.1) 0px 0px 8px 0',
        500: 'rgba(0, 0, 0, 0.17) 0px 0px 12px',
        600: 'rgba(0, 0, 0, 0.1) 0px 3px 8px',
        700: 'rgba(0, 0, 0, 0.08) 0px 2px 16px',
        900: 'rgba(0, 0, 0, 0.05) 0px 21px 36px',
        downfall: 'rgba(0, 0, 0, 0.14) 0px 6px 12px',
        'downfall-xs': 'rgba(0, 0, 0, 0.14) 0px 1px 2px',
        'downfall-sm': 'rgba(0, 0, 0, 0.14) 0px 2px 4px',
        'downfall-lg': 'rgba(0, 0, 0, 0.16) 0px 8px 16px',
      },
      transitionProperty: {
        height: 'height',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.04, 0.62, 0.23, 0.98)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
