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

        </div>
    )
}