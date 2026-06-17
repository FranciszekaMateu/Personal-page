import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        serif: ['var(--font-serif)', 'Newsreader', 'Georgia', 'serif'],
      },
      colors: {
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        foreground: "var(--foreground)",
        "foreground-dim": "var(--foreground-dim)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-secondary": "var(--accent-secondary)",
        "accent-tertiary": "var(--accent-tertiary)",
        border: "var(--border)",
        "border-hover": "var(--border-hover)",
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0px #1a1a1a',
        'brutal-md': '5px 5px 0px #1a1a1a',
        'brutal-lg': '8px 8px 0px #1a1a1a',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
