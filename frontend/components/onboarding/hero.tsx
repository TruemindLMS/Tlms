
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* 30 Days Free Trial Badge */}
                        <div className="inline-block bg-primary-200 text-primary-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                            30 Days free trial
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-1xl font-bold text-gray-900 leading-tight mb-6">
                            Build Your Skills on{' '}
                            <span className="text-primary">the Best Platform</span>
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8">
                            Find Unlimited Courses That Match Your Niche to Hasten the Process
                            of Developing Your Skills
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/"
                                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl text-center"
                            >
                                Get Started
                            </Link>
                            <button className="flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors border border-gray-200 shadow-md">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653z"
                                    />
                                </svg>
                                Video Play...
                            </button>
                        </div>

                        {/* Active Students Counter */}
                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-primary-200 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <span className="text-gray-700 font-semibold">
                                100+ Active Students
                            </span>
                        </div>
                    </div>

                    {/* Right Content - Illustration */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md">
                            <div className="absolute -top-2 -left-2 w-24 h-24 bg-primary rounded-full opacity-50 blur-2xl"></div>
                            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary rounded-full opacity-50 blur-2xl"></div>
                            <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-primary p-1">
                                <div className="bg-white rounded-xl p-1">
                                    <Image
                                        src="/img/student.jpg"
                                        alt="Learning Illustration"
                                        width={500}
                                        height={400}
                                        className="w-full h-auto rounded-2xl"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;