"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, ToggleLeft, ToggleRight, X, Save, HeartHandshake, Brain, MessageSquare, Users, User, Sun, Leaf, Shield, Smile, Sparkles, HelpingHand, Coffee, Bird, Anchor, ChevronDown } from "lucide-react";
import { useTour } from "@/hooks/use-tour";

const ICON_OPTIONS = [
    { label: "Heart & Handshake", value: "HeartHandshake", icon: HeartHandshake },
    { label: "Brain", value: "Brain", icon: Brain },
    { label: "Message", value: "MessageSquare", icon: MessageSquare },
    { label: "Users / Family", value: "Users", icon: Users },
    { label: "User / Individual", value: "User", icon: User },
    { label: "Sun / Hope", value: "Sun", icon: Sun },
    { label: "Leaf / Healing", value: "Leaf", icon: Leaf },
    { label: "Shield / Safety", value: "Shield", icon: Shield },
    { label: "Smile", value: "Smile", icon: Smile },
    { label: "Sparkles", value: "Sparkles", icon: Sparkles },
    { label: "Helping Hand", value: "HelpingHand", icon: HelpingHand },
    { label: "Coffee / Safe Space", value: "Coffee", icon: Coffee },
    { label: "Bird / Freedom", value: "Bird", icon: Bird },
    { label: "Anchor / Stability", value: "Anchor", icon: Anchor },
];

type Service = {
    _id: Id<"services">;
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    coverImage?: string;
    order: number;
    isActive: boolean;
    createdAt: number;
};

const emptyForm = {
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    icon: "HeartHandshake",
    order: 0,
};

export default function AdminServicesPage() {
    const services = useQuery(api.services.listAll);
    const create = useMutation(api.services.create);
    const update = useMutation(api.services.update);

    useTour("admin-services", true);

    const [editingId, setEditingId] = useState<Id<"services"> | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const handleToggleActive = async (service: Service) => {
        try {
            await update({ id: service._id, isActive: !service.isActive });
            toast.success(`${service.title} ${!service.isActive ? "activated" : "deactivated"}`);
        } catch {
            toast.error("Failed to update service status");
        }
    };

    const handleEdit = (service: Service) => {
        setEditingId(service._id);
        setForm({
            title: service.title,
            slug: service.slug,
            shortDescription: service.shortDescription,
            fullDescription: service.fullDescription,
            icon: service.icon,
            order: service.order,
        });
        setShowCreate(false);
    };

    const handleSave = async (id?: Id<"services">) => {
        if (!form.title || !form.slug || !form.shortDescription) {
            toast.error("Title, slug, and short description are required");
            return;
        }
        setSaving(true);
        try {
            if (id) {
                await update({ id, ...form });
                toast.success("Service updated");
                setEditingId(null);
            } else {
                await create(form);
                toast.success("Service created");
                setShowCreate(false);
                setForm(emptyForm);
            }
        } catch {
            toast.error("Failed to save service");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowCreate(false);
        setForm(emptyForm);
    };

    const slugify = (val: string) =>
        val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div id="tour-services-header" className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Services</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage the services Sandra offers. Toggle to show/hide on the public site.</p>
                </div>
                {!showCreate && (
                    <button
                        onClick={() => { setShowCreate(true); setEditingId(null); setForm(emptyForm); }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#7C9A7E] text-white rounded-xl text-sm font-bold hover:bg-[#6a8a6c] transition-colors"
                    >
                        <Plus size={16} />
                        Add Service
                    </button>
                )}
            </div>

            {/* Create Form */}
            {showCreate && (
                <ServiceForm
                    form={form}
                    setForm={setForm}
                    onSave={() => handleSave()}
                    onCancel={handleCancel}
                    saving={saving}
                    slugify={slugify}
                    title="New Service"
                />
            )}

            {/* Services List */}
            <div id="tour-services-list" className="space-y-4">
                {services === undefined && (
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />)}
                    </div>
                )}
                {services?.length === 0 && (
                    <div className="text-center py-16 text-gray-400 dark:text-gray-600">
                        <p className="font-bold">No services yet.</p>
                        <p className="text-sm">Click &quot;Add Service&quot; to create your first service.</p>
                    </div>
                )}
                {services?.map((service) => (
                    <div key={service._id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
                        {editingId === service._id ? (
                            <ServiceForm
                                form={form}
                                setForm={setForm}
                                onSave={() => handleSave(service._id)}
                                onCancel={handleCancel}
                                saving={saving}
                                slugify={slugify}
                                title="Edit Service"
                            />
                        ) : (
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400">#{service.order}</span>
                                        <h3 className="font-bold text-gray-900 dark:text-white">{service.title}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${service.isActive ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400" : "bg-gray-100 text-gray-400 dark:bg-gray-800"}`}>
                                            {service.isActive ? "Active" : "Hidden"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{service.shortDescription}</p>
                                    <p className="text-xs text-gray-400 mt-1">slug: <code className="bg-gray-50 dark:bg-gray-800 px-1 rounded">{service.slug}</code> · icon: <code className="bg-gray-50 dark:bg-gray-800 px-1 rounded">{service.icon}</code></p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleToggleActive(service)}
                                        className="p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-[#7C9A7E]"
                                        title={service.isActive ? "Deactivate" : "Activate"}
                                    >
                                        {service.isActive ? <ToggleRight size={20} className="text-[#7C9A7E]" /> : <ToggleLeft size={20} />}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-400 hover:text-blue-500"
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
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

function ServiceForm({
    form,
    setForm,
    onSave,
    onCancel,
    saving,
    slugify,
    title,
}: {
    form: typeof emptyForm;
    setForm: (f: typeof emptyForm) => void;
    onSave: () => void;
    onCancel: () => void;
    saving: boolean;
    slugify: (v: string) => string;
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
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Title *</label>
                    <input
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E]"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })}
                        placeholder="Grief & Loss Support"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Slug *</label>
                    <input
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E] font-mono"
                        value={form.slug}
                        onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                        placeholder="grief-and-loss"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Icon *</label>
                    <div className="relative">
                        <select
                            className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E] appearance-none"
                            value={form.icon}
                            onChange={(e) => setForm({ ...form, icon: e.target.value })}
                        >
                            {ICON_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                            {(() => {
                                const Icon = ICON_OPTIONS.find(o => o.value === form.icon)?.icon || HeartHandshake;
                                return <Icon size={16} className="text-[#7C9A7E]" />;
                            })()}
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Display Order</label>
                    <input
                        type="number"
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E]"
                        value={form.order}
                        onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Short Description *</label>
                <textarea
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E] resize-none"
                    rows={2}
                    value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                    placeholder="Brief description shown on service cards..."
                />
            </div>

            <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Full Description</label>
                <textarea
                    className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7C9A7E] resize-none font-mono"
                    rows={5}
                    value={form.fullDescription}
                    onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                    placeholder="Full HTML/text for the service detail page..."
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
                    {saving ? "Saving..." : "Save Service"}
                </button>
            </div>
        </div>
    );
}
