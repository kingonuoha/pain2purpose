"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    FileText,
    FolderTree,
    Users,
    LogOut,
    Sparkles,
    MessageSquare,
    Menu,
    X,
    ArrowLeft,
    BarChart3,
    Mail,
    Settings
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_GROUPS = [
    {
        label: "General",
        items: [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        ]
    },
    {
        label: "Content",
        items: [
            { name: "Blog Posts", href: "/admin/articles", icon: FileText },
            { name: "Categories", href: "/admin/categories", icon: FolderTree },
        ]
    },
    {
        label: "Practice",
        items: [
            { name: "Services", href: "/admin/services", icon: Sparkles },
            { name: "Contacts", href: "/admin/contacts", icon: Mail },
        ]
    },
    {
        label: "Community",
        items: [
            { name: "Users", href: "/admin/users", icon: Users },
            { name: "Testimonials", href: "/admin/testimonials", icon: Sparkles },
            { name: "Moderation", href: "/admin/comments", icon: MessageSquare },
            { name: "Emails", href: "/admin/emails", icon: Mail },
        ]
    },
    {
        label: "Settings",
        items: [
            { name: "Site Settings", href: "/admin/settings", icon: Settings },
        ]
    },
];

import { signOut } from "next-auth/react";

const NavContent = ({
    pathname,
    onClose,
    isCollapsed
}: {
    pathname: string;
    onClose?: () => void;
    isCollapsed: boolean;
}) => {
    const handleLogout = async () => {
        try {
            await signOut({ redirect: true, callbackUrl: "/" });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            <div className={cn("p-6", isCollapsed && "px-4 overflow-hidden")}>
                <Link href="/" className="flex items-center gap-3 group">
                    <div className={cn("relative flex items-center", isCollapsed ? "h-10 w-10" : "h-10 w-full min-w-[160px]")}>
                        <Image
                            src="/p2p/logo.png"
                            alt="Pain2Purpose Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>
                {!isCollapsed && (
                    <span className="text-[10px] text-[#7C9A7E] font-black uppercase tracking-widest mt-1 ml-6 block">Admin Control</span>
                )}
            </div>

            <nav
                data-lenis-prevent
                className="flex-1 px-3 space-y-6 overflow-y-auto pt-4 font-sans uppercase tracking-wider text-xs font-bold min-h-0"
            >
                {NAV_GROUPS.map((group) => (
                    <div key={group.label} className="space-y-1">
                        {!isCollapsed && (
                            <h3 className="px-4 text-[10px] text-gray-400 dark:text-gray-600 font-black uppercase tracking-[0.2em] mb-3">
                                {group.label}
                            </h3>
                        )}
                        {group.items.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    id={`tour-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={cn(
                                        "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                                        isActive
                                            ? "bg-[#EEF4EE] dark:bg-[#7C9A7E]/10 text-[#7C9A7E] dark:text-[#7C9A7E]"
                                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#7C9A7E] rounded-r-full"
                                        />
                                    )}
                                    <item.icon
                                        size={20}
                                        className={cn(
                                            "flex-shrink-0 transition-colors",
                                            isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
                                        )}
                                    />
                                    {!isCollapsed && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}

                                    {isCollapsed && (
                                        <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            <div className="p-4 mt-auto space-y-2 border-t border-gray-100 dark:border-gray-900">
                <Link
                    href="/"
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors",
                        isCollapsed && "justify-center px-0"
                    )}
                >
                    <ArrowLeft size={16} />
                    {!isCollapsed && <span>Back to Website</span>}
                </Link>
                <button
                    onClick={handleLogout}
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 w-full transition-colors",
                        isCollapsed && "justify-center px-0"
                    )}>
                    <LogOut size={16} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </>
    );
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-400">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-900 flex-col fixed inset-y-0 z-40 transition-all duration-300",
                    isCollapsed ? "w-20" : "w-[260px]"
                )}
            >
                <NavContent pathname={pathname} isCollapsed={isCollapsed} />

                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-[#7C9A7E] hover:border-[#7C9A7E] shadow-sm transition-all z-50"
                >
                    <Menu size={12} className={cn("transition-transform", isCollapsed ? "rotate-180" : "rotate-0")} />
                </button>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-900 px-4 flex items-center justify-between z-30">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-8 w-32">
                        <Image
                            src="/p2p/logo.png"
                            alt="Pain2Purpose Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-colors"
                >
                    <Menu size={24} />
                </button>
            </header>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMenu}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-gray-950 z-[60] lg:hidden flex flex-col shadow-2xl"
                        >
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={closeMenu}
                                    className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <NavContent pathname={pathname} onClose={closeMenu} isCollapsed={false} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main
                className={cn(
                    "flex-1 transition-all duration-300 min-h-screen pt-20 lg:pt-8 p-4 md:p-8 min-w-0",
                    isCollapsed ? "lg:ml-20" : "lg:ml-[260px]"
                )}
            >
                <div className="max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}


