import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

// Load the Sci-Fi HUD Font
const font = Rajdhani({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani"
});

export const metadata: Metadata = {
  title: "ScrollChain Cockpit",
  description: "Architect OS v41.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
