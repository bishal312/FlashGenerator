"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/modules/Navbar/Navbar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 

          bg-gradient-to-br from-gray-900 via-gray-800 to-black
        `}
      >
        {!pathname.startsWith("/admin") &&
          !pathname.startsWith("/sign-in") &&
          !pathname.startsWith("/sign-up") && <Navbar />}
        {children}

        <Toaster />
      </body>
    </html>
  );
}
