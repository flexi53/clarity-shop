import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clarity Energy – Premium Energy Drinks",
  description: "Clarity Energy – Premium Energy Drinks in den Sorten Plasma, Lunar & Volcanic. Jetzt online bestellen auf clarityenergy.xyz.",
  metadataBase: new URL("https://clarityenergy.xyz"),
  openGraph: {
    title: "Clarity Energy – Premium Energy Drinks",
    description: "Plasma · Lunar · Volcanic — Jetzt bestellen.",
    url: "https://clarityenergy.xyz",
    siteName: "Clarity Energy",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
