"use client";

import { useState, useEffect } from "react";
import ScrollAnimatel from '../cards/AnimatedCardl';
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CheckCircle,
  Trophy,
  Star,
  Target,
  BookOpen,
  Clock,
  Play,
  Calendar,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { isAuthenticated, getUser, getUserFullName, logoutUser, courseApi } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [hasStartedCourse, setHasStartedCourse] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    enrolled: 0,
    completed: 0,
    progress: 0,
    pending: 0,
    certifications: 0
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/signin');
      return;
    }
    fetchDashboardData();

    // Listen for stats updates from lesson player
    const handleStatsUpdate = (event: any) => {
      fetchDashboardData();
    };
    window.addEventListener('statsUpdated', handleStatsUpdate);
    return () => window.removeEventListener('statsUpdated', handleStatsUpdate);
  }, [router]);

  const getCurrentUserId = () => {
    const user = getUser();
    return user?.id || user?.email || 'anonymous';
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const user = getUser();
      const userId = getCurrentUserId();
      setUserName(getUserFullName() || user?.firstName || user?.email?.split('@')[0] || "User");

      // Fetch actual enrolled courses from the backend
      let enrolledCoursesList: any[] = [];
      try {
        const fetchedCourses = await courseApi.getEnrolledCourses();
        if (fetchedCourses && Array.isArray(fetchedCourses)) {
          // Fetch progress for each course
          const coursesWithProgress = await Promise.all(
            fetchedCourses.map(async (course) => {
              try {
                const progressData = await courseApi.getCourseProgress(course.id);
                return { ...course, progress: progressData.progress || 0 };
              } catch (err) {
                return { ...course, progress: 0 };
              }
            })
          );
          enrolledCoursesList = coursesWithProgress;
          // Also cache them for UI components that rely heavily on localStorage
          localStorage.setItem(`enrolledCourses_${userId}`, JSON.stringify(enrolledCoursesList));
        }
      } catch (err) {
        console.warn("Failed to fetch backend enrolled courses, falling back to local fallback.");
        enrolledCoursesList = JSON.parse(localStorage.getItem(`enrolledCourses_${userId}`) || '[]');
      }

      const userCertKey = `userCertifications_${userId}`;
      const startedKey = `hasStartedCourse_${userId}`;

      if (enrolledCoursesList && enrolledCoursesList.length > 0) {
        // Calculate stats from enrolled courses
        let completed = 0;
        let totalProgress = 0;
        for (const course of enrolledCoursesList) {
          totalProgress += course.progress || 0;
          if (course.progress === 100) completed++;
        }
        const avgProgress = enrolledCoursesList.length > 0 ? Math.floor(totalProgress / enrolledCoursesList.length) : 0;

        const stats = {
          enrolled: enrolledCoursesList.length,
          completed: completed,
          progress: avgProgress,
          pending: enrolledCoursesList.length - completed,
          certifications: parseInt(localStorage.getItem(userCertKey) || '0')
        };

        const userStatsKey = `userStats_${userId}`;
        localStorage.setItem(userStatsKey, JSON.stringify(stats));
        localStorage.setItem(startedKey, "true");

        setUserStats(stats);
        setHasStartedCourse(true);
      } else {
        // Evaluate if they have any stale local history
        const savedStats = localStorage.getItem(`userStats_${userId}`);
        const started = localStorage.getItem(startedKey);

        if (savedStats && started === "true") {
          const parsedStats = JSON.parse(savedStats);
          setUserStats({
            enrolled: parsedStats.enrolled || 0,
            completed: parsedStats.completed || 0,
            progress: parsedStats.progress || 0,
            pending: (parsedStats.enrolled || 0) - (parsedStats.completed || 0),
            certifications: parseInt(localStorage.getItem(userCertKey) || '0')
          });
          setHasStartedCourse(parsedStats.enrolled > 0 || parsedStats.completed > 0);
        } else {
          // New user - all zeros
          setUserStats({
            enrolled: 0,
            completed: 0,
            progress: 0,
            pending: 0,
            certifications: 0
          });
          setHasStartedCourse(false);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      setUserStats({
        enrolled: 0,
        completed: 0,
        progress: 0,
        pending: 0,
        certifications: 0
      });
      setHasStartedCourse(false);
    } finally {
      setLoading(false);
    }
  };

  const handleStartCourse = () => {
    router.push('/dashboard/courses');
  };

  const handleUpdateStats = (newStats: any) => {
    const userId = getCurrentUserId();
    const userStatsKey = `userStats_${userId}`;
    localStorage.setItem(userStatsKey, JSON.stringify(newStats));
    setUserStats(newStats);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ml-1 lg:ml-1 md:ml-5 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/tback.png')" }}>
      <div className="pt-5 p-1">
        {!hasStartedCourse ? (
          <FirstTimeDashboard onStartCourse={handleStartCourse} userName={userName} />
        ) : (
          <ActiveDashboard userName={userName} userStats={userStats} onUpdateStats={handleUpdateStats} />
        )}
      </div>
    </div>
  );
}

// FIRST TIME USER DASHBOARD - Always shown for new users
function FirstTimeDashboard({ onStartCourse, userName }: { onStartCourse: () => void; userName: string }) {
  const courses = [
    { title: "ASP.NET Core", icon: "⚙️", description: "Build modern web APIs and server-side applications", img: "/img/asp.net.jpg" },
    { title: "Graphic Design", icon: "✏️", description: "Create stunning visual designs", img: "/img/grah.jpg" },
    { title: "Frontend Flow", icon: "💻", description: "Build modern web applications", img: "/img/frontend.jpg" },
    { title: "UI/UX Design", icon: "🎨", description: "Master user interface and user experience design", img: "/img/figma-course.png" },
    { title: "Data Analysis", icon: "📈", description: "Extract insights from raw data", img: "/img/learn.png" },
  ];

  return (
    <main className="p-1 lg:p-6 md:max-w-7xl mx-auto">
      <div className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white rounded-2xl p-6 lg:p-8 mb-8 overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm mb-2 opacity-80">Welcome, {userName}! 👋</p>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-snug">
            Start Your Learning Journey<br />
            With Professional Online Courses
          </h2>
          <p className="text-white/80 mb-6 max-w-md">
            Discover courses taught by industry experts and advance your career
          </p>
          <button
            onClick={onStartCourse}
            className="bg-white text-primary-900 px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 hover:shadow-lg transition-all"
          >
            Browse Courses <Play size={16} />
          </button>
        </div>
        <Sparkles className="absolute top-6 right-6 opacity-30" size={40} />
        <Sparkles className="absolute bottom-6 right-12 opacity-20" size={30} />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-gray-900">Popular Courses 🔥</h3>
          <button
            onClick={onStartCourse}
            className="text-primary-700 text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Browse all courses <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-5 gap-4">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col cursor-pointer pb-4" onClick={onStartCourse}>
              <div className="relative h-32 w-full bg-gray-100">
                <Image src={course.img} alt={course.title} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center text-lg shadow-sm border border-white">{course.icon}</div>
              </div>
              <div className="px-4 pt-4 flex-1 flex flex-col">
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{course.title}</h4>
                <p className="text-xs text-gray-500 mb-3 flex-1 line-clamp-2">{course.description}</p>
                <button onClick={onStartCourse} className="text-primary-700 text-xs font-medium hover:underline mt-auto text-left">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-emerald-50 rounded-2xl p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">Why Join TalentFlow? 🚀</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Trophy, label: "Expert-led", desc: "Courses" },
            { icon: Target, label: "Hands-on", desc: "Projects" },
            { icon: Award, label: "Certification", desc: "Upon Completion" },
            { icon: Users, label: "Community", desc: "Support" }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <item.icon size={24} className="text-primary-700" />
              </div>
              <p className="font-medium text-sm text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ACTIVE USER DASHBOARD - With individual user stats and continue learning
function ActiveDashboard({ userName, userStats, onUpdateStats }: {
  userName: string;
  userStats: { enrolled: number; completed: number; progress: number; pending: number; certifications: number };
  onUpdateStats: (stats: any) => void;
}) {

  const router = useRouter();
  const [enrolledCoursesList, setEnrolledCoursesList] = useState<any[]>([]);
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  const getCurrentUserId = () => {
    const user = getUser();
    return user?.id || user?.email || 'anonymous';
  };

  useEffect(() => {
    const userId = getCurrentUserId();
    const enrolledCoursesKey = `enrolledCourses_${userId}`;
    const courses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');
    setEnrolledCoursesList(courses);

    setScheduleData(JSON.parse(localStorage.getItem(`userSchedule_${userId}`) || '[]'));
    setTasks(JSON.parse(localStorage.getItem(`userTasks_${userId}`) || '[]'));

    // Listen for stats updates from lesson player
    const handleStatsUpdate = () => {
      const updatedCourses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]');
      setEnrolledCoursesList(updatedCourses);

      // Refresh stats
      let completed = 0;
      let totalProgress = 0;
      for (const course of updatedCourses) {
        totalProgress += course.progress || 0;
        if (course.progress === 100) completed++;
      }
      const avgProgress = updatedCourses.length > 0 ? Math.floor(totalProgress / updatedCourses.length) : 0;

      onUpdateStats({
        enrolled: updatedCourses.length,
        completed: completed,
        progress: avgProgress,
        pending: updatedCourses.length - completed,
        certifications: userStats.certifications
      });
    };

    window.addEventListener('statsUpdated', handleStatsUpdate);
    return () => window.removeEventListener('statsUpdated', handleStatsUpdate);
  }, []);

  const enrolledTrend = userStats.enrolled > 0 ? "+12.5%" : "0%";
  const pendingTrend = userStats.pending > 0 ? "+12.5%" : "0%";
  const completedTrend = userStats.completed > 0 ? "+12.5%" : "0%";

  // Show empty state for users with no courses
  if (userStats.enrolled === 0 && userStats.completed === 0 && enrolledCoursesList.length === 0) {
    return (
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-lg font-semibold text-gray-500">
            {new Date().getHours() < 12 ? "GOOD MORNING" : new Date().getHours() < 17 ? "GOOD AFTERNOON" : "GOOD EVENING"}
          </h1>
          <p className="text-gray-900 font-bold text-2xl">Welcome Back, {userName.toUpperCase()}</p>
        </div>

        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h3>
          <p className="text-gray-500 mb-6">Start your learning journey by enrolling in your first course</p>
          <button
            onClick={() => window.location.href = '/dashboard/courses'}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Browse Courses
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto">
      {/* Greeting Section */}
      <ScrollAnimatel delay={130} direction="left">
        <div className="mb-8">
          <h1 className="text-lg font-semibold text-gray-500">
            {new Date().getHours() < 12 ? "GOOD MORNING" : new Date().getHours() < 17 ? "GOOD AFTERNOON" : "GOOD EVENING"}
          </h1>
          <p className="text-gray-900 font-bold text-2xl">Welcome Back, {userName.toUpperCase()}</p>
        </div>
      </ScrollAnimatel>

      {/* Stats Cards - Individual user data */}
      <ScrollAnimatel delay={150} direction="down">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Course Takers (Enrolled) */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen size={20} className="text-blue-600" />
              </div>
              {userStats.enrolled > 0 && (
                <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                  {enrolledTrend}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-gray-900">{userStats.enrolled}</p>
            <p className="text-sm text-gray-500 mt-1">Course Takers</p>
            {userStats.enrolled > 0 && (
              <p className="text-xs text-gray-400 mt-1">Courses you've enrolled in</p>
            )}
          </div>

          {/* Pending courses */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock size={20} className="text-orange-600" />
              </div>
              {userStats.pending > 0 && (
                <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                  {pendingTrend}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-gray-900">{userStats.pending}</p>
            <p className="text-sm text-gray-500 mt-1">Pending courses</p>
            {userStats.pending > 0 && (
              <p className="text-xs text-gray-400 mt-1">Courses in progress</p>
            )}
          </div>

          {/* Completed courses */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <CheckCircle size={20} className="text-primary-600" />
              </div>
              {userStats.completed > 0 && (
                <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                  {completedTrend}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-gray-900">{userStats.completed}</p>
            <p className="text-sm text-gray-500 mt-1">Completed courses</p>
            {userStats.completed > 0 && (
              <p className="text-xs text-gray-400 mt-1">Courses you've finished</p>
            )}
          </div>

          {/* Total Certifications */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award size={20} className="text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{userStats.certifications}</p>
            <p className="text-sm text-gray-500 mt-1">Total Certifications</p>
          </div>
        </div>
      </ScrollAnimatel>

      {/* Learning Progress and Today's Schedule Row */}
      <ScrollAnimatel delay={190} direction="up">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Learning Progress */}
          <div className="bg-white col-span-2 rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">Learning Progress</h3>
              <span className="text-xs text-gray-400">
                {userStats.progress === 0 ? "Not started yet" : userStats.progress < 50 ? "Keep going!" : "Great progress!"}
              </span>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-900 mb-2">{userStats.progress}%</p>
              <div className="w-full bg-gray-100 rounded-full h-3 mt-4">
                <div
                  className="bg-primary-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${userStats.progress}%` }}
                />
              </div>
              {userStats.progress === 0 && (
                <p className="text-sm text-gray-40 mt-4">Start a course to see your progress</p>
              )}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Today's Schedule</h3>
            <div className="space-y-4">
              {scheduleData.length > 0 ? scheduleData.map((item, index) => (
                <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.course}</p>
                      <p className="text-xs text-gray-500">{item.type}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              )) : (
                <div className="text-center py-6 text-gray-400">
                  <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No schedule assigned yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollAnimatel>

      {/* Active Courses and Task Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Courses */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">Active Courses</h3>

          {/* Continue Learning Section */}
          {enrolledCoursesList.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 text-sm mb-3">Continue Learning</h4>
              {enrolledCoursesList.map((course: any) => (
                <div key={course.id} className="mb-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => router.push(`/dashboard/courses/${course.id}`)}>
                  <p className="font-medium text-gray-900 text-sm">{course.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex-1 mr-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-primary-600">{course.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-primary-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${course.progress || 0}%` }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/courses/${course.id}`);
                      }}
                      className="text-xs bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {userStats.enrolled === 0 ? (
            <div className="text-center py-8">
              <BookOpen size={48} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No active courses</p>
              <button
                onClick={() => window.location.href = '/dashboard/courses'}
                className="mt-3 text-primary-600 text-sm hover:underline"
              >
                Browse Courses →
              </button>
            </div>
          ) : (
            <button
              onClick={() => window.location.href = '/dashboard/courses'}
              className="w-full mt-2 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition"
            >
              Browse More Courses
            </button>
          )}
        </div>

        {/* Task */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 text-lg mb-4">Task</h3>
          <div className="space-y-4">
            {tasks.length > 0 ? tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CheckCircle size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{task.time}</p>
              </div>
            )) : (
              <div className="text-center py-6 text-gray-400">
                <CheckCircle size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No tasks pending at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
