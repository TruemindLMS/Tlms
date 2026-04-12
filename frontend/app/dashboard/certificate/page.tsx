'use client'

import { BookOpen, Clock, Star, Users, CheckCircle } from 'lucide-react'
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

export default function CertificatePage() {
    return (
        <div className='ml-20'>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Certificate & Progress
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Track your learning journey and earned certificates
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex-col items-center justify-between mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                            <BookOpen className="text-blue-600 dark:text-blue-400" size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">4</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Courses <br /> Enrolled</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg">
                            <Clock className="text-primary-600 dark:text-primary-400" size={20} />
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

            <div className="mb-8 flex">
                <BookOpen className="text-green-600 dark:text-green-400" size={15} />
                <h1 className=" md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Course Progress (5 Courses)
                </h1>
            </div>

            {/* Courses Grid */}

            <div className="w-full flex-col rounded-2xl space-y-5  p-2">

                <div className='w-full max-w-7xl bg-white rounded-2xl p-4 shadow-sm'>
                    <div className='flex items-start justify-between'>

                        <div className='flex items-start gap-3'>
                            <CheckCircle className='text-green-600 mt-1' size={15} />
                            <div>
                                <h2 className='text-base font-semibold text-gray-800 '>UI/UX Design Fundamentals </h2>
                                <p className='text-sm text-gray-500 '>Tunde Adebayo</p>
                            </div>
                        </div>
                        <div className='text-sm font-medium text-gray-800 rounded-full flex justify-around  w-20 h-6 bg-green-600'>Certified</div>
                    </div>

                    {/* Progress Info */}
                    <div className="flex justify-between items-center mt-6 mb-2 text-sm text-gray-500">
                        <span>12/12 Lessons</span>
                        <span className="text-green-700 font-medium">100%</span>
                    </div>



                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-700 rounded-full"
                            style={{ width: `${100}%` }}
                        />

                    </div>
                </div>

                {/* Additional courses can be added here following the same structure */}
                <div className='w-full max-w-7xl bg-white rounded-2xl p-6 shadow-sm'>
                    <div className='flex items-start justify-between'>

                        <div className='flex items-start gap-3'>
                            <CheckCircle className='text-green-600 mt-1' size={15} />
                            <div>
                                <h2 className='text-base font-semibold text-gray-800 '>Design Systems & Component Libraries </h2>
                                <p className='text-sm text-gray-500 '>Tunde Adebayo</p>
                            </div>
                        </div>
                        <div className='text-sm font-medium text-gray-800 rounded-full flex justify-around  w-20 h-6 bg-green-600'>Certified</div>
                    </div>

                    {/* Progress Info */}
                    <div className="flex justify-between items-center mt-6 mb-2 text-sm text-gray-500">
                        <span>8/8Lessons</span>
                        <span className="text-green-700 font-medium">100%</span>
                    </div>



                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-700 rounded-full"
                            style={{ width: `${100}%` }}
                        />

                    </div>
                </div>

                {/* Additional courses can be added here following the same structure */}
                <div className='w-full max-w-7xl bg-white rounded-2xl p-6 shadow-sm'>
                    <div className='flex items-start justify-between'>

                        <div className='flex items-start gap-3'>
                            <BookOpen className='text-green-600 mt-1' size={15} />
                            <div>
                                <h2 className='text-base font-semibold text-gray-800 '>User Research & Testing  </h2>
                                <p className='text-sm text-gray-500 '>Amaka Obi </p>
                            </div>
                        </div>
                        <div className='text-sm font-medium text-gray-800 rounded-full flex justify-around  w-20 h-6 bg-green-600'>Certified</div>
                    </div>

                    {/* Progress Info */}
                    <div className="flex justify-between items-center mt-6 mb-2 text-sm text-gray-500">
                        <span>7/10 Lessons</span>
                        <span className="text-green-700 font-medium">72%</span>
                    </div>



                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-700 rounded-full"
                            style={{ width: `${72}%` }}
                        />

                    </div>

                    <div className='flex gap-1'>
                        <Clock className='text-gray-300 text-xs mt-1' size={10} />
                        <p className='text-xs text-gray-500'>3 lessons left</p>
                    </div>

                </div>


                {/* Additional courses can be added here following the same structure */}
                <div className='w-full max-w-7xl bg-white rounded-2xl p-6 shadow-sm'>
                    <div className='flex items-start justify-between'>

                        <div className='flex items-start gap-3'>
                            <BookOpen className='text-green-600 mt-1' size={15} />
                            <div>
                                <h2 className='text-base font-semibold text-gray-800 '>Prototyping with Figma  </h2>
                                <p className='text-sm text-gray-500 '>Tunde Adebayo</p>
                            </div>
                        </div>
                        <div className='text-sm font-medium text-gray-800 rounded-full flex justify-around  w-20 h-6 bg-green-600'>Certified</div>
                    </div>

                    {/* Progress Info */}
                    <div className="flex justify-between items-center mt-6 mb-2 text-sm text-gray-500">
                        <span>7/15 Lessons</span>
                        <span className="text-green-700 font-medium">45%</span>
                    </div>



                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-700 rounded-full"
                            style={{ width: `${45}%` }}
                        />

                    </div>

                    <div className='flex gap-2'>
                        <Clock className='text-gray-300 text-xs mt-1' size={10} />
                        <p className='text-xs text-gray-500'>8 lessons left</p>
                    </div>

                </div>

                {/* Additional courses can be added here following the same structure */}
                <div className='w-full max-w-7xl bg-white rounded-2xl p-4 shadow-sm'>
                    <div className='flex items-start justify-between'>

                        <div className='flex items-start gap-3'>
                            <BookOpen className='text-green-600 mt-1' size={15} />
                            <div>
                                <h2 className='text-base font-semibold text-gray-800 '>Interaction Design Principles </h2>
                                <p className='text-sm text-gray-500 '>Amaka Obi </p>
                            </div>
                        </div>
                        <div className='text-sm font-medium text-gray-800 rounded-full flex justify-around  w-20 h-6 bg-green-600'>Certified</div>
                    </div>

                    {/* Progress Info */}
                    <div className="flex justify-between items-center mt-6 mb-2 text-sm text-gray-500">
                        <span>2/15 Lessons</span>
                        <span className="text-green-700 font-medium">13%</span>
                    </div>



                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-700 rounded-full"
                            style={{ width: `${13}%` }} />

                    </div>

                    <div className='flex gap-2'>
                        <Clock className='text-gray-300 text-xs mt-1' size={10} />
                        <p className='text-xs text-gray-500'>13 lessons left</p>
                    </div>


                </div>




            </div>



        </div>
    )
}
