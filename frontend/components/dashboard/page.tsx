"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Video,
  ClipboardCheck,
  HelpCircle,
  Users,
  PieChart,
  Settings,
  Search,
  Bell,
  BookOpen,
  Brain,
  Clock,
  Trophy,
  Play,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

/* ================= COMPONENTS ================= */

interface SidebarItemProps {
  icon: React.ComponentType<{ size: number }>;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
      active
        ? "bg-green-700 text-white"
        : "text-green-500 hover:bg-green-100"
    }`}
  >
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ size: number }>;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-center">
    <div>
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={20} />
    </div>
  </div>
);

/* ================= MAIN ================= */

export default function Dashboard() {
  const [period, setPeriod] = useState("month");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 to-green-100 p-6">
      <div className="bg-white rounded-3xl flex overflow-hidden shadow-xl relative">

        {/* Mobile Hamburger / Close */}
        <button
          className="fixed top-3 left-3 md:hidden p-3 bg-white rounded-full shadow-md z-50"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`w-64 bg-white border-r p-6
          fixed md:relative top-0 left-0 h-full z-40
          transform transition-transform duration-300 ease-in-out
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          overflow-y-auto`}
        >
          <h1 className="text-lg font-bold mb-6 ml-10 md:ml-0">LMS</h1>

          <div className="space-y-2 pb-10">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarItem icon={FileText} label="Courses" />
            <SidebarItem icon={Video} label="Live Classes" />
            <SidebarItem icon={ClipboardCheck} label="Assignment" />
            <SidebarItem icon={HelpCircle} label="Quizzes" />
            <SidebarItem icon={Users} label="Tutors" />
            <SidebarItem icon={PieChart} label="Reports" />
            <SidebarItem icon={Settings} label="Settings" />
          </div>
        </aside>

        {/* Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full md:w-[400px]">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                placeholder="Search course, assignment, tutors..."
                className="w-full pl-10 py-2 rounded-full bg-gray-100"
              />
            </div>

            <div className="flex items-center gap-4">
              <Bell />

              {/* USER INFO */}
              <div className="flex items-center gap-2 max-w-[140px] sm:max-w-none">
                <Image
                  src="/img/Profile-img-1.jpg"
                  width={40}
                  height={40}
                  alt="user"
                  className="rounded-full flex-shrink-0"
                />
                <div className="text-sm min-w-0">
                  <p className="font-semibold truncate">
                    Charlotte Jane
                  </p>
                  <p className="text-gray-400 text-xs break-all">
                    charlotte@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome */}
          <div className="mb-6">
            <h2 className="text-xl font-bold">
              Welcome back, Jane! 👋
            </h2>
            <p className="text-sm text-gray-500">
              Here what is happening with your learning today
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <StatCard title="Active Courses" value="16" icon={BookOpen} color="bg-green-100 text-green-600" />
            <StatCard title="Attempt Quiz" value="16" icon={Brain} color="bg-green-100 text-green-600" />
            <StatCard title="Assignment" value="26" icon={ClipboardCheck} color="bg-green-100 text-green-600" />
            <StatCard title="Study Hour" value="24h" icon={Clock} color="bg-green-100 text-green-600" />
            <StatCard title="Achievements" value="4" icon={Trophy} color="bg-green-100 text-green-600" />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Classes */}
            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-4">Up Coming Class</h3>

              <div className="border border-red-200 p-4 rounded-xl flex justify-between items-center mb-4 flex-col sm:flex-row gap-4 sm:gap-0">
                <div className="flex gap-4 items-center">
                  <Image src="/img/Profile-img-2.jpg" width={60} height={60} alt="instructor" className="rounded-full"/>
                  <div>
                    <h4 className="font-semibold">The Complete Cyber Security Course</h4>
                    <p className="text-sm text-gray-500">Kevin Martin</p>
                    <p className="text-xs text-gray-400">Module 1: Phishing Attack Simulation</p>
                  </div>
                </div>

                <button className="bg-red-500 text-white px-5 py-2 rounded-lg flex items-center gap-2">
                  <Play size={14}/> Join Now
                </button>
              </div>

              <div className="border p-4 rounded-xl flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-0">
                <div className="flex gap-4 items-center">
                  <Image src="/img/Profile-img-1.jpg" width={60} height={60} alt="instructor" className="rounded-full"/>
                  <div>
                    <h4 className="font-semibold">The Complete Cyber Security Course</h4>
                    <p className="text-sm text-gray-500">Kevin Martin</p>
                    <p className="text-xs text-gray-400">Module 1: Phishing Attack Simulation</p>
                  </div>
                </div>

                <button className="bg-indigo-200 text-indigo-600 px-5 py-2 rounded-lg">
                  Join Now
                </button>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold mb-4">AI Recommendations</h3>
              <div className="space-y-4 text-sm">
                <p>📘 Review Calculus Concepts</p>
                <p>📅 Plan Your Week</p>
                <p>📈 Improve Physics Performance</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Performance Trend</h3>
              <div className="flex gap-2">
                {["day","week","month","year"].map((p)=>(
                  <button
                    key={p}
                    onClick={()=>setPeriod(p)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      period===p ? "bg-indigo-500 text-white":"bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-40 flex items-center justify-center text-gray-400">
              Chart goes here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}