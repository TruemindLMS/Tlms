"use client";

import { useEffect, useState, useMemo } from "react";
import {
    BookOpen,
    Clock,
    CheckCircle,
    Award,
    Trophy,
    TrendingUp,
    Loader2,
} from "lucide-react";
import { getUser, courseApi } from "@/lib/api";

interface CourseWithProgress {
    id: number;
    title: string;
    instructor: string;
    progress: number;
    image: string;
    duration: string;
    level: string;
    students: number;
    rating: number;
    category: string;
}

interface Certificate {
    id: string;
    title: string;
    instructor: string;
    date: string;
    track: string;
    courseId: number;
}

// Mock course data for when backend is unavailable (fallback only)
const MOCK_ENROLLED_COURSES: CourseWithProgress[] = [
    {
        id: 1,
        title: "UI/UX Design Fundamentals",
        instructor: "Tunde Adebayo",
        progress: 100,
        image: "/img/ui-ux.jpg",
        duration: "12 hours",
        level: "Beginner",
        students: 1245,
        rating: 4.8,
        category: "Design",
    },
    {
        id: 2,
        title: "Design Systems & Component Libraries",
        instructor: "Tunde Adebayo",
        progress: 100,
        image: "/img/design-systems.jpg",
        duration: "8 hours",
        level: "Intermediate",
        students: 892,
        rating: 4.9,
        category: "Design",
    },
    {
        id: 3,
        title: "User Research & Testing",
        instructor: "Amaka Obi",
        progress: 72,
        image: "/img/user-research.jpg",
        duration: "10 hours",
        level: "Intermediate",
        students: 756,
        rating: 4.7,
        category: "Research",
    },
    {
        id: 4,
        title: "Prototyping with Figma",
        instructor: "Tunde Adebayo",
        progress: 45,
        image: "/img/figma.jpg",
        duration: "15 hours",
        level: "Beginner",
        students: 2100,
        rating: 4.8,
        category: "Design",
    },
    {
        id: 5,
        title: "Interaction Design Principles",
        instructor: "Amaka Obi",
        progress: 13,
        image: "/img/interaction.jpg",
        duration: "15 hours",
        level: "Advanced",
        students: 543,
        rating: 4.6,
        category: "Design",
    },
];

export default function CertificatePage() {
    const [enrolledCourses, setEnrolledCourses] = useState<CourseWithProgress[]>([]);
    const [certifications, setCertifications] = useState(0);
    const [loading, setLoading] = useState(true);
    const [earnedCertificates, setEarnedCertificates] = useState<Certificate[]>([]);

    // Get current user ID
    const getCurrentUserId = () => {
        const user = getUser();
        return user?.id || user?.email || "anonymous";
    };

    const userId = getCurrentUserId();
    const userCertKey = `userCertifications_${userId}`;

    // Helper to generate certificate for completed courses
    const generateCertificate = (course: CourseWithProgress, completionDate: string): Certificate => {
        // Determine track based on course category or title
        let track = "Professional Development";
        if (course.title.toLowerCase().includes("ui") || course.title.toLowerCase().includes("ux") || course.title.toLowerCase().includes("design")) {
            track = "UI/UX Track";
        } else if (course.title.toLowerCase().includes("frontend") || course.title.toLowerCase().includes("react")) {
            track = "Frontend Development Track";
        } else if (course.title.toLowerCase().includes("backend") || course.title.toLowerCase().includes("api")) {
            track = "Backend Development Track";
        } else if (course.title.toLowerCase().includes("data")) {
            track = "Data Analysis Track";
        } else if (course.title.toLowerCase().includes("security")) {
            track = "Cybersecurity Track";
        }

        return {
            id: `cert_${course.id}_${Date.now()}`,
            title: course.title,
            instructor: course.instructor,
            date: completionDate,
            track: track,
            courseId: course.id,
        };
    };

    // Load certificates from localStorage or generate from completed courses
    const loadCertificates = (completedCourses: CourseWithProgress[]) => {
        // Try to load existing certificates from localStorage
        const storedCerts = localStorage.getItem(`${userCertKey}_certificates`);
        let certificates: Certificate[] = [];

        if (storedCerts) {
            try {
                certificates = JSON.parse(storedCerts);
                // Check if we need to update with newly completed courses
                const existingCourseIds = new Set(certificates.map(c => c.courseId));
                const newCompletedCourses = completedCourses.filter(c =>
                    c.progress === 100 && !existingCourseIds.has(c.id)
                );

                if (newCompletedCourses.length > 0) {
                    // Generate certificates for newly completed courses
                    const newCertificates = newCompletedCourses.map(course =>
                        generateCertificate(course, new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }))
                    );
                    certificates = [...certificates, ...newCertificates];
                    localStorage.setItem(`${userCertKey}_certificates`, JSON.stringify(certificates));
                }
            } catch (e) {
                console.error("Error parsing certificates:", e);
            }
        }

        // If no stored certificates, generate from completed courses
        if (certificates.length === 0 && completedCourses.length > 0) {
            certificates = completedCourses
                .filter(course => course.progress === 100)
                .map(course => generateCertificate(course, new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })));
            if (certificates.length > 0) {
                localStorage.setItem(`${userCertKey}_certificates`, JSON.stringify(certificates));
            }
        }

        return certificates;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let coursesList: CourseWithProgress[] = [];

            try {
                // Try to fetch enrolled courses from the backend
                const fetchedCourses = await courseApi.getEnrolledCourses();
                if (fetchedCourses && Array.isArray(fetchedCourses) && fetchedCourses.length > 0) {
                    // Fetch progress for each course
                    const coursesWithProgress = await Promise.all(
                        fetchedCourses.map(async (course: any) => {
                            try {
                                const progressData = await courseApi.getCourseProgress(course.id);
                                return {
                                    ...course,
                                    progress: progressData?.progress || 0,
                                    instructor: course.instructor || "Industry Expert",
                                    duration: course.duration || "10 hours",
                                    level: course.level || "Beginner",
                                    students: course.students || 0,
                                    rating: course.rating || 4.5,
                                    category: course.category || "Technology"
                                };
                            } catch (err) {
                                return { ...course, progress: 0 };
                            }
                        })
                    );
                    coursesList = coursesWithProgress;
                    // Cache for offline use
                    localStorage.setItem(`enrolledCourses_${userId}`, JSON.stringify(coursesList));
                } else {
                    // No courses from backend, check localStorage
                    const cached = localStorage.getItem(`enrolledCourses_${userId}`);
                    if (cached) {
                        coursesList = JSON.parse(cached);
                    } else {
                        // Use mock data as last resort fallback
                        coursesList = MOCK_ENROLLED_COURSES;
                    }
                }
            } catch (err) {
                console.warn("Failed to fetch backend enrolled courses, falling back to local storage.");
                // Try localStorage first, then mock data as last resort
                const cached = localStorage.getItem(`enrolledCourses_${userId}`);
                if (cached) {
                    coursesList = JSON.parse(cached);
                } else {
                    coursesList = MOCK_ENROLLED_COURSES;
                }
            }

            setEnrolledCourses(coursesList);

            // Calculate certifications count from completed courses
            const completedCount = coursesList.filter(c => c.progress === 100).length;

            // Load or generate certificates
            const certificates = loadCertificates(coursesList);
            setEarnedCertificates(certificates);

            // Update certification count
            const certCount = certificates.length;
            setCertifications(certCount);

            // Store certification count for dashboard
            localStorage.setItem(userCertKey, certCount.toString());

            // Dispatch event to notify dashboard of stats update
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event('statsUpdated'));
            }

            setLoading(false);
        };

        fetchData();

        // Listen for stats updates from dashboard/lesson player
        const handleStatsUpdate = () => {
            fetchData();
        };

        window.addEventListener('statsUpdated', handleStatsUpdate);
        return () => window.removeEventListener('statsUpdated', handleStatsUpdate);
    }, [userId, userCertKey]);

    // Calculate stats from enrolled courses
    const stats = useMemo(() => {
        let completed = 0;
        let totalProgress = 0;

        for (const course of enrolledCourses) {
            totalProgress += course.progress || 0;
            if ((course.progress || 0) === 100) completed++;
        }

        const avgProgress =
            enrolledCourses.length > 0
                ? Math.floor(totalProgress / enrolledCourses.length)
                : 0;

        return {
            enrolled: enrolledCourses.length,
            completed,
            inProgress: enrolledCourses.length - completed,
            progress: avgProgress,
            certifications,
        };
    }, [enrolledCourses, certifications]);

    if (loading) {
        return (
            <div className="bg-cover ml-5 lg:ml-1 md:ml-5 bg-center bg-no-repeat pr-8 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 size={40} className="animate-spin text-green-600 mx-auto mb-4" />
                    <p className="text-gray-500">Loading your certificates...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cover ml-5 lg:ml-1 md:ml-5 bg-center bg-no-repeat pr-8 min-h-screen" style={{ backgroundImage: "url('/img/tback.png')" }}>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Certificate & Progress
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Track your learning journey and earned certificates
                </p>
            </div>

            {/* Stats Cards - Synced with dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {/* Card 1 - Enrolled */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
                            <BookOpen className="text-green-600 dark:text-green-400" size={20} />
                        </div>
                        <span className="text-[24px] font-bold text-gray-900 dark:text-white">
                            {stats.enrolled}
                        </span>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">
                        Courses Enrolled
                    </p>
                </div>

                {/* Card 2 - Completed */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
                            <Trophy className="text-green-600 dark:text-green-400" size={20} />
                        </div>
                        <span className="text-[24px] font-bold text-gray-900 dark:text-white">
                            {stats.completed}
                        </span>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">
                        Completed
                    </p>
                </div>

                {/* Card 3 - In Progress */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
                            <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
                        </div>
                        <span className="text-[24px] font-bold text-gray-900 dark:text-white">
                            {stats.inProgress}
                        </span>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">
                        In Progress
                    </p>
                </div>

                {/* Card 4 - Certifications Earned */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
                            <Award className="text-green-600 dark:text-green-400" size={20} />
                        </div>
                        <span className="text-[24px] font-bold text-gray-900 dark:text-white">
                            {stats.certifications}
                        </span>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">
                        Certifications Earned
                    </p>
                </div>
            </div>

            {/* Earned Certificates Section - Dynamic from completed courses */}
            <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <Award className="text-green-600" size={20} />
                    <h2 className="text-[18px] font-semibold text-gray-900 dark:text-white">
                        Earned Certificates ({earnedCertificates.length})
                    </h2>
                </div>

                {earnedCertificates.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
                        <p className="text-gray-500 mb-6">Complete your first course to earn a certificate!</p>
                        <button
                            onClick={() => window.location.href = '/dashboard/courses'}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Browse Courses
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {earnedCertificates.map((cert) => (
                            <div
                                key={cert.id}
                                className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                            >
                                {/* Green Certificate Section */}
                                <div className="bg-[#DCFCE7] px-6 py-8 relative">
                                    <div className="border border-dashed border-green-400 rounded-xl p-6 text-center">
                                        <div className="flex justify-center mb-3">
                                            <Award className="text-green-700" size={32} />
                                        </div>
                                        <p className="text-[10px] tracking-[0.1em] text-green-700 uppercase mb-2 font-semibold">
                                            Certificate of completion
                                        </p>
                                        <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
                                            {cert.title}
                                        </h3>
                                        <p className="text-[13px] text-green-800 font-medium">
                                            {cert.instructor}
                                        </p>
                                    </div>
                                </div>

                                {/* White Info Section */}
                                <div className="px-6 py-4">
                                    <h4 className="text-[14px] font-semibold text-gray-900 mb-1">
                                        {cert.title}
                                    </h4>
                                    <p className="text-[13px] text-gray-500 mb-3">
                                        Instructor: {cert.instructor}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                            {cert.track}
                                        </span>
                                        <span className="text-[12px] text-gray-400">{cert.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Course Progress Section - Only show if there are enrolled courses */}
            {stats.enrolled > 0 && (
                <>
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="text-green-600" size={20} />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Course Progress ({stats.enrolled} Courses)
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {enrolledCourses.map((course) => (
                            <div
                                key={course.id}
                                className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => window.location.href = `/dashboard/courses/${course.id}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        {course.progress === 100 ? (
                                            <CheckCircle className="text-green-600 mt-1" size={18} />
                                        ) : (
                                            <BookOpen className="text-green-600 mt-1" size={18} />
                                        )}
                                        <div>
                                            <h2 className="text-base font-semibold text-gray-800">
                                                {course.title}
                                            </h2>
                                            <p className="text-sm text-gray-500">{course.instructor}</p>
                                        </div>
                                    </div>
                                    <div className={`text-sm font-medium rounded-full px-3 py-1 ${course.progress === 100
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {course.progress === 100 ? "Certified" : `${course.progress}% Complete`}
                                    </div>
                                </div>

                                {/* Progress Info */}
                                <div className="flex justify-between items-center mt-6 mb-2 text-sm text-gray-500">
                                    <span>
                                        {course.progress === 100
                                            ? "All lessons completed"
                                            : `${Math.round(course.progress / 10)}/${10} Lessons`}
                                    </span>
                                    <span className="text-green-700 font-medium">{course.progress}%</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-700 rounded-full transition-all duration-500"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>

                                {course.progress < 100 && (
                                    <div className="flex items-center gap-1 mt-3">
                                        <Clock className="text-gray-400" size={12} />
                                        <p className="text-xs text-gray-500">
                                            {100 - course.progress}% left to complete
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}