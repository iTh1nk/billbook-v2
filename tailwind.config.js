module.exports = {
  important: true,
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: [],
  theme: {
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
        "bounce-slow": "bounce 5s infinite",
      },
      backgroundOpacity: {
        "95": "0.95",
      },
      scale: {
        "98": ".98",
      },
    },
  },
  variants: {},
  plugins: [],
};
