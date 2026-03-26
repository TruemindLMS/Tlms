import React from 'react';
import Link from 'next/link';

export default function Courses() {
    const categories = [
        {
            id: 1,
            title: "Language",
            description: "There are many variations of passages of Lorem ipsum.",
            icon: "🌍",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            id: 2,
            title: "Graphic Design",
            description: "There are many variations of passages of Lorem ipsum.",
            icon: "🎨",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            id: 3,
            title: "Content Writing",
            description: "There are many variations of passages of Lorem ipsum.",
            icon: "✍️",
            bgColor: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            id: 4,
            title: "Finance",
            description: "There are many variations of passages of Lorem ipsum.",
            icon: "💰",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600"
        }
    ];

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 relative min-h-screen py-16">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-40 -left-20 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute bottom-40 -right-20 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
            </div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #059669 6px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-sm uppercase tracking-wider text-primary-500 font-semibold mb-2">
                        Course Categories
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Explore our Course Categories
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        For everyone of you, we offer a variety of distinctive benefits.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                        >
                            <div className={`${category.bgColor} p-6 text-center`}>
                                <div className={`text-5xl mb-4 ${category.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {category.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {category.description}
                                </p>
                            </div>
                            <div className="p-4 text-center">
                                <Link
                                    href="/"
                                    className="text-primary-500 font-semibold hover:text-primary-600 transition-colors inline-flex items-center gap-1"
                                >
                                    Explore Courses
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Courses Section */}
                <div className="mt-16 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
                    >
                        View All Courses
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
            {/* Custom Animations */}
            <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
        </div>
    );
}