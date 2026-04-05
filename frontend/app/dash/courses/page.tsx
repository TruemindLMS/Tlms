'use client'

import { BookOpen, Clock, Play, Star, Users, ChevronRight, Plus, BarChart3, Trophy, GraduationCap, TrendingUp } from 'lucide-react'
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
        title: 'Advanced Figma Design and Prototype',
        instructor: 'Prof. Steven Eason',
        progress: 75,
        image: '/img/cyber-security.jpg',
        duration: '8 hours',
        level: 'Beginner',
        students: 1245,
        rating: 4.8,
        category: 'Design'
    },
    {
        id: 2,
        title: 'Build Classic HTML, and CSS Codes',
        instructor: 'Prof. Steven Eason',
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
        title: 'Intro To Digital Marketing and Market Survey',
        instructor: 'Prof. Steven Eason',
        progress: 20,
        image: '/img/ui-ux.jpg',
        duration: '10 hours',
        level: 'Beginner',
        students: 2156,
        rating: 4.7,
        category: 'Marketing'
    },
    {
        id: 4,
        title: 'Master Graphic Designers and Top Selling Tools',
        instructor: 'Prof. Steven Eason',
        progress: 90,
        image: '/img/data-science.jpg',
        duration: '6 hours',
        level: 'Advanced',
        students: 678,
        rating: 4.8,
        category: 'Design'
    },
    {
        id: 5,
        title: 'Data Analysis Future',
        instructor: 'Prof. Steven Eason',
        progress: 30,
        image: '/img/data-science.jpg',
        duration: '10 hours',
        level: 'Intermediate',
        students: 523,
        rating: 4.6,
        category: 'Data Analysis'
    },
    {
        id: 6,
        title: 'Understanding Auto Layouts',
        instructor: 'Prof. Steven Eason',
        progress: 60,
        image: '/img/ui-ux.jpg',
        duration: '5 hours',
        level: 'Beginner',
        students: 789,
        rating: 4.7,
        category: 'Design'
    },
    {
        id: 7,
        title: 'Cyber Security and Top Tools',
        instructor: 'Prof. Steven Eason',
        progress: 25,
        image: '/img/cyber-security.jpg',
        duration: '15 hours',
        level: 'Advanced',
        students: 432,
        rating: 4.9,
        category: 'Security'
    },
    {
        id: 8,
        title: 'The Essentials of Frontend Development',
        instructor: 'Prof. Steven Eason',
        progress: 55,
        image: '/img/react-course.jpg',
        duration: '12 hours',
        level: 'Intermediate',
        students: 1123,
        rating: 4.8,
        category: 'Development'
    },
    {
        id: 9,
        title: 'Rockwell Development and Vibe Coding',
        instructor: 'Prof. Steven Eason',
        progress: 15,
        image: '/img/react-course.jpg',
        duration: '20 hours',
        level: 'Advanced',
        students: 345,
        rating: 4.7,
        category: 'Development'
    },
    {
        id: 10,
        title: 'Artificial Intelligence Course',
        instructor: 'Prof. Steven Eason',
        progress: 40,
        image: '/img/data-science.jpg',
        duration: '25 hours',
        level: 'Advanced',
        students: 678,
        rating: 4.9,
        category: 'Data Analysis'
    },
    {
        id: 11,
        title: 'Data Analytics And Data Cleaning',
        instructor: 'Prof. Steven Eason',
        progress: 35,
        image: '/img/data-science.jpg',
        duration: '8 hours',
        level: 'Intermediate',
        students: 567,
        rating: 4.6,
        category: 'Data Analysis'
    },
    {
        id: 12,
        title: 'Controllers Bootstrap OpenSource Of Designs',
        instructor: 'Prof. Steven Eason',
        progress: 50,
        image: '/img/ui-ux.jpg',
        duration: '6 hours',
        level: 'Beginner',
        students: 432,
        rating: 4.5,
        category: 'Design'
    },
    {
        id: 13,
        title: 'Data Science And Data Optimization',
        instructor: 'Prof. Steven Eason',
        progress: 70,
        image: '/img/data-science.jpg',
        duration: '14 hours',
        level: 'Advanced',
        students: 876,
        rating: 4.8,
        category: 'Data Analysis'
    },
    {
        id: 14,
        title: 'Advertise Fig Prototype',
        instructor: 'Prof. Steven Eason',
        progress: 10,
        image: '/img/ui-ux.jpg',
        duration: '4 hours',
        level: 'Beginner',
        students: 234,
        rating: 4.4,
        category: 'Design'
    },
]

export default function CoursesPage() {
    return (
        <div className='p-6 md:p-8 max-w-7xl mx-auto'>
            {/* Featured Course Banner */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mb-8 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Advance Figma Design</h2>
                        <p className="text-white mb-2">By Prof. Steven Eason</p>
                        <p className="text-sm text-white">First-class Asian Logistics</p>
                        <div className="flex items-center gap-3 mt-4">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">PSN</span>
                            <button className="bg-white text-primary-700 px-5 py-2 rounded-full text-sm font-medium hover:bg-purple-50 transition">
                                Resume course
                            </button>
                        </div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl">
                        <BookOpen size={48} className="opacity-80" />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <GraduationCap size={20} className="text-blue-500" />
                        <span className="text-2xl font-bold text-gray-800">94</span>
                    </div>
                    <p className="text-sm text-gray-500">Total Courses</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <BookOpen size={20} className="text-green-500" />
                        <span className="text-2xl font-bold text-gray-800">22</span>
                    </div>
                    <p className="text-sm text-gray-500">Programs</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <Trophy size={20} className="text-yellow-500" />
                        <span className="text-2xl font-bold text-gray-800">94</span>
                    </div>
                    <p className="text-sm text-gray-500">Courses Completed</p>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp size={20} className="text-purple-500" />
                        <span className="text-2xl font-bold text-gray-800">59%</span>
                    </div>
                    <p className="text-sm text-gray-500">Avg. Progress</p>
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
                {['All', 'Design', 'Development', 'Marketing', 'Data Analysis', 'Security'].map((category) => (
                    <button
                        key={category}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${category === 'All'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Courses List */}
            <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                    >
                        <div className="flex flex-col md:flex-col justify-between items-start md:items-center gap-4">
                            {/* Course Info */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-500">{course.instructor}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <button className="px-5 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                                    Continue
                                </button>
                                <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                                    Add To List
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}