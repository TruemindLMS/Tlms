"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, Loader2, User, Mail, Briefcase, Award, Calendar, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profileApi, getUser, getUserFullName, getUserEmail, getUserRole, isAuthenticated } from "@/lib/api";

const UserProfile = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    enrolled: 0,
    completed: 0,
    progress: 0
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/signin');
      return;
    }

    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // Get profile from API
      const profileData = await profileApi.get();
      setProfile(profileData);

      // You can also get stats from a separate endpoint or derive from profile
      // For now, using placeholder data - replace with actual API call
      setStats({
        enrolled: profileData.enrolledCourses?.length || 3,
        completed: profileData.completedCourses?.length || 2,
        progress: profileData.overallProgress || 75
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback to localStorage data
      const user = getUser();
      setProfile(user);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ml-16 md:ml-20">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  const fullName = profile?.firstName && profile?.lastName
    ? `${profile.firstName} ${profile.lastName}`
    : getUserFullName() || "Bankole Shittu";

  const email = profile?.email || getUserEmail() || "bankole@talentflow.com";
  const role = profile?.role || getUserRole() || "UI/UX Designer";
  const jobTitle = profile?.jobTitle || "UI/UX Intern";

  return (
    <div className="flex flex-col gap-3 max-w-6xl ml-16 md:ml-20 mx-auto py-6 md:pb-10 px-4">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          My Profile 📚
        </h1>
        <p className="text-gray-600">Here is your profile information</p>
      </div>

      {/* Profile Card */}
      <div className="py-6 md:py-8 px-3 md:px-6 flex justify-between items-start shadow-md shadow-gray-200 rounded-lg bg-white">
        <div className="flex-1">
          <p className="text-xl md:text-[28px] font-semibold text-[#1C2A39]">
            {fullName}
          </p>
          <div className="flex gap-3 md:gap-4 mt-4 md:mt-8">
            {/* Avatar */}
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary-100 flex items-center justify-center">
              {profile?.profilePicture ? (
                <Image
                  src={profile.profilePicture}
                  alt="User Profile"
                  width={64}
                  height={64}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-primary-600 font-bold text-lg md:text-2xl">
                  {getInitials(fullName)}
                </span>
              )}
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1C2A39]">
                {jobTitle}
              </p>
              <p className="text-base md:text-xl text-gray-600 mt-1 md:mt-2">
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Button */}
        <Link
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          href="/dash/settings"
        >
          <Settings className="text-gray-600" size={20} />
          <span className={`absolute right-0 top-8 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-opacity ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            Settings
          </span>
        </Link>
      </div>

      {/* Learning Summary */}
      <div className="py-6 md:py-8 px-3 md:px-6 shadow-md shadow-gray-200 rounded-lg bg-white">
        <p className="text-2xl md:text-3xl font-semibold text-[#1C2A39]">
          Learning Summary
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 w-full mt-4 md:mt-8">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-primary-600">
              {stats.enrolled}
            </p>
            <p className="text-base md:text-xl font-medium text-gray-600 mt-1">
              Enrolled
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-green-600">
              {stats.completed}
            </p>
            <p className="text-base md:text-xl font-medium text-gray-600 mt-1">
              Completed
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl md:text-3xl font-bold text-orange-600">
              {stats.progress}%
            </p>
            <p className="text-base md:text-xl font-medium text-gray-600 mt-1">
              Progress
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Overall Progress</span>
            <span>{stats.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="py-6 md:py-8 px-3 md:px-6 shadow-md shadow-gray-200 rounded-lg bg-white">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <p className="text-2xl md:text-3xl font-semibold text-[#1C2A39]">
            Achievements
          </p>
          <Award className="text-yellow-500" size={24} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {/* Achievement 1 */}
          <div className="rounded-lg flex flex-col gap-4 justify-center items-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Image
                src={"/img/course-complete.png"}
                alt="Completed Course"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <div className="text-center">
              <p className="text-lg md:text-xl font-semibold text-[#1C2A39]">
                Course Complete
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Completed 5+ courses
              </p>
            </div>
          </div>

          {/* Achievement 2 */}
          <div className="rounded-lg flex flex-col gap-4 justify-center items-center p-6 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <Image
                src={"/img/award-trophy.png"}
                alt="Trophy"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <div className="text-center">
              <p className="text-lg md:text-xl font-semibold text-[#1C2A39]">
                Top Performer
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Top 10% this month
              </p>
            </div>
          </div>

          {/* Achievement 3 */}
          <div className="rounded-lg flex flex-col gap-4 justify-center items-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              <Image
                src={"/img/award-star.png"}
                alt="Star"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <div className="text-center">
              <p className="text-lg md:text-xl font-semibold text-[#1C2A39]">
                Fast Learner
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Completed 10 lessons in a week
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="py-6 md:py-8 px-3 md:px-6 shadow-md shadow-gray-200 rounded-lg bg-white">
        <p className="text-2xl md:text-3xl font-semibold text-[#1C2A39] mb-4">
          Contact Information
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gray-400" />
            <span className="text-gray-700">{email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Briefcase size={20} className="text-gray-400" />
            <span className="text-gray-700">{role}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-gray-400" />
            <span className="text-gray-700">Member since {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;