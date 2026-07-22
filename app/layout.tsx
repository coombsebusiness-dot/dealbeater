import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://dealbeater.co.uk"),

  title: {
    default: "Deal Beater | Check Before You Buy",
    template: "%s | Deal Beater",
  },

  description:
    "Deal Beater helps UK consumers make smarter buying decisions. Compare products, quotes and services before you spend your money.",

  keywords: [
    "Deal Beater",
    "Best deals UK",
    "Price comparison",
    "Buying advice",
    "Consumer savings",
    "Deals",
    "Product reviews",
    "Smart shopping",
  ],

  authors: [
    {
      name: "Frame Tech UK Ltd",
    },
  ],

  creator: "Frame Tech UK Ltd",

  applicationName: "Deal Beater",

  alternates: {
    canonical: "https://dealbeater.co.uk",
  },

  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "Deal Beater | Check Before You Buy",
    description:
      "Helping UK consumers make smarter buying decisions before they spend.",
    url: "https://dealbeater.co.uk",
    siteName: "Deal Beater",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Deal Beater — smarter decisions and better deals",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Deal Beater | Check Before You Buy",
    description:
      "Helping UK consumers make smarter buying decisions before they spend.",
    images: ["/twitter-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {/* eBay Partner Network Smart Links */}
        <Script id="ebay-epn-config" strategy="afterInteractive">
          {`
            window._epn = {
              campaign: 5339170680,
              SmartPopover: false
            };
          `}
        </Script>

        <Script
          id="ebay-epn-smart-links"
          src="https://epnt.ebay.com/static/epn-smart-tools.js"
          strategy="afterInteractive"
        />

       

        <GoogleAnalytics gaId="G-B2CL1EN8PB" />
      </body>
    </html>
  );
}
