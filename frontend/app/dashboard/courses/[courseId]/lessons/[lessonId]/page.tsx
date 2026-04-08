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
import { isAuthenticated, courseApi, Course, Lesson, getUser } from '@/lib/api';

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
    const [courseProgress, setCourseProgress] = useState(0);

    const getCurrentUserId = () => {
        const user = getUser();
        return user?.id || user?.email || 'anonymous';
    };

    const updateUserStats = (enrolledCourses: any[]) => {
        const userId = getCurrentUserId();
        const userStatsKey = `userStats_${userId}`;

        let completed = 0;
        let totalProgress = 0;

        for (const course of enrolledCourses) {
            totalProgress += course.progress || 0;
            if (course.progress === 100) completed++;
        }

        const avgProgress = enrolledCourses.length > 0 ? Math.floor(totalProgress / enrolledCourses.length) : 0;

        const newStats = {
            enrolled: enrolledCourses.length,
            completed: completed,
            progress: avgProgress
        };

        localStorage.setItem(userStatsKey, JSON.stringify(newStats));

        // Dispatch event to update dashboard
        window.dispatchEvent(new CustomEvent('statsUpdated', { detail: newStats }));
    };

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

            let foundLesson: Lesson | null = null;
            for (const module of courseData.modules) {
                const lesson = module.lessons.find(l => l.id === lessonId);
                if (lesson) {
                    foundLesson = lesson;
                    break;
                }
            }
            setCurrentLesson(foundLesson);

            // Check if lesson is completed
            const userId = getCurrentUserId();
            const enrolledCoursesKey = `enrolledCourses_${userId}`;
            const enrolledCourses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');
            const enrolledCourse = enrolledCourses.find((c: any) => c.id === courseId);

            if (enrolledCourse) {
                setCourseProgress(enrolledCourse.progress || 0);
                const completedLessons = JSON.parse(localStorage.getItem(`completedLessons_${userId}_${courseId}`) || '[]');
                setIsCompleted(completedLessons.includes(lessonId));
            }
        } catch (error) {
            console.error('Error fetching lesson:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkComplete = async () => {
        try {
            const userId = getCurrentUserId();
            const enrolledCoursesKey = `enrolledCourses_${userId}`;
            const completedLessonsKey = `completedLessons_${userId}_${courseId}`;

            const enrolledCourses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');
            const courseIndex = enrolledCourses.findIndex((c: any) => c.id === courseId);

            if (courseIndex !== -1) {
                const completedLessons = JSON.parse(localStorage.getItem(completedLessonsKey) || '[]');

                if (!isCompleted) {
                    completedLessons.push(lessonId);
                    localStorage.setItem(completedLessonsKey, JSON.stringify(completedLessons));

                    // Calculate new progress
                    const totalLessons = course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 1;
                    const newProgress = Math.floor((completedLessons.length / totalLessons) * 100);

                    enrolledCourses[courseIndex].progress = newProgress;
                    localStorage.setItem(enrolledCoursesKey, JSON.stringify(enrolledCourses));

                    setCourseProgress(newProgress);
                    setIsCompleted(true);

                    // Update user stats
                    updateUserStats(enrolledCourses);

                    // Also update API
                    await courseApi.updateLessonProgress(lessonId, true);
                }
            }
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
                <Loader2 size={40} className="animate-spin text-green-600" />
            </div>
        );
    }

    if (!currentLesson) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold">Lesson not found</h2>
                <Link href={`/dashboard/courses/${courseId}`} className="text-green-600 mt-2 inline-block">
                    Back to Course
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cover ml-1 lg:ml-1 md:ml-5bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/tback.png')" }}>
            {/* Course Header */}
            <div className="border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{course?.title || 'Course'}</h1>
                            <p className="text-sm text-gray-500">{course?.instructor || 'Expert Instructor'}</p>
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

            {/* Progress Bar */}
            <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Course Progress</span>
                        <span className="text-green-600 font-medium">{courseProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${courseProgress}%` }} />
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
                                    ? 'border-green-600 text-green-600'
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
                        <div className="bg-black/90 backdrop-blur-sm rounded-xl overflow-hidden aspect-video flex items-center justify-center mb-6 relative">
                            {currentLesson.videoUrl ? (
                                (() => {
                                    const url = currentLesson.videoUrl;
                                    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
                                    
                                    if (isYouTube) {
                                        let videoId = '';
                                        if (url.includes('youtube.com/watch?v=')) {
                                            videoId = url.split('v=')[1].split('&')[0];
                                        } else if (url.includes('youtu.be/')) {
                                            videoId = url.split('youtu.be/')[1].split('?')[0];
                                        }
                                        
                                        return (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full border-0 absolute inset-0"
                                            />
                                        );
                                    } else {
                                        return (
                                            <video 
                                                src={url} 
                                                controls 
                                                autoPlay={isPlaying}
                                                className="w-full h-full bg-black absolute inset-0 object-contain"
                                            />
                                        );
                                    }
                                })()
                            ) : (
                                <div className="text-center text-white z-10 w-full h-full flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition"
                                        onClick={() => setIsPlaying(!isPlaying)}>
                                        {isPlaying ? <Pause size={40} /> : <Play size={40} className="ml-1" />}
                                    </div>
                                    <p className="text-gray-400 text-sm">{isPlaying ? 'Playing Preview' : 'Preview Not Available'}</p>
                                    <p className="text-sm text-gray-500 mt-2">{currentLesson.title}</p>
                                </div>
                            )}
                        </div>

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

                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Award size={24} className="text-green-600" />
                                <h3 className="font-semibold text-gray-900">Certificates:</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">
                                Get a certificate when you have completed an entire course
                            </p>
                            <div className="inline-block bg-white border border-gray-200 rounded-lg px-4 py-2">
                                <span className="text-green-600 font-medium text-sm">Talent Flow Certificate</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Up Next */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 sticky top-24">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900">Up Next</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {course?.modules.map((module) => (
                                    module.lessons.map((lesson, idx) => (
                                        <Link
                                            key={lesson.id}
                                            href={`/dashboard/courses/${courseId}/lessons/${lesson.id}`}
                                            className={`block p-4 cursor-pointer hover:bg-gray-50 transition ${lesson.id === lessonId ? 'bg-green-50' : ''}`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className={`text-sm font-medium ${lesson.id === lessonId ? 'text-green-600' : 'text-gray-900'}`}>
                                                        {lesson.title}
                                                    </p>
                                                    {lesson.duration && (
                                                        <p className="text-xs text-gray-400 mt-1">{lesson.duration} min</p>
                                                    )}
                                                </div>
                                                {lesson.id === lessonId && (
                                                    <Play size={16} className="text-green-600 flex-shrink-0 mt-1" />
                                                )}
                                                {lesson.isCompleted && (
                                                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-1" />
                                                )}
                                            </div>
                                        </Link>
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
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
                                    ? 'bg-green-600 text-white'
                                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <CheckCircle size={16} />
                                {isCompleted ? 'Completed' : 'Mark as Complete'}
                            </button>
                            {nextLesson && (
                                <Link
                                    href={`/dashboard/courses/${courseId}/lessons/${nextLesson.lesson.id}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
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