"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function Footer() {
    const settings = useQuery(api.site_settings.getSiteSettings);
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: "fa-facebook-f", url: settings?.socials?.facebook },
        { icon: "fa-instagram", url: settings?.socials?.instagram },
        { icon: "fa-twitter", url: settings?.socials?.twitter },
        { icon: "fa-whatsapp", url: settings?.phone ? `https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}` : null },
    ].filter(link => link.url);

    return (
        <footer className="site_footer bg_primary">
            <div className="container">
                <div className="site_footer_content">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <div className="site_logo">
                                <Link className="site_link" href="/">
                                    <Image src="/p2p/logo.png" alt="Pain2Purpose Logo" width={160} height={60} style={{ maxHeight: '60px', width: 'auto' }} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ul className="info_list unordered_list justify-content-center">
                                <li>
                                    <Link href="/">
                                        <span className="info_icon">
                                            <i className="fa-solid fa-circle"></i>
                                        </span>
                                        <span className="info_text">Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about">
                                        <span className="info_icon">
                                            <i className="fa-solid fa-circle"></i>
                                        </span>
                                        <span className="info_text">About</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services">
                                        <span className="info_icon">
                                            <i className="fa-solid fa-circle"></i>
                                        </span>
                                        <span className="info_text">Program</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog">
                                        <span className="info_icon">
                                            <i className="fa-solid fa-circle"></i>
                                        </span>
                                        <span className="info_text">Blog</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact">
                                        <span className="info_icon">
                                            <i className="fa-solid fa-circle"></i>
                                        </span>
                                        <span className="info_text">Contacts</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <ul className="social_links unordered_list justify-content-center justify-content-lg-end">
                                {socialLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.url || '#!'} target="_blank" rel="noopener noreferrer">
                                            <i className={`fa-brands ${link.icon}`}></i>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright_widget text-center">
                    <p className="copyright_text m-0">© <b>Pain2Purpose</b> All rights reserved Copyrights 2021 - {currentYear}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

