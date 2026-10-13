import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter, Syne } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

// Geometric display grotesk — sharp against black, warm with orange.
const primary = Syne({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Neutral text face for copy where Syne is too stylised.
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Lining tabular figures for prices and metrics — stays even on one baseline.
const figures = IBM_Plex_Sans({
  variable: "--font-figures",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Graafex — Strategy, Design & Film",
  description:
    "Graafex is a creative studio combining strategy, design and film to help organisations grow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${primary.variable} ${body.variable} ${figures.variable} antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Cursor />
      </body>
    </html>
  );
}
