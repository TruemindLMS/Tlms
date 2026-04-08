'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    BookOpen, Clock, Star, Users, Play, CheckCircle,
    Loader2, ChevronDown, ChevronRight, Award, Target,
    FileText, Video, Download, Share2, Heart, GraduationCap,
    Info, List, Layers, ArrowLeft
} from 'lucide-react';
import { isAuthenticated, courseApi, Course, Module, Lesson, getUser } from '@/lib/api';

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCurrentUserId = () => {
        const user = getUser();
        return user?.id || user?.email || 'anonymous';
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/signin');
            return;
        }
        fetchCourseDetails();
    }, [courseId]);

    const fetchCourseDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await courseApi.getById(courseId);
            setCourse(data);

            if (data.modules && data.modules.length > 0) {
                setExpandedModules(new Set([data.modules[0].id]));
            }

            // Check if user is enrolled from localStorage
            const userId = getCurrentUserId();
            const enrolledCoursesKey = `enrolledCourses_${userId}`;
            const enrolledCourses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');
            setIsEnrolled(enrolledCourses.some((c: any) => c.id === courseId));
        } catch (error: any) {
            console.error('Error fetching course:', error);
            setError(error.message || 'Failed to load course details');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        try {
            const userId = getCurrentUserId();
            const enrolledCoursesKey = `enrolledCourses_${userId}`;
            const userStatsKey = `userStats_${userId}`;
            const startedKey = `hasStartedCourse_${userId}`;

            const enrolledCourses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');

            if (!enrolledCourses.some((c: any) => c.id === courseId)) {
                const newCourse = {
                    id: courseId,
                    title: course?.title,
                    enrolledDate: new Date().toISOString(),
                    progress: 0,
                    lastLessonId: null
                };
                enrolledCourses.push(newCourse);
                localStorage.setItem(enrolledCoursesKey, JSON.stringify(enrolledCourses));

                const savedStats = localStorage.getItem(userStatsKey);
                let currentStats = savedStats ? JSON.parse(savedStats) : { enrolled: 0, completed: 0, progress: 0 };
                currentStats.enrolled = enrolledCourses.length;
                localStorage.setItem(userStatsKey, JSON.stringify(currentStats));
                localStorage.setItem(startedKey, "true");

                await courseApi.enroll(courseId);
            }

            setIsEnrolled(true);
            alert('Successfully enrolled in the course!');
            router.refresh();
        } catch (error) {
            console.error('Enrollment error:', error);
            alert('Failed to enroll. Please try again.');
        }
    };

    const handleStartLearning = () => {
        if (course && course.modules && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
            const firstLesson = course.modules[0].lessons[0];
            router.push(`/dashboard/courses/${courseId}/lessons/${firstLesson.id}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat ml-1 lg:ml-1 md:ml-5" style={{ backgroundImage: "url('/img/tback.png')" }}>
                <Loader2 size={40} className="animate-spin text-primary-600 mx-auto" />
                <p className="text-gray-500 mt-4">Loading course details...</p>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-cover bg-center bg-no-repeat ml-1 lg:ml-1 md:ml-5" style={{ backgroundImage: "url('/img/tback.png')" }}>
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen size={32} className="text-red-500" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Course not found</h2>
                        <p className="text-gray-500 mb-6">{error || "The course you're looking for doesn't exist."}</p>
                        <Link
                            href="/dashboard/courses"
                            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
                        >
                            <ArrowLeft size={18} />
                            Back to Courses
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
    const totalDuration = course.duration || '4 sections, 3 hours per week';

    // What you will learn items (can come from course data or be default)
    const whatYouWillLearn = [
        "Master core concepts and advanced techniques",
        "Build real-world projects from scratch",
        "Get certified upon completion",
        "Access to community support",
        "Learn from industry experts",
        "Hands-on practical exercises"
    ];

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat ml-1 lg:ml-1 md:ml-5" style={{ backgroundImage: "url('/img/tback.png')" }}>
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-6 pt-6">
                <Link
                    href="/dashboard/courses"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Courses</span>
                </Link>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-700 text-white mt-4 mx-6 rounded-2xl overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {course.category && (
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                        {course.category}
                                    </span>
                                )}
                                {course.level && (
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                        {course.level}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{course.title}</h1>
                            <p className="text-white/80 text-lg mb-6">{course.description}</p>

                            <div className="flex flex-wrap gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <GraduationCap size={18} />
                                    <span>By {course.instructor || 'Expert Instructor'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen size={18} />
                                    <span>{totalLessons} lessons</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} />
                                    <span>{totalDuration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={18} />
                                    <span>{course.enrolledCount || 0} students</span>
                                </div>
                                {course.rating && (
                                    <div className="flex items-center gap-2">
                                        <Star size={18} fill="white" />
                                        <span>{course.rating}</span>
                                    </div>
                                )}
                            </div>

                            {!isEnrolled ? (
                                <button
                                    onClick={handleEnroll}
                                    className="bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
                                >
                                    Enroll Now
                                    <ChevronRight size={18} />
                                </button>
                            ) : (
                                <div className="bg-white/20 rounded-lg p-4">
                                    <p className="text-sm mb-2">✓ You are enrolled in this course!</p>
                                    <button
                                        onClick={handleStartLearning}
                                        className="bg-white text-primary-900 px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition flex items-center gap-2"
                                    >
                                        <Play size={16} />
                                        Start Learning
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="lg:w-80">
                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                <div className="aspect-video bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                                    {course.imageUrl ? (
                                        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <BookOpen size={64} className="text-white/50" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* What You Will Learn */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {whatYouWillLearn.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <CheckCircle size={18} className="text-primary-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Course Content Header */}
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
                            <p className="text-sm text-gray-500 mt-1">{totalLessons} lessons • {totalDuration}</p>
                        </div>

                        {/* Modules Sections */}
                        {course.modules && course.modules.length > 0 ? (
                            <div className="space-y-3">
                                {course.modules.map((module, index) => (
                                    <ModuleSection
                                        key={module.id}
                                        module={module}
                                        index={index}
                                        isExpanded={expandedModules.has(module.id)}
                                        onToggle={() => {
                                            const newExpanded = new Set(expandedModules);
                                            if (newExpanded.has(module.id)) {
                                                newExpanded.delete(module.id);
                                            } else {
                                                newExpanded.add(module.id);
                                            }
                                            setExpandedModules(newExpanded);
                                        }}
                                        courseId={courseId}
                                        isEnrolled={isEnrolled}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-xl p-8 text-center">
                                <BookOpen size={48} className="text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">Course content coming soon</p>
                            </div>
                        )}

                        {/* Description Section */}
                        <div className="mt-8 bg-gray-50 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">About This Course</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {course.description} This comprehensive course is designed to take you from beginner to expert.
                                With hands-on projects, real-world examples, and expert guidance, you'll gain the skills needed
                                to succeed in your career. Whether you're just starting out or looking to advance your skills,
                                this course has something for everyone.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border sticky top-24">
                            <h3 className="font-semibold text-gray-900 text-lg mb-4">Course Includes</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Video size={18} className="text-primary-600" />
                                    <span>{totalLessons} on-demand videos</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Download size={18} className="text-primary-600" />
                                    <span>Downloadable resources</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Award size={18} className="text-primary-600" />
                                    <span>Certificate of completion</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Users size={18} className="text-primary-600" />
                                    <span>Access on mobile and TV</span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-500">Total Lessons</span>
                                    <span className="font-medium">{totalLessons}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Total Duration</span>
                                    <span className="font-medium">{totalDuration}</span>
                                </div>
                            </div>

                            {!isEnrolled && (
                                <button
                                    onClick={handleEnroll}
                                    className="w-full mt-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
                                >
                                    Enroll Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Module Section Component
function ModuleSection({
    module,
    index,
    isExpanded,
    onToggle,
    courseId,
    isEnrolled
}: {
    module: Module;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
    courseId: string;
    isEnrolled: boolean;
}) {
    const sectionNumber = index + 1;
    const lessons = module.lessons || [];

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
                <div className="flex items-center gap-3">
                    <span className="text-gray-400">
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </span>
                    <span className="font-semibold text-gray-900">
                        Section {sectionNumber}: {module.title}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{lessons.length} lectures</span>
                </div>
            </button>

            {isExpanded && (
                <div className="border-t bg-gray-50 divide-y divide-gray-100">
                    {lessons.map((lesson, lessonIndex) => (
                        <div
                            key={lesson.id}
                            className="px-5 py-3 flex items-center gap-3 hover:bg-gray-100 transition"
                        >
                            {isEnrolled ? (
                                <Link
                                    href={`/dashboard/courses/${courseId}/lessons/${lesson.id}`}
                                    className="flex items-center gap-3 flex-1"
                                >
                                    <Play size={16} className="text-gray-400" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700">
                                            {lessonIndex + 1}. {lesson.title}
                                        </p>
                                    </div>
                                    {lesson.duration && (
                                        <span className="text-xs text-gray-400">{lesson.duration} min</span>
                                    )}
                                </Link>
                            ) : (
                                <div className="flex items-center gap-3 flex-1 cursor-not-allowed opacity-60">
                                    <Play size={16} className="text-gray-400" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700">
                                            {lessonIndex + 1}. {lesson.title}
                                        </p>
                                    </div>
                                    {lesson.duration && (
                                        <span className="text-xs text-gray-400">{lesson.duration} min</span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
