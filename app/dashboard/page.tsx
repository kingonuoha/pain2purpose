"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Settings, MessageSquare,
    LogOut, Shield,
    Trash2, Loader2, Sparkles,
    ArrowRight, Lock, Eye, EyeOff, Activity
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { sendOtpAction, verifyAndChangePasswordAction } from "@/app/actions/auth";

export default function UserDashboard() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState<"overview" | "settings">("overview");
    const [isUpdating, setIsUpdating] = useState(false);

    // Data fetching
    const user = useQuery(api.users.getMeFullSecure, {
        email: session?.user?.email ?? ""
    });

    // Mutations
    const updateProfile = useMutation(api.users.updateProfile);
    const deleteAccount = useMutation(api.users.deleteAccount);

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;

        try {
            await updateProfile({ name });
            toast.success("Profile updated successfully");
        } catch {
            toast.error("Failed to update profile");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteAccount = async () => {
        toast("Permanently delete your entire digital footprint?", {
            action: {
                label: "Confirm Deletion",
                onClick: async () => {
                    try {
                        await deleteAccount();
                        toast.success("Account deleted");
                        signOut({ callbackUrl: "/" });
                    } catch {
                        toast.error("Failed to delete account");
                    }
                }
            }
        });
    };

    // Loading State
    if (status === "loading" || (status === "authenticated" && user === undefined)) {
        return (
            <div className="min-h-screen bg-p2p-cream flex items-center justify-center transition-colors duration-500">
                <div className="flex flex-col items-center gap-4 text-p2p-sage">
                    <Loader2 className="animate-spin" size={32} />
                    <p className="text-zinc-500 font-medium font-sans">Synchronizing your profile...</p>
                </div>
            </div>
        );
    }

    // Not Signed In
    if (status === "unauthenticated") {
        return (
            <div className="min-h-screen bg-p2p-cream flex items-center justify-center p-6 transition-colors duration-500">
                <div className="max-w-md w-full bg-white p-10 rounded-2xl border border-zinc-100 shadow-xl text-center">
                    <div className="w-16 h-16 bg-p2p-sage/10 rounded-2xl flex items-center justify-center text-p2p-sage mx-auto mb-6">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-3xl font-serif font-black text-p2p-charcoal mb-3">Authorized Personnel Only</h1>
                    <p className="text-zinc-500 mb-8 font-medium">Please sign in to access your personal archives and settings.</p>
                    <Link href="/auth/signin" className="w-full inline-flex items-center justify-center gap-2 bg-p2p-sage px-8 py-4 rounded-xl text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-p2p-sage/20 hover:bg-p2p-sage/90 transition-all active:scale-95">
                        Initiate Login <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-p2p-cream font-sans text-p2p-charcoal transition-colors duration-500">
            <Navbar />

            <div className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Sidebar Navigation */}
                        <div className="w-full lg:w-80 shrink-0">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100 sticky top-32">
                                <div className="flex items-center gap-4 mb-10 pb-10 border-b border-zinc-50">
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm transition-transform hover:scale-105 duration-500">
                                        {user.profileImage ? (
                                            <Image src={user.profileImage} alt={user.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                                <User size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="font-serif font-black text-p2p-charcoal truncate leading-tight">{user.name}</h2>
                                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest truncate mt-1">{user.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <NavButton
                                        active={activeTab === "overview"}
                                        onClick={() => setActiveTab("overview")}
                                        icon={<Activity size={18} />}
                                        label="Overview"
                                    />
                                    <NavButton
                                        active={activeTab === "settings"}
                                        onClick={() => setActiveTab("settings")}
                                        icon={<Settings size={18} />}
                                        label="Account Settings"
                                    />
                                </div>

                                <div className="mt-10 pt-10 border-t border-zinc-50">
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold uppercase text-[10px] tracking-widest border border-transparent shadow-sm"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 min-w-0">
                            <AnimatePresence mode="wait">
                                {activeTab === "overview" && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-10"
                                    >
                                        <div className="bg-white rounded-2xl p-8 md:p-12 border border-zinc-100 shadow-sm relative overflow-hidden group">
                                            <div className="relative z-10 text-center md:text-left">
                                                <h2 className="text-4xl md:text-5xl font-serif font-black text-p2p-charcoal leading-tight tracking-tight mb-4">
                                                    Welcome, <span className="text-p2p-sage">{user.name.split(" ")[0]}</span>
                                                </h2>
                                                <p className="text-zinc-500 font-medium max-w-md text-lg leading-relaxed">
                                                    Your journey from pain to purpose is unique. Manage your profile and review your interactions here.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <StatCard
                                                icon={<MessageSquare size={24} />}
                                                label="Contributions"
                                                value={user.stats.comments}
                                                color="sage"
                                            />
                                            <StatCard
                                                icon={<Shield size={24} />}
                                                label="Security Status"
                                                value={100}
                                                unit="%"
                                                color="sand"
                                            />
                                        </div>

                                        <div className="bg-white rounded-2xl p-8 md:p-10 border border-zinc-100 shadow-sm">
                                            <div className="mb-8 pb-6 border-b border-zinc-50">
                                                <h3 className="text-2xl font-serif font-black text-p2p-charcoal tracking-tight flex items-center gap-3">
                                                    Recent Engagement
                                                    <Sparkles size={20} className="text-p2p-sand" />
                                                </h3>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">Your latest steps on the journey</p>
                                            </div>
                                            
                                            <div className="py-16 text-center">
                                                <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-200 mx-auto mb-4 border border-dashed border-zinc-200">
                                                    <Activity size={32} />
                                                </div>
                                                <p className="text-zinc-400 font-black uppercase text-[10px] tracking-[0.2em]">Silence in the records</p>
                                                <p className="text-zinc-500 mt-2 text-sm">Contribute to the community to see your activity here.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "settings" && (
                                    <motion.div
                                        key="settings"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-10"
                                    >
                                        <div className="bg-white rounded-2xl p-8 md:p-12 border border-zinc-100 shadow-sm">
                                            <div className="mb-12">
                                                <h3 className="text-3xl font-serif font-black text-p2p-charcoal tracking-tight">Account Settings</h3>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">Changes are personal. Manage your identity here.</p>
                                            </div>

                                            <form onSubmit={handleUpdateProfile} className="space-y-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Full Name</label>
                                                        <input
                                                            name="name"
                                                            defaultValue={user.name}
                                                            placeholder="Enter your name"
                                                            className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-p2p-sage/10 focus:border-p2p-sage transition-all font-bold text-p2p-charcoal"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
                                                        <div className="relative">
                                                            <input
                                                                disabled
                                                                defaultValue={user.email}
                                                                className="w-full px-5 py-4 bg-zinc-100 border border-zinc-50 rounded-xl text-zinc-400 font-bold cursor-not-allowed"
                                                            />
                                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                                <div className="px-2 py-1 bg-green-50 rounded-lg text-[8px] font-black uppercase text-green-600 tracking-tighter border border-green-100">Verified</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-4">
                                                    <button
                                                        type="submit"
                                                        disabled={isUpdating}
                                                        className="px-10 py-4 bg-p2p-sage rounded-xl text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-p2p-sage/20 active:scale-95 transition-all disabled:opacity-50 hover:bg-p2p-sage/90"
                                                    >
                                                        {isUpdating ? "Saving..." : "Save Changes"}
                                                    </button>
                                                </div>
                                            </form>

                                            <div className="mt-16 pt-12 border-t border-zinc-50">
                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                                                    Security
                                                    <span className="w-8 h-px bg-zinc-100" />
                                                </h4>

                                                <ChangePasswordSection email={user.email} />
                                            </div>

                                            <div className="mt-20 pt-16 border-t border-red-50">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 bg-red-50/30 rounded-2xl border border-red-100">
                                                    <div className="space-y-1.5">
                                                        <h4 className="text-lg font-serif font-black text-red-600 tracking-tight">Delete Account</h4>
                                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest max-w-sm">This will permanently remove your profile from the P2P platform.</p>
                                                    </div>
                                                    <button
                                                        onClick={handleDeleteAccount}
                                                        className="px-8 py-4 bg-white text-red-600 border border-red-200 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                                                    >
                                                        <Trash2 size={16} />
                                                        Yes, delete anyway
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChangePasswordSection({ email }: { email: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<"initial" | "otp">("initial");
    const [otpCode, setOtpCode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSendOtp = async () => {
        setIsLoading(true);
        try {
            const result = await sendOtpAction(email, "password_change");
            if (result.success) {
                setStep("otp");
                toast.success("Verification code sent to your email!");
            } else {
                toast.error(result.message || "Failed to send code");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyAndChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            const result = await verifyAndChangePasswordAction(email, otpCode, "password_change", formData);
            if (result.success) {
                toast.success("Password changed successfully!");
                setStep("initial");
                setOtpCode("");
            } else {
                toast.error(result.message || result.error || "Failed to change password");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
            <AnimatePresence mode="wait">
                {step === "initial" ? (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                        <div className="space-y-1">
                            <h5 className="text-sm font-black text-p2p-charcoal uppercase tracking-wider">Change Password</h5>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Verification code will be sent to your email for security.</p>
                        </div>
                        <button
                            onClick={handleSendOtp}
                            disabled={isLoading}
                            className="bg-p2p-charcoal text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-p2p-sage transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={14} /> : <Lock size={14} />}
                            Request Verification Code
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="otp"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleVerifyAndChange}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Verification Code</label>
                                <input
                                    value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    placeholder="6-digit code"
                                    required
                                    className="w-full px-4 py-3 bg-white border border-zinc-100 rounded-xl focus:ring-2 focus:ring-p2p-sage/10 focus:border-p2p-sage outline-none transition-all font-black tracking-[0.3em]"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">New Password</label>
                                <div className="relative group/input">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        required
                                        className="w-full px-4 py-3 bg-white border border-zinc-100 rounded-xl focus:ring-2 focus:ring-p2p-sage/10 focus:border-p2p-sage outline-none transition-all font-bold pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-p2p-sage transition-colors focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Confirm New Password</label>
                                <div className="relative group/input">
                                    <input
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        required
                                        className="w-full px-4 py-3 bg-white border border-zinc-100 rounded-xl focus:ring-2 focus:ring-p2p-sage/10 focus:border-p2p-sage outline-none transition-all font-bold pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-p2p-sage transition-colors focus:outline-none"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button
                                type="submit"
                                disabled={isLoading || otpCode.length !== 6}
                                className="bg-p2p-sage hover:bg-p2p-sage/90 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-p2p-sage/20 disabled:opacity-50"
                            >
                                {isLoading ? "Updating..." : "Update Password"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep("initial")}
                                className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}

function NavButton({ active, onClick, icon, label, count }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, count?: number }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest group border outline-none",
                active
                    ? "bg-p2p-sage text-white border-p2p-sage shadow-lg shadow-p2p-sage/20"
                    : "text-zinc-400 hover:text-p2p-charcoal hover:bg-zinc-50 border-transparent"
            )}
        >
            <div className="flex items-center gap-3">
                <div className={cn(
                    "transition-transform duration-500 group-hover:scale-110",
                    active ? "text-white" : "text-zinc-300 group-hover:text-p2p-sage"
                )}>
                    {icon}
                </div>
                <span>{label}</span>
            </div>
            {count !== undefined && (
                <span className={cn(
                    "px-2.5 py-1 rounded-lg text-[9px] font-black transition-colors",
                    active ? "bg-white/20 text-white" : "bg-zinc-50 text-zinc-400 group-hover:text-p2p-sage group-hover:bg-p2p-sage/10"
                )}>
                    {count}
                </span>
            )}
        </button>
    );
}

function StatCard({ icon, label, value, unit = "", color }: { icon: React.ReactNode, label: string, value: number, unit?: string, color: "sage" | "sand" }) {
    const variants = {
        sage: "text-p2p-sage bg-p2p-sage/10 border-p2p-sage/20",
        sand: "text-p2p-sand bg-p2p-sand/10 border-p2p-sand/20"
    };

    return (
        <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm hover:border-p2p-sage/30 transition-all duration-500 group hover:-translate-y-1">
            <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm border transition-transform duration-500 group-hover:rotate-6", variants[color])}>
                {icon}
            </div>
            <div className="text-4xl font-serif font-black text-p2p-charcoal mb-1.5 leading-none tracking-tight transition-colors">{value}{unit}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-p2p-charcoal transition-colors">{label}</div>
        </div>
    );
}
