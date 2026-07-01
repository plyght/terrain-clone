import type { Metadata } from "next";
import "./globals.css";
import { suisse, suisseMono, libreCaslon, libreCaslonCondensed } from "./fonts";
import Nav from "./components/Nav";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://terrain.com"),
  title: "Terrain",
  description:
    "Terrain is a technology investment firm and creative partner to founders.",
  icons: { icon: "/favicon.webp" },
  openGraph: {
    title: "Terrain",
    description:
      "Terrain is a technology investment firm and creative partner to founders.",
    url: "https://terrain.com",
    siteName: "Terrain",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://terrain.com/social.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terrain",
    description:
      "Terrain is a technology investment firm and creative partner to founders.",
    images: ["https://terrain.com/social.webp"],
  },
};

const fontVars = `${suisse.variable} ${suisseMono.variable} ${libreCaslon.variable} ${libreCaslonCondensed.variable}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontVars} h-full`}>
      <body className="min-h-full">
        <ThemeProvider>
          <div className={fontVars}>
            <Nav />
            <main className="z-[2] min-w-0 relative">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
