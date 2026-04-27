"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { 
    Loader2,
    Plus,
    Search,
    X,
    Edit2,
    Trash2,
    FileText,
    LayoutDashboard,
    Folder,
    Settings,
    Check
} from "lucide-react";
import { toast } from "sonner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { fetchCategoryImages } from "@/app/actions/pexels";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CategoryWithCount = Doc<"categories"> & {
    articleCount: number;
};

export default function CategoriesPage() {
    const categories = useQuery(api.categories.listAll);
    const removeCategory = useMutation(api.categories.remove);
    const createCategory = useMutation(api.categories.create);
    const updateCategory = useMutation(api.categories.update);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Form states
    const [editingCategory, setEditingCategory] = useState<CategoryWithCount | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        coverImage: "",
        pexelsImages: [] as string[]
    });

    // Pexels State
    const [isPexelsModalOpen, setIsPexelsModalOpen] = useState(false);
    const [pexelsQuery, setPexelsQuery] = useState("");
    const [pexelsImages, setPexelsImages] = useState<string[]>([]);
    const [isSearchingPexels, setIsSearchingPexels] = useState(false);
    const [pexelsPage, setPexelsPage] = useState(1);
    const [selectedInModal, setSelectedInModal] = useState<string[]>([]);

    // Prevent body scroll when any modal is open
    useEffect(() => {
        if (isPexelsModalOpen || isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isPexelsModalOpen, isModalOpen]);

    const resetForm = () => {
        setFormData({ name: "", slug: "", description: "", coverImage: "", pexelsImages: [] });
        setEditingCategory(null);
    };

    const handleEdit = (cat: CategoryWithCount) => {
        setEditingCategory(cat);
        setFormData({
            name: cat.name,
            slug: cat.slug,
            description: cat.description || "",
            coverImage: cat.coverImage || "",
            pexelsImages: cat.pexelsImages || []
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingCategory) {
                await updateCategory({ id: editingCategory._id, ...formData });
                toast.success("Category updated successfully");
            } else {
                await createCategory(formData);
                toast.success("New category established");
            }
            setIsModalOpen(false);
            resetForm();
        } catch {
            toast.error("Process failed. Please verify inputs.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: Id<"categories">) => {
        if (!confirm("Permanently dismantle this category? Articles will remain but will lose their classification.")) return;
        try {
            await removeCategory({ id });
            toast.success("Category dismantled");
        } catch {
            toast.error("Action denied: Articles may be tied to this category.");
        }
    };

    const searchPexels = async (page: number = 1, queryOverride?: string) => {
        const queryToSearch = queryOverride || pexelsQuery;
        if (!queryToSearch) return;
        setIsSearchingPexels(true);
        setPexelsPage(page);
        try {
            const images = await fetchCategoryImages(queryToSearch, 24, page);
            setPexelsImages(images);
        } catch {
            toast.error("Visual library inaccessible");
        } finally {
            setIsSearchingPexels(false);
        }
    };

    const toggleModalImage = (url: string) => {
        setSelectedInModal(prev => 
            prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
        );
    };

    const confirmPexelsSelection = () => {
        setFormData(prev => {
            const existing = prev.pexelsImages || [];
            const combined = Array.from(new Set([...existing, ...selectedInModal]));
            return {
                ...prev,
                pexelsImages: combined,
                coverImage: prev.coverImage || selectedInModal[0] || ""
            };
        });
        
        setIsPexelsModalOpen(false);
        setSelectedInModal([]);
    };

    const filteredCategories = (categories || []).filter(cat => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        return (
            cat.name.toLowerCase().includes(query) ||
            cat.slug.toLowerCase().includes(query) ||
            (cat.description || "").toLowerCase().includes(query)
        );
    });

    if (!categories) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4 text-blue-600">
                    <Loader2 className="animate-spin" size={40} strokeWidth={1.5} />
                    <p className="text-sm font-black uppercase tracking-widest text-gray-400">Synchronizing Taxonomy...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 pb-20 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-all">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <LayoutDashboard size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight">Category Manager</h1>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Knowledge Organization System</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
                            />
                        </div>
                        <button
                            onClick={() => { resetForm(); setIsModalOpen(true); }}
                            className="px-6 py-2 bg-zinc-950 text-white rounded-xl hover:bg-zinc-800 transition-all shadow-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Add Category
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Total Categories</p>
                    <div className="flex items-end justify-between">
                        <span className="text-4xl font-black leading-none">{categories.length}</span>
                        <Folder className="text-blue-500 opacity-20" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Total Articles</p>
                    <div className="flex items-end justify-between">
                        <span className="text-4xl font-black leading-none">
                            {categories.reduce((acc, cat) => acc + (cat.articleCount || 0), 0)}
                        </span>
                        <FileText className="text-emerald-500 opacity-20" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">System Health</p>
                    <div className="flex items-end justify-between">
                        <span className="text-lg font-black text-emerald-500 uppercase italic">Operational</span>
                        <Settings className="text-gray-400 opacity-20 animate-spin-slow" size={32} />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories.map((cat: CategoryWithCount) => (
                    <div
                        key={cat._id}
                        className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-gray-100 bg-gray-50 shadow-sm transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
                    >
                        {cat.coverImage ? (
                            <Image
                                src={cat.coverImage}
                                alt={cat.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-black text-6xl opacity-20">{cat.name.charAt(0)}</span>
                            </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80" />

                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black text-white uppercase tracking-widest font-mono">
                                    /{cat.slug}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(cat)} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-blue-600 transition-all flex items-center justify-center">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(cat._id)} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-red-500 transition-all flex items-center justify-center">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-3xl font-black text-white leading-tight italic font-serif tracking-tighter">{cat.name}</h3>
                                <p className="text-xs text-gray-300 font-medium line-clamp-2 max-w-[90%] italic opacity-80">
                                    {cat.description || "No description provided."}
                                </p>
                                <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">
                                            {cat.articleCount || 0} Articles
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setIsModalOpen(false); resetForm(); }}
                            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden"
                        >
                            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                                <div className="flex justify-between items-center mb-10">
                                    <div>
                                        <h2 className="text-3xl font-serif font-black italic">Category Details</h2>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mt-1">Structure Definition</p>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-zinc-950 hover:text-white transition-all">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-bold text-sm focus:ring-2 focus:ring-blue-600 transition-all"
                                                placeholder="e.g. Wellness"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Slug</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.slug}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 font-mono text-xs font-bold text-blue-600 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Narrative Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 h-32 text-sm font-medium resize-none transition-all"
                                            placeholder="The essence of this category..."
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end px-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Visual Aesthetic</label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const q = formData.name || "";
                                                    setPexelsQuery(q);
                                                    setIsPexelsModalOpen(true);
                                                    searchPexels(1, q);
                                                }}
                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-[10px] font-black uppercase tracking-widest"
                                            >
                                                <Search size={14} />
                                                Source from Pexels
                                            </button>
                                        </div>
                                        
                                        {formData.coverImage && (
                                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
                                                <Image src={formData.coverImage} alt="Cover" fill className="object-cover" />
                                                <button 
                                                    type="button"
                                                    onClick={() => setFormData({...formData, coverImage: ""})}
                                                    className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}

                                        {formData.pexelsImages && formData.pexelsImages.length > 0 && (
                                            <div className="grid grid-cols-4 gap-3">
                                                {formData.pexelsImages.map((img, idx) => (
                                                    <div 
                                                        key={idx}
                                                        onClick={() => setFormData({ ...formData, coverImage: img })}
                                                        className={cn(
                                                            "group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all",
                                                            formData.coverImage === img ? "border-blue-600 scale-95" : "border-transparent opacity-60 hover:opacity-100"
                                                        )}
                                                    >
                                                        <Image src={img} alt="Library" fill className="object-cover" />
                                                        {formData.coverImage === img && (
                                                            <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                                                                <div className="bg-blue-600 rounded-full p-1">
                                                                    <Check className="text-white" size={10} strokeWidth={4} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-5 bg-zinc-950 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting && <Loader2 className="animate-spin" size={20} />}
                                        {editingCategory ? "Update Classification" : "Create Node"}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Pexels Modal */}
            <AnimatePresence>
                {isPexelsModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsPexelsModalOpen(false)}
                            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl relative z-10 flex flex-col h-[85vh] overflow-hidden border border-white/10"
                        >
                            <div className="p-10 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/50 backdrop-blur-md">
                                <div>
                                    <h3 className="text-3xl font-serif font-black italic">Aesthetic Curation</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-1">Sourcing visual metaphors</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            value={pexelsQuery}
                                            onChange={(e) => setPexelsQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && searchPexels(1)}
                                            placeholder="Search visual library..."
                                            className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl w-64 focus:ring-2 focus:ring-blue-600 transition-all font-bold text-sm"
                                        />
                                    </div>
                                    <button onClick={() => setIsPexelsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-zinc-950 hover:text-white transition-all">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-10 grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 custom-scrollbar">
                                {isSearchingPexels ? (
                                    <div className="col-span-full py-20 flex flex-col items-center gap-4 text-zinc-300">
                                        <Loader2 className="animate-spin" size={40} />
                                        <p className="text-[10px] font-black uppercase tracking-widest italic">Scanning the ether...</p>
                                    </div>
                                ) : pexelsImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => toggleModalImage(img)}
                                        className={cn(
                                            "relative aspect-video rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] border-4",
                                            selectedInModal.includes(img) ? "border-blue-600 ring-8 ring-blue-600/10" : "border-transparent"
                                        )}
                                    >
                                        <Image src={img} alt="Pexels" fill className="object-cover" />
                                        {selectedInModal.includes(img) && (
                                            <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                                                <div className="bg-blue-600 rounded-full p-2 shadow-2xl">
                                                    <Check className="text-white" size={20} strokeWidth={4} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 border-t border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-md">
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    {selectedInModal.length} ASSETS SELECTED
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => searchPexels(pexelsPage + 1)}
                                        className="px-6 py-3 rounded-xl bg-gray-50 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-all border border-gray-100"
                                    >
                                        Load More
                                    </button>
                                    <button
                                        onClick={confirmPexelsSelection}
                                        disabled={selectedInModal.length === 0}
                                        className="px-8 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50"
                                    >
                                        Confirm Selection
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
