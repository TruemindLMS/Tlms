
import React from 'react';
import Link from 'next/link';

export default function BlogPage() {
    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="text-primary-600">Blog</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Insights, tips, and stories from the world of education and technology
                    </p>
                </div>

                {/* Featured Post */}
                <div className="mb-16 bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="h-64 md:h-auto bg-primary-400"></div>
                        <div className="p-8">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <span>Featured</span>
                                <span>•</span>
                                <span>March 15, 2024</span>
                                <span>•</span>
                                <span>5 min read</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                The Future of Online Learning: Trends to Watch in 2024
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Discover how AI, virtual reality, and personalized learning are transforming
                                education and creating new opportunities for students worldwide.
                            </p>
                            <Link
                                href="/blog"
                                className="text-primary-600 font-semibold hover:text-primary-700"
                            >
                                Read More →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <article key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-primary-400"></div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/blog`}
                                        className="text-primary-600 font-semibold hover:text-primary-700"
                                    >
                                        Read More →
                                    </Link>
                                    <span className="text-sm text-gray-500">{post.category}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

const blogPosts = [
    {
        title: "10 Tips for Successful Online Learning",
        excerpt: "Learn how to stay motivated and make the most of your online education experience.",
        date: "March 10, 2024",
        readTime: "4 min read",
        category: "Learning Tips",
        slug: "tips-for-successful-online-learning"
    },
    {
        title: "Top 5 Programming Languages to Learn in 2024",
        excerpt: "Discover which programming languages are in high demand and why you should learn them.",
        date: "March 5, 2024",
        readTime: "6 min read",
        category: "Programming",
        slug: "top-programming-languages-2024"
    },
    {
        title: "How to Build a Strong Portfolio",
        excerpt: "Expert advice on creating a portfolio that stands out to potential employers.",
        date: "February 28, 2024",
        readTime: "5 min read",
        category: "Career Advice",
        slug: "build-strong-portfolio"
    }
];