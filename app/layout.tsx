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

const siteUrl = "https://blinlx.com";
const siteName = "Blinlx";

const defaultTitle =
  "Blinlx | Buy Smarter in the Blink of an Eye";

const defaultDescription =
  "Blinlx helps you make smarter buying decisions with AI-powered price analysis, price history, retailer comparisons and buying advice. Know before you buy.";
export const metadata: Metadata = {
  metadataBase: new URL("https://blinlx.com"),

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
  "AI shopping intelligence platform",

keywords: [
  "Blinlx",
  "AI shopping assistant",
  "price comparison",
  "shopping intelligence",
  "price history",
  "buy smarter",
  "best price",
  "price tracker",
  "buying advice",
  "online shopping",
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
        alt: "Blinlx AI shopping intelligence",
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

        <GoogleAnalytics gaId="G-FFR1QXP2RZ" />
      </body>
    </html>
  );
}