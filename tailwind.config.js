/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary" : "#ffffff",
        "secondary" : "#f0f0f0",
        "text" : "#333",
        "primary-dark": "#333333",
        "secondary-dark": "#1a1a1a",
        "text-dark": "#ffffff",
      },
       fontFamily: {
        "lato" : "Lato, sans-serif",
       }
    },
    screens: {
      "xs": "0px",
      "sm": "576px",
      "md": "768px",
      "lg": "992px",
      "xl": "1200px",
      "xxl": "1400px",
    },
    container: {
      screens: {
        xs: "100%",
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        xxl: "1320px"
      }
    }
  },
  plugins: [],
}

