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
    <div className="flex min-h-screen bg-[#f5f7f9] text-sm overflow-x-hidden">
      {/* SIDEBAR */}
      <aside
        className={`bg-white px-4 py-6 flex flex-col justify-between transition-all duration-300
        ${isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:translate-x-0 md:w-20"}
        fixed md:relative z-50 h-screen`}
      >
        <div>
          {/* LOGO + TOGGLE */}
          <div className="flex items-center justify-between mb-8">
            {isOpen && (
              <Image src="/img/tlogo.png" alt="logo" width={120} height={40} />
            )}

            <button onClick={() => setIsOpen(!isOpen)}>
              <ArrowBigLeftDash size={30} className="text-gray-600" />
            </button>
          </div>

          <p className="text-gray-400 text-xs mb-3 hidden md:block">
            OVERVIEW
          </p>

          <nav className="space-y-4">
            <SidebarItem icon={<Home size={18} />} label="Dashboard" show={isOpen} active />
            <SidebarItem icon={<ImageIcon size={18} />} label="Courses (3)" show={isOpen} />
            <SidebarItem icon={<CheckSquare size={18} />} label="Task" show={isOpen} />
            <SidebarItem icon={<Users size={18} />} label="Team" show={isOpen} />
            <SidebarItem icon={<BarChart2 size={18} />} label="Progress" show={isOpen} />
            <SidebarItem icon={<Award size={18} />} label="My certificates" show={isOpen} />
          </nav>

          <p className="text-gray-400 text-xs mt-20 mb-3 hidden md:block">
            SETTINGS
          </p>

          <nav className="space-y-4">
            <SidebarItem icon={<Settings size={18} />} label="Account & Settings" show={isOpen} />
            <SidebarItem icon={<HelpCircle size={18} />} label="Help" show={isOpen} />
            <SidebarItem icon={<LogOut size={18} />} label="Logout" show={isOpen} danger />
          </nav>
        </div>
      </aside>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MAIN + RIGHT PANEL */}
      <div className="flex flex-1">
        {/* MAIN */}
        <main className="flex-1 p-4 md:p-6 w-full">
          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            {/* MOBILE MENU BUTTON */}
            <button className="md:hidden" onClick={() => setIsOpen(true)}>
              <ArrowBigLeftDash size={28} />
            </button>

            <input
              placeholder="Search your course here..."
              className="w-full sm:flex-1 md:w-80 px-4 py-2 rounded-lg border bg-white text-sm outline-none"
            />

            <div className="flex items-center gap-4">
              <Mail className="text-gray-500" />
              <Bell className="text-gray-500" />

              <div className="flex items-center gap-2">
                <Image
                  src="/img/Profile-img-1.jpg"
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm font-medium hidden sm:block">
                  Majola
                </span>
              </div>
            </div>
          </div>

          {/* HERO */}
          <div className="relative bg-gradient-to-r from-green-900 to-green-700 text-white rounded-2xl p-4 md:p-6 mb-6 overflow-hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <CourseCard title="UI/UX Design" />
            <CourseCard title="Product Management" />
            <CourseCard title="Graphic Design" />
          </div>

          <div className="flex justify-center">
            <button className="bg-green-900 text-white text-2xl px-8 md:px-12 py-3 md:py-4 rounded-xl font-medium">
              Start Course
            </button>
          </div>

          {/* FOR MOBILE PROFILE */}
          <div className="xl:hidden mt-6 bg-white rounded-2xl p-4">
            <h3 className="font-semibold mb-4">Your Profile</h3>

            <div className="flex flex-col items-center text-center mb-6">
              <Image
                src="/img/Profile-img-1.jpg"
                alt="user"
                width={70}
                height={70}
                className="rounded-full mb-2"
              />
              <p className="font-medium">Good Morning Bankole</p>

              <p className="text-xs text-gray-400 mb-4">
                Start your journey, achieve your target
              </p>

              <div className="flex gap-3">
                <CircleIcon icon={<Target size={16} />} />
                <CircleIcon icon={<BookOpen size={16} />} />
                <CircleIcon icon={<Clock size={16} />} />
              </div>
            </div>

            {/* SUMMARY */}
            <div className="mb-6">
              <p className="text-lg text-black mb-4">Learning Summary</p>
              <div className="flex gap-2">
                <div className="h-6 w-full bg-gradient-to-b from-green-300 to-green-900 rounded"></div>
                <div className="h-6 w-full bg-gradient-to-b from-green-300 to-green-900 rounded"></div>
                <div className="h-6 w-full bg-gradient-to-b from-green-300 to-green-900 rounded"></div>
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div className="mb-6">
              <p className="text-lg text-black mb-4">Achievements</p>

              <div className="space-y-3 text-sm">
                <Achievement label="Completed Courses" subText="UI/UX Intermediate" icon={<CheckCircle size={20} />} />
                <Achievement label="Certificates Earned" subText="UI/UX Track" icon={<Trophy size={20} />} />
                <Achievement label="Top Performer" subText="Week 1" icon={<Star size={20} />} />
              </div>
            </div>

            {/* TEAM */}
            <div>
              <p className="text-lg text-black mb-4 flex items-center gap-4">
                Team Members <CirclePlus size={18} className="cursor-pointer" />
              </p>

              <div className="space-y-3">
                <TeamMember name="John Stephen" role="UI Designer" img="/img/Profile-img-1.jpg" />
                <TeamMember name="Isaac McVinnie" role="Frontend Dev" img="/img/Profile-img-1.jpg" />
                <TeamMember name="David Underline" role="Backend Dev" img="/img/Profile-img-1.jpg" />
                <TeamMember name="Tola Afolabi" role="Project Manager" img="/img/Profile-img-1.jpg" />
              </div>

              <button className="mt-4 w-full bg-green-100 py-2 rounded-lg text-sm text-green-900">
                See All
              </button>
            </div>
          </div>
        </main>

        {/* RIGHT PANEL (DESKTOP ONLY) */}
        <aside className="hidden xl:block w-72 bg-white p-6">
          <h3 className="font-semibold mb-4">Your Profile</h3>

          <div className="flex flex-col items-center text-center mb-6">
            <Image src="/img/Profile-img-1.jpg" alt="user" width={70} height={70} className="rounded-full mb-2" />
            <p className="font-medium">Good Morning Bankole</p>
            <p className="text-xs text-gray-400 mb-4">Start your journey, achieve your target</p>

            <div className="flex gap-3">
              <CircleIcon icon={<Target size={16} />} />
              <CircleIcon icon={<BookOpen size={16} />} />
              <CircleIcon icon={<Clock size={16} />} />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xl text-black mb-8">Learning Summary</p>
            <div className="flex gap-2">
              <div className="h-8 w-full bg-gradient-to-b from-green-300 to-green-900 rounded"></div>
              <div className="h-8 w-full bg-gradient-to-b from-green-300 to-green-900 rounded"></div>
              <div className="h-8 w-full bg-gradient-to-b from-green-300 to-green-900 rounded"></div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xl text-black mb-5">Achievements</p>

            <div className="space-y-3 text-sm">
              <Achievement label="Completed Courses" subText="UI/UX Intermediate" icon={<CheckCircle size={25} />} />
              <Achievement label="Certificates Earned" subText="UI/UX Track" icon={<Trophy size={25} />} />
              <Achievement label="Top Performer" subText="Week 1" icon={<Star size={25} />} />
            </div>
          </div>

          <div>
            <p className="text-xl text-black mb-5 flex items-center gap-4">
              Team Members <CirclePlus size={20} className="cursor-pointer" />
            </p>

            <div className="space-y-3">
              <TeamMember name="John Stephen" role="UI Designer" img="/img/Profile-img-1.jpg" />
              <TeamMember name="Isaac McVinnie" role="Frontend Dev" img="/img/Profile-img-1.jpg" />
              <TeamMember name="David Underline" role="Backend Dev" img="/img/Profile-img-1.jpg" />
              <TeamMember name="Tola Afolabi" role="Project Manager" img="/img/Profile-img-1.jpg" />
            </div>

            <button className="mt-10 w-full bg-green-100 py-2 rounded-lg text-sm text-green-900">
              See All
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* COMPONENTS */

function SidebarItem({ icon, label, show, active, danger }: { icon: ReactNode; label: string; show: boolean; active?: boolean; danger?: boolean }) {
  return (
    <div className={`flex items-center gap-3 cursor-pointer ${
      active ? "text-green-700 font-medium" : danger ? "text-red-500" : "text-gray-600"
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