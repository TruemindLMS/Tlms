"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings, Loader2, User, Mail, Briefcase, Award, Calendar,
  TrendingUp, BookOpen, CheckCircle, Trophy, Star, Edit2, Save, X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profileApi, getUser, getUserFullName, getUserEmail, getUserRole, isAuthenticated, courseApi } from "@/lib/api";

const UserProfile = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [stats, setStats] = useState({
    enrolled: 0,
    completed: 0,
    progress: 0
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/signin');
      return;
    }
    fetchProfileAndStats();
  }, [router]);

  const fetchProfileAndStats = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch profile data
      const profileData = await profileApi.get();
      setProfile(profileData);
      setEditedBio(profileData?.bio || "");

      // Fetch real course stats from API
      const enrolledCourses = await courseApi.getEnrolledCourses();
      let completed = 0;
      let totalProgress = 0;

      for (const course of enrolledCourses) {
        const progress = await courseApi.getCourseProgress(course.id);
        totalProgress += progress.progress;
        if (progress.progress === 100) completed++;
      }

      const enrolledCount = enrolledCourses.length;
      const avgProgress = enrolledCount > 0 ? Math.floor(totalProgress / enrolledCount) : 0;

      setStats({
        enrolled: enrolledCount,
        completed: completed,
        progress: avgProgress
      });

      // Update localStorage for dashboard
      localStorage.setItem('userStats', JSON.stringify({
        enrolled: enrolledCount,
        completed: completed,
        progress: avgProgress
      }));

    } catch (error: any) {
      console.error('Error fetching profile:', error);
      setError('Unable to load profile data. Showing cached data.');

      // Fallback to localStorage
      const user = getUser();
      const savedStats = localStorage.getItem('userStats');

      if (user) setProfile(user);
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        setStats(parsedStats);
      } else {
        setStats({ enrolled: 0, completed: 0, progress: 0 });
      }

      if (!profile) {
        setProfile({
          firstName: "User",
          lastName: "",
          email: getUserEmail() || "user@talentflow.com",
          role: getUserRole() || "Student",
          jobTitle: "Student",
          bio: "No bio added yet"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await profileApi.update({ bio: editedBio });
      setProfile({ ...profile, bio: editedBio });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  const fullName = profile?.firstName && profile?.lastName
    ? `${profile.firstName} ${profile.lastName}`
    : getUserFullName() || profile?.firstName || "User";

  const email = profile?.email || getUserEmail() || "user@talentflow.com";
  const role = profile?.role || getUserRole() || "Student";
  const jobTitle = profile?.jobTitle || role;
  const bio = profile?.bio || "No bio added yet. Click edit to add a bio.";

  return (
    <div className="max-w-5xl mx-auto py-6 md:py-10 ml-1 lg:ml-1 md:ml-5 px-4">
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-500">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-2xl">
                  {getInitials(fullName)}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{fullName}</h2>
                  <p className="text-gray-500">{role}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Mail size={14} />
                    <span>{email}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              </div>

              {/* Bio Section */}
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium text-gray-900 mb-2">About Me</h3>
                {isEditing ? (
                  <div>
                    <textarea
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                      >
                        <Save size={16} className="inline mr-1" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditedBio(bio);
                        }}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                      >
                        <X size={16} className="inline mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">{bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={20} className="text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">{stats.enrolled}</span>
          </div>
          <p className="text-sm text-gray-500">Enrolled Courses</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={20} className="text-green-500" />
            <span className="text-2xl font-bold text-gray-900">{stats.completed}</span>
          </div>
          <p className="text-sm text-gray-500">Completed Courses</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp size={20} className="text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">{stats.progress}%</span>
          </div>
          <p className="text-sm text-gray-500">Overall Progress</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Learning Progress</h3>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-600">Overall Completion</span>
          <span className="text-green-600 font-medium">{stats.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${stats.progress}%` }} />
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Achievements</h3>
          <Award className="text-yellow-500" size={24} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <Trophy size={32} className="text-green-600 mx-auto mb-2" />
            <p className="font-medium text-sm">Course Complete</p>
            <p className="text-xs text-gray-500">Complete your first course</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg">
            <Star size={32} className="text-amber-600 mx-auto mb-2" />
            <p className="font-medium text-sm">Top Performer</p>
            <p className="text-xs text-gray-500">Score above 90%</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <Star size={32} className="text-purple-600 mx-auto mb-2" />
            <p className="font-medium text-sm">Fast Learner</p>
            <p className="text-xs text-gray-500">Complete 10 lessons in a week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;