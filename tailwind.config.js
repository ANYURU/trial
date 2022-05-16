 module.exports = {
  content: [  "./src/**/*.{js,jsx,ts,tsx}",  ],
  theme: {
    extend: {
      screens: {
        'sm': '700px',
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
        'primary': '#27427A'
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
  plugins: [],
}
