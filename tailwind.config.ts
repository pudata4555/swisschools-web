import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Swiss-red accent over cool neutrals
        brand: {
          DEFAULT: "#D52B1E",
          50: "#FDECEA",
          100: "#FBD5D1",
          600: "#C01E12",
          700: "#9E1810",
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          soft: "#64748B",
        },
        line: "#E6E8EC",
        cloud: "#F6F7F9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.04), 0 8px 24px rgba(16,24,40,.06)",
        hover: "0 2px 4px rgba(16,24,40,.06), 0 16px 40px rgba(16,24,40,.12)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};

export default config;
