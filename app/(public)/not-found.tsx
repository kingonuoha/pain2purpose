import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <section className="min-h-[70vh] bg-p2p-cream flex items-center justify-center p-6 py-32">
            <div className="max-w-2xl w-full text-center">
                <div className="relative mb-12">
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <span className="text-[20rem] font-black text-p2p-sage/5 select-none">404</span>
                    </div>
                    <div className="w-32 h-32 bg-white rounded-[40px] shadow-2xl shadow-p2p-sage/20 border border-p2p-soft-green/30 flex items-center justify-center mx-auto relative group">
                        <div className="absolute inset-0 bg-p2p-sage rounded-[40px] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <Search size={48} className="text-p2p-sage relative" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-serif font-bold text-p2p-charcoal mb-6 italic">Path Not Found</h1>
                <p className="text-xl text-gray-500 mb-12 max-w-lg mx-auto font-medium leading-relaxed italic">
                    The insight you are looking for might have been moved or hasn&apos;t been shared yet. Let&apos;s find your way back.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link 
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-p2p-charcoal text-white font-black uppercase tracking-widest text-[11px] hover:bg-p2p-sage transition-all shadow-xl active:scale-95"
                    >
                        <Home size={16} />
                        Go Home
                    </Link>
                    <Link 
                        href="/blog"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white border-2 border-p2p-soft-green/30 text-p2p-charcoal font-black uppercase tracking-widest text-[11px] hover:border-p2p-sage hover:text-p2p-sage transition-all shadow-lg active:scale-95"
                    >
                        <ArrowLeft size={16} />
                        Back to Blog
                    </Link>
                </div>

                {/* Decorative Leaves (Visual Polish) */}
                <div className="mt-20 flex justify-center gap-8 opacity-20">
                    <div className="w-12 h-12 bg-p2p-sage rounded-full blur-2xl" />
                    <div className="w-12 h-12 bg-p2p-soft-green rounded-full blur-2xl" />
                    <div className="w-12 h-12 bg-p2p-cream-dark rounded-full blur-2xl" />
                </div>
            </div>
        </section>
    );
}

