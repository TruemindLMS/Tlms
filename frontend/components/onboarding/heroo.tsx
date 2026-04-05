// components/Hero.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimatel from '../cards/AnimatedCardl';

const Heroo = () => {
    // Image carousel state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isGlowing, setIsGlowing] = useState(false);

    // Image pairs that change together
    const imagePairs = [
        {
            left: '/img/guy.png',
            right: '/img/girl.png',
            leftAlt: 'Male student learning',
            rightAlt: 'Female student with books',
            statsLeft: '5.8k Success Stories',
            statsRight: '10k+ Student'
        },
        {
            left: '/img/guyy.png',
            right: '/img/girll.png',
            leftAlt: 'Male student with books',
            rightAlt: 'Female student studying',
            statsLeft: '4.2k+ Graduates',
            statsRight: '15k+ Enrolled'
        }
    ];

    // Change images every 5 seconds (switching between the two pairs)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePairs.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Glow effect every 2 seconds
    useEffect(() => {
        const glowInterval = setInterval(() => {
            setIsGlowing(true);
            setTimeout(() => setIsGlowing(false), 800); // Glow lasts 800ms
        }, 2000);

        return () => clearInterval(glowInterval);
    }, []);

    const currentPair = imagePairs[currentImageIndex];

    return (
        <div
            className="relative overflow-hidden min-h-screen flex items-center"
            style={{
                backgroundImage: "url('/img/back.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/5"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">

                    {/* Left Content - Text Section */}
                    <div className="flex-1 text-left px-4 sm:px-0">
                        <ScrollAnimatel delay={150} direction="down">
                            {/* Main Heading */}
                            <h1 className="text-5xl md:text-6xl  font-extrabold text-[#111827] leading-[1.1] mb-6 tracking-tight">
                                Your Future Starts
                                <br />
                                With What You
                                <br />
                                <span className="text-[#0D6144] relative inline-block">
                                    Learn Today
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-[#374151] text-base md:text-lg lg:text-xl font-medium max-w-xl mb-8 md:mb-10 leading-relaxed">
                                Join thousands of learners gaining in-demand skills, working on real projects,
                                and preparing for opportunities that matter.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                                <Link
                                    href="/signup"
                                    className="group bg-[#0D6144] text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#0A4D36] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center min-w-[150px] md:min-w-[160px] lg:min-w-[180px] flex items-center justify-center gap-2"
                                >
                                    Get started
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                                <Link
                                    href="/courses"
                                    className="bg-white text-[#0D6144] px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-gray-50 transition-all duration-300 border-2 border-[#0D6144]/20 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-center min-w-[150px] md:min-w-[160px] lg:min-w-[180px]"
                                >
                                    Explore Programs
                                </Link>
                            </div>
                        </ScrollAnimatel>
                    </div>

                    {/* Right Content - Images Section */}
                    <div className="flex-1 relative flex items-center justify-center py-8 md:py-12 lg:py-16 px-4 sm:px-6">
                        {/* Wrapper */}
                        <div className="relative flex flex-col sm:flex-row gap-6 md:gap-8 lg:gap-10 items-center justify-center">

                            {/* LEFT CARD - Guy Image */}
                            <div className="relative w-[220px] sm:w-[240px] md:w-[260px] h-[300px] sm:h-[320px] md:h-[350px]">
                                {/* Image with glow effect */}
                                <div className={`relative w-full h-full transition-all duration-500 ${isGlowing ? 'animate-glow' : ''}`}>
                                    <img
                                        src={currentPair.left}
                                        alt={currentPair.leftAlt}
                                        className="w-full h-full object-contain relative z-10 transition-all duration-700 ease-in-out"
                                        loading="eager"
                                    />
                                </div>

                                {/* Bottom badge */}
                                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white px-6 md:px-8 lg:px-10 py-2 rounded-full shadow-lg text-center z-20 whitespace-nowrap">
                                    <span className="font-bold text-[#0D6144] text-sm md:text-base">
                                        {currentPair.statsRight}
                                    </span>
                                </div>
                            </div>

                            {/* RIGHT CARD - Girl Image */}
                            <div className="relative w-[220px] sm:w-[240px] md:w-[260px] h-[300px] sm:h-[320px] md:h-[350px] mt-0 sm:mt-8 md:mt-10 lg:mt-12">
                                {/* Image with glow effect */}
                                <div className={`relative w-full h-full transition-all duration-500 ${isGlowing ? 'animate-glow' : ''}`}>
                                    <img
                                        src={currentPair.right}
                                        alt={currentPair.rightAlt}
                                        className="w-full h-full object-contain relative z-10 transition-all duration-700 ease-in-out"
                                        loading="eager"
                                    />
                                </div>

                                {/* Top badge */}
                                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white px-4 md:px-5 lg:px-6 py-2 rounded-full shadow-lg text-center z-20 whitespace-nowrap">
                                    <span className="font-bold text-[#0D6144]  text-xs sm:text-sm md:text-base">
                                        {currentPair.statsLeft}
                                    </span>
                                </div>
                            </div>

                            {/* Carousel Indicator Dots - Only 2 dots since we have 2 pairs */}
                            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 mt-4">
                                {imagePairs.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`transition-all duration-300 rounded-full ${currentImageIndex === idx
                                            ? 'w-6 md:w-8 h-1.5 md:h-2 bg-[#0D6144]'
                                            : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        aria-label={`View slide ${idx + 1}`}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0D6144]/5 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute top-20 right-0 w-40 h-40 bg-[#0D6144]/10 rounded-full blur-3xl animate-pulse-slow"></div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.2; transform: scale(1.05); }
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes glow {
                    0% {
                        filter: drop-shadow(0 0 0px rgba(13, 97, 68, 0));
                        transform: scale(1);
                    }
                    25% {
                        filter: drop-shadow(0 0 15px rgba(13, 97, 68, 0.6));
                        transform: scale(1.02);
                    }
                    50% {
                        filter: drop-shadow(0 0 25px rgba(13, 97, 68, 0.8));
                        transform: scale(1.03);
                    }
                    75% {
                        filter: drop-shadow(0 0 15px rgba(13, 97, 68, 0.6));
                        transform: scale(1.02);
                    }
                    100% {
                        filter: drop-shadow(0 0 0px rgba(13, 97, 68, 0));
                        transform: scale(1);
                    }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse 6s ease-in-out infinite;
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in-out;
                }
                .animate-glow {
                    animation: glow 0.8s ease-in-out;
                }
                /* Image transition styles */
                img {
                    transition: opacity 0.5s ease-in-out, transform 0.3s ease;
                }
                img:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default Heroo;