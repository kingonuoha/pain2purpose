"use client";

import { useState, useMemo } from "react";
import { Loader2, X, Star } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { getTimeAgo, getAvatarUrl } from "@/lib/utils";

interface Comment {
    _id: Id<"comments">;
    _creationTime: number;
    content: string;
    authorName: string;
    authorImage?: string;
    authorRole?: string;
    parentId?: Id<"comments">;
}

type CommentItemType = Comment & { replies: CommentItemType[] };

interface CommentsSectionProps {
    articleId: Id<"articles">;
}

function CommentItem({ comment, onReply }: { comment: CommentItemType, onReply: (c: Comment) => void }) {
    const isAdmin = comment.authorRole === "admin";

    return (
        <li className="comment_item_container">
            <div className="comment_item">
                <div className="author_box">
                    <div className="author_box_image">
                        <Image
                            src={getAvatarUrl(comment.authorName, comment.authorImage)}
                            alt={comment.authorName}
                            width={60}
                            height={60}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="author_box_content">
                        <h3 className="author_box_name">
                            {comment.authorName}
                            {isAdmin && (
                                <span className="admin_badge ms-2 d-inline-flex align-items-center gap-1" style={{ fontSize: '10px', color: 'var(--p2p-sage)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    <Star size={10} fill="currentColor" /> Admin
                                </span>
                            )}
                        </h3>
                        <span className="comment_post_date">{getTimeAgo(comment._creationTime)}</span>
                    </div>
                </div>
                <p className="mb-md-0">
                    {comment.content}
                </p>
                <button 
                    className="btn_reply border-0 bg-transparent p-0" 
                    onClick={() => onReply(comment)}
                >
                    <span className="btn_icon">
                        <i className="fa-solid fa-reply"></i>
                    </span>
                    <span className="btn_text" data-text="Reply">Reply</span>
                </button>
            </div>
            
            {comment.replies.length > 0 && (
                <ul className="comment_list_wrap unordered_list_block ps-md-5">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply._id} comment={reply} onReply={onReply} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export function CommentsSection({ articleId }: CommentsSectionProps) {
    const { data: session, status } = useSession();
    const [content, setContent] = useState("");
    const [guestName, setGuestName] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [guestPhone, setGuestPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyTo, setReplyTo] = useState<Comment | null>(null);

    const comments = useQuery(api.engagement.listComments, { articleId });
    const addComment = useMutation(api.engagement.addComment);

    const commentTree = useMemo(() => {
        if (!comments) return [];
        const map = new Map<Id<"comments">, CommentItemType>();
        comments.forEach(c => map.set(c._id, { ...c, replies: [] }));

        const tree: CommentItemType[] = [];
        comments.forEach(c => {
            const item = map.get(c._id)!;
            if (c.parentId && map.has(c.parentId)) {
                map.get(c.parentId)!.replies.push(item);
            } else {
                tree.push(item);
            }
        });
        return tree;
    }, [comments]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (status !== "authenticated") {
            if (!guestName.trim() || !guestEmail.trim()) {
                toast.error("Information Required", {
                    description: "Please provide your name and email to share your reflection.",
                });
                return;
            }
        }

        if (!content.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await addComment({
                articleId,
                content,
                userEmail: session?.user?.email || undefined,
                guestInfo: status !== "authenticated" ? {
                    name: guestName,
                    email: guestEmail,
                    phone: guestPhone || undefined
                } : undefined,
                parentId: replyTo?._id
            });
            
            setContent("");
            setReplyTo(null);
            if (status !== "authenticated") {
                setGuestName("");
                setGuestEmail("");
                setGuestPhone("");
                toast.success("Reflection shared! Check your email to complete your account.");
            } else {
                toast.success(replyTo ? "Reply shared" : "Reflection shared");
            }
        } catch (error: unknown) {
            console.error("Failed to add comment:", error);
            toast.error("Action failed", {
                description: error instanceof Error ? error.message : "Something went wrong while posting.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReply = (comment: Comment) => {
        setReplyTo(comment);
        document.getElementById('comment_form_anchor')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="comment_area_wrapper">
            <div className="comment_area section_space_lg pb-0">
                <h3 className="comment_area_title">
                    Comments ({comments?.length || 0})
                </h3>
                
                {comments === undefined ? (
                    <div className="text-center py-5">
                        <Loader2 className="w-10 h-10 animate-spin mx-auto text-p2p-sage opacity-20" />
                    </div>
                ) : comments.length === 0 ? (
                    <p className="italic text-muted opacity-60 py-4">The silence is deep here. Be the first to share your perspective.</p>
                ) : (
                    <ul className="comment_list_wrap unordered_list_block">
                        {commentTree.map((c) => (
                            <CommentItem
                                key={c._id}
                                comment={c}
                                onReply={handleReply}
                            />
                        ))}
                    </ul>
                )}
            </div>

            <div className="comment_form section_space_lg pb-0" id="comment_form_anchor">
                <h3 className="comment_area_title">
                    {replyTo ? `Responding to ${replyTo.authorName}` : "Leave a comment"}
                </h3>
                {replyTo && (
                    <button 
                        onClick={() => setReplyTo(null)}
                        className="mb-3 text-xs font-bold uppercase tracking-widest text-danger hover:opacity-80 transition-opacity flex items-center gap-1 border-0 bg-transparent p-0"
                    >
                        <X size={14} /> Cancel Reply
                    </button>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {status !== "authenticated" && (
                            <>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="input_name">Name *</label>
                                        <input 
                                            id="input_name"
                                            className="form-control" 
                                            type="text" 
                                            placeholder="Your name"
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            disabled={isSubmitting}
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="input_email">Email *</label>
                                        <input 
                                            id="input_email"
                                            className="form-control" 
                                            type="email" 
                                            placeholder="Your email"
                                            value={guestEmail}
                                            onChange={(e) => setGuestEmail(e.target.value)}
                                            disabled={isSubmitting}
                                            required 
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="col-12">
                            <div className="form-group mb-4">
                                <label htmlFor="input_comment">Comment *</label>
                                <textarea 
                                    id="input_comment"
                                    className="form-control" 
                                    placeholder="Your message"
                                    rows={5}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    disabled={isSubmitting}
                                    required
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={isSubmitting || !content.trim()}
                            >
                                <span className="btn_text" data-text={isSubmitting ? "Posting..." : (replyTo ? "Post Reply" : "Post Comment")}>
                                    {isSubmitting ? "Posting..." : (replyTo ? "Post Reply" : "Post Comment")}
                                </span>
                                <span className="btn_icon">
                                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <i className="fa-solid fa-arrow-up-right"></i>}
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
