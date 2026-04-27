"use client";

import { useQuery, useMutation, usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    CheckCircle2,
    XCircle,
    RefreshCcw,
    Trash2,
    Search,
    Loader2,
    CheckSquare,
    Square,
    Clock,
    Zap,
    Eye,
    X
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTour } from "@/hooks/use-tour";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { useState } from "react";

export default function EmailLogsPage() {
    const [statusFilter, setStatusFilter] = useState<"sent" | "failed" | "pending" | "sending" | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEmails, setSelectedEmails] = useState<Id<"emailQueue">[]>([]);
    const [previewId, setPreviewId] = useState<Id<"emailQueue"> | null>(null);
    const [pageSize, setPageSize] = useState(10);

    const statsData = useQuery(api.emails.getEmailStats);
    const { results: emails, status, loadMore } = usePaginatedQuery(
        api.emails.getEmailLogs,
        { status: statusFilter, search: searchQuery || undefined },
        { initialNumItems: pageSize }
    );

    // Initialize tour
    useTour("admin-emails", true);

    const retryEmail = useMutation(api.emails.retryEmail);
    const deleteEmail = useMutation(api.emails.deleteEmail);
    const deleteMultiple = useMutation(api.emails.deleteMultiple);
    const deleteAll = useMutation(api.emails.deleteAll);

    const handleRetry = async (id: Id<"emailQueue">) => {
        try {
            await retryEmail({ id });
            toast.success("Email queued for retry");
        } catch (err) {
            console.error(err);
            toast.error("Failed to retry email");
        }
    };

    const handleDelete = async (id: Id<"emailQueue">) => {
        if (!confirm("Are you sure you want to delete this log?")) return;
        try {
            await deleteEmail({ id });
            toast.success("Log entry deleted");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete log entry");
        }
    };

    const handleBatchDelete = async () => {
        if (!confirm(`Delete ${selectedEmails.length} selected logs?`)) return;
        try {
            await deleteMultiple({ ids: selectedEmails });
            setSelectedEmails([]);
            toast.success("Selected logs deleted");
        } catch (err) {
            console.error(err);
            toast.error("Batch delete failed");
        }
    };

    const handleWipeAll = async () => {
        if (!confirm("CRITICAL: This will delete ALL email logs in the database. Continue?")) return;
        try {
            await deleteAll({ confirm: true });
            toast.success("Database wiped clean");
        } catch (err) {
            console.error(err);
            toast.error("Wipe failed");
        }
    };

    const toggleSelect = (id: Id<"emailQueue">) => {
        setSelectedEmails(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedEmails && selectedEmails.length === emails?.length) {
            setSelectedEmails([]);
        } else if (emails) {
            setSelectedEmails(emails.map(e => e._id));
        }
    };

    const filteredEmails = emails; // Now server-side filtered

    return (
        <div className="space-y-10 pb-12 font-sans text-gray-950">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-serif font-black tracking-tight">Transmissions</h1>
                    <p className="text-gray-500 mt-1 font-medium font-sans">Track delivery, troubleshoot failures, and manage your communication queue.</p>
                </div>

                <div className="flex items-center gap-3">
                    {selectedEmails.length > 0 && (
                        <button
                            onClick={handleBatchDelete}
                            className="h-12 px-6 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                            <Trash2 size={16} />
                            Delete ({selectedEmails.length})
                        </button>
                    )}
                    <button
                        onClick={handleWipeAll}
                        className="h-12 px-6 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] bg-zinc-950 text-white hover:bg-red-600 transition-all shadow-xl"
                    >
                        <Zap size={16} />
                        Wipe All
                    </button>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-blue-500/10 transition-all" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Total Transmissions</p>
                    <div className="flex items-end justify-between relative z-10">
                        <span className="text-4xl font-black leading-none">{statsData?.total ?? 0}</span>
                        <Zap className="text-blue-500 opacity-20" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-green-500/10 transition-all" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Successfully Sent</p>
                    <div className="flex items-end justify-between relative z-10">
                        <span className="text-4xl font-black leading-none text-green-600">{statsData?.sent ?? 0}</span>
                        <CheckCircle2 className="text-green-500 opacity-20" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-red-500/10 transition-all" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Delivery Failures</p>
                    <div className="flex items-end justify-between relative z-10">
                        <span className="text-4xl font-black leading-none text-red-600">{statsData?.failed ?? 0}</span>
                        <XCircle className="text-red-500 opacity-20" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-amber-500/10 transition-all" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Pending In Queue</p>
                    <div className="flex items-end justify-between relative z-10">
                        <span className="text-4xl font-black leading-none text-amber-500">{statsData?.pending ?? 0}</span>
                        <Clock className="text-amber-500 opacity-20" size={32} />
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter results..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-sm text-gray-950 placeholder:text-gray-400 shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                    {[
                        { id: undefined, label: "All" },
                        { id: "sent", label: "Sent" },
                        { id: "failed", label: "Failed" },
                        { id: "pending", label: "Queued" },
                    ].map((f) => (
                        <button
                            key={f.label}
                            onClick={() => setStatusFilter(f.id as typeof statusFilter)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                statusFilter === f.id 
                                    ? "bg-blue-600 text-white shadow-lg" 
                                    : "text-gray-400 hover:text-gray-900"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm ml-auto">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 px-3">Size:</span>
                    {[10, 25, 50, 100].map((s) => (
                        <button
                            key={s}
                            onClick={() => setPageSize(s)}
                            className={cn(
                                "w-10 h-8 rounded-lg text-[10px] font-black transition-all",
                                pageSize === s 
                                    ? "bg-zinc-950 text-white shadow-md" 
                                    : "text-gray-400 hover:text-gray-900"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-5 w-10">
                                <button onClick={toggleSelectAll} className="text-gray-400 hover:text-blue-600 transition-colors">
                                    {selectedEmails.length === emails.length && emails.length > 0 ? <CheckSquare size={18} /> : <Square size={18} />}
                                </button>
                            </th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Identity</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Protocol</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Pulse Date</th>
                            <th className="px-8 py-5 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {status === "LoadingFirstPage" ? (
                            <tr>
                                <td colSpan={6} className="px-8 py-20 text-center">
                                    <Loader2 className="animate-spin text-blue-600 mx-auto" size={32} />
                                </td>
                            </tr>
                        ) : filteredEmails?.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <Zap size={32} className="text-gray-200" />
                                        <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em]">Zero transmissions matched</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredEmails?.map((email: Doc<"emailQueue">) => (
                                <tr key={email._id} className={cn(
                                    "hover:bg-gray-50/50 transition-all duration-300 group",
                                    selectedEmails.includes(email._id) && "bg-blue-50/30"
                                )}>
                                    <td className="px-6 py-5">
                                        <button 
                                            onClick={() => toggleSelect(email._id)}
                                            className={cn(
                                                "transition-colors",
                                                selectedEmails.includes(email._id) ? "text-blue-600" : "text-gray-300 group-hover:text-gray-400"
                                            )}
                                        >
                                            {selectedEmails.includes(email._id) ? <CheckSquare size={18} /> : <Square size={18} />}
                                        </button>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-serif font-black text-gray-950 leading-tight group-hover:text-blue-600 transition-colors">{email.recipient}</span>
                                            <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest mt-1">Attempts: {email.retries}/3</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col max-w-[300px]">
                                            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-blue-600 bg-blue-50 w-fit px-2 py-0.5 rounded-lg border border-blue-100 mb-1.5 font-sans">
                                                {email.templateName}
                                            </span>
                                            <span className="text-sm text-gray-600 font-medium truncate italic">&ldquo;{email.subject}&rdquo;</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "h-2 w-2 rounded-full",
                                                email.status === "sent" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" :
                                                    email.status === "failed" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" :
                                                        "bg-blue-500 animate-pulse"
                                            )} />
                                            <span className={cn(
                                                "text-[9px] font-black uppercase tracking-[0.2em]",
                                                email.status === "sent" ? "text-green-600" :
                                                    email.status === "failed" ? "text-red-600" :
                                                        "text-gray-500"
                                            )}>
                                                {email.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="text-xs font-medium text-gray-500 flex items-center gap-2">
                                            <Clock size={16} className="text-gray-300" />
                                            {format(email.sentAt || email.scheduledFor, "MMM d, HH:mm")}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                className="w-10 h-10 flex items-center justify-center bg-white text-zinc-400 hover:text-blue-600 rounded-xl transition-all border border-zinc-100 shadow-sm"
                                                onClick={() => setPreviewId(email._id)}
                                                title="Preview"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            {email.status === "failed" && (
                                                <button
                                                    className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all border border-blue-100 shadow-sm"
                                                    onClick={() => handleRetry(email._id)}
                                                    title="Retry"
                                                >
                                                    <RefreshCcw size={16} />
                                                </button>
                                            )}
                                            <button
                                                className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-300 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-gray-100 shadow-sm"
                                                onClick={() => handleDelete(email._id)}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {status === "CanLoadMore" && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => loadMore(pageSize)}
                        className="px-8 py-3 bg-white border border-gray-200 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm active:scale-95"
                    >
                        Load more transmissions
                    </button>
                </div>
            )}

            {previewId && <PreviewModal id={previewId} onClose={() => setPreviewId(null)} />}
        </div>
    );
}

function PreviewModal({ id, onClose }: { id: Id<"emailQueue">; onClose: () => void }) {
    const preview = useQuery(api.emails.renderPreview, { id });

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zinc-950/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[85vh]">
                <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-serif font-black text-zinc-950 italic">Transmission Preview</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1">Viewing raw protocol payload</p>
                    </div>
                    <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 bg-gray-50">
                    {!preview ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-300">
                            <Loader2 className="animate-spin" size={32} />
                            <p className="text-[10px] font-black uppercase tracking-widest">Reconstructing template...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Subject</p>
                                    <p className="font-serif font-black text-zinc-950">{preview.subject}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Template</p>
                                    <p className="font-sans font-bold text-blue-600">{preview.templateName}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
                                <div dangerouslySetInnerHTML={{ __html: preview.html }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
