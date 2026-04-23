import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent-banner"
import { ContactInquiryProvider } from "@/components/contact/contact-inquiry-root"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const title = { default: "BlueBeaver", template: "%s | BlueBeaver" }

const description =
  "Engenharia de software, hardware e automação para ambientes críticos."

export const metadata: Metadata = {
  title,
  description,
  applicationName: "BlueBeaver",
  manifest: "/manifest.json",
  formatDetection: { email: true, address: true, telephone: true },
  appleWebApp: { capable: true, title: "BlueBeaver", statusBarStyle: "default" },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    title: title.default,
    description,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: title.default,
    description,
  },
}

export const viewport: Viewport = {
  themeColor: "#0066b2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-dvh min-h-[-webkit-fill-available] flex-col text-foreground">
        <ContactInquiryProvider>
          {children}
          <CookieConsentBanner />
        </ContactInquiryProvider>
      </body>
    </html>
  )
}
