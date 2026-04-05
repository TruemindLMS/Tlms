'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    BookOpen, Clock, Star, Users, Play, CheckCircle,
    Loader2, ChevronDown, ChevronRight, Award, Target,
    FileText, Video, Download, Share2, Heart, GraduationCap,
    Info, List, Layers
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
        try {
            const data = await courseApi.getById(courseId);
            setCourse(data);

            if (data.modules.length > 0) {
                setExpandedModules(new Set([data.modules[0].id]));
            }

            // Check if user is enrolled from localStorage
            const userId = getCurrentUserId();
            const enrolledCoursesKey = `enrolledCourses_${userId}`;
            const enrolledCourses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');
            setIsEnrolled(enrolledCourses.some((c: any) => c.id === courseId));
        } catch (error) {
            console.error('Error fetching course:', error);
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

            // Get existing enrolled courses
            const enrolledCourses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');

            // Check if already enrolled
            if (!enrolledCourses.some((c: any) => c.id === courseId)) {
                // Add new course to enrolled list
                const newCourse = {
                    id: courseId,
                    title: course?.title,
                    enrolledDate: new Date().toISOString(),
                    progress: 0,
                    lastLessonId: null
                };
                enrolledCourses.push(newCourse);
                localStorage.setItem(enrolledCoursesKey, JSON.stringify(enrolledCourses));

                // Update user stats
                const savedStats = localStorage.getItem(userStatsKey);
                let currentStats = savedStats ? JSON.parse(savedStats) : { enrolled: 0, completed: 0, progress: 0 };
                currentStats.enrolled = enrolledCourses.length;
                localStorage.setItem(userStatsKey, JSON.stringify(currentStats));
                localStorage.setItem(startedKey, "true");

                // Also update the API (if needed)
                await courseApi.enroll(courseId);
            }

            setIsEnrolled(true);
            alert('Successfully enrolled in the course!');

            // Refresh page to show updated state
            router.refresh();
        } catch (error) {
            console.error('Enrollment error:', error);
            alert('Failed to enroll. Please try again.');
        }
    };

    const handleStartLearning = () => {
        // Find first lesson to start with
        if (course && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
            const firstLesson = course.modules[0].lessons[0];
            router.push(`/dashboard/courses/${courseId}/lessons/${firstLesson.id}`);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={40} className="animate-spin text-primary-600 mx-auto" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900">Course not found</h2>
                <Link href="/dashboard/courses" className="text-primary-600 mt-2 inline-block">
                    Back to Courses
                </Link>
            </div>
        );
    }

    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const totalDuration = course.duration || '4 sections of 5 weeks, 3 hours per week';

    return (
        <div className="min-h-screen bg-cover bg-center ml-1 lg:ml-1 md:ml-5 bg-no-repeat" style={{ backgroundImage: "url('/img/tback.png')" }}>
            {/* Hero Section */}
            <div className="bg-gradient-to-r bg-cover rounded-lg from-green-900 to-primary-700 text-white">
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>

                            <div className="bg-white/10 rounded-lg p-4 mb-6">
                                <h3 className="font-semibold text-white/90 mb-2">User Story:</h3>
                                <p className="text-white/80 text-sm">
                                    I want to create a website that showcases my portfolio. So far, I have created a basic prototype using HTML and CSS.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <GraduationCap size={18} />
                                    <span>By {course.instructor || 'Prof. Steven Eason'}</span>
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
                                    className="bg-white text-green-900 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
                                >
                                    Enroll Now
                                    <ChevronRight size={18} />
                                </button>
                            ) : (
                                <div className="bg-white/20 rounded-lg p-4">
                                    <p className="text-sm mb-2">You are enrolled in this course!</p>
                                    <button
                                        onClick={handleStartLearning}
                                        className="bg-white text-green-900 px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition"
                                    >
                                        Start Learning
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of the component remains the same */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* What You Will Learn */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">What You Will Learn:</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                    How to use the Elements Panel in Figma.
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                    How to create components and libraries.
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                    How to style components with CSS.
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                    How to use the Styles panel for styling.
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                    How to use the Components panel for creating components.
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                    How to use the Libraries panel for adding reusable components.
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                    How to use the Assets panel for managing assets like fonts and images.
                                </li>
                            </ul>
                        </div>

                        {/* Course Content Header */}
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Course Content:</h2>
                            <p className="text-sm text-gray-500 mt-1">{totalDuration} of content</p>
                        </div>

                        {/* Modules Sections */}
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

                        {/* Description Section */}
                        <div className="mt-8 bg-gray-50 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Description:</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {course.description}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar - Other Courses */}
                    <div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border sticky top-24">
                            <h3 className="font-semibold text-gray-900 text-lg mb-4">Other Courses:</h3>
                            <div className="space-y-4">
                                {[
                                    { title: "Advanced Essential Navigation Guide", duration: "4 Weeks", cost: "$0" },
                                    { title: "Code Hero UI Kit", duration: "6 Weeks", cost: "$0" },
                                    { title: "Gatsby Starter Template", duration: "8 Weeks", cost: "$0" },
                                    { title: "Elementor Essential Page Builder", duration: "10 Weeks", cost: "$0" },
                                    { title: "Custom Bootstrap Layouts", duration: "12 Weeks", cost: "$0" },
                                    { title: "Foundation CSS Framework", duration: "14 Weeks", cost: "$0" },
                                    { title: "Tailwind CSS", duration: "16 Weeks", cost: "$0" },
                                    { title: "Bootstrap 5", duration: "18 Weeks", cost: "$0" },
                                    { title: "Material UI", duration: "20 Weeks", cost: "$0" },
                                    { title: "Ant Design", duration: "22 Weeks", cost: "$0" },
                                ].map((item, idx) => (
                                    <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                                        <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xs text-gray-500">{item.duration}</span>
                                            <span className="text-xs font-semibold text-green-600">{item.cost}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
    const sectionTitles = [
        "Introduction to Figma Prototyping",
        "Creating Basic Components",
        "Styling Components",
        "Advanced Techniques"
    ];
    const displayTitle = sectionTitles[index] || module.title;
    const sectionLessons = [
        ["Introduction to Figma", "Elements Panel", "Styles Panel", "Components Panel", "Libraries Panel"],
        ["Creating a Button", "Creating a Text Field", "Creating a Form", "Creating a Image Uploader"],
        ["Styling Buttons", "Styling Text Fields", "Styling Forms", "Styling Images"],
        ["Using Variables", "Using Functions", "Using Plugins", "Using Libraries"]
    ];
    const lessons = sectionLessons[index] || module.lessons.map(l => l.title);

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
                        Section {sectionNumber}: {displayTitle}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{lessons.length} lectures</span>
                </div>
            </button>

            {isExpanded && (
                <div className="border-t bg-gray-50">
                    {lessons.map((lessonTitle, lessonIndex) => (
                        <div
                            key={lessonIndex}
                            className="px-5 py-3 flex items-center gap-3 border-t first:border-t-0 hover:bg-gray-100 transition"
                        >
                            {isEnrolled ? (
                                <Link href={`/dashboard/courses/${courseId}/lessons/lesson_${index}_${lessonIndex}`} className="flex items-center gap-3 flex-1">
                                    <Play size={16} className="text-gray-400" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700">{lessonTitle}</p>
                                    </div>
                                </Link>
                            ) : (
                                <div className="flex items-center gap-3 flex-1 cursor-not-allowed opacity-60">
                                    <Play size={16} className="text-gray-400" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700">{lessonTitle}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}