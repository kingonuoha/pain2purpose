"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, ToggleLeft, ToggleRight, X, Save, Star, User, Trash2 } from "lucide-react";
import Image from "next/image";

type Testimonial = {
    _id: Id<"testimonials">;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar?: string;
    isActive: boolean;
    createdAt: number;
};

const emptyForm = {
    name: "",
    role: "",
    content: "",
    rating: 5,
    avatar: "",
};

export default function AdminTestimonialsPage() {
    const testimonials = useQuery(api.testimonials.listAll);
    const create = useMutation(api.testimonials.create);
    const update = useMutation(api.testimonials.update);
    const remove = useMutation(api.testimonials.remove);

    const [editingId, setEditingId] = useState<Id<"testimonials"> | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const handleToggleActive = async (testimonial: Testimonial) => {
        try {
            await update({ id: testimonial._id, isActive: !testimonial.isActive });
            toast.success(`${testimonial.name}'s testimonial ${!testimonial.isActive ? "activated" : "deactivated"}`);
        } catch {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: Id<"testimonials">) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;
        try {
            await remove({ id });
            toast.success("Testimonial deleted");
        } catch {
            toast.error("Failed to delete testimonial");
        }
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditingId(testimonial._id);
        setForm({
            name: testimonial.name,
            role: testimonial.role,
            content: testimonial.content,
            rating: testimonial.rating,
            avatar: testimonial.avatar || "",
        });
        setShowCreate(false);
    };

    const handleSave = async (id?: Id<"testimonials">) => {
        if (!form.name || !form.role || !form.content) {
            toast.error("Name, role, and content are required");
            return;
        }
        setSaving(true);
        try {
            if (id) {
                await update({ id, ...form });
                toast.success("Testimonial updated");
                setEditingId(null);
            } else {
                await create(form);
                toast.success("Testimonial created");
                setShowCreate(false);
                setForm(emptyForm);
            }
        } catch {
            toast.error("Failed to save testimonial");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowCreate(false);
        setForm(emptyForm);
    };

    return (
        <div className="space-y-8 text-black">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Testimonials</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage what patients say about their experience with Pain2Purpose.</p>
                </div>
                {!showCreate && (
                    <button
                        onClick={() => { setShowCreate(true); setEditingId(null); setForm(emptyForm); }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#7C9A7E] text-white rounded-xl text-sm font-bold hover:bg-[#6a8a6c] transition-colors"
                    >
                        <Plus size={16} />
                        Add Testimonial
                    </button>
                )}
            </div>

            {/* Create Form */}
            {showCreate && (
                <TestimonialForm
                    form={form}
                    setForm={setForm}
                    onSave={() => handleSave()}
                    onCancel={handleCancel}
                    saving={saving}
                    title="New Testimonial"
                />
            )}

            {/* Testimonials List */}
            <div className="space-y-4">
                {testimonials === undefined && (
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />)}
                    </div>
                )}
                {testimonials?.length === 0 && (
                    <div className="text-center py-16 text-gray-400 dark:text-gray-600">
                        <p className="font-bold">No testimonials yet.</p>
                        <p className="text-sm">Click &quot;Add Testimonial&quot; to share a story of healing.</p>
                    </div>
                )}
                {testimonials?.map((item) => (
                    <div key={item._id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                        {editingId === item._id ? (
                            <TestimonialForm
                                form={form}
                                setForm={setForm}
                                onSave={() => handleSave(item._id)}
                                onCancel={handleCancel}
                                saving={saving}
                                title="Edit Testimonial"
                            />
                        ) : (
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex gap-4 flex-1">
                                    <div className="flex-shrink-0">
                                        <Image
                                            src={item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=7C9A7E&color=fff&bold=true`}
                                            alt={item.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.isActive ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400" : "bg-gray-100 text-gray-400 dark:bg-gray-800"}`}>
                                                {item.isActive ? "Active" : "Hidden"}
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-[#7C9A7E] uppercase tracking-wider mb-2">{item.role}</p>
                                        <div className="flex gap-0.5 mb-2 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < item.rating ? "currentColor" : "none"} stroke={i < item.rating ? "none" : "currentColor"} className={i >= item.rating ? "text-gray-300" : ""} />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 italic font-serif">&quot;{item.content}&quot;</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleToggleActive(item)}
                                        className="p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-[#7C9A7E]"
                                        title={item.isActive ? "Deactivate" : "Activate"}
                                    >
                                        {item.isActive ? <ToggleRight size={20} className="text-[#7C9A7E]" /> : <ToggleLeft size={20} />}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-blue-500"
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-red-500"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function TestimonialForm({
    form,
    setForm,
    onSave,
    onCancel,
    saving,
    title,
}: {
    form: typeof emptyForm;
    setForm: (f: typeof emptyForm) => void;
    onSave: () => void;
    onCancel: () => void;
    saving: boolean;
    title: string;
}) {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
                <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400"><X size={16} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Name *</label>
                    <input
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E]"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Role *</label>
                    <input
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E]"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="Mother & Caregiver"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Avatar URL (Optional)</label>
                    <input
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E]"
                        value={form.avatar}
                        onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                        placeholder="https://cloudinary.com/..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Rating (1-5)</label>
                    <input
                        type="number"
                        min={1}
                        max={5}
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E]"
                        value={form.rating}
                        onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Content *</label>
                <textarea
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E] resize-none"
                    rows={4}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="The compassionate support I received..."
                />
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button onClick={onCancel} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Cancel
                </button>
                <button
                    onClick={onSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-[#7C9A7E] text-white rounded-xl text-sm font-bold hover:bg-[#6a8a6c] transition-colors disabled:opacity-50"
                >
                    <Save size={14} />
                    {saving ? "Saving..." : "Save Testimonial"}
                </button>
            </div>
        </div>
    );
}
