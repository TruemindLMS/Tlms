'use client'

import { BookOpen, Clock, Play, Star, Users, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Course {
    id: number
    title: string
    instructor: string
    progress: number
    image: string
    duration: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    students: number
    rating: number
    category: string
}

const courses: Course[] = [
    {
        id: 1,
        title: 'The Complete Cyber Security Course',
        instructor: 'Kevin Martin',
        progress: 75,
        image: '/img/cyber-security.jpg',
        duration: '8 hours',
        level: 'Beginner',
        students: 1245,
        rating: 4.8,
        category: 'Cybersecurity'
    },
    {
        id: 2,
        title: 'Advanced React Development',
        instructor: 'Sarah Johnson',
        progress: 45,
        image: '/img/react-course.jpg',
        duration: '12 hours',
        level: 'Intermediate',
        students: 892,
        rating: 4.9,
        category: 'Development'
    },
    {
        id: 3,
        title: 'UI/UX Design Fundamentals',
        instructor: 'Michael Chen',
        progress: 20,
        image: '/img/ui-ux.jpg',
        duration: '10 hours',
        level: 'Beginner',
        students: 2156,
        rating: 4.7,
        category: 'Design'
    },
    {
        id: 4,
        title: 'Data Science Essentials',
        instructor: 'Emily Rodriguez',
        progress: 90,
        image: '/img/data-science.jpg',
        duration: '6 hours',
        level: 'Advanced',
        students: 678,
        rating: 4.8,
        category: 'Data Science'
    },
]

export default function ProgressPage() {
    return (
        <div className='ml-20'>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    My Progress 📚
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Here is your learning progress
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                            <BookOpen className="text-blue-600 dark:text-blue-400" size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">4</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Active Courses</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                            <Clock className="text-green-600 dark:text-green-400" size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">36h</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total Hours</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                            <Star className="text-purple-600 dark:text-purple-400" size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">4.8</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Avg. Rating</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                            <Users className="text-orange-600 dark:text-orange-400" size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">4.9k</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Students</p>
                </div>
            </div>

            {/* Course Categories */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['All', 'Cybersecurity', 'Development', 'Design', 'Data Science'].map((category) => (
                    <button
                        key={category}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                                <BookOpen size={48} className="text-white opacity-50" />
                            </div>
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${course.level === 'Beginner'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : course.level === 'Intermediate'
                                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                    {course.level}
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="mb-3">
                                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                                    {course.category}
                                </span>
                                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mt-1 line-clamp-1">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {course.instructor}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mb-3 text-sm">
                                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                    <Clock size={14} />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                    <span>{course.rating}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                    <Users size={14} />
                                    <span>{course.students}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-primary-600 h-2 rounded-full transition-all"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                            </div>

                            <Link
                                href={`/dash${course.id}`}
                                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-primary-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            >
                                Continue Learning
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}