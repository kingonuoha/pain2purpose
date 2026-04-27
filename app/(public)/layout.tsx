import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ConvexClientProvider } from "../providers";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/fontawesome.min.css";
import "../../public/assets/css/animate.min.css";
import "../../public/assets/css/cursor.min.css";
import "../../public/assets/css/slick.min.css";
import "../../public/assets/css/slick-theme.min.css";
import "../../public/assets/css/magnific-popup.min.css";
import "../../public/assets/css/odometer.min.css";
import "../../public/assets/css/style.css";
import "./public.css";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { AuthRedirect } from "@/components/auth-redirect";
import { Navbar } from "@/components/layout/Navbar";
import { FooterWrapper } from "@/components/layout/FooterWrapper";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeShortcut } from "@/components/theme-shortcut";
import Script from "next/script";
import { GTMBody, GTMHead } from "@/components/google-tag-manager";

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
  keywords: ["counselling", "therapy", "grief support", "Sandra Opara", "Pain2Purpose", "mental health", "Pennsylvania counselling"],
  alternates: {
    canonical: "./",
  },
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
    icon: [
      { url: "/p2p/logo.png", type: "image/png" },
    ],
    shortcut: "/p2p/logo.png",
    apple: "/p2p/logo.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
         <GTMHead/>
      </head>
      <body className={`${dmSans.variable} ${playfair.variable}`}>
        <GTMBody/>
        <ConvexClientProvider>
          <SmoothScroll>
            <Suspense fallback={null}>
              <AnalyticsTracker />
              <AuthRedirect />
              <Toaster position="top-right" richColors />
              <ThemeShortcut />
            </Suspense>
            <div className="page_wrapper">
              <Navbar />
              {children}
              <FooterWrapper />
            </div>
          </SmoothScroll>
        </ConvexClientProvider>

        <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/popper.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/bootstrap.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/bootstrap-dropdown-ml-hack.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/cursor.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/slick.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/magnific-popup.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/appear.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/odometer.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}


