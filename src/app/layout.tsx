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
  title: "Bieg przez życie - Gra symulacyjna o finansach",
  description:
    "Naucz się, jak rezygnować dziś z części dochodu na rzecz uprawnień w przyszłości. Odkryj sposoby finansowania przyszłej konsumpcji.",
  generator: "v0.app",
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
