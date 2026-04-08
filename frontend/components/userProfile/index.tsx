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
  const [editedAddress, setEditedAddress] = useState("");
  const [editedPostalCode, setEditedPostalCode] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedDateOfBirth, setEditedDateOfBirth] = useState("");
  const [editedGender, setEditedGender] = useState(0);
  const [stats, setStats] = useState({
    enrolled: 0,
    completed: 0,
    progress: 0
  });

  const getCurrentUserId = () => {
    const user = getUser();
    return user?.id || user?.email || 'anonymous';
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/signin');
      return;
    }
    fetchProfileAndStats();

    // Listen for stats updates
    const handleStatsUpdate = () => {
      fetchProfileAndStats();
    };
    window.addEventListener('statsUpdated', handleStatsUpdate);
    return () => window.removeEventListener('statsUpdated', handleStatsUpdate);
  }, [router]);

  const fetchProfileAndStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = getCurrentUserId();

      // Fetch profile data from API
      const profileResponse = await profileApi.get();
      const profileData = profileResponse?.data || profileResponse;
      setProfile(profileData);
      setEditedBio(profileData?.bio || "");
      setEditedAddress(profileData?.address || "");
      setEditedPostalCode(profileData?.postalCode || "");
      setEditedLocation(profileData?.location || "");
      setEditedDateOfBirth(profileData?.dateOfBirth ? profileData.dateOfBirth.split('T')[0] : "");
      setEditedGender(profileData?.gender ?? 0);

      // Get user-specific stats from localStorage (same as dashboard)
      const userStatsKey = `userStats_${userId}`;
      const enrolledCoursesKey = `enrolledCourses_${userId}`;

      const savedStats = localStorage.getItem(userStatsKey);
      const enrolledCourses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');

      if (savedStats) {
        // Use saved stats from localStorage
        const parsedStats = JSON.parse(savedStats);
        setStats({
          enrolled: parsedStats.enrolled || 0,
          completed: parsedStats.completed || 0,
          progress: parsedStats.progress || 0
        });
      } else if (enrolledCourses.length > 0) {
        // Calculate stats from enrolled courses
        let completed = 0;
        let totalProgress = 0;
        for (const course of enrolledCourses) {
          totalProgress += course.progress || 0;
          if (course.progress === 100) completed++;
        }
        const avgProgress = enrolledCourses.length > 0 ? Math.floor(totalProgress / enrolledCourses.length) : 0;

        const calculatedStats = {
          enrolled: enrolledCourses.length,
          completed: completed,
          progress: avgProgress
        };

        // Save to localStorage for dashboard
        localStorage.setItem(userStatsKey, JSON.stringify(calculatedStats));
        setStats(calculatedStats);
      } else {
        // Default zeros
        setStats({ enrolled: 0, completed: 0, progress: 0 });
      }

    } catch (error: any) {
      console.error('Error fetching profile:', error?.message || error);
      setError('Unable to load profile data. Showing cached data.');

      // Fallback to localStorage
      const user = getUser();
      const userId = getCurrentUserId();
      const userStatsKey = `userStats_${userId}`;
      const savedStats = localStorage.getItem(userStatsKey);

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
      const updateData = {
        bio: editedBio,
        address: editedAddress,
        postalCode: editedPostalCode,
        location: editedLocation,
        dateOfBirth: editedDateOfBirth ? new Date(editedDateOfBirth).toISOString() : null,
        gender: Number(editedGender)
      };
      await profileApi.update(updateData);
      setProfile({ ...profile, ...updateData });
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
          <Loader2 size={40} className="animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  const fullName = profile?.fullName 
    || (profile?.firstName && profile?.lastName ? `${profile.firstName} ${profile.lastName}` : "")
    || getUserFullName() 
    || profile?.firstName 
    || "User";

  const email = profile?.email || getUserEmail() || "user@talentflow.com";
  const role = profile?.role || getUserRole() || "Student";
  const jobTitle = profile?.jobTitle || role;
  const bio = profile?.bio || "No bio added yet. Click edit to add a bio.";

  return (
    <div className="max-w-full  mx-auto py-6 md:py-10 ml-1 lg:ml-1 md:ml-5 px-4">
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
                <h3 className="font-medium text-gray-900 mb-4">Profile Information</h3>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
                      <textarea
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          value={editedAddress}
                          onChange={(e) => setEditedAddress(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Your address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={editedLocation}
                          onChange={(e) => setEditedLocation(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="City, State"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          value={editedPostalCode}
                          onChange={(e) => setEditedPostalCode(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Postal code"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={editedDateOfBirth}
                          onChange={(e) => setEditedDateOfBirth(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          value={editedGender}
                          onChange={(e) => setEditedGender(Number(e.target.value))}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value={0}>Male</option>
                          <option value={1}>Female</option>
                          <option value={2}>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-green-700 flex items-center"
                      >
                        <Save size={16} className="inline mr-1" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditedBio(bio);
                          setEditedAddress(profile?.address || "");
                          setEditedPostalCode(profile?.postalCode || "");
                          setEditedLocation(profile?.location || "");
                          setEditedDateOfBirth(profile?.dateOfBirth ? profile.dateOfBirth.split('T')[0] : "");
                          setEditedGender(profile?.gender ?? 0);
                        }}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 flex items-center"
                      >
                        <X size={16} className="inline mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">About Me</h4>
                      <p className="text-gray-900 mt-1">{bio}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Address</h4>
                        <p className="text-gray-900 mt-1">{profile?.address || "Not provided"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Location</h4>
                        <p className="text-gray-900 mt-1">{profile?.location || "Not provided"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Postal Code</h4>
                        <p className="text-gray-900 mt-1">{profile?.postalCode || "Not provided"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
                        <p className="text-gray-900 mt-1">
                          {profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "Not provided"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Gender</h4>
                        <p className="text-gray-900 mt-1">
                          {profile?.gender === 0 ? "Male" : profile?.gender === 1 ? "Female" : profile?.gender === 2 ? "Other" : "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Synced with dashboard */}
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
            <CheckCircle size={20} className="text-primary-500" />
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
          <span className="text-primary-600 font-medium">{stats.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${stats.progress}%` }} />
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
            <Trophy size={32} className="text-primary-600 mx-auto mb-2" />
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