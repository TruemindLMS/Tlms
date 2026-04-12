"use client";

import {
  BookOpen,
  Clock,
  CheckCircle,
  Award,
  Trophy,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  image: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  students: number;
  rating: number;
  category: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "The Complete Cyber Security Course",
    instructor: "Kevin Martin",
    progress: 75,
    image: "/img/cyber-security.jpg",
    duration: "8 hours",
    level: "Beginner",
    students: 1245,
    rating: 4.8,
    category: "Cybersecurity",
  },
];

// ✅ NEW: Earned Certificates Data
const earnedCertificates = [
  {
    id: "1",
    title: "UI/UX Design Fundamentals",
    instructor: "Tunde Adebayo",
    date: "December 15, 2024",
  },
  {
    id: "2",
    title: "Design Systems & Component Libraries",
    instructor: "Tunde Adebayo",
    date: "December 20, 2024",
  },
];

export default function CertificatePage() {
  return (
    <div className="ml-20">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
              <BookOpen
                className="text-green-600 dark:text-green-400"
                size={18}
              />
            </div>
            <span className="text-[20px] font-semibold mr-10 text-gray-900 dark:text-white">
              5
            </span>
          </div>
          <p className="text-[13px] text-gray-500 ml-13 dark:text-gray-400">
            Courses Enrolled
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
              <Trophy
                className="text-green-600 dark:text-green-400"
                size={18}
              />
            </div>
            <span className="text-[20px] font-semibold mr-10 text-gray-900 dark:text-white">
              2
            </span>
          </div>
          <p className="text-[13px] text-gray-500 ml-13 dark:text-gray-400">
            Completed
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
              <TrendingUp
                className="text-green-600 dark:text-green-400"
                size={18}
              />
            </div>
            <span className="text-[20px] font-semibold mr-10 text-gray-900 dark:text-white">
              3
            </span>
          </div>
          <p className="text-[13px] text-gray-500 ml-13 dark:text-gray-400">
            In Progress
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
              <Award className="text-green-600 dark:text-green-400" size={18} />
            </div>
            <span className="text-[20px] font-semibold mr-5 text-gray-900 dark:text-white">
              67%
            </span>
          </div>
          <p className="text-[13px] text-gray-500 ml-13 dark:text-gray-400">
            Overall Progress
          </p>
        </div>
      </div>

      {/* ✅ Earned Certificates */}
      <div className="mb-12">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Award className="text-green-600" size={18} />
          <h2 className="text-[18px] font-semibold text-gray-900 dark:text-white">
            Earned Certificates ({earnedCertificates.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {earnedCertificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              {/* GREEN CERTIFICATE SECTION */}
              <div className="bg-[#DCFCE7] px-6 py-8 relative">
                <div className="border border-dashed border-green-400 rounded-xl p-6 text-center">
                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <Award className="text-green-700" size={28} />
                  </div>

                  {/* Badge */}
                  <p className="text-[10px] tracking-[0.1em] text-green-700 uppercase mb-2">
                    Certificate of completion
                  </p>

                  {/* Title */}
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
                    {cert.title}
                  </h3>

                  {/* Name */}
                  <p className="text-[13px] text-green-800 font-medium">
                    {cert.instructor}
                  </p>
                </div>
              </div>

              {/* WHITE INFO SECTION */}
              <div className="px-6 py-4">
                {/* Title */}
                <h4 className="text-[14px] font-semibold text-gray-900 mb-1">
                  {cert.title}
                </h4>

                {/* Instructor */}
                <p className="text-[13px] text-gray-500 mb-3">
                  Instructor: {cert.instructor}
                </p>

                {/* Bottom Row */}
                <div className="flex items-center justify-between">
                  {/* Track Badge */}
                  <span className="text-[11px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    UI/UX Track
                  </span>

                  {/* Date */}
                  <span className="text-[12px] text-gray-400">{cert.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Progress */}
      <div className="mb-8 flex items-center gap-2">
        <BookOpen className="text-green-600 dark:text-green-400" size={15} />
        <h1 className="md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Course Progress (5 Courses)
        </h1>
      </div>

      {/* Courses Grid */}
      <div className="w-full flex-col rounded-2xl space-y-5 p-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={15} />
              <div>
                <h2 className="text-base font-semibold text-gray-800 ">
                  UI/UX Design Fundamentals{" "}
                </h2>
                <p className="text-sm text-gray-500 ">Tunde Adebayo</p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-800 rounded-full flex justify-around  w-20 h-6 bg-green-600">
              Certified
            </div>
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
        <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={15} />
              <div>
                <h2 className="text-base font-semibold text-gray-800 ">
                  Design Systems & Component Libraries{" "}
                </h2>
                <p className="text-sm text-gray-500 ">Tunde Adebayo</p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-800 rounded-full flex justify-around  w-20 h-6 bg-green-600">
              Certified
            </div>
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
        <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <BookOpen className="text-green-600 mt-1" size={15} />
              <div>
                <h2 className="text-base font-semibold text-gray-800 ">
                  User Research & Testing{" "}
                </h2>
                <p className="text-sm text-gray-500 ">Amaka Obi </p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-800 rounded-full flex justify-around  w-20 h-6 bg-green-600">
              Certified
            </div>
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

          <div className="flex gap-1">
            <Clock className="text-gray-300 text-xs mt-1" size={10} />
            <p className="text-xs text-gray-500">3 lessons left</p>
          </div>
        </div>
        <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <BookOpen className="text-green-600 mt-1" size={15} />
              <div>
                <h2 className="text-base font-semibold text-gray-800 ">
                  Prototyping with Figma{" "}
                </h2>
                <p className="text-sm text-gray-500 ">Tunde Adebayo</p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-800 rounded-full flex justify-around  w-20 h-6 bg-green-600">
              Certified
            </div>
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

          <div className="flex gap-2">
            <Clock className="text-gray-300 text-xs mt-1" size={10} />
            <p className="text-xs text-gray-500">8 lessons left</p>
          </div>
        </div>
        <div className="w-full max-w-3xl bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <BookOpen className="text-green-600 mt-1" size={15} />
              <div>
                <h2 className="text-base font-semibold text-gray-800 ">
                  Interaction Design Principles{" "}
                </h2>
                <p className="text-sm text-gray-500 ">Amaka Obi </p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-800 rounded-full flex justify-around  w-20 h-6 bg-green-600">
              Certified
            </div>
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
              style={{ width: `${13}%` }}
            />
          </div>

          <div className="flex gap-2">
            <Clock className="text-gray-300 text-xs mt-1" size={10} />
            <p className="text-xs text-gray-500">13 lessons left</p>
          </div>
        </div>
      </div>
    </div>
  );
}
