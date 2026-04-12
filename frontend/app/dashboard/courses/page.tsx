'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    BookOpen, Clock, Star, Users, Play, ChevronRight,
    Search, Filter, Loader2, Trophy, Award, Target, GraduationCap,
    CheckCircle, X, AlertCircle
} from 'lucide-react';
import { isAuthenticated, courseApi, Course, getUser } from '@/lib/api';

export default function CoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [categories, setCategories] = useState<string[]>(['All']);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);

    const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    const getCurrentUserId = () => {
        const user = getUser();
        return user?.id || user?.email || 'anonymous';
    };

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/signin');
            return;
        }
        fetchCourses();
        loadEnrolledCourses();
    }, [router]);

    const loadEnrolledCourses = () => {
        const userId = getCurrentUserId();
        const enrolledCoursesKey = `enrolledCourses_${userId}`;
        const enrolled = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');
        setEnrolledCourseIds(new Set(enrolled.map((c: any) => c.id)));
    };

    const fetchCourses = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('🟡 Fetching courses...');
            const data = await courseApi.getAll();

            let coursesArray: Course[] = Array.isArray(data) ? data : [];

            const validatedCourses = coursesArray.map((course, index) => ({
                ...course,
                id: course.id || `course_${index}_${Date.now()}`
            }));

            setCourses(validatedCourses);
            setFilteredCourses(validatedCourses);

            const uniqueCategories = ['All', ...new Set(validatedCourses.map(c => c.category).filter(Boolean))];
            setCategories(uniqueCategories as string[]);

            if (validatedCourses.length === 0) {
                setError('No courses found. Please check back later.');
            }
        } catch (error: any) {
            console.error('❌ Error fetching courses:', error);
            setError(error.message || 'Failed to load courses. Please try again later.');
            setCourses([]);
            setFilteredCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async (course: Course) => {
        if (enrolledCourseIds.has(course.id)) {
            router.push(`/dashboard/courses/${course.id}`);
            return;
        }

        setEnrollingCourseId(course.id);

        try {
            const userId = getCurrentUserId();
            const enrolledCoursesKey = `enrolledCourses_${userId}`;
            const userStatsKey = `userStats_${userId}`;
            const startedKey = `hasStartedCourse_${userId}`;

            const enrolledCourses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');

            const newCourse = {
                id: course.id,
                title: course.title,
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

            // Update enrolled courses set
            setEnrolledCourseIds(prev => new Set([...prev, course.id]));

            // Dispatch event for notification
            window.dispatchEvent(new CustomEvent('courseEnrolled', {
                detail: {
                    courseTitle: course.title,
                    courseId: course.id
                }
            }));

            setSuccessMessage(`✅ Successfully enrolled in "${course.title}"!`);
            setTimeout(() => setSuccessMessage(''), 3000);

            // Also call API enrollment
            await courseApi.enroll(course.id);

        } catch (error) {
            console.error('Enrollment error:', error);
            setError('Failed to enroll. Please try again.');
            setTimeout(() => setError(''), 3000);
        } finally {
            setEnrollingCourseId(null);
        }
    };

    useEffect(() => {
        let filtered = [...courses];

        if (searchQuery) {
            filtered = filtered.filter(course =>
                course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(course => course.category === selectedCategory);
        }

        if (selectedLevel !== 'All') {
            filtered = filtered.filter(course => course.level === selectedLevel);
        }

        setFilteredCourses(filtered);
    }, [searchQuery, selectedCategory, selectedLevel, courses]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setSelectedLevel('All');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-cover ml-1 lg:ml-1 md:ml-5 bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/tback.png')" }}>
                <div className="text-center">
                    <Loader2 size={40} className="animate-spin text-primary-600 mx-auto mb-4" />
                    <p className="text-gray-500">Loading courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cover ml-1 lg:ml-1 md:ml-5 bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/tback.png')" }}>
            {/* Success Message */}
            {successMessage && (
                <div className="fixed top-20 right-4 z-50 animate-slide-in">
                    <div className="bg-primary-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
                        <CheckCircle size={18} />
                        <span className="text-sm">{successMessage}</span>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="fixed top-20 right-4 z-50 animate-slide-in">
                    <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
                        <AlertCircle size={18} />
                        <span className="text-sm">{error}</span>
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Courses </h1>
                <p className="text-gray-500">Discover courses and start your learning journey</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <GraduationCap size={24} className="text-blue-500 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                    <p className="text-xs text-gray-500">Total Courses</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <Users size={24} className="text-primary-500 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{enrolledCourseIds.size}</p>
                    <p className="text-xs text-gray-500">Enrolled</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <Trophy size={24} className="text-yellow-500 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">50+</p>
                    <p className="text-xs text-gray-500">Certificates</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <Award size={24} className="text-purple-500 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">Expert</p>
                    <p className="text-xs text-gray-500">Instructors</p>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search courses by title or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                    >
                        <Filter size={18} />
                        Filters
                        {(selectedCategory !== 'All' || selectedLevel !== 'All') && (
                            <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                                {(selectedCategory !== 'All' ? 1 : 0) + (selectedLevel !== 'All' ? 1 : 0)}
                            </span>
                        )}
                    </button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="mt-3 p-4 bg-white rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium text-gray-900">Filter Courses</h3>
                            <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-600">
                                Clear all
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-3 py-1 rounded-full text-sm transition-all ${selectedCategory === cat
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                <div className="flex flex-wrap gap-2">
                                    {levels.map(level => (
                                        <button
                                            key={level}
                                            onClick={() => setSelectedLevel(level)}
                                            className={`px-3 py-1 rounded-full text-sm transition-all ${selectedLevel === level
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    ))}s
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Category Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-4 overflow-x-auto">
                {categories.slice(0, 6).map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === category
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    Showing {filteredCourses.length} of {courses.length} courses
                </p>
                {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery) && (
                    <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
                        Clear all filters
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && !successMessage && (
                <div className="text-center py-12 bg-red-50 rounded-xl mb-4">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchCourses}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Courses Grid */}
            {!error && filteredCourses.length === 0 && courses.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
                    <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
                    <p className="text-gray-500">Check back later for new courses</p>
                </div>
            ) : !error && filteredCourses.length === 0 && courses.length > 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
                    <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No matching courses</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                    <button onClick={clearFilters} className="mt-4 text-primary-600 hover:text-primary-700">
                        Clear all filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isEnrolled={enrolledCourseIds.has(course.id)}
                            onEnroll={() => handleEnroll(course)}
                            isEnrolling={enrollingCourseId === course.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// Course Card Component
function CourseCard({ course, isEnrolled, onEnroll, isEnrolling }: {
    course: Course;
    isEnrolled: boolean;
    onEnroll: () => void;
    isEnrolling: boolean;
}) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group h-full flex flex-col">
            <Link href={`/dashboard/courses/${course.id}`} className="block">
                <div className="relative h-48 bg-gradient-to-r from-primary-600 to-primary-700">
                    {course.imageUrl ? (
                        <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <BookOpen size={48} className="text-white/50" />
                        </div>
                    )}
                    {course.level && (
                        <span className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                            {course.level}
                        </span>
                    )}
                    {course.duration && (
                        <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Clock size={12} />
                            {course.duration}
                        </span>
                    )}
                    {isEnrolled && (
                        <span className="absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle size={12} />
                            Enrolled
                        </span>
                    )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                        {course.category && (
                            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                                {course.category}
                            </span>
                        )}
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span>{course.rating || 4.5}</span>
                        </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1">
                        {course.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
                        {course.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Users size={14} />
                            <span>{course.enrolledCount || 100} students</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <BookOpen size={14} />
                            <span>{course.modules?.length || 3} modules</span>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="px-4 pb-4">
                {isEnrolled ? (
                    <Link href={`/dashboard/courses/${course.id}`}>
                        <button className="w-full py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2">
                            <Play size={16} />
                            Continue Learning
                        </button>
                    </Link>
                ) : (
                    <Link href={`/dashboard/courses/${course.id}`}>
                        <button className="w-full py-2 bg-white text-primary-700 border border-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition flex items-center justify-center gap-2">
                            View Course Details
                            <ChevronRight size={16} />
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}
