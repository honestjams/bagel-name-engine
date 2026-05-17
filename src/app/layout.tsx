import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
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
    <html lang="en-AU" className={spaceMono.variable}>
      <body>{children}</body>
    </html>
  );
}
