module.exports = {
  important: true,
  purge: [],
  theme: {
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
      },
      backgroundOpacity: {
        "95": "0.95",
      },
    },
  },
  variants: {},
  plugins: [],
};
