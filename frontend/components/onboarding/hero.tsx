// components/Hero.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimatel from '../cards/AnimatedCardl';

const Hero = () => {
    // State for switching between two different hero designs
    const [designIndex, setDesignIndex] = useState(0);
    const [isGlowing, setIsGlowing] = useState(false);

    // Image pairs for the second design (Heroo)
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

    // Image carousel state for second design
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Switch between designs every 12 seconds
    useEffect(() => {
        const designInterval = setInterval(() => {
            setDesignIndex((prevIndex) => (prevIndex + 1) % 2);
        }, 12000);

        return () => clearInterval(designInterval);
    }, []);

    // Change images every 8 seconds for second design
    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePairs.length);
        }, 8000);

        return () => clearInterval(imageInterval);
    }, []);

    // Glow effect every 4 seconds for second design
    useEffect(() => {
        const glowInterval = setInterval(() => {
            setIsGlowing(true);
            setTimeout(() => setIsGlowing(false), 800);
        }, 4000);

        return () => clearInterval(glowInterval);
    }, []);

    const currentPair = imagePairs[currentImageIndex];

    // First Design (Original Hero) - Images aligned to bottom
    const FirstDesign = () => (
        <div
            className="relative overflow-hidden lg:h-[800px] h-full flex items-center"
            style={{
                backgroundImage: "url('/img/back.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left Content */}
                    <div className="flex-1 text-left">

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-6xl  font-extrabold text-[#111827] leading-[1.1] mb-6 tracking-tight">
                            Learn. Build.
                            <br />
                            Collaborate —
                            <br />
                            <span className="text-[#0D6144]">
                                All in One Platform
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-[#374151] text-lg md:text-xl font-medium max-w-xl mb-10 leading-relaxed opacity-90">
                            More than just courses—experience a platform where
                            learning meets teamwork, progress tracking, and real growth.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link
                                href="/signup"
                                className="bg-[#0D6144] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0A4D36] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center min-w-[180px]"
                            >
                                Get started
                            </Link>
                            <button className="bg-white text-[#0D6144] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 border-2 border-[#D1FAE5] shadow-md hover:shadow-lg hover:-translate-y-0.5 min-w-[180px]">
                                Explore Programs
                            </button>
                        </div>

                    </div>

                    <div className="flex-1 relative flex justify-center lg:justify-end mt-12 lg:mt-0">

                        <div className="relative w-full max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[804px]">

                            {/* Main Image Container */}
                            <div className="absolute z-10">
                                <Image
                                    src="/img/studf.png"
                                    alt="Smiling woman with books"
                                    width={804}
                                    height={944}
                                    className="w-full h-auto drop-shadow-2xl"
                                    priority
                                />
                            </div>
                            {/* Main Image Container */}
                            <div className="relative z-10 -mb-16 md:-mb-24 lg:-mb-32">
                                <img
                                    src="/img/sstud.png"
                                    alt="Smiling woman with books"
                                    className="w-full h-auto drop-shadow-2xl"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );

    // Second Design (Heroo with carousel) - Images centered
    const SecondDesign = () => (
        <div
            className="relative overflow-hidden  lg:h-[800px] h-full hidden  md:flex items-center"
            style={{
                backgroundImage: "url('/img/back.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 bg-black/5"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">

                    {/* Left Content - Text Section */}
                    <div className="flex-1 text-left px-4 sm:px-0">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-[#111827] leading-[1.1] mb-6 tracking-tight">
                            Your Future Starts
                            <br />
                            With What You
                            <br />
                            <span className="text-[#0D6144] relative inline-block">
                                Learn Today
                            </span>
                        </h1>

                        <p className="text-[#374151] text-base md:text-lg lg:text-xl font-medium max-w-xl mb-8 md:mb-10 leading-relaxed">
                            Join thousands of learners gaining in-demand skills, working on real projects,
                            and preparing for opportunities that matter.
                        </p>

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
                    </div>

                    {/* Right Content - Images Section */}
                    <div className="flex-1 relative flex py-8 md:py-0 lg:py-0 px-4 sm:px-6">
                        <div className="relative flex flex-col sm:flex-row gap-6 md:gap-8 lg:gap-10">
                            {/* LEFT CARD - Guy Image */}
                            <div className="relative w-[220px] sm:w-[240px] md:w-[260px] h-[300px] sm:h-[320px] md:h-[350px]">
                                <div className={`relative w-[304px] h-[420px] transition-all duration-500 ${isGlowing ? 'animate-glow' : ''}`}>
                                    <img
                                        src={currentPair.left}
                                        alt={currentPair.leftAlt}
                                        className="w-full h-full object-contain relative z-10 transition-all duration-700 ease-in-out"
                                        loading="eager"
                                    />
                                </div>
                                <div className="absolute -bottom-36 left-1/2 transform -translate-x-1/2 bg-white px-6 md:px-8 lg:px-10 py-2 rounded-full shadow-lg text-center z-20 whitespace-nowrap">
                                    <span className="font-bold text-[#0D6144] text-sm md:text-base">
                                        {currentPair.statsRight}
                                    </span>
                                </div>
                            </div>

                            {/* RIGHT CARD - Girl Image */}
                            <div className="relative w-[220px] sm:w-[240px] md:w-[260px] h-[300px] sm:h-[320px] md:h-[350px] mt-0 sm:mt-8 md:mt-20 lg:mt-32">
                                <div className={`relative w-[304px] h-[420px] transition-all duration-500 ${isGlowing ? 'animate-glow' : ''}`}>
                                    <img
                                        src={currentPair.right}
                                        alt={currentPair.rightAlt}
                                        className="w-full h-full object-contain relative z-10 transition-all duration-700 ease-in-out"
                                        loading="eager"
                                    />
                                </div>
                                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white px-4 md:px-5 lg:px-6 py-2 rounded-full shadow-lg text-center z-20 whitespace-nowrap">
                                    <span className="font-bold text-[#0D6144] text-xs sm:text-sm md:text-base">
                                        {currentPair.statsLeft}
                                    </span>
                                </div>
                            </div>

                            {/* Carousel Indicator Dots */}
                            <div className="absolute hidden -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 mt-4">
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
        </div>
    );

    return (
        <>
            {designIndex === 0 ? <FirstDesign /> : <SecondDesign />}

            {/* Shared Decorative Elements */}
            <div className="fixed bottom-0 left-0 w-32 h-32 bg-[#0D6144]/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
            <div className="fixed top-20 right-0 w-40 h-40 bg-[#0D6144]/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>

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
                img {
                    transition: opacity 0.5s ease-in-out, transform 0.3s ease;
                }
                img:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </>
    );
};

export default Hero;