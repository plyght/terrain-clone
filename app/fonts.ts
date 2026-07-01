import localFont from "next/font/local";

export const suisse = localFont({
  variable: "--font-suisse",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  src: [
    { path: "./fonts/Suisse-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Suisse-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Suisse-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Suisse-Bold.otf", weight: "700", style: "normal" },
  ],
});

export const suisseMono = localFont({
  variable: "--font-suisse-mono",
  display: "swap",
  fallback: ["Arial", "monospace"],
  src: [
    { path: "./fonts/SuisseMono-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/SuisseMono-Medium.otf", weight: "500", style: "normal" },
  ],
});

export const libreCaslon = localFont({
  variable: "--font-libre-caslon",
  display: "swap",
  fallback: ["Georgia", "serif"],
  src: [
    { path: "./fonts/LibreCaslon-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/LibreCaslon-Medium.ttf", weight: "500", style: "normal" },
  ],
});

export const libreCaslonCondensed = localFont({
  variable: "--font-libre-caslon-condensed",
  display: "swap",
  fallback: ["Georgia", "serif"],
  src: [
    { path: "./fonts/LibreCaslonCondensed-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/LibreCaslonCondensed-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/LibreCaslonCondensed-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/LibreCaslonCondensed-Bold.woff2", weight: "700", style: "normal" },
  ],
});
