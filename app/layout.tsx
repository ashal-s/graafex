import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

// Geometric display grotesk — sharp against black, warm with orange.
const primary = Syne({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Graafex — Strategy, Design & Film",
  description:
    "Graafex is a creative studio combining strategy, design and film to help organisations grow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${primary.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
