"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Award,
  Trophy,
  TrendingUp,
} from "lucide-react";

import { courseApi, Course, getUser } from "@/lib/api";

interface CourseWithProgress extends Course {
  progress?: number;
}

// static certificates (UI unchanged)
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
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<CourseWithProgress[]>([]);

  const getCurrentUserId = () => {
    const user = getUser();
    return user?.id || user?.email || "anonymous";
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = getCurrentUserId();

      let enrolledCoursesList: CourseWithProgress[] = [];

      try {
        // ✅ Fetch enrolled courses from backend
        const fetchedCourses = await courseApi.getEnrolledCourses();

        if (fetchedCourses && Array.isArray(fetchedCourses)) {
          const coursesWithProgress = await Promise.all(
            fetchedCourses.map(async (course: any) => {
              try {
                const progressData = await courseApi.getCourseProgress(course.id);

                return {
                  ...course,
                  progress: progressData?.progress ?? 0,
                };
              } catch {
                return { ...course, progress: 0 };
              }
            })
          );

          enrolledCoursesList = coursesWithProgress;

          // ✅ Cache fallback
          localStorage.setItem(
            `enrolledCourses_${userId}`,
            JSON.stringify(enrolledCoursesList)
          );
        }
      } catch {
        console.warn("⚠️ Backend failed, using localStorage fallback");

        enrolledCoursesList = JSON.parse(
          localStorage.getItem(`enrolledCourses_${userId}`) || "[]"
        );
      }

      // ✅ Set enrolled courses
      setEnrolledCourses(enrolledCoursesList);
      try {
        const allCourses = await courseApi.getAll();
        setCourses(allCourses);
      } catch {
        console.warn("Failed to fetch all courses");
      }
    };

    fetchData();
  }, []);

  // ✅ STATS LOGIC (clean + reusable)
  const userId = getCurrentUserId();
  const userCertKey = `userCertifications_${userId}`;

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

  const stats = {
    enrolled: enrolledCourses.length,
    completed,
    inProgress: enrolledCourses.length - completed,
    progress: avgProgress,
    certifications: parseInt(localStorage.getItem(userCertKey) || "0"),
  };

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
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
              <BookOpen className="text-green-600" size={18} />
            </div>
            <span className="text-[20px] font-semibold mr-10 text-gray-900 dark:text-white">
              {stats.enrolled}
            </span>
          </div>
          <p className="text-[13px] text-gray-500 ml-13 dark:text-gray-400">
            Courses Enrolled
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
              <Trophy className="text-green-600" size={18} />
            </div>
            <span className="text-[20px] font-semibold mr-10 text-gray-900 dark:text-white">
              {stats.completed}
            </span>
          </div>
          <p className="text-[13px] text-gray-500 ml-13 dark:text-gray-400">
            Completed
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
              <TrendingUp className="text-green-600" size={18} />
            </div>
            <span className="text-[20px] font-semibold mr-10 text-gray-900 dark:text-white">
              {stats.inProgress}
            </span>
          </div>
          <p className="text-[13px] text-gray-500 ml-13 dark:text-gray-400">
            In Progress
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30">
              <Award className="text-green-600" size={18} />
            </div>
            <span className="text-[20px] font-semibold mr-5 text-gray-900 dark:text-white">
              {stats.progress}%
            </span>
          </div>
          <p className="text-[13px] text-gray-500 ml-13 dark:text-gray-400">
            Overall Progress
          </p>
        </div>
      </div>

      {/* Earned Certificates */}
      <div className="mb-12">
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
              <div className="bg-[#DCFCE7] px-6 py-8 relative">
                <div className="border border-dashed border-green-400 rounded-xl p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <Award className="text-green-700" size={28} />
                  </div>

                  <p className="text-[10px] tracking-[0.1em] text-green-700 uppercase mb-2">
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

              <div className="px-6 py-4">
                <h4 className="text-[14px] font-semibold text-gray-900 mb-1">
                  {cert.title}
                </h4>

                <p className="text-[13px] text-gray-500 mb-3">
                  Instructor: {cert.instructor}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    UI/UX Track
                  </span>

                  <span className="text-[12px] text-gray-400">
                    {cert.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Progress */}
      <div className="w-full flex-col rounded-2xl space-y-5 p-4">
        {enrolledCourses.length === 0 ? (
          <p className="text-gray-500">No enrolled courses found.</p>
        ) : (
          enrolledCourses.map((course) => {
            const progress = course.progress || 0;

            return (
              <div
                key={course.id}
                className="w-full max-w-7xl bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {progress >= 100 ? (
                      <CheckCircle className="text-green-600 mt-1" size={15} />
                    ) : (
                      <BookOpen className="text-green-600 mt-1" size={15} />
                    )}

                    <div>
                      <h2 className="text-base font-semibold text-gray-800">
                        {course.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {course.instructor || "Instructor"}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm font-medium text-gray-800 rounded-full flex justify-around w-20 h-6 bg-green-600">
                    {progress >= 100 ? "Certified" : "Learning"}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 mb-2 text-sm text-gray-500">
                  <span>Progress</span>
                  <span className="text-green-700 font-medium">
                    {progress}%
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-700 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}