import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "../providers";
import { Toaster } from "sonner";
import { ThemeShortcut } from "@/components/theme-shortcut";
import { Suspense } from "react";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Pain2Purpose",
  description: "Internal dashboard for Pain2Purpose.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <ConvexClientProvider>
          <Suspense fallback={null}>
            <Toaster position="top-right" richColors />
            <ThemeShortcut />
          </Suspense>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
