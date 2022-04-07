module.exports = {
  content: [
    './src/*.js',
    './public/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
