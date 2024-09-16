/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules//*.{js,ts,jsx,tsx,mdx}",
    "./src/shared//*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /** ***********************************
       * custom color here
       *********************************** */
      colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'custom-blue':'#87B7FF',
      'custom-yellow':'#F7C146',
      'custom-dark-blue':'#44AFC3'
    }},
    
    
  },
  plugins: [],
}

