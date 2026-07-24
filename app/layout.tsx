import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://dealbeater.co.uk";
const siteName = "Deal Beater";
const defaultTitle =
  "Deal Beater | Compare UK Prices and Find Better Deals";
const defaultDescription =
  "Compare prices from trusted UK retailers and find better deals before you buy. Deal Beater checks products, prices and retailers to help you shop smarter.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },

  description: defaultDescription,

  applicationName: siteName,

  authors: [
    {
      name: "Frame Tech UK Ltd",
      url: siteUrl,
    },
  ],

  creator: "Frame Tech UK Ltd",
  publisher: "Frame Tech UK Ltd",

  category: "shopping",

  classification:
    "UK price comparison, product comparison and shopping service",

  keywords: [
    "Deal Beater",
    "price comparison UK",
    "compare prices UK",
    "best deals UK",
    "product price comparison",
    "UK shopping deals",
    "compare retailers",
    "online deals UK",
    "cheap products UK",
    "smart shopping",
  ],

  alternates: {
    canonical: "/",
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

    shortcut: "/icon.png",
  },

  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Deal Beater price comparison and UK deals",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/twitter-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <GoogleAnalytics gaId="G-B2CL1EN8PB" />
      </body>
    </html>
  );
}