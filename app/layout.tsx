import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./providers";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { AuthRedirect } from "@/components/auth-redirect";
import { FooterWrapper } from "@/components/footer-wrapper";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeShortcut } from "@/components/theme-shortcut";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://counsellingp2p.com",
  ),
  title: {
    default: "Pain2Purpose | From Pain to Purpose Counselling Practice",
    template: "%s | Pain2Purpose",
  },
  description:
    "Therapeutic counselling support for healing, growth, and finding meaning. Sandra Opara supports individuals through grief, loss, and family challenges.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://counsellingp2p.com",
    siteName: "Pain2Purpose",
    title: "Pain2Purpose | From Pain to Purpose Counselling Practice",
    description:
      "Therapeutic counselling support for healing, growth, and finding meaning.",
    images: [
      {
        url: "/p2p-og-image.png",
        width: 1200,
        height: 630,
        alt: "Pain2Purpose Counselling Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pain2Purpose | From Pain to Purpose Counselling Practice",
    description:
      "Therapeutic counselling support for healing, growth, and finding meaning.",
    images: ["/p2p-og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        className={`${dmSans.variable} ${playfair.variable} antialiased font-sans bg-background`}
      >
        <ConvexClientProvider>
          <SmoothScroll>
            <Suspense fallback={null}>
              <AnalyticsTracker />
              <AuthRedirect />
              <Toaster position="top-right" richColors />
              <ThemeShortcut />
            </Suspense>
            {children}
            <FooterWrapper />
          </SmoothScroll>
        </ConvexClientProvider>
      </body>
    </html>
  );
}


