import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { UserInitializer } from "@/providers/user-provider";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebChat",
  description: "No Description",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} ${geistMono.className} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body className="grid grid-rows-[auto_minmax(0,1fr)] h-screen">
        {children}
        <UserInitializer />
        <Toaster />
      </body>
    </html>
  );
}
