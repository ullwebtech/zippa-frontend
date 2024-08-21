/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#01063D',
        secondary: "#01C853",
        tg: "#3894DF",
        thrift: "#C68F00",
        lock: "#7248D0"
      },
    },
  },
  plugins: [],
};
