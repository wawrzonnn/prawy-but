import type React from "react"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-lato",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ZUS - Symulator emerytalny",
  description:
    "Narzędzie edukacyjne do prognozowania wysokości emerytury",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body className={`font-sans ${lato.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
