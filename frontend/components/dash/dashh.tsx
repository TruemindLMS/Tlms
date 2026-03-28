"use client";
import { useState } from "react";
import {
  ClipboardCheck,
  BookOpen,
  Brain,
  Clock,
  Trophy,
  Play,
} from "lucide-react";
import Image from "next/image";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

/* ================= COMPONENTS ================= */

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ size: number }>;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center hover:shadow-md transition-shadow">
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {value}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={20} />
    </div>
  </div>
);

interface ClassCardProps {
  instructor: string;
  course: string;
  module: string;
  image: string;
  buttonText: string;
  buttonColor: string;
  buttonBg: string;
  borderColor?: string;
}

const ClassCard = ({
  instructor,
  course,
  module,
  image,
  buttonText,
  buttonColor,
  buttonBg,
  borderColor = "border-gray-200 dark:border-gray-700",
}: ClassCardProps) => (
  <div
    className={`border ${borderColor} p-4 rounded-xl flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-0 hover:shadow-md transition-shadow`}
  >
    <div className="flex gap-4 items-center">
      <Image
        src={image}
        width={60}
        height={60}
        alt={instructor}
        className="rounded-full object-cover"
      />
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">
          {course}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{instructor}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{module}</p>
      </div>
    </div>
    <button
      className={`${buttonBg} ${buttonColor} px-5 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium`}
    >
      {buttonText === "Join Now" && <Play size={14} />}
      {buttonText}
    </button>
  </div>
);

/* ================= MAIN ================= */

export default function Dashboard() {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">(
    "month",
  );

  const dataMap = {
    day: [
      { name: "12 AM", value: 40 },
      { name: "6 AM", value: 30 },
      { name: "12 PM", value: 60 },
      { name: "6 PM", value: 80 },
    ],
    week: [
      { name: "Mon", value: 40 },
      { name: "Tue", value: 50 },
      { name: "Wed", value: 60 },
      { name: "Thu", value: 70 },
      { name: "Fri", value: 80 },
      { name: "Sat", value: 85 },
      { name: "Sun", value: 90 },
    ],
    month: [
      { name: "Week 1", value: 50 },
      { name: "Week 2", value: 60 },
      { name: "Week 3", value: 75 },
      { name: "Week 4", value: 85 },
    ],
    year: [
      { name: "Jan", value: 40 },
      { name: "Feb", value: 50 },
      { name: "Mar", value: 60 },
      { name: "Apr", value: 55 },
      { name: "May", value: 70 },
      { name: "Jun", value: 80 },
      { name: "Jul", value: 85 },
      { name: "Aug", value: 90 },
      { name: "Sep", value: 88 },
      { name: "Oct", value: 92 },
      { name: "Nov", value: 95 },
      { name: "Dec", value: 98 },
    ],
  };

  const stats = [
    {
      title: "Active Courses",
      value: "16",
      icon: BookOpen,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      title: "Attempt Quiz",
      value: "16",
      icon: Brain,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      title: "Assignment",
      value: "26",
      icon: ClipboardCheck,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      title: "Study Hour",
      value: "24h",
      icon: Clock,
      color:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
    {
      title: "Achievements",
      value: "4",
      icon: Trophy,
      color:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
  ];

  const classes = [
    {
      instructor: "Kevin Martin",
      course: "The Complete Cyber Security Course",
      module: "Module 1: Phishing Attack Simulation",
      image: "/img/Profile-img-2.jpg",
      buttonText: "Join Now",
      buttonColor: "text-white",
      buttonBg: "bg-red-500 hover:bg-red-600",
      borderColor: "border-red-200 dark:border-red-800",
    },
    {
      instructor: "Kevin Martin",
      course: "The Complete Cyber Security Course",
      module: "Module 1: Phishing Attack Simulation",
      image: "/img/Profile-img-1.jpg",
      buttonText: "Join Now",
      buttonColor: "text-indigo-600 dark:text-indigo-400",
      buttonBg:
        "bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50",
      borderColor: "border-gray-200 dark:border-gray-700",
    },
  ];

  const recommendations = [
    {
      emoji: "📘",
      title: "Review Calculus Concepts",
      description: "Based on your recent quiz performance",
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      emoji: "📅",
      title: "Plan Your Week",
      description: "You have 3 pending assignments",
      color: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      emoji: "📈",
      title: "Improve Physics Performance",
      description: "Practice more problems",
      color: "bg-green-50 dark:bg-green-900/20",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 ">
      {/* Main Content */}
      <main className=" ml-16 md:ml-20 transition-all duration-300">
        <div className="p-4 md:p-6">
          {/* Welcome */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, Jane! 👋
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Here's what's happening with your learning today
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Classes */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                Upcoming Classes
              </h3>
              <div className="space-y-4">
                {classes.map((classItem, index) => (
                  <ClassCard key={index} {...classItem} />
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                AI Recommendations
              </h3>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-3 ${rec.color} rounded-lg transition-all hover:scale-[1.02] cursor-pointer`}
                  >
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {rec.emoji} {rec.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {rec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                Performance Trend
              </h3>
              <div className="flex gap-2">
                {["day", "week", "month", "year"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p as "day" | "week" | "month" | "year")}
                    className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                      period === p
                        ? "bg-green-700 text-white hover:bg-green-500"
                        : "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-[300px] min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataMap[period]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#16a34a"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
