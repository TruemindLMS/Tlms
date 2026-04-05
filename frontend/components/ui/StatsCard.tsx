'use client';

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon | ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
        label?: string;
    };
    color?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'yellow';
    variant?: 'default' | 'compact' | 'gradient';
    onClick?: () => void;
}

const colorMap = {
    blue: {
        bg: 'bg-blue-50',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        trendBg: 'bg-blue-100',
        trendText: 'text-blue-600'
    },
    green: {
        bg: 'bg-green-50',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        trendBg: 'bg-green-100',
        trendText: 'text-green-600'
    },
    orange: {
        bg: 'bg-orange-50',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        trendBg: 'bg-orange-100',
        trendText: 'text-orange-600'
    },
    purple: {
        bg: 'bg-purple-50',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        trendBg: 'bg-purple-100',
        trendText: 'text-purple-600'
    },
    red: {
        bg: 'bg-red-50',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        trendBg: 'bg-red-100',
        trendText: 'text-red-600'
    },
    yellow: {
        bg: 'bg-yellow-50',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        trendBg: 'bg-yellow-100',
        trendText: 'text-yellow-600'
    }
};

export default function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    color = 'blue',
    variant = 'default',
    onClick
}: StatsCardProps) {
    const colors = colorMap[color];

    const renderIcon = () => {
        if (typeof Icon === 'function') {
            return <Icon size={20} className={colors.iconColor} />;
        }
        return Icon;
    };

    if (variant === 'compact') {
        return (
            <div
                onClick={onClick}
                className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${onClick ? 'cursor-pointer hover:shadow-md transition-all' : ''}`}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                        <p className="text-xs text-gray-500 mt-1">{title}</p>
                    </div>
                    <div className={`w-10 h-10 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                        {renderIcon()}
                    </div>
                </div>
                {trend && (
                    <div className="flex items-center gap-1 mt-3">
                        <span className={`text-xs ${trend.isPositive ? 'text-primary-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '+' : ''}{trend.value}%
                        </span>
                        {trend.label && <span className="text-xs text-gray-400">{trend.label}</span>}
                    </div>
                )}
            </div>
        );
    }

    if (variant === 'gradient') {
        return (
            <div
                onClick={onClick}
                className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-5 ${onClick ? 'cursor-pointer hover:shadow-lg transition-all' : ''}`}
            >
                <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                        {renderIcon()}
                    </div>
                    {trend && (
                        <span className={`text-xs ${trend.isPositive ? 'text-primary-600' : 'text-red-600'} bg-white px-2 py-1 rounded-full`}>
                            {trend.isPositive ? '+' : ''}{trend.value}%
                        </span>
                    )}
                </div>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-600 mt-1">{title}</p>
                {trend?.label && <p className="text-xs text-gray-400 mt-2">{trend.label}</p>}
            </div>
        );
    }

    // Default variant
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 ${onClick ? 'cursor-pointer hover:shadow-md transition-all' : ''}`}
        >
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                    {renderIcon()}
                </div>
                {trend && (
                    <span className={`text-xs font-medium ${trend.isPositive ? 'text-primary-600 bg-green-50' : 'text-red-600 bg-red-50'} px-2 py-1 rounded-full`}>
                        {trend.isPositive ? '+' : ''}{trend.value}%
                    </span>
                )}
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{title}</p>
            {trend?.label && <p className="text-xs text-gray-400 mt-2">{trend.label}</p>}
        </div>
    );
}