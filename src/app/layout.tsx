import type { Metadata } from "next";
import { Lato } from "next/font/google";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
}); */

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
}); 

export const metadata: Metadata = {
  title: "Kalkulator Emerytalny ZUS",
  description: "Sprawdź informacje o swojej przyszłej emeryturze",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} antialiased`}
      >
        <div className="container">
        <header className="fixed top-0 left-0 w-full z-50 p-4 bg-white">
          <img
            src="/logozus.svg"
            alt="Logo ZUS"
            className="h-12 w-auto"
          />
        </header>
        <div className="pt-20">
          {children}
        </div>
        </div>
      </body>
    </html>
  );
}
