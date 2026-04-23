"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard } from "lucide-react";

export function Navbar({ solid = false }: { solid?: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const pathname = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ];

    const dashboardLink = session?.user?.role === "admin" ? "/admin" : "/dashboard";

    return (
        <header className={`site_header ${solid ? 'header_solid' : ''} ${isSticky ? 'sticky' : ''}`}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3 col-5">
                        <div className="site_logo">
                            <Link className="site_link" href="/">
                                <Image 
                                    src="/p2p/logo.png" 
                                    alt="Pain2Purpose Logo" 
                                    width={160}
                                    height={60}
                                    style={{ maxHeight: '60px', width: 'auto' }} 
                                    priority
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-2">
                        <nav className="main_menu navbar navbar-expand-lg">
                            <div 
                                className={`main_menu_inner collapse navbar-collapse justify-content-center ${isMenuOpen ? 'show' : ''}`} 
                                id="main_menu_dropdown"
                            >
                                <ul className="main_menu_list unordered_list">
                                    {navLinks.map((link) => (
                                        <li 
                                            key={link.label} 
                                            className={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? "active" : ""}
                                        >
                                            <Link className="nav-link" href={link.href} onClick={() => setIsMenuOpen(false)}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                    {/* Mobile-only Links */}
                                    <li className="d-lg-none border-top mt-2 pt-2">
                                        <Link href="/contact" className="nav-link fw-bold text-primary" onClick={() => setIsMenuOpen(false)}>
                                            Book Consultation
                                        </Link>
                                    </li>
                                    <li className="d-lg-none">
                                        {status === "authenticated" ? (
                                            <>
                                                <Link href={dashboardLink} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                                    Dashboard ({session.user.email?.split('@')[0]})
                                                </Link>
                                                <button 
                                                    onClick={async () => { 
                                                        await signOut({ callbackUrl: "/", redirect: true }); 
                                                        setIsMenuOpen(false); 
                                                    }} 
                                                    className="nav-link text-danger border-0 bg-transparent text-start w-100 ps-0"
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <Link href="/auth/signin" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                                Sign In
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-3 col-5">
                        <ul className="header_btns_group unordered_list flex-nowrap justify-content-end align-items-center">
                            {/* 1st child: Mobile Menu Button (hidden on desktop via style.css) */}
                            <li>
                                <button 
                                    className="mobile_menu_btn" 
                                    type="button" 
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                                </button>
                            </li>

                            {/* 2nd child: Hotline (hidden on mobile via d-none) */}
                            <li className="d-none d-lg-block">
                                <a className="btn_hotline" href="tel:08033444411">
                                    <span className="btn_icon">
                                        <i className="fa-solid fa-phone"></i>
                                    </span>
                                    <span className="btn_text">08033444411</span>
                                </a>
                            </li>
                            
                            {/* 3rd child: Auth Action (hidden on mobile via d-none) */}
                            <li className="d-none d-lg-block">
                                {status === "authenticated" ? (
                                    <div className="position-relative">
                                        <button 
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="d-flex align-items-center gap-2 border-0 bg-transparent p-0"
                                        >
                                            <Image 
                                                src={session.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name || 'User')}&background=E9F5F2&color=2D5A50&bold=true`} 
                                                alt={session.user.name || "User"} 
                                                width={40} 
                                                height={40} 
                                                className="rounded-circle border border-2 border-primary-subtle"
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {isProfileOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="position-absolute end-0 mt-3 bg-white rounded-3 shadow-lg border p-2 z-3"
                                                    style={{ minWidth: '180px' }}
                                                >
                                                    <Link 
                                                        href={dashboardLink}
                                                        onClick={() => setIsProfileOpen(false)}
                                                        className="d-flex align-items-center gap-2 px-3 py-2 small fw-bold text-dark text-decoration-none hover-bg-light rounded"
                                                    >
                                                        <LayoutDashboard size={14} /> Dashboard
                                                    </Link>
                                                    <button 
                                                        onClick={async () => {
                                                            await signOut({ callbackUrl: "/", redirect: true });
                                                        }}
                                                        className="w-100 d-flex align-items-center gap-2 px-3 py-2 small fw-bold text-danger border-0 bg-transparent text-start hover-bg-light rounded"
                                                    >
                                                        <LogOut size={14} /> Logout
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link className="btn btn-primary" href="/auth/signin">
                                        <span className="btn_text" data-text="Sign In">Sign In</span>
                                        <span className="btn_icon">
                                            <i className="fa-solid fa-arrow-up-right"></i>
                                        </span>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
