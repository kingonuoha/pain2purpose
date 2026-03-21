"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface DynamicCategoryProps {
    categoryName: string;
    categoryId?: Id<"categories">;
    coverImage?: string;
    pexelsImages?: string[];
    alt: string;
    className?: string;
}

export function DynamicCategoryImage({ 
    categoryName, 
    categoryId, 
    coverImage,
    pexelsImages, 
    alt, 
    className 
}: DynamicCategoryProps) {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const updateCategory = useMutation(api.categories.update);

    // Pick a random image from the list if available, but keep it stable for this mount
    // Priority: 1. coverImage (Selected by Admin) 2. item from pexelsImages 3. New fetch
    const stableRandomImage = useMemo(() => {
        if (coverImage) return coverImage;
        if (pexelsImages && pexelsImages.length > 0) {
            const randomIndex = Math.floor(Math.random() * pexelsImages.length);
            return pexelsImages[randomIndex];
        }
        return null;
    }, [coverImage, pexelsImages]);

    useEffect(() => {
        async function loadImage() {
            if (stableRandomImage) {
                setImageUrl(stableRandomImage);
                setIsLoading(false);
                return;
            }

            try {
                const { fetchCategoryImages } = await import("@/app/actions/pexels");
                const urls = await fetchCategoryImages(categoryName);
                
                if (urls && urls.length > 0) {
                    setImageUrl(urls[0]);
                    
                    // Save to DB if we have categoryId
                    if (categoryId) {
                        try {
                            await updateCategory({
                                id: categoryId,
                                pexelsImages: urls
                            });
                        } catch (err) {
                            console.error("Failed to save pexels images to DB", err);
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to load pexels image", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadImage();
    }, [categoryName, categoryId, stableRandomImage, updateCategory]);

    return (
        <div className={cn("relative w-full h-full overflow-hidden bg-zinc-100", className)}>
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    className={cn(
                        "object-cover transition-opacity duration-1000",
                        isLoading ? "opacity-0" : "opacity-100"
                    )}
                />
            )}
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/20" />
        </div>
    );
}
