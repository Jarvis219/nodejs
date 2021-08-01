module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  mode: 'jit',
  theme: {
    rotate: {
      '-180': '-180deg',
      '-90': '-90deg',
      '-45': '-45deg',
      '0': '0',
      '45': '45deg',
      '90': '90deg',
      '135': '135deg',
      '180': '180deg',
      '270': '270deg',
      '360': '360deg',
    },

    extend: {
      colors: {
        'chambray': {
          50: '#F4F6F9',
          100: '#EAEDF2',
          200: '#CAD2E0',
          300: '#AAB7CD',
          400: '#6A81A7',
          500: '#2A4B81',
          600: '#264474',
          700: '#192D4D',
          800: '#13223A',
          900: '#0D1727',
        },
      },
      margin: {
        '72': '32rem',
        '80': '40rem',
        '90': '50rem',
      }
    },
  },

  plugins: [],
}
