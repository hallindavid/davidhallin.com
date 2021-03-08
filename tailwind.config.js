module.exports = {
  purge: {
    content: ['./layouts/**/*.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'display': ['Oswald', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/aspect-ratio'),
  ],
}
