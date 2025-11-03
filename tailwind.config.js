/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //Couleurs principales
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb", // Couleur principale (oklch(54.6% 0.245 262.881))
          700: "#1d4ed8",
          800: "#1e40af",
        },

        //Couleurs secondaires
        green: {
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          800: "#166534",
        },

        //Couleurs neutres / gris
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },

        //Autres couleurs utilisées
        purple: {
          100: "#f3e8ff",
          600: "#9333ea",
        },

        yellow: {
          500: "#eab308",
        },

        red: {
          500: "#ef4444",
        },

        white: "#ffffff",
        black: "#000000",
        transparent: "transparent",
      },

      //Optionnel : ajout de dégradés cohérents
      backgroundImage: {
        "blue-gradient": "linear-gradient(to bottom right, #2563eb, #1e40af)",
        "green-gradient": "linear-gradient(to bottom right, #16a34a, #166534)",
      },
    },
  },
  plugins: [],
};
