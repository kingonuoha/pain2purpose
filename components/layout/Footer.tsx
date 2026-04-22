"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
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
                                <li><a href="#!"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#!"><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#!"><i className="fa-brands fa-twitter"></i></a></li>
                                <li><a href="#!"><i className="fa-brands fa-whatsapp"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="copyright_widget text-center">
                    <p className="copyright_text m-0">© <b>Pain2Purpose</b> Template All rights reserved Copyrights 2025</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

