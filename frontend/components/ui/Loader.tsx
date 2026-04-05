'use client';

import { Loader2 } from 'lucide-react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
    text?: string;
}

const sizeMap = {
    sm: 24,
    md: 40,
    lg: 56
};

export default function Loader({ size = 'md', fullScreen = false, text = 'Loading...' }: LoaderProps) {
    const spinnerSize = sizeMap[size];

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 size={spinnerSize} className="animate-spin text-primary-600 mx-auto mb-4" />
                    <p className="text-gray-500">{text}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
                <Loader2 size={spinnerSize} className="animate-spin text-primary-600 mx-auto mb-4" />
                <p className="text-gray-500">{text}</p>
            </div>
        </div>
    );
}