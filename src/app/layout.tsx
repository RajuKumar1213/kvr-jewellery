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
  title: "KVR Jewellery | Finest Jewellery Shop in Ranchi",
  description:
    "Discover timeless elegance at KVR Jewellery, Ranchi’s most trusted jewellery shop. Explore our exquisite collection of gold, diamond, pearl, and gemstone jewellery. Perfect for weddings, gifts, and everyday luxury.",
  keywords: [
    "KVR Jewellery",
    "Jewellery in Ranchi",
    "Gold Jewellery",
    "Diamond Jewellery",
    "Pearl Necklace",
    "Wedding Jewellery",
    "Jewellery Shop Ranchi",
  ],
  authors: [{ name: "KVR Jewellery" }],
  openGraph: {
    title: "KVR Jewellery | Finest Jewellery Shop in Ranchi",
    description:
      "KVR Jewellery – Ranchi’s most renowned jewellery destination for gold, diamond, and designer collections.",
    url: "https://kvrjewellery.com", // replace with your actual domain
    siteName: "KVR Jewellery",
    images: [
      {
        url: "/logo.png", // replace with OG banner/logo
        width: 1200,
        height: 630,
        alt: "KVR Jewellery Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KVR Jewellery | Ranchi’s Finest Jewellery Shop",
    description:
      "Exquisite gold, diamond, pearl, and gemstone jewellery collections at KVR Jewellery, Ranchi.",
    images: ["/logo.png"], // replace with OG image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
