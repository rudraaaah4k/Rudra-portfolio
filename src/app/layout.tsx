import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rudra | Full-Stack Software Developer",
  description:
    "Full-stack developer building scalable REST APIs, secure authentication systems, and modern web applications with React, Node.js, and TypeScript.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Node.js",
    "TypeScript",
    "Software Engineer",
    "Portfolio",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-indigo-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
