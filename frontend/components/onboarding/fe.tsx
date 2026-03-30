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

const Fea = () => {
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
            stats: "100+ Interactive Courses",
            color: "from-emerald-500 to-emerald-600"
        },
        {
            id: 1,
            icon: <Video size={32} color="#3B82F6" variant="Bold" />,
            title: "HD Video Lectures",
            description: "Crystal clear video lessons from industry experts, available on any device, anytime, anywhere.",
            stats: "100+ Video Lessons",
            color: "from-blue-500 to-blue-600"
        },
        {
            id: 2,
            icon: <Mobile size={32} color="#8B5CF6" variant="Bold" />,
            title: "Expert Instructors",
            description: "Learn from top professionals and industry leaders who bring real-world experience to the classroom.",
            stats: "100+ Expert Instructors",
            color: "from-purple-500 to-purple-600"
        },
        {
            id: 3,
            icon: <Award size={32} color="#F59E0B" variant="Bold" />,
            title: "Verified Certificates",
            description: "Earn recognized certificates upon course completion to showcase your skills and advance your career.",
            stats: "100+ Certificates Issued",
            color: "from-amber-500 to-amber-600"
        },
        {
            id: 4,
            icon: <Clock size={32} color="#EC489A" variant="Bold" />,
            title: "Self-Paced Learning",
            description: "Learn at your own pace with lifetime access to course materials and flexible scheduling.",
            stats: "Learn Anytime, Anywhere",
            color: "from-pink-500 to-pink-600"
        },
        {
            id: 5,
            icon: <Chart size={32} color="#06B6D4" variant="Bold" />,
            title: "Progress Tracking",
            description: "Monitor your learning journey with detailed analytics and personalized recommendations.",
            stats: "Track Your Growth",
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
            title: "Complete Web Development Bootcamp",
            students: "100",
            rating: "4.8",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
            category: "Development"
        },
        {
            title: "UI/UX Design Masterclass",
            students: "100",
            rating: "4.9",
            image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&h=300&fit=crop",
            category: "Design"
        },
        {
            title: "Data Science & Machine Learning",
            students: "100",
            rating: "4.7",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
            category: "Data Science"
        },
    ];

    return (
        <section ref={sectionRef} className="relative bg-gradient-to-b from-white to-gray-50 py-20 overflow-hidden">

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
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
                        <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-primary-700 tracking-wider">
                            WHY CHOOSE US
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        <span className="bg-gradient-to-r from-emerald-600 to-primary-600 bg-clip-text text-transparent">
                            Transform Your Learning
                        </span>
                        <br />
                        Experience with Our Platform
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join thousands of students who have accelerated their careers with our cutting-edge learning platform.
                    </p>
                </div>

                {/* Stats Counter Section */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                        {feature.stats}
                                    </span>
                                    <ArrowRight size={18} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Featured Courses Section */}
                <div className="mb-20">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <div className="text-center md:text-left">
                            <span className="text-sm font-semibold text-emerald-600  tracking-wider uppercase">Popular Courses</span>
                            <h3 className="text-3xl font-bold text-gray-900 mt-2">Featured Courses</h3>
                        </div>
                        <Link href="/" className="flex items-center text-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold group">
                            View All Courses
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredCourses.map((course, index) => (
                            <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                        {course.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">★</span>
                                            <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
                                        </div>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-sm text-gray-500">{course.students} students</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                        {course.title}
                                    </h4>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <Clock size={14} />
                                            <span className="text-sm">30 hours</span>
                                        </div>
                                        <Link href="/" className="text-emerald-600 font-semibold text-sm flex items-center gap-1 group/link">
                                            Enroll Now
                                            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative bg-gradient-to-r from-emerald-600 to-primary-600 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative p-12 md:p-16 text-center">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Start Your Learning Journey?
                        </h3>
                        <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of students already learning on our platform. Get started today and transform your career.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group">
                                Get Started Free
                                <ArrowRight color='#1A6B3C' size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
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

export default Fea;