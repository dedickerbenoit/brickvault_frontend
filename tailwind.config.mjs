/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Background colors
        background: {
          DEFAULT: "#F9FAFB",
          card: "#FFFFFF",
        },
        // Text colors
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
          disabled: "#9CA3AF",
        },
        // Borders
        border: {
          DEFAULT: "#E5E7EB",
          hover: "#D1D5DB",
        },
        // Primary - Red LEGO (softened)
        primary: {
          DEFAULT: "#D32F2F",
          50: "#FFEBEE",
          100: "#FFCDD2",
          200: "#EF9A9A",
          300: "#E57373",
          400: "#EF5350",
          500: "#D32F2F",
          600: "#C62828",
          700: "#B71C1C",
          800: "#A11C1C",
          900: "#7F1D1D",
        },
        // Gold - Value/Collection
        gold: {
          DEFAULT: "#E0B84C",
          50: "#FEF9E7",
          100: "#FDF3D0",
          200: "#FBE7A1",
          300: "#F8DB72",
          400: "#ECC94B",
          500: "#E0B84C",
          600: "#D4A745",
          700: "#B8923D",
          800: "#9C7D35",
          900: "#80682C",
        },
        // Blue - Secondary actions
        blue: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#1E3A8A",
        },
        // Success (green)
        success: {
          DEFAULT: "#16A34A",
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#16A34A",
          600: "#15803D",
          700: "#166534",
          800: "#14532D",
        },
        // Error (red)
        error: {
          DEFAULT: "#DC2626",
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#DC2626",
          600: "#B91C1C",
          700: "#991B1B",
          800: "#7F1D1D",
        },
        // Info (cyan)
        info: {
          DEFAULT: "#0284C7",
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#0284C7",
          600: "#0369A1",
          700: "#075985",
          800: "#0C4A6E",
        },
      },
    },
  },
  plugins: [],
};
