'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Clock, Star, Users, ChevronRight } from 'lucide-react';
import { Course } from '@/lib/api';

interface CourseCardProps {
    course: Course;
    variant?: 'default' | 'compact' | 'featured';
    showProgress?: boolean;
    onEnroll?: (courseId: string) => void;
    onContinue?: (courseId: string) => void;
    isEnrolled?: boolean;
    progress?: number;
}

export default function CourseCard({
    course,
    variant = 'default',
    showProgress = false,
    onEnroll,
    onContinue,
    isEnrolled = false,
    progress = 0
}: CourseCardProps) {

    if (variant === 'compact') {
        return (
            <Link href={`/dashboard/courses/${course.id}`}>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen size={24} className="text-white/70" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm mb-0.5 line-clamp-1">{course.title}</h4>
                            <p className="text-xs text-gray-500 mb-2">{course.instructor || 'Expert Instructor'}</p>
                            {showProgress && (
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">{progress}%</span>
                                </div>
                            )}
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition" />
                    </div>
                </div>
            </Link>
        );
    }

    if (variant === 'featured') {
        return (
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-3">
                                Featured Course
                            </span>
                            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                            <p className="text-white/80 text-sm mb-4 line-clamp-2">{course.description}</p>
                            <div className="flex items-center gap-4 text-sm text-white/80 mb-4">
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    <span>{course.duration || '10 hours'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users size={14} />
                                    <span>{course.enrolledCount || 0} students</span>
                                </div>
                                {course.rating && (
                                    <div className="flex items-center gap-1">
                                        <Star size={14} fill="white" />
                                        <span>{course.rating}</span>
                                    </div>
                                )}
                            </div>
                            {isEnrolled ? (
                                <button
                                    onClick={() => onContinue?.(course.id)}
                                    className="bg-white text-primary-700 px-5 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition"
                                >
                                    Continue Learning
                                </button>
                            ) : (
                                <button
                                    onClick={() => onEnroll?.(course.id)}
                                    className="bg-white text-primary-700 px-5 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition"
                                >
                                    Enroll Now
                                </button>
                            )}
                        </div>
                        <div className="hidden md:block w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center">
                            <BookOpen size={40} className="text-white/50" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default variant
    return (
        <Link href={`/dashboard/courses/${course.id}`}>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer">
                <div className="relative h-48 bg-gradient-to-r from-primary-500 to-primary-600">
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
                    {course.rating && (
                        <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Star size={12} fill="white" />
                            {course.rating}
                        </span>
                    )}
                    {showProgress && progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                            <div className="h-full bg-primary-400 transition-all" style={{ width: `${progress}%` }} />
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        {course.category && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                {course.category}
                            </span>
                        )}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Users size={12} />
                            <span>{course.enrolledCount || 0}</span>
                        </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">
                        {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                        {course.description}
                    </p>

                    {showProgress && progress > 0 && (
                        <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-500">Progress</span>
                                <span className="text-primary-600 font-medium">{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div className="bg-primary-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    )}

                    <button className="w-full py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2 group-hover:gap-3">
                        {isEnrolled ? 'Continue' : 'View Course'}
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
                    </button>
                </div>
            </div>
        </Link>
    );
}
