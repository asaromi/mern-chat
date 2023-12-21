/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: false,
  theme: {
    extend: {
      width: {
        mobile: "820px",
        18: "4.5rem",
      },
      height: {
        'half-screen': '50vh',
        18: "4.5rem",
      },
    },
    maxWidth: (theme) => ({
      ...theme('width'),
    }),
    maxHeight: (theme) => ({
      ...theme('height'),
    }),
    minWidth: (theme) => ({
      ...theme('width'),
    }),
    minHeight: (theme) => ({
      ...theme('height'),
    }),
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"],
  },
}

