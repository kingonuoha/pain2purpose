"use client";

import { MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface EngagementToolbarProps {
    slug: string;
    vertical?: boolean;
}

export function EngagementToolbar({ slug, vertical = false }: EngagementToolbarProps) {
    const handleShare = () => {
        const url = `${window.location.origin}/${slug}`;
        if (navigator.share) {
            navigator.share({
                title: 'Pain2Purpose',
                url: url
            }).catch(() => {
                navigator.clipboard.writeText(url);
                toast.success("Link copied");
            });
        } else {
            navigator.clipboard.writeText(url);
            toast.success("Link copied");
        }
    };

    return (
        <div className={cn(
            "flex items-center bg-white/80 border border-border shadow-xl backdrop-blur-xl transition-all duration-500",
            vertical
                ? "flex-col gap-8 p-4 rounded-full"
                : "fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto md:static md:translate-x-0 md:justify-between px-8 py-4 rounded-3xl z-50 shadow-p2p-sage/5"
        )}>
            <div className={cn(
                "flex items-center",
                vertical ? "flex-col gap-6" : "flex-row gap-8"
            )}>
                {/* Comments Link */}
                <button
                    onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className={cn(
                        "flex items-center text-zinc-500 hover:text-p2p-sage transition-colors group",
                        vertical ? "flex-col gap-1.5" : "flex-row gap-2.5"
                    )}
                >
                    <div className="p-2 rounded-full hover:bg-p2p-soft-green transition-colors">
                        <MessageCircle size={vertical ? 22 : 20} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <span className={cn(
                        "font-black uppercase tracking-tighter",
                        vertical ? "text-[10px]" : "text-xs"
                    )}>
                        Discuss
                    </span>
                </button>

                <div className={cn(
                    "bg-border",
                    vertical ? "w-8 h-[1px]" : "w-[1px] h-6"
                )} />

                {/* Share */}
                <button
                    onClick={handleShare}
                    className={cn(
                        "flex items-center text-zinc-500 hover:text-p2p-sage transition-all group",
                        vertical ? "flex-col gap-1.5" : "flex-row gap-2.5"
                    )}
                >
                    <div className="p-2 rounded-full hover:bg-p2p-soft-green transition-colors">
                        <Share2 size={vertical ? 20 : 18} className="group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className={cn(
                        "font-black uppercase tracking-tighter",
                        vertical ? "text-[10px]" : "text-xs"
                    )}>
                        Share
                    </span>
                </button>
            </div>
        </div>
    );
}

export default EngagementToolbar;
