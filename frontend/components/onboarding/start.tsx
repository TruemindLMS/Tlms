// components/Hero.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimatel from '../cards/AnimatedCardl';

const Start = () => {
    const [activeImage, setActiveImage] = useState('/img/des.png');

    const handleImageChange = (imagePath: string) => {
        setActiveImage(imagePath);
    };

    return (
        <div className="relative bg-white overflow-hidden min-h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full">
                <div className="flex flex-col lg:flex-col items-center">
                    <div className="flex-1 relative flex order-2 justify-center lg:justify-end mt-12 lg:mt-0">
                        <div className="relative">
                            {/* Main Image Container */}
                            <ScrollAnimatel delay={380} direction="down">
                                <div className="relative z-10 -mb-16 md:-mb-24 lg:-mb-32">
                                    <img
                                        src={activeImage}
                                        alt="Platform preview"
                                        className="w-full h-auto drop-shadow-2xl transition-all duration-500 ease-in-out"
                                        style={{
                                            animation: activeImage !== '/img/des.png' ? 'fadeIn 0.5s ease-in-out' : 'none'
                                        }}
                                    />
                                </div>
                            </ScrollAnimatel>
                        </div>
                    </div>

                    {/* Left Content */}
                    <div className="flex-1 text-center">
                        <ScrollAnimatel delay={150} direction="down">  <h1 className='text-center font-semibold text-primary-500'>PRODUCT PREVIEW</h1> </ScrollAnimatel>
                        {/* Main Heading */}
                        <ScrollAnimatel delay={200} direction="up">   <h1 className="text-5xl md:text-5xl order-1 font-bold text-[#111827] text-center mb-6 leading-[1.1] tracking-tight">
                            Education At a Glance
                            <br />
                        </h1> </ScrollAnimatel>

                        {/* Description - Updates based on active image */}
                        <ScrollAnimatel delay={250} direction="up">
                            <p className="text-[#374151] text-lg md:text-xl font-medium mb-6 text-center">
                                {activeImage === '/img/des.png' && "A clean, modern interface designed for focus and productivity."}
                                {activeImage === '/img/des2.png' && "Explore our comprehensive course catalog with interactive learning materials."}
                                {activeImage === '/img/des3.png' && "Track your progress with detailed analytics and achievement milestones."}
                            </p>
                        </ScrollAnimatel>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
                            <ScrollAnimatel delay={300} direction="left">
                                <button
                                    onClick={() => handleImageChange('/img/des.png')}
                                    className={`bg-[#0D6144] text-white px-10 py-2 rounded-full font-semibold text-md transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center min-w-[180px] ${activeImage === '/img/des.png' ? 'ring-2 ring-offset-2 ring-[#0D6144]' : ''
                                        }`}
                                >
                                    Dashboard
                                </button>
                            </ScrollAnimatel>

                            <ScrollAnimatel delay={330} direction="down">
                                <button
                                    onClick={() => handleImageChange('/img/des2.png')}
                                    className={`bg-white border border-primary-500 text-black px-10 py-2 rounded-full font-semibold text-md transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center min-w-[180px] ${activeImage === '/img/des2.png' ? 'ring-2 ring-offset-2 ring-primary-500' : ''
                                        }`}
                                >
                                    Course page
                                </button>
                            </ScrollAnimatel>

                            <ScrollAnimatel delay={360} direction="right">
                                <button
                                    onClick={() => handleImageChange('/img/des3.png')}
                                    className={`bg-white border border-primary-500 text-black px-10 py-2 rounded-full font-semibold text-md transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center min-w-[180px] ${activeImage === '/img/des3.png' ? 'ring-2 ring-offset-2 ring-primary-500' : ''
                                        }`}
                                >
                                    Progress Tracking
                                </button>
                            </ScrollAnimatel>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
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
                .animate-pulse {
                    animation: pulse 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Start;