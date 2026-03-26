// components/Hero.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Start = () => {
    return (
        <div className=" relative  bg-[linear-gradient(to_bottom,#E5E6FF_0%,#FFE3B2_35%,#FFE5FE_65%,#FFCEB3_100%)] overflow-hidden min-h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center  ">
                    <div className="flex-1 relative flex order-2 md:order-1 justify-center lg:justify-end mt-12 lg:mt-0">
                        <div className="relative  ">

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

                    {/* Left Content */}
                    <div className="flex-1 text-left order-1 md:order-2">
                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-6xl  font-bold text-[#111827] text-center leading-[1.1] mb-6 tracking-tight">
                            Learn. Collaborate.
                            <br />
                            <span className="text-primary">
                                Succeed
                            </span>

                        </h1>

                        {/* Description */}
                        <p className="text-[#374151] text-lg md:text-xl font-medium max-w-xl text-center mb-10 leading-relaxed opacity-90">
                            More than just courses—experience a platform where learning meets teamwork, progress tracking, and real growth.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link
                                href="/"
                                className="bg-[#0D6144] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0A4D36] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center min-w-[180px]"
                            >
                                Get started
                            </Link>

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

export default Start;