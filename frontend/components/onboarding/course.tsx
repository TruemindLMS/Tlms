'use client'
import React, { useState, useEffect, useRef } from 'react';
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

import { CheckCircle, Circle, TrendingUp, Users, BookOpen } from 'lucide-react';

interface Milestone {
    id: number;
    title: string;
    completed: boolean;
}


export default function Courses() {
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

    const milestones: Milestone[] = [
        { id: 1, title: 'Complete onboarding', completed: true },
        { id: 2, title: 'Finish React Fundamentals', completed: true },
        { id: 3, title: 'Submit first project', completed: true },
        { id: 4, title: 'Complete advanced module', completed: false },
        { id: 5, title: 'Final assessment', completed: false },
    ];

    const completedCount = milestones.filter(m => m.completed).length;
    const totalCount = milestones.length;
    const progressPercentage = (completedCount / totalCount) * 100;

    const features = [
        {
            id: 0,
            icon: <Mobile size={32} color="#10B981" variant="Bold" />,
            title: "Scattered Tools",
            description: "Emails, drives, messaging apps — learning materials are everywhere except where you need them.",
        },
        {
            id: 1,
            icon: <Video size={32} color="#3B82F6" variant="Bold" />,
            title: "Poor Collaboration",
            description: "No central space for discussions, feedback, or team-based projects. Communication falls through cracks.",
        },
        {
            id: 2,
            icon: <Mobile size={32} color="#8B5CF6" variant="Bold" />,
            title: "No Progress Visibility",
            description: "Learners can't see how far they've come. Instructors can't track who needs help.",
        },

    ];

    return (
        <div className="bg-white relative min-h-screen items-center py-38">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-40 -left-20 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute bottom-40 -right-20 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-sm uppercase tracking-wider text-red-500 font-semibold mb-2">
                        The Problem
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Learning Shouldn't Be This Hard
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Most teams rely on disconnected tools that create confusion instead of clarity.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:mb-46">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${activeFeature === feature.id ? 'ring-2 ring-white' : ''
                                }`}
                            onMouseEnter={() => setActiveFeature(feature.id)}
                        >
                            <div className="relative">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r  bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
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

            </div>

            <div className="lg:max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col  lg:flex-row gap-10 mt-20 md:mt-0">
                {/* Header Section */}
                <div className="lg:text-left text-center items-center justify-center  p-3 lg:p-0 md:mb-12">
                    <h1 className=" font-bold  lg:text-left text-center text-primary-600 mb-4">
                        THE SOLUTION
                    </h1>
                    <h2 className="text-xl lg:max-w-2xl   lg:text-left text-center font-bold text-black sm:text-4xl">
                        Meet TalentFlow  Your <br className='flex lg:hidden' /> Complete Learning Hub
                    </h2>
                    <p className="mt-4 mb-5 text-lg lg:max-w-2xl  lg:text-left text-center text-gray-600 ">
                        A single platform to learn, collaborate, track progress, and build real-world experience.
                        Designed for interns, learners, and teams who want results.
                    </p>

                    <div className="grid gap-2 lg:mb-16">
                        <div className=" rounded-2xl gap-3 flex text-left  p-4  transition-shadow duration-300">
                            <div className="w-12 h-12 md:bg-primary-50 rounded-xl flex items-center justify-center ">
                                <BookOpen className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 ">Centralized Learning</h3>
                                <p className="text-gray-600">
                                    All courses, materials, and resources in one place. No more switching between tools.
                                </p>
                            </div>
                        </div>

                        <div className=" rounded-2xl gap-3 flex shadow-sm text-left p-4 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 md:bg-primary-50 rounded-xl flex items-center justify-center ">
                                <Users className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 ">Built-in Collaboration</h3>
                                <p className="text-gray-600">
                                    Discuss, share, and work on projects together — right inside the platform.
                                </p></div>
                        </div>

                        <div className=" rounded-2xl gap-3 flex p-4 text-left shadow-sm hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 md:bg-primary-50 rounded-xl flex items-center justify-center ">
                                <TrendingUp className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 ">Real-time Progress</h3>
                                <p className="text-gray-600">
                                    Track every milestone, assignment, and achievement with visual dashboards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Learning Journey Section */}
                <div className="bg-white rounded-2xl md:min-w-lg h-fit shadow-xl overflow-hidden">
                    <div className="p-8 md:p-10">
                        <div className="flex flex-col lg:flex-col gap-8">
                            {/* Left Column - Milestones */}
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    Your Learning Journey
                                </h3>
                                <div className="space-y-4">
                                    {milestones.map((milestone, index) => (
                                        <div key={milestone.id} className="flex items-center shadow bg-primary-100 p-1 rounded-xl gap-3 group">
                                            {milestone.completed ? (
                                                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                                            ) : (
                                                <Circle className="w-6 h-6 text-gray-300 flex-shrink-0 group-hover:text-gray-400 transition-colors" />
                                            )}
                                            <span
                                                className={`text-gray-700 ${milestone.completed ? 'line-through text-gray-400' : ''
                                                    }`}
                                            >
                                                {milestone.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - Progress */}
                            <div className="flex-1 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
                                    <span className="text-3xl font-bold text-emerald-600">
                                        {Math.round(progressPercentage)}%
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
                                    <div
                                        className="absolute h-full bg-gradient-to-r from-primary-300 to-primary-500 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                </div>

                                {/* Stats */}
                                <div className="flex items-center  justify-between text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                        <span>{completedCount} of {totalCount} completed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span>{totalCount - completedCount} remaining</span>
                                    </div>
                                </div>


                                {progressPercentage === 100 ? (
                                    <div className="mt-6 p-3 bg-emerald-100 hidden rounded-lg text-center">
                                        <p className="text-emerald-700 font-medium">🎉 Congratulations! You've completed your learning journey!</p>
                                    </div>
                                ) : (
                                    <div className="mt-6 p-3 bg-white/50 hidden rounded-lg text-center">
                                        <p className="text-gray-600 text-sm">
                                            Keep going! You're making great progress.
                                        </p>
                                    </div>
                                )}
                            </div>
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
        </div>
    );
}