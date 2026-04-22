"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterWrapper() {
    const pathname = usePathname();
    const isExcludedPage = pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard") || pathname?.startsWith("/auth");

    if (isExcludedPage) return null;

    return <Footer />;
}


