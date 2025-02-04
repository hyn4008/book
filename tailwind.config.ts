import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        jua: "var(--font-jua)",
        gothic: "var(--font-gothic)",
        nunito: "var(--font-nunito)",
        quicksand: "var(--font-quicksand)",
      },
    },
  },
  plugins: [],
} satisfies Config;
