import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AtomicLangToggle from "@/components/AtomicLangToggle"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Mercer — Creative Developer",
  description:
    "Portfolio of Alex Mercer, a creative developer crafting immersive digital experiences with precision and purpose.",
  keywords: ["developer", "portfolio", "creative", "frontend", "design"],
  openGraph: {
    title: "Alex Mercer — Creative Developer",
    description:
      "Portfolio of Alex Mercer, a creative developer crafting immersive digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${syne.variable} bg-[#0f0f0f] text-white antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
            <AtomicLangToggle />
    </body>
    </html>
  );
}