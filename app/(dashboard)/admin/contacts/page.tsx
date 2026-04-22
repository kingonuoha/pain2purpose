"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Mail, Phone, Calendar, MessageSquare } from "lucide-react";

type Submission = {
    _id: Id<"contactSubmissions">;
    name: string;
    email: string;
    phone?: string;
    serviceInterest?: string;
    message: string;
    status: "new" | "read" | "responded";
    createdAt: number;
};

const STATUS_STYLES = {
    new: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    read: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    responded: "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
};

export default function AdminContactsPage() {
    const [filter, setFilter] = useState<"all" | "new" | "read" | "responded">("all");
    const [expandedId, setExpandedId] = useState<Id<"contactSubmissions"> | null>(null);
    const [updating, setUpdating] = useState<Id<"contactSubmissions"> | null>(null);

    const submissions = useQuery(
        api.contact.list,
        filter === "all" ? {} : { status: filter }
    );
    const updateStatus = useMutation(api.contact.updateStatus);

    const handleStatus = async (id: Id<"contactSubmissions">, status: Submission["status"]) => {
        setUpdating(id);
        try {
            await updateStatus({ id, status });
            toast.success(`Marked as ${status}`);
        } catch {
            toast.error("Failed to update status");
        } finally {
            setUpdating(null);
        }
    };

    const newCount = submissions?.filter(s => s.status === "new").length ?? 0;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        Contact Submissions
                        {newCount > 0 && (
                            <span className="px-2.5 py-0.5 bg-blue-500 text-white rounded-full text-xs font-black">
                                {newCount} new
                            </span>
                        )}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Incoming leads from the contact form. Mark as Read or Responded as you work through them.</p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-0">
                {(["all", "new", "read", "responded"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-4 py-2 text-xs font-black uppercase tracking-widest border-b-2 transition-colors -mb-px ${
                            filter === tab
                                ? "border-[#7C9A7E] text-[#7C9A7E]"
                                : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-3">
                {submissions === undefined && (
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />)}
                    </div>
                )}
                {submissions?.length === 0 && (
                    <div className="text-center py-16 text-gray-400 dark:text-gray-600">
                        <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="font-bold">No submissions yet.</p>
                        <p className="text-sm">Contact form messages will appear here.</p>
                    </div>
                )}

                {submissions?.map((sub) => {
                    const isExpanded = expandedId === sub._id;
                    return (
                        <div
                            key={sub._id}
                            className={`bg-white dark:bg-gray-900 border rounded-2xl overflow-hidden transition-all ${
                                sub.status === "new"
                                    ? "border-blue-200 dark:border-blue-500/30"
                                    : "border-gray-100 dark:border-gray-800"
                            }`}
                        >
                            {/* Row */}
                            <div
                                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                onClick={() => setExpandedId(isExpanded ? null : sub._id)}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-bold text-gray-900 dark:text-white text-sm">{sub.name}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${STATUS_STYLES[sub.status]}`}>
                                            {sub.status}
                                        </span>
                                        {sub.serviceInterest && (
                                            <span className="px-2 py-0.5 bg-[#EEF4EE] text-[#7C9A7E] rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {sub.serviceInterest}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                                        <span className="flex items-center gap-1"><Mail size={10} />{sub.email}</span>
                                        {sub.phone && <span className="flex items-center gap-1"><Phone size={10} />{sub.phone}</span>}
                                        <span className="flex items-center gap-1">
                                            <Calendar size={10} />
                                            {new Date(sub.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-gray-300 dark:text-gray-600 flex-shrink-0">
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="px-4 pb-4 border-t border-gray-50 dark:border-gray-800 pt-4">
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 rounded-xl p-4 whitespace-pre-wrap">
                                        {sub.message}
                                    </p>
                                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mr-2">Update status:</span>
                                        {(["new", "read", "responded"] as const).map((s) => (
                                            <button
                                                key={s}
                                                disabled={sub.status === s || updating === sub._id}
                                                onClick={() => handleStatus(sub._id, s)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-colors disabled:opacity-40 ${
                                                    sub.status === s
                                                        ? `${STATUS_STYLES[s]} cursor-default`
                                                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                                                }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
