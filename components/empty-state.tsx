"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface EmptyStateProps {
    title: string;
    description: string;
    illustration?: string;
    action?: React.ReactNode;
}

export function EmptyState({ 
    title, 
    description, 
    illustration = "Nothing-here.svg",
    action 
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-64 h-64 mb-8"
            >
                <Image
                    src={`/illustrations/${illustration}`}
                    alt={title}
                    fill
                    className="object-contain opacity-80"
                />
            </motion.div>
            
            <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4"
            >
                {title}
            </motion.h3>
            
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 dark:text-gray-400 max-w-md mb-8"
            >
                {description}
            </motion.p>
            
            {action && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {action}
                </motion.div>
            )}
        </div>
    );
}


