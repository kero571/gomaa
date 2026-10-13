/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#1a0d05",
        card: "#2a1609",
        brand: "#ff8a00",
        brandSoft: "#ffa733",
      },
      fontFamily: { sans: ["var(--font-cairo)", "system-ui", "sans-serif"] },
      keyframes: {
        fadeUp: { "0%": { opacity: 0, transform: "translateY(16px)" }, "100%": { opacity: 1, transform: "none" } },
        pop: { "0%": { opacity: 0, transform: "scale(.94)" }, "100%": { opacity: 1, transform: "none" } },
        bar: { "0%,100%": { transform: "scaleY(.3)" }, "50%": { transform: "scaleY(1)" } },
        pulseRing: { "0%": { boxShadow: "0 0 0 0 rgba(255,138,0,.5)" }, "100%": { boxShadow: "0 0 0 16px rgba(255,138,0,0)" } },
      },
      animation: {
        fadeUp: "fadeUp .7s ease-out both",
        pop: "pop .25s ease-out both",
        bar: "bar 1s ease-in-out infinite",
        ring: "pulseRing 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
