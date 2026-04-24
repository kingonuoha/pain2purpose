"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Mail, Lock, User, Chrome, Loader2, Eye, EyeOff, Heart, Users, LifeBuoy, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const QUOTES = [
    {
        text: "Love is the bridge between you and everything.",
        author: "Rumi",
        topic: "Love",
        icon: <Heart className="text-red-400" size={24} />,
        image: "/assets/images/new_pics/sandra- (5).png"
    },
    {
        text: "Family is not an important thing. It's everything.",
        author: "Michael J. Fox",
        topic: "Family",
        icon: <Users className="text-blue-400" size={24} />,
        image: "/assets/images/new_pics/sandra- (6).png"
    },
    {
        text: "The good life is a process, not a state of being.",
        author: "Carl Rogers",
        topic: "Life",
        icon: <Sun className="text-yellow-400" size={24} />,
        image: "/assets/images/new_pics/sandra- (7).png"
    },
    {
        text: "Healing takes courage, and we all have courage, even if we have to dig a little to find it.",
        author: "Tori Amos",
        topic: "Friends",
        icon: <LifeBuoy className="text-p2p-sage" size={24} />,
        image: "/assets/images/new_pics/sandra- (8).png"
    }
];

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % QUOTES.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                toast.success("Account created successfully!", {
                    description: "You can now sign in with your credentials.",
                });
                router.push("/auth/signin");
            } else {
                const data = await response.json();
                setError(data.message || "Something went wrong");
                toast.error("Registration failed", { description: data.message });
                setIsLoading(false);
            }
        } catch {
            setError("An unexpected error occurred");
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex bg-white dark:bg-gray-950 overflow-hidden">
            {/* Left Side: Carousel (Desktop Only) */}
            <div className="hidden lg:flex lg:w-1/2 relative h-screen">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuote}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-900 animate-pulse">
                            <Image
                                src={QUOTES[currentQuote].image}
                                alt="Inspirational background"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-16 z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuote}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                {QUOTES[currentQuote].icon}
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                                    {QUOTES[currentQuote].topic}
                                </span>
                            </div>
                            <h2 className="text-2xl xl:text-3xl font-serif italic font-medium text-white leading-tight mb-8">
                                &ldquo;{QUOTES[currentQuote].text}&rdquo;
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-white/40" />
                                <p className="text-white/80 font-medium tracking-wide">
                                    {QUOTES[currentQuote].author}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    <div className="flex gap-2 mt-12">
                        {QUOTES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentQuote(i)}
                                className={`h-1 transition-all duration-500 rounded-full ${
                                    currentQuote === i ? "w-8 bg-white" : "w-2 bg-white/30"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <Link href="/" className="absolute top-12 left-12 z-20 group">
                    <Image 
                        src="/p2p/logo.png" 
                        alt="Pain2Purpose Logo" 
                        width={180}
                        height={60}
                        className="h-10 w-auto brightness-0 invert" 
                        priority
                    />
                </Link>
            </div>

            {/* Right Side: Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-8 md:px-16 py-12 relative overflow-y-auto">
                <div className="max-w-md w-full">
                    <div className="mb-12 lg:hidden">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <Image 
                                src="/p2p/logo.png" 
                                alt="Pain2Purpose Logo" 
                                width={140}
                                height={45}
                                className="h-8 w-auto dark:brightness-0 dark:invert" 
                                priority
                            />
                        </Link>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-4xl font-serif font-black text-gray-900 dark:text-white mb-3">
                            Join Us
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Create an account to start your journey towards healing.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Full Name
                                </label>
                                <div className="relative group/input">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-p2p-sage transition-colors" size={18} />
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:ring-4 focus:ring-p2p-sage/5 focus:border-p2p-sage transition-all text-gray-900 dark:text-white font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Email Address
                                </label>
                                <div className="relative group/input">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-p2p-sage transition-colors" size={18} />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:ring-4 focus:ring-p2p-sage/5 focus:border-p2p-sage transition-all text-gray-900 dark:text-white font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Password
                                </label>
                                <div className="relative group/input">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-p2p-sage transition-colors" size={18} />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl outline-none focus:ring-4 focus:ring-p2p-sage/5 focus:border-p2p-sage transition-all text-gray-900 dark:text-white font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-p2p-sage transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 text-[10px] rounded-xl font-black uppercase tracking-widest text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 disabled:opacity-70"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
                                Create Account
                            </button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100 dark:border-gray-800" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase">
                                <span className="bg-white dark:bg-gray-950 px-4 text-gray-400 font-black tracking-[0.2em]">
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setIsGoogleLoading(true);
                                signIn("google", { callbackUrl: "/" });
                            }}
                            disabled={isGoogleLoading}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl text-gray-700 dark:text-gray-300 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95 disabled:opacity-70"
                        >
                            {isGoogleLoading ? <Loader2 className="animate-spin" size={18} /> : <Chrome size={18} />}
                            Google Account
                        </button>

                        <p className="text-center text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            Already have an account?{" "}
                            <Link href="/auth/signin" className="text-p2p-sage hover:underline ml-1">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
