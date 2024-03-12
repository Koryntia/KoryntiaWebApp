import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        appColor1: "#B92FFF",
        appColor2: "#C77FEE",
        textBlack: "#222222",
        black222: "#222",
        inputBg: "#F7F9FA",
        textGray: "#93989A",
        white03: "#FAFAFA",
        purple2: "#f3dbff",
        textNeutral: "#101010",
        textGreen1: "#8CB10C",
        black2: "#4E4E4E",
        blue1: "#F7F9FA",
        dark: "#26292E",
        darkText: "#A7A6B8",
        whiteFFF: "#FFF",
        purpleLight: "#F4E0FF",
        purple3: "#e3b3fc",
      },
      fontFamily: {
        outfit: ["var(--outfit)"],
        inter: ["var(--inter)"],
        raleway: ["var(--raleway)"],
      },
    },
  },
  plugins: [],
}
export default config
