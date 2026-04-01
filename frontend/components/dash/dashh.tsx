"use client";
import { useState, ReactNode } from "react";
import Image from "next/image";
import {
  Home,
  CheckSquare,
  Users,
  BarChart2,
  Award,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Mail,
  Image as ImageIcon,
  CheckCircle,
  Trophy,
  Star,
  Target,
  BookOpen,
  Clock,
  ArrowBigLeftDash,
  Play,
  EllipsisVertical,
  CirclePlus,
} from "lucide-react";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white text-sm ml-16 md:ml-2 overflow-x-hidden">

      {/* MAIN + RIGHT PANEL */}
      <div className="flex flex-1">
        {/* MAIN */}
        <main className="flex-1 p-4 lg:p-6 w-full">
          {/* HERO */}
          <div className="relative bg-gradient-to-r from-green-900 to-green-700 text-white rounded-2xl p-4 lg:p-6 mb-6 overflow-hidden">
            <p className="text-xs mb-2 opacity-80">ONLINE COURSE</p>

            <h2 className="text-lg md:text-xl font-semibold mb-4 leading-snug">
              Sharpen Your Skills With <br /> Professional Online Courses
            </h2>

            <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              Join Now <Play size={16} />
            </button>

            {/* Stars */}
            <Star className="absolute top-6 right-6 opacity-50" size={20} />
            <Star className="absolute bottom-6 right-6 opacity-50" size={20} />
            <Star className="absolute top-6 right-14 opacity-50" size={20} />
            <Star className="absolute bottom-6 right-14 opacity-50" size={20} />
            <Star className="absolute top-1/2 right-10 -translate-y-1/2 opacity-50" size={20} />
          </div>

          {/* COURSE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <CourseCard title="UI/UX Design" />
            <CourseCard title="Product Management" />
            <CourseCard title="Graphic Design" />
          </div>

          <div className="flex justify-center">
            <button className="bg-green-900 text-white   px-8 md:px-12 py-3 md:py-4 rounded-xl font-medium">
              Start Course
            </button>
          </div>

        </main>

      </div>
    </div>
  );
}

/* COMPONENTS */

function SidebarItem({ icon, label, show, active, danger }: { icon: ReactNode; label: string; show: boolean; active?: boolean; danger?: boolean }) {
  return (
    <div className={`flex items-center gap-3 cursor-pointer ${active ? "text-green-700 font-medium" : danger ? "text-red-500" : "text-gray-600"
      }`}>
      {icon}
      {show && <span>{label}</span>}
    </div>
  );
}

function CourseCard({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-[#1a6b3c40] p-2 rounded-lg">
          <Bell size={16} />
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">2/8 Watched</p>
          <h4 className="font-medium">{title}</h4>
        </div>
      </div>

      <div className="bg-gray-100 p-2 rounded-lg">
        <EllipsisVertical size={16} />
      </div>
    </div>
  );
}

function Achievement({ label, icon, subText }: { label: string; icon: ReactNode; subText?: string }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <span>{label}</span>
        {subText && <p className="text-xs text-gray-400">{subText}</p>}
      </div>
      <div>{icon}</div>
    </div>
  );
}

function TeamMember({ name, role, img }: { name: string; role: string; img: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src={img} alt={name} width={28} height={28} className="rounded-full" />
        <div className="flex flex-col">
          <span className="text-sm">{name}</span>
          <span className="text-xs text-gray-400">{role}</span>
        </div>
      </div>

      <span className="text-xs bg-green-800 text-white px-2 py-1 rounded">
        Active
      </span>
    </div>
  );
}

function CircleIcon({ icon }: { icon: ReactNode }) {
  return (
    <div className="w-9 h-9 flex items-center justify-center rounded-full border bg-gray-50">
      {icon}
    </div>
  );
}