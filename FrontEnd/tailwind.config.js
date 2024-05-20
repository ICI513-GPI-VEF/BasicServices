/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        '600': '600px',
      },
      margin: {
        '8vw': '8vw',
      },
      colors:{
        'c-gray': '#545454',
        'c-green': '#1CBC74',
        'c-brown-1': '#826B54',
      }
    },
  },
  variants: {
    height: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
};
