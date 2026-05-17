import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unbearable Bagel Generator",
  description:
    "Generate your next Unbearable Bagels special — Brisbane's most relatable bagel names, from Magic Round to Translink Delay.",
  openGraph: {
    title: "Unbearable Bagel Generator",
    description: "Brisbane's most relatable bagel names, generated fresh.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
