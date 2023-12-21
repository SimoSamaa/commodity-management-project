/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: 'var(--clr-green)',
        blue: 'var(--clr-blue)',
        red: 'var(--clr-red)',
        bg: 'var(--clr-bg)',
        heading: 'var(--clr-heading)',
        text: 'var(--clr-text)',
        seconder: 'var(--clr-seconder)',
        border: 'var(--clr-border)',
        alert: 'var(--clr-alert)',
        error: 'var(--clr-error)',
        lime: 'var(--clr-lime)',
        sky: 'var(--clr-sky)'
      },
    },
  },
  plugins: [],
}

