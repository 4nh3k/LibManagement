/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (max-width: 640px) { ... }
      md: '768px',
      lg: '1100px',
      xl: '1500px'
    },

    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      },
      backgroundImage: {
        readingBook: "url('/src/assets/img/illustration.svg')",
        ladingBg: "url('/src/assets/img/bg.svg')"
      },
      colors: {
        sidebarColor: '#E3E7F3',
        background: '#F2F6FF',
        primary: '#8352FD',
        primaryBg: '#E8E7FD',
        primaryBtn: '#5632A1',
        primaryBtnPress: '#33196B',
        primaryBorder: '#C0BBF4',
        primary2: '#3913B8',
        neutralDark: '#1A2151',
        neutralLight: '#E3E8FF',
        secondary1: '#00CFFD',
        secondary2: '#2FB5FC',
        textboxBorder: '#E0E0E0',
        linkText: '#007185'
      },
      borderWidth: {
        1: '1px',
        6: '6px'
      },
      outlineWidth: {
        6: '6px'
      },
      boxShadow: {
        default: '0 0 10px rgba(0, 0, 0, 25)'
      }
    }
  },
  plugins: ['prettier-plugin-tailwindcss']
};
