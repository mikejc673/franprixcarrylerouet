/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e', // Vert naturel
        accent: '#f59e0b', // Orange chaleureux
        // Ajoute neutre si besoin, ex. neutral: '#6b7280'
      },
    },
  },
  plugins: [],
};