module.exports = {
  important: true,
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    inset: {
      0: 0,
      auto: "auto",
      2: "2",
      "1/2": "50%",
      "1/20": "5%"
    },
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
        "bounce-slow": "bounce 5s infinite",
      },
      backgroundOpacity: {
        95: "0.95",
      },
      scale: {
        98: ".98",
      },
    },
  },
  variants: {},
  plugins: [],
};
