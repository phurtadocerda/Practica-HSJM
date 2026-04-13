/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hsjm-blue': '#003876',    // Azul Institucional
        'hsjm-green': '#00a19a',   // Verde Salud
        'hsjm-accent': '#ffb81c',  // Dorado (Login/Alegría)
        'hsjm-light': '#f8fafc',
      },
    },
  },
  plugins: [],
}