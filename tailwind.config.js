 module.exports = {
  content: [  "./src/**/*.{js,jsx,ts,tsx}",  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'sm': '400px',
        'md':'800px'
      },
      colors: {
        'transparent': 'transparent',
        'lightblue': '#7788ab',
        'inputblue': '#d7e4f1',
        'accent': '#F1F0F0',
        'accent-red': '#B93131',
        'back': '#DEE1E3',
        'white': '#fff',
        'black': '#000',
        'primary': '#27427A',
        "dark-bg": "#121212",
        "dark-bg-700": "#181818",
        "dark-bg-600": "#282828",
        "secondary-text": "#b3b3b3"
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'myShadow': '0px 0px 50px rgba(0, 0, 0, 0.12)',
      },
      visibility: {
        'hidev': 'hidden',
      }
    },
  },
  plugins: [
  ],
}
