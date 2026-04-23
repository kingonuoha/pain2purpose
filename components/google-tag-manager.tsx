"use client";

import Script from "next/script";

/**
 * GTM Container ID
 * This is hardcoded as per user request to use the provided ID.
 */
const GTM_ID = "GTM-KNJ52RTK";

/**
 * GTMHead component to be placed as high as possible in the <head> of the page.
 * Uses Next.js Script with "afterInteractive" strategy (default) to ensure it doesn't block critical rendering.
 * If true "as high as possible" is needed, strategy="beforeInteractive" can be used.
 */
export function GTMHead() {
    return (
        <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
        />
    );
}

/**
 * GTMBody component to be placed immediately after the opening <body> tag.
 * This is the fallback for users with JavaScript disabled.
 */
export function GTMBody() {
    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager (noscript)"
            />
        </noscript>
    );
}


