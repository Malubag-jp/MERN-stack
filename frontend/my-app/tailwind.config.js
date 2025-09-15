module.exports = {
   purge: [],
   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          neon: "#00FF9D",
          radialcustom: 'radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)',
        },
        backgroundImage: {
          'radial-custom': 'radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
      require("daisyui"),
    ],
    daisyui: {
      themes: [
        // {
        //   myThemes: {
        //     'base-300': '#3A3A3A',
        //   },
        // },
        
        "forest",
      ],
    },
  }