"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard, ChevronDown, LogIn } from "lucide-react";

export function Navbar({ solid = false }: { solid?: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ];

    const dashboardLink = session?.user?.role === "admin" ? "/admin" : "/dashboard";

    return (
        <header className={`site_header ${solid ? 'header_solid' : ''}`}>
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
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-3 col-7">
                        <ul className="header_btns_group unordered_list justify-content-end align-items-center gap-3">
                            {/* Hotline - Restored */}
                            <li className="d-none d-md-block">
                                <a className="btn_hotline d-flex align-items-center gap-2" href="tel:08033444411">
                                    <span className="btn_icon">
                                        <i className="fa-solid fa-phone"></i>
                                    </span>
                                    <span className="btn_text fw-bold" style={{ fontSize: '13px' }}>08033444411</span>
                                </a>
                            </li>

                            <li>
                                <button 
                                    className="mobile_menu_btn" 
                                    type="button" 
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    aria-expanded={isMenuOpen} 
                                    aria-label="Toggle navigation"
                                >
                                    <i className="fa-solid fa-bars"></i>
                                </button>
                            </li>
                            
                            {status === "authenticated" ? (
                                <li className="position-relative">
                                    <button 
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="d-flex align-items-center gap-1 border-0 bg-transparent p-0 focus:outline-none"
                                    >
                                        <div className="rounded-circle overflow-hidden border border-2 border-p2p-sage shadow-sm" style={{ width: '38px', height: '38px' }}>
                                            <Image 
                                                src={session.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name || 'User')}&background=E9F5F2&color=2D5A50&bold=true`} 
                                                alt={session.user.name || "User"} 
                                                width={38} 
                                                height={38} 
                                                className="object-cover w-100 h-100"
                                            />
                                        </div>
                                        <ChevronDown className={`text-muted transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} size={14} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="position-absolute end-0 mt-3 bg-white rounded-4 shadow-lg border p-2 z-3"
                                                style={{ minWidth: '200px' }}
                                            >
                                                <div className="px-3 py-3 border-bottom mb-2 bg-light rounded-3">
                                                    <p className="small fw-black text-muted text-uppercase tracking-widest mb-1" style={{ fontSize: '9px' }}>Signed in as</p>
                                                    <p className="small fw-bold text-dark text-truncate mb-0">{session.user.email}</p>
                                                </div>
                                                
                                                <Link 
                                                    href={dashboardLink}
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="d-flex align-items-center gap-3 px-3 py-2 small fw-bold text-secondary text-decoration-none hover-p2p-bg rounded-3 transition-colors"
                                                >
                                                    <LayoutDashboard size={16} />
                                                    Dashboard
                                                </Link>
                                                
                                                <button 
                                                    onClick={() => signOut()}
                                                    className="w-100 d-flex align-items-center gap-3 px-3 py-2 small fw-bold text-danger border-0 bg-transparent hover-red-bg rounded-3 transition-colors text-start"
                                                >
                                                    <LogOut size={16} />
                                                    Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ) : (
                                <li>
                                    <Link href="/auth/signin" className="btn btn-primary btn-sm rounded-pill d-flex align-items-center gap-2 px-3 py-2">
                                        <span className="btn_text text-uppercase fw-black tracking-widest" style={{ fontSize: '10px' }}>Sign In</span>
                                        <LogIn size={14} />
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
