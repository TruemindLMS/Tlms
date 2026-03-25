
import React from 'react';
import Image from 'next/image';

export default function About() {
    const features = [
        {
            id: 1,
            title: "Unique Support System",
            description: "Get personalized support from our dedicated team",
            icon: "🎯",
            checked: true
        },
        {
            id: 2,
            title: "Life Time Support",
            description: "Access support resources even after course completion",
            icon: "⭐",
            checked: true
        },
        {
            id: 3,
            title: "Get Certificate",
            description: "Earn recognized certificates upon completion",
            icon: "📜",
            checked: true
        },
        {
            id: 4,
            title: "Amazing Instructor",
            description: "Learn from industry experts and professionals",
            icon: "👨‍🏫",
            checked: true
        }
    ];

    return (
        <div className="bg-white">
            {/* About Us Hero Section */}
            <div className="bg-gradient-to-br from-primary-50 via-white to-green-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-sm uppercase tracking-wider text-primary-500 font-semibold mb-2">
                            About Us
                        </h2>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Educate The populace to <span className="text-primary-500">advance the nation</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                            This can be accomplished by highlighting any awards or recognitions that the company has received,
                            as well as any partnerships or collaborations that it has formed with other industry leaders.
                            This information can help potential customers feel more confident in the LMS and its ability to meet their needs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Image */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-10"></div>
                            <Image
                                src="/img/mission.jpg"
                                alt="Students learning"
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-200 rounded-full opacity-50 blur-2xl"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-200 rounded-full opacity-50 blur-2xl"></div>
                    </div>

                    {/* Right Side - Features */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Why Choose <span className="text-primary-500">LMS?</span>
                        </h2>
                        <p className="text-gray-600 mb-8">
                            We provide a comprehensive learning experience with features designed to help you succeed.
                        </p>

                        <div className="space-y-4">
                            {features.map((feature) => (
                                <div
                                    key={feature.id}
                                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                                            <span className="text-xl">{feature.icon}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {feature.title}
                                            </h3>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-5 h-5 text-primary-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="mt-8">
                            <button className="bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl">
                                Learn More About Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-primary-500 py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
                            <div className="text-primary-100">Active Students</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                            <div className="text-primary-100">Expert Instructors</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">1,000+</div>
                            <div className="text-primary-100">Courses</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                            <div className="text-primary-100">Countries</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}