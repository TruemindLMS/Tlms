'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Award,
    Video,
    Clock,
    Chart,
    Mobile,
    Security,
    UserTick,
    DocumentCode,
    ArrowRight,
    PlayCircle,
    MedalStar,
    Teacher,
    ClipboardText,
    Monitor,
    Global,
    Card
} from 'iconsax-react';

const Feat = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            id: 0,
            icon: <Mobile size={32} color="#10B981" variant="Bold" />,
            title: "Interactive Learning",
            description: "Engage with multimedia content, quizzes, and hands-on projects that make learning fun and effective.",
            color: "from-emerald-500 to-emerald-600"
        },
        {
            id: 1,
            icon: <Video size={32} color="#3B82F6" variant="Bold" />,
            title: "HD Video Lectures",
            description: "Crystal clear video lessons from industry experts, available on any device, anytime, anywhere.",
            color: "from-blue-500 to-blue-600"
        },
        {
            id: 2,
            icon: <Mobile size={32} color="#8B5CF6" variant="Bold" />,
            title: "Expert Instructors",
            description: "Learn from top professionals and industry leaders who bring real-world experience to the classroom.",
            color: "from-purple-500 to-purple-600"
        },
        {
            id: 3,
            icon: <Award size={32} color="#F59E0B" variant="Bold" />,
            title: "Verified Certificates",
            description: "Earn recognized certificates upon course completion to showcase your skills and advance your career.",
            color: "from-amber-500 to-amber-600"
        },
        {
            id: 4,
            icon: <Clock size={32} color="#EC489A" variant="Bold" />,
            title: "Self-Paced Learning",
            description: "Learn at your own pace with lifetime access to course materials and flexible scheduling.",
            color: "from-pink-500 to-pink-600"
        },
        {
            id: 5,
            icon: <Chart size={32} color="#06B6D4" variant="Bold" />,
            title: "Progress Tracking",
            description: "Monitor your learning journey with detailed analytics and personalized recommendations.",
            color: "from-cyan-500 to-cyan-600"
        }
    ];

    const stats = [
        { value: "100+", label: "Active Students", icon: <Mobile size={20} color="#10B981" /> },
        { value: "1500+", label: "Courses", icon: <Mobile size={20} color="#3B82F6" /> },
        { value: "100+", label: "Expert Instructors", icon: <Teacher size={20} color="#8B5CF6" /> },
        { value: "100+", label: "Countries", icon: <Global size={20} color="#F59E0B" /> },
    ];

    const featuredCourses = [
        {
            id: 0,
            icon: <Mobile size={32} color="#10B981" variant="Bold" />,
            title: "Learn Faster",
            description: "Structured content and clear paths help you absorb knowledge more efficiently.",
            color: "from-[#20553B33] to-[#3A785933]"
        },
        {
            id: 1,
            icon: <Video size={32} color="#3B82F6" variant="Bold" />,
            title: "Stay Organized",
            description: "Everything in one place — courses, assignments, deadlines, and resources.",
            color: "from-[#20553B33] to-[#3A785933]"
        },
        {
            id: 2,
            icon: <Mobile size={32} color="#8B5CF6" variant="Bold" />,
            title: "Collaborate Easily  ",
            description: "Work with peers and mentors seamlessly through built-in collaboration tools.",
            color: "from-[#F59F0A33] to-[#20553B33]"
        },
        {
            id: 3,
            icon: <Award size={32} color="#F59E0B" variant="Bold" />,
            title: "Track Growth",
            description: "Visual progress tracking shows exactly how far you've come and what's next.",
            color: "from-[#F59F0A33] to-[#20553B33]"
        },
    ];

    const featuredWork = [
        {
            id: 0,
            icon: <Mobile size={32} color="#10B981" variant="Bold" />,
            title: "Sign Up",
            description: "Create your free account in seconds",

        },
        {
            id: 1,
            icon: <Video size={32} color="#3B82F6" variant="Bold" />,
            title: "Access Dashboard",
            description: "Get your personalized learning hub",
        },
        {
            id: 2,
            icon: <Mobile size={32} color="#8B5CF6" variant="Bold" />,
            title: "Browse Course ",
            description: "Discover courses matched to your goals",
        },
        {
            id: 3,
            icon: <Award size={32} color="#F59E0B" variant="Bold" />,
            title: "Start Learning",
            description: "Dive into structured, hands-on content.",
        },
        {
            id: 4,
            icon: <Clock size={32} color="#EC489A" variant="Bold" />,
            title: "Submit Assignments",
            description: "Complete tasks and get real feedback",
        },
        {
            id: 5,
            icon: <Chart size={32} color="#06B6D4" variant="Bold" />,
            title: "Track Progress",
            description: "Watch your skills grow over time",
        }
    ];

    return (
        <section ref={sectionRef} className="relative bg-white to-gray-50 py-20 overflow-hidden">

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-40 -left-20 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute bottom-40 -right-20 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #059669 5px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
                        <span className="text-sm font-semibold text-primary-700 tracking-wider">
                            FEATURES
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        <span className="bg-gradient-to-r from-emerald-600 to-primary-600 bg-clip-text text-transparent">
                            Everything You Need to Learn & Grow
                        </span>
                        <br />
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Powerful tools designed for modern learners, instructors, and administrators.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-46">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${activeFeature === feature.id ? 'ring-2 ring-emerald-500' : ''
                                }`}
                            onMouseEnter={() => setActiveFeature(feature.id)}
                        >
                            {/* Animated Border */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>

                            <div className="relative">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600  leading-relaxed">{feature.description}</p>
                                <div className="flex items-center justify-between">
                                    <ArrowRight size={18} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mb-20'>
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
                            <span className="text-sm font-semibold text-primary-700 tracking-wider">
                                HOW IT WORKS
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            <span className="text-black">
                                From Sign Up to Success in 6 Steps
                            </span>
                            <br />
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Getting started is simple. Here's your path to structured learning.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-46">
                        {featuredWork.map((work, index) => (
                            <div
                                key={index}
                                className={`group relative  rounded-2xl p-8 shadow-sm hover:shadow-sm items-center transition-all duration-500 hover:-translate-y-2 cursor-pointer ${activeFeature === work.id ? 'ring-2 ring-white' : ''
                                    }`}
                                onMouseEnter={() => setActiveFeature(work.id)}
                            >

                                <div className="relative flex flex-col text-center justify-center">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r bg-opacity-10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                        {work.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{work.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{work.description}</p>
                                    <div className="flex items-center justify-between">
                                        <ArrowRight size={18} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Featured Courses Section */}
                <div className="mb-20">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
                            <span className="text-sm font-semibold text-primary-700 tracking-wider">
                                BENEFITS
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            <span className="bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">
                                Why Learners Love TalentFlow
                            </span>
                            <br />
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Real outcomes for real learners. Here's what you gain.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 md:mb-46">
                        {featuredCourses.map((course, index) => (
                            <div
                                key={index}
                                className={`group relative  rounded-2xl p-8 shadow-lg hover:shadow-2xl bg-gradient-to-r ${course.color} items-center transition-all duration-500 hover:-translate-y-2 cursor-pointer ${activeFeature === course.id ? 'ring-2 ring-white' : ''
                                    }`}
                                onMouseEnter={() => setActiveFeature(course.id)}
                            >

                                <div className="relative flex flex-col  justify-center">
                                    <div className={`w-10 h-10 rounded-xl  flex items-center justify-center mb-6  group-hover:scale-110 transition-transform duration-300`}>
                                        {course.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{course.description}</p>
                                    <div className="flex items-center justify-between">
                                        <ArrowRight size={18} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
        </section>
    );
};

export default Feat;