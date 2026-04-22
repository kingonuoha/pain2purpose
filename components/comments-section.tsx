"use client";

import { useState, useMemo } from "react";
import { Loader2, X } from "lucide-react";
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
    parentId?: Id<"comments">;
}

interface CommentsSectionProps {
    articleId: Id<"articles">;
}

export function CommentsSection({ articleId }: CommentsSectionProps) {
    const { data: session, status } = useSession();
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyTo, setReplyTo] = useState<Comment | null>(null);

    const comments = useQuery(api.engagement.listComments, { articleId });
    const addComment = useMutation(api.engagement.addComment);

    const commentTree = useMemo(() => {
        if (!comments) return [];
        const map = new Map<Id<"comments">, Comment & { replies: CommentItemType[] }>();
        comments.forEach(c => map.set(c._id, { ...c, replies: [] }));

        const tree: CommentItemType[] = [];
        comments.forEach(c => {
            const comment = map.get(c._id)!;
            if (c.parentId && map.has(c.parentId)) {
                map.get(c.parentId)!.replies.unshift(comment);
            } else {
                tree.push(comment);
            }
        });
        return tree;
    }, [comments]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status !== "authenticated") {
            toast.error("Authentication Required", {
                description: "You need to be logged in to post a reflection.",
            });
            return;
        }

        if (!content.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            if (!session?.user?.email) return;
            await addComment({
                articleId,
                content,
                userEmail: session.user.email,
                parentId: replyTo?._id
            });
            setContent("");
            setReplyTo(null);
            toast.success(replyTo ? "Reply shared" : "Reflection shared");
        } catch (error: unknown) {
            console.error("Failed to add comment:", error);
            toast.error("Action failed", {
                description: error instanceof Error ? error.message : "Something went wrong while posting.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="comment_area_wrapper">
            <div className="comment_area section_space_lg pb-0 pt-0">
                <h3 className="details_info_title">
                    Community Reflections ({comments?.length || 0})
                </h3>
                
                {comments === undefined ? (
                    <div className="text-center py-5">
                        <Loader2 className="w-10 h-10 animate-spin mx-auto text-p2p-sage opacity-20" />
                    </div>
                ) : comments.length === 0 ? (
                    <p className="italic text-gray-400">The silence is deep here. Be the first to share your perspective.</p>
                ) : (
                    <ul className="comment_list unordered_list_block">
                        {commentTree.map((c) => (
                            <CommentItem
                                key={c._id}
                                comment={c}
                                onReply={() => {
                                    setReplyTo(c);
                                    document.getElementById('comment_form_anchor')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            />
                        ))}
                    </ul>
                )}
            </div>

            <div className="comment_form section_space_lg pb-0" id="comment_form_anchor">
                <h3 className="details_info_title">
                    {replyTo ? `Responding to ${replyTo.authorName}` : "Share Your Perspective"}
                </h3>
                {replyTo && (
                    <button 
                        onClick={() => setReplyTo(null)}
                        className="mb-3 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                    >
                        <X size={14} /> Cancel Reply
                    </button>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <textarea 
                            className="form-control" 
                            name="comment" 
                            placeholder={status === "authenticated" ? "Your reflection..." : "Please log in to share..."}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isSubmitting || status !== "authenticated"}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting || !content.trim() || status !== "authenticated"}>
                        <span className="btn_text" data-text={isSubmitting ? "Posting..." : (replyTo ? "Post Reply" : "Post Reflection")}>
                            {isSubmitting ? "Posting..." : (replyTo ? "Post Reply" : "Post Reflection")}
                        </span>
                        <span className="btn_icon">
                            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <i className="fa-solid fa-arrow-up-right"></i>}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}

type CommentItemType = Comment & { replies: CommentItemType[] };

function CommentItem({ comment, onReply }: { comment: CommentItemType, onReply: () => void }) {
    return (
        <li className="comment_item">
            <div className="comment_author">
                <div className="author_image">
                    <Image
                        src={getAvatarUrl(comment.authorName, comment.authorImage)}
                        alt={comment.authorName}
                        width={100}
                        height={100}
                    />
                </div>
                <div className="author_content">
                    <h4 className="author_name">{comment.authorName}</h4>
                    <span className="comment_date">{getTimeAgo(comment._creationTime)}</span>
                    <p>
                        {comment.content}
                    </p>
                    <button className="reply_btn" onClick={onReply}>
                        <i className="fa-solid fa-reply"></i> Reply
                    </button>
                </div>
            </div>
            
            {comment.replies.length > 0 && (
                <ul className="comment_list unordered_list_block">
                    {comment.replies.map((reply) => (
                        <li key={reply._id} className="comment_item">
                            <div className="comment_author">
                                <div className="author_image">
                                    <Image
                                        src={getAvatarUrl(reply.authorName, reply.authorImage)}
                                        alt={reply.authorName}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className="author_content">
                                    <h4 className="author_name">{reply.authorName}</h4>
                                    <span className="comment_date">{getTimeAgo(reply._creationTime)}</span>
                                    <p>
                                        {reply.content}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}
