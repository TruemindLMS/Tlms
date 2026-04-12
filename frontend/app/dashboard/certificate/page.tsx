"use client";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Course, courseApi, getUser, isAuthenticated } from "@/lib/api";
import { div } from "framer-motion/client";
import { TrendUp } from "iconsax-react";
import {
  BookOpen,
  Clock,
  Star,
  Users,
  CheckCircle,
  ArrowBigRight,
  ChevronRight,
  Trophy,
  TrendingUp,
  Award,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CertificatePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const coursesresponse = await courseApi.getAll();
      const mappedCourses: Course[] = coursesresponse.map(
        (course: any, index: number) => ({
          ...course,
          enrolled: true,
          completed: index < 2,
          inProgress: index >= 2,
          overallProgress: index < 2 ? 100 : 30,
        }),
      );
      setCourses(mappedCourses);
    } catch (err) {
      setError("Failed to fetch enrolled courses.");
    } finally {
      setLoading(false);
    }
  };

  const enrolledCourses = courses.filter((course) => course.enrolled).length;
  const completedCourses = courses.filter((course) => course.completed).length;
  const inProgressCourses = courses.filter(
    (course) => course.inProgress,
  ).length;
  const overallProgress =
    courses.length > 0
      ? Math.round((completedCourses / courses.length) * 100)
      : 0;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/signin");
      return;
    }
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2
            size={40}
            className="animate-spin text-primary-600 mx-auto mb-4"
          />
          <p className="text-gray-500">Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-20 py-6  ">
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center">
          <Link
            href={"/dashboard"}
            className=" text-balance sm:text-2xl font-normal text-[#6B7280]"
          >
            Dashboard
          </Link>
          <ChevronRight />
          <p className=" text-base sm:text-2xl font-medium text-primary-500 ">
            Certificates
          </p>
        </div>
        <p className=" text-2xl sm:text-4xl font-bold text-[#1C2A39]">
          Certificates & Progress
        </p>
        <p className="text-gray-600 text-sm sm:text-base dark:text-gray-400">
          Track your learning journey and earned certificates
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 my-8">
        <div className="bg-white dark:bg-gray-900 flex items-center gap-5 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="bg-[#DFFFE7] text-primary-500 w-14 h-14 flex items-center justify-center dark:bg-blue-900/30 p-3 rounded-lg">
            <BookOpen className="" size={36} />
          </div>
          <div className="">
            <span className="text-4xl font-bold text-[#1C2A39] dark:text-white">
              {enrolledCourses}
            </span>
            <p className="text-[#6B7280] text-xl font-normal dark:text-gray-400">
              Courses <br /> Enrolled
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 flex items-center gap-4 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="bg-[#DFFFE7] text-primary-500 w-14 h-14 flex items-center justify-center dark:bg-blue-900/30 p-3 rounded-lg">
            <Trophy className="" size={36} />
          </div>
          <div className="">
            <span className="text-4xl font-bold text-[#1C2A39] dark:text-white">
              {completedCourses}
            </span>
            <p className="text-[#6B7280] text-xl font-normal dark:text-gray-400">
              Completed
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 flex items-center gap-4 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="bg-[#DFFFE7] text-primary-500 w-14 h-14 flex items-center justify-center dark:bg-blue-900/30 p-3 rounded-lg">
            <TrendingUp className="" size={36} />
          </div>
          <div className="">
            <span className="text-4xl font-bold text-[#1C2A39] dark:text-white">
              {inProgressCourses}
            </span>
            <p className="text-[#6B7280] text-xl font-normal dark:text-gray-400">
              In Progress
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 flex items-center gap-4 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="bg-[#DFFFE7] text-primary-500 w-14 h-14 flex items-center justify-center dark:bg-blue-900/30 p-3 rounded-lg">
            <Award className="" size={36} />
          </div>
          <div className="">
            <span className="text-4xl font-bold text-[#1C2A39] dark:text-white">
              {overallProgress}%
            </span>
            <p className="text-[#6B7280] text-xl font-normal dark:text-gray-400">
              Overall Progress
            </p>
          </div>
        </div>
      </div>

      <div className="my-8">
        <div className="flex items-center gap-2">
          <Award className="text-primary-500" size={36} />
          <p className="font-medium text-xl sm:text-3xl text-[#1C2A39]">
            Earned Certificates
          </p>
          <span className=" text-lg sm:text-2xl font-normal text-[#6B7280] dark:text-white">
            ({completedCourses})
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch h-full my-8 gap-6">
        {courses.slice(0, 2).map((course, i) => (
          <div className="h-full " key={i}>
            <Certificate title={course.title} />
          </div>
        ))}
      </div>

      <div className="mb-8 flex">
        <BookOpen className="text-green-600 dark:text-green-400" size={15} />
        <h1 className=" md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Course Progress (5 Courses)
        </h1>
      </div>

      {/* Courses Grid */}
      <div className="w-full flex-col rounded-2xl space-y-5 p-4">
        <div className="w-full max-w-7xl bg-white rounded-2xl p-6 shadow-sm">
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
        <div className="w-full max-w-7xl bg-white rounded-2xl p-6 shadow-sm">
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
        <div className="w-full max-w-7xl bg-white rounded-2xl p-6 shadow-sm">
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

        {/* Additional courses can be added here following the same structure */}
        <div className="w-full max-w-7xl bg-white rounded-2xl p-6 shadow-sm">
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

        {/* Additional courses can be added here following the same structure */}
        <div className="w-full max-w-7xl bg-white rounded-2xl p-4 shadow-sm">
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

const Certificate = ({ title }: { title: string }) => {
  const user = getUser();

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#DFFFE7] p-4 md:p-6 rounded-t-lg ">
        <div className=" space-y-2 p-5 border-2 border-dashed  rounded-lg border-[#46885C] flex flex-col items-center justify-center  ">
          <Award className="text-primary-500" size={50} />
          <p className=" text-base xl:text-xl font-light text-[#6B7280] ">
            CERTIFICATE OF COMPLETION
          </p>
          <p className=" text-xl xl:text-3xl font-bold text-[#1C2A39] text-center">
            {title}
          </p>
          <p className=" text-base xl:text-xl font-normal text-primary-500 ">
            {user?.fullName}
          </p>
        </div>
      </div>
      <div className="p-8 bg-white flex-1 flex flex-col justify-between rounded-b-lg ">
        <p className=" text-lg xl:text-2xl font-medium text-[#1C2A39] ">
          {title}
        </p>
        <p className=" text-base xl:text-xl font-light text-[#6B7280] ">
          Instructor: Tunde Adebayo
        </p>
        <div className="flex items-center justify-between mt-2 sm:mt-4">
          <p className="bg-[#DFFFE7] w-24 sm:w-28 h-8 sm:h-10 text-sm sm:text-lg text-center flex items-center justify-center text-primary-500 rounded-2xl">
            UI/UX Track
          </p>
          <p className=" text-sm xl:text-lg font-normal text-[#6B7280]">
            March 28, 2026
          </p>
        </div>
      </div>
    </div>
  );
};
