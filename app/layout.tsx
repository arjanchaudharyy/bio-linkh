import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { StructuredData } from "./structured-data"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://arjan.lol"),
  title: {
    default: "Arjan Chaudhary - Security Researcher & Entrepreneur",
    template: "%s | Arjan Chaudhary",
  },
  description:
    "Arjan Chaudhary - One of the youngest security researchers globally. Hacked Google at 14, #2 in Twitch Hall of Fame, youngest CVE researcher from Nepal. Founder of Arniko Hack Club (400+ members) & Co-founder of Glow Tech. Offensive Security Researcher, Ethical Hacker, and Tech Entrepreneur.",
  generator: "Next.js",
  applicationName: "Arjan Chaudhary Bio Links",
  keywords: [
    "Arjan Chaudhary",
    "youngest security researcher Nepal",
    "youngest hacker Nepal",
    "Google hacker",
    "Twitch hall of fame",
    "CVE researcher",
    "ethical hacker",
    "bug bounty hunter",
    "penetration tester",
    "offensive security researcher",
    "security engineer",
    "Arniko Hack Club",
    "Glow Tech founder",
    "teen entrepreneur",
    "cybersecurity expert",
    "API security",
    "ACP certified",
    "CASA certified",
    "web application security",
    "vulnerability researcher",
    "Nepal cybersecurity",
    "startup founder",
    "digital marketing",
    "tech community leader",
    "Day Dream Biratnagar",
    "hackathon organizer",
    "APIsec University",
    "Cyber Alert Nepal",
    "security auditing",
    "exploit development",
    "responsible disclosure",
  ],
  authors: [
    {
      name: "Arjan Chaudhary",
      url: "https://arjan.lol",
    },
  ],
  creator: "Arjan Chaudhary",
  publisher: "Arjan Chaudhary",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arjan.lol",
    siteName: "Arjan Chaudhary - Bio Links",
    title: "Arjan Chaudhary - Security Researcher & Entrepreneur",
    description:
      "One of the youngest security researchers globally. Hacked Google at 14, #2 in Twitch Hall of Fame, youngest CVE researcher. Founder of Arniko Hack Club & Co-founder of Glow Tech.",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Arjan Chaudhary - Security Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjan Chaudhary - Security Researcher & Entrepreneur",
    description:
      "Youngest security researcher of Nepal. Hacked Google at 14, #2 in Twitch Hall of Fame. Founder of Arniko Hack Club & Glow Tech.",
    creator: "@arjanchaudharyy",
    site: "@arjanchaudharyy",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://arjan.lol",
    languages: {
      "en-US": "https://arjan.lol",
    },
  },
  category: "Technology",
  classification: "Cybersecurity, Technology, Entrepreneurship",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
