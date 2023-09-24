/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,vue}",
    "./*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(indigo|green|red|blue|black|white)-(100|200|300|400|500|600|700|800|900)/
    }
  ],
}

