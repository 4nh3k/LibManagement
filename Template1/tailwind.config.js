/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      },
      backgroundImage: {
        readingBook: "url('/src/assets/img/illustration.svg')",
        ladingBg: "url('/src/assets/img/bg.svg')",
      },
      colors: {
        background: '#F2F6FF',
        primary: '#8352FD',
        primaryBorder: '#C0BBF4',
        primary2: '#3913B8',
        neutralDark: '#1A2151',
        neutralLight: '#E3E8FF',
        secondary1: '#00CFFD',
        secondary2: '#2FB5FC',
        textboxBorder: '#E0E0E0'
      },
      borderWidth: {
        1: '1px',
        6: '6px'
      },
      outlineWidth: {
        6: '6px'
      }
    }
  },
  plugins: []
};
