import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vishva Patel | Full Stack & AI Engineer",
  description: "Building scalable AI solutions with Next.js and Firebase.",
  openGraph: {
    title: "Vishva Patel | Full Stack & AI Engineer",
    description: "Building scalable AI solutions with Next.js and Firebase.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Aurora Background */}
          <div className="fixed inset-0 -z-10 h-full w-full bg-background overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] animate-pulse" />
            <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-blue-900/20 blur-[100px] animate-pulse delay-1000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-cyan-900/10 blur-[120px] animate-pulse delay-2000" />
          </div>

          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
