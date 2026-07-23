import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ThemeWrapper from "@/components/ThemeWrapper";
import { ThemeProvider } from "@/components/ThemeContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KBot | AI Chatbot by Khoa Nguyen",
  description:
    "KBot is an AI-powered chatbot that provides intelligent conversations, coding assistance, and real-time streaming responses.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "KBot",
    description: "An AI-powered chatbot with real-time streaming responses.",
    type: "website",
    siteName: "KBot",
    url: "https://ai-chatbox-app-six.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <ThemeWrapper>
              <Header />
              <main className="grow flex flex-col">{children}</main>
            </ThemeWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
