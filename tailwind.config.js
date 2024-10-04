/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      colors: {
        primary: "#343E37",
        "light-green": "#9DC7A9",
        "misc-blue": "#333333",
        "light-bg": "#FAFAFA",
        "secondary-bg": "#F7FCF8",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
