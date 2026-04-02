// components/Hero.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimatel from '../cards/AnimatedCardl';

const Hero = () => {
    return (
        <div
            className="relative overflow-hidden min-h-full flex items-center"
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
                        <ScrollAnimatel delay={150} direction="down">
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
                        </ScrollAnimatel>
                    </div>

                    <div className="flex-1 relative flex justify-center lg:justify-end mt-12 lg:mt-0">

                        <div className="relative w-full max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[804px]">
                            <ScrollAnimatel delay={200} direction="up">
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
                            </ScrollAnimatel>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                h1 {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.15;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.3;
                        transform: scale(1.05);
                    }
                }
                .animate-pulse {
                    animation: pulse 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Hero;