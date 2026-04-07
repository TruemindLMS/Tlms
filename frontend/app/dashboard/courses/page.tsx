'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    BookOpen, Clock, Star, Users, Play, ChevronRight,
    Search, Filter, Loader2, Trophy, Award, Target, GraduationCap
} from 'lucide-react';
import { isAuthenticated, courseApi, Course } from '@/lib/api';

export default function CoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<string[]>(['All']);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/signin');
            return;
        }
        fetchCourses();
    }, [router]);

    const fetchCourses = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('🟡 Fetching courses...');
            const data = await courseApi.getAll();

            console.log('🟢 Courses fetched:', data);

            let coursesArray: Course[] = Array.isArray(data) ? data : [];

            // Validate courses have IDs
            const validatedCourses = coursesArray.map((course, index) => {
                if (!course.id) {
                    console.warn(`Course missing ID: ${course.title}, generating fallback`);
                }
                return {
                    ...course,
                    id: course.id || `course_${index}_${Date.now()}`
                };
            });

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

        setFilteredCourses(filtered);
    }, [searchQuery, selectedCategory, courses]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 size={40} className="animate-spin text-primary-600 mx-auto mb-4" />
                    <p className="text-gray-500">Loading courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cover ml-1 lg:ml-1 md:ml-5 bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/tback.png')" }}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Courses 📚</h1>
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
                    <Users size={24} className="text-green-500 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">10k+</p>
                    <p className="text-xs text-gray-500">Active Students</p>
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

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search courses by title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Showing {filteredCourses.length} of {courses.length} courses
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="text-center py-12 bg-red-50 rounded-xl mb-4">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchCourses}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Courses Grid */}
            {!error && filteredCourses.length === 0 && courses.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
                    <p className="text-gray-500">Check back later for new courses</p>
                </div>
            ) : !error && filteredCourses.length === 0 && courses.length > 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No matching courses</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            )}
        </div>
    );
}

// Course Card Component
function CourseCard({ course }: { course: Course }) {
    return (
        <Link href={`/dashboard/courses/${course.id}`}>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer h-full flex flex-col">
                <div className="relative h-48 bg-gradient-to-r from-green-600 to-green-700">
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
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                        {course.category && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
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
                            <span>{course.enrolledCount || 0} students</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <BookOpen size={14} />
                            <span>{course.modules?.length || 0} modules</span>
                        </div>
                    </div>

                    <button className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2 group-hover:gap-3">
                        View Course
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
                    </button>
                </div>
            </div>
        </Link>
    );
}