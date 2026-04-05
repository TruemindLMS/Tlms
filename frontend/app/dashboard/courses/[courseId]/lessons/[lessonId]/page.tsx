'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    Play, Pause, CheckCircle, ChevronLeft, ChevronRight,
    Loader2, BookOpen, MessageCircle, Share2, Download, FileText,
    Award, Clock, Calendar, Users, Star, ChevronDown
} from 'lucide-react';
import { isAuthenticated, courseApi, Course, Lesson } from '@/lib/api';

export default function LessonPlayerPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const lessonId = params.lessonId as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [isPlaying, setIsPlaying] = useState(false);

    // Up next lessons data
    const upNextLessons = [
        { title: "What You Will Learn", duration: "38/22", completed: false },
        { title: "Download The Files", duration: "02/18", completed: false },
        { title: "Day 1 goals: what we make by end of day", duration: "07:50", completed: false },
        { title: "Meeting of Auto layouts and usage", duration: "10/15", completed: false },
        { title: "Day 2: Practice session", duration: "5hrs 30mins", completed: false },
        { title: "Day 3: Prototype", duration: "0hrs 30mins", completed: false },
        { title: "Day 4: Auto layouts", duration: "8hrs 30mins", completed: false },
    ];

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/signin');
            return;
        }
        fetchCourseAndLesson();
    }, [courseId, lessonId]);

    const fetchCourseAndLesson = async () => {
        setLoading(true);
        try {
            const courseData = await courseApi.getById(courseId);
            setCourse(courseData);

            // Find current lesson
            let foundLesson: Lesson | null = null;
            for (const module of courseData.modules) {
                const lesson = module.lessons.find(l => l.id === lessonId);
                if (lesson) {
                    foundLesson = lesson;
                    break;
                }
            }
            setCurrentLesson(foundLesson);
        } catch (error) {
            console.error('Error fetching lesson:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkComplete = async () => {
        try {
            await courseApi.updateLessonProgress(lessonId, !isCompleted);
            setIsCompleted(!isCompleted);
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    const findNextLesson = () => {
        if (!course) return null;
        let found = false;
        for (const module of course.modules) {
            for (const lesson of module.lessons) {
                if (found) return { module, lesson };
                if (lesson.id === lessonId) found = true;
            }
        }
        return null;
    };

    const nextLesson = findNextLesson();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={40} className="animate-spin text-primary-600" />
            </div>
        );
    }

    if (!currentLesson) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold">Lesson not found</h2>
                <Link href={`/dashboard/courses/${courseId}`} className="text-primary-600 mt-2 inline-block">
                    Back to Course
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cover ml-20 md:ml-10 lg:ml-1 bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/tback.png')" }}>
            {/* Course Header */}
            <div className="border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Advance Figma and Prototype</h1>
                            <p className="text-sm text-gray-500">Seven Steven</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <Share2 size={18} />
                                <span className="text-sm">Share</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                <Download size={18} />
                                <span className="text-sm">Download</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-8">
                        {['Course overview', 'Course Content', 'Questions and Answers', 'Ratings and reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase().replace(/ /g, '-'))}
                                className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.toLowerCase().replace(/ /g, '-')
                                    ? 'border-green-600 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Video and Content */}
                    <div className="lg:col-span-2">
                        {/* Video Player */}
                        <div className="bg-black/90 backdrop-blur-sm rounded-xl overflow-hidden aspect-video flex items-center justify-center mb-6">
                            <div className="text-center text-white">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition"
                                    onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? <Pause size={40} /> : <Play size={40} className="ml-1" />}
                                </div>
                                <p className="text-gray-400 text-sm">Preview</p>
                            </div>
                        </div>

                        {/* Become a designer section */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Become a designer in 2026!</h2>
                            <p className="text-gray-600 mb-3">
                                Learn how to use Figma to design beautiful mobile and web apps. Learn-by-doing approach
                            </p>
                            <div className="flex items-center gap-2 text-gray-500">
                                <Calendar size={16} />
                                <span className="text-sm">14 Hours Total</span>
                            </div>
                        </div>

                        {/* Certificates Section */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Award size={24} className="text-primary-600" />
                                <h3 className="font-semibold text-gray-900">Certificates:</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">
                                Get a certificate when you have completed an entire course
                            </p>
                            <div className="inline-block bg-white border border-gray-200 rounded-lg px-4 py-2">
                                <span className="text-primary-600 font-medium text-sm">Talent Flow Certificate</span>
                            </div>
                        </div>

                        {/* Course Content Tab Content */}
                        {activeTab === 'course-content' && (
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                                <p className="text-gray-500">Course content modules will appear here</p>
                            </div>
                        )}

                        {/* Q&A Tab Content */}
                        {activeTab === 'questions-and-answers' && (
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                                <p className="text-gray-500">No questions yet. Be the first to ask a question!</p>
                            </div>
                        )}

                        {/* Ratings Tab Content */}
                        {activeTab === 'ratings-and-reviews' && (
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                                <p className="text-gray-500">No ratings yet. Be the first to rate this course!</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Up Next */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 sticky top-24">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900">Up Next</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {upNextLessons.map((lesson, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 cursor-pointer hover:bg-gray-50 transition ${index === 0 ? 'bg-primary-50' : ''}`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className={`text-sm font-medium ${index === 0 ? 'text-primary-600' : 'text-gray-900'}`}>
                                                    {lesson.title}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">{lesson.duration}</p>
                                            </div>
                                            {index === 0 && (
                                                <Play size={16} className="text-green-600 flex-shrink-0 mt-1" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation - Previous/Next Buttons */}
            <div className="border-t border-gray-200 bg-white/95 backdrop-blur-sm mt-8">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href={`/dashboard/courses/${courseId}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                            <ChevronLeft size={18} />
                            <span>Back to Course</span>
                        </Link>
                        <div className="flex gap-3">
                            <button
                                onClick={handleMarkComplete}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${isCompleted
                                    ? 'bg-primary-600 text-white'
                                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <CheckCircle size={16} />
                                {isCompleted ? 'Completed' : 'Mark as Complete'}
                            </button>
                            {nextLesson && (
                                <Link
                                    href={`/dashboard/courses/${courseId}/lessons/${nextLesson.lesson.id}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                                >
                                    Next Lesson
                                    <ChevronRight size={16} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}