/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors :{
        bluee : '#800080',
        tmode_bg: "#181818",
        res_bg: '#727272',
        use_bg :'#94C93D',
        use_q :"#94C93D"
      },
      fontSize :{
        xxs : 6,
        xss: 10
      },
      height:{
        '200p' : '200px'
      }
    },
  },
  plugins: [],
}

