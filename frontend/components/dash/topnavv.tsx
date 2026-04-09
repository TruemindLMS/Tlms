'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Globe, ChevronDown, Bell, Menu, X, User, Target, BookOpen, Clock, CheckCircle, Trophy, Star, CirclePlus, LogOut, Settings, MessageSquare, Gift, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getUser, getUserFullName, getUserEmail, courseApi } from '@/lib/api'

interface TopnavvProps {
    onMenuClick?: () => void
    sidebarCollapsed?: boolean
}

interface Notification {
    id: string
    title: string
    message: string
    type: 'course' | 'achievement' | 'assignment' | 'system'
    read: boolean
    createdAt: string
    link?: string
}

// Helper Components
const CircleIcon = ({ icon }: { icon: React.ReactNode }) => (
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">
        {icon}
    </div>
)

const Achievement = ({ label, subText, icon }: { label: string; subText: string; icon: React.ReactNode }) => (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="text-primary-600">{icon}</div>
        <div>
            <p className="font-medium text-gray-900">{label}</p>
            <p className="text-xs text-gray-500">{subText}</p>
        </div>
    </div>
)

const TeamMember = ({ name, role, img, isActive = true }: { name: string; role: string; img: string; isActive?: boolean }) => (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
        <Image src={img} width={40} height={40} alt={name} className="rounded-full object-cover" />
        <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">{role}</p>
        </div>
        {isActive && (
            <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">Active</span>
        )}
    </div>
)

export default function Topnavv({ onMenuClick, sidebarCollapsed = false }: TopnavvProps) {
    const [isLangOpen, setIsLangOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isMobile, setIsMobile] = useState(false)
    const [userName, setUserName] = useState('')
    const [userFullName, setUserFullName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userInitials, setUserInitials] = useState('')
    const [profilePicture, setProfilePicture] = useState<string | null>(null)
    const [greeting, setGreeting] = useState('Good Morning')
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount] = useState(0)
    const notificationRef = useRef<HTMLDivElement>(null)

    // Real user data states
    const [learningSummary, setLearningSummary] = useState<any[]>([])
    const [achievements, setAchievements] = useState<any[]>([])
    const [teamMembers, setTeamMembers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Check if mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Load notifications from localStorage
    const loadNotifications = () => {
        const userId = getUser()?.id || getUser()?.email || 'anonymous'
        const savedNotifications = localStorage.getItem(`notifications_${userId}`)
        if (savedNotifications) {
            const parsed = JSON.parse(savedNotifications)
            setNotifications(parsed)
            setUnreadCount(parsed.filter((n: Notification) => !n.read).length)
        } else {
            // Initialize with empty notifications
            setNotifications([])
            setUnreadCount(0)
        }
    }

    // Add notification function (called when new course is added)
    const addNotification = (title: string, message: string, type: Notification['type'], link?: string) => {
        const userId = getUser()?.id || getUser()?.email || 'anonymous'
        const newNotification: Notification = {
            id: Date.now().toString(),
            title,
            message,
            type,
            read: false,
            createdAt: new Date().toISOString(),
            link
        }

        const updatedNotifications = [newNotification, ...notifications]
        setNotifications(updatedNotifications)
        setUnreadCount(prev => prev + 1)
        localStorage.setItem(`notifications_${userId}`, JSON.stringify(updatedNotifications))
    }

    // Mark notification as read
    const markAsRead = (notificationId: string) => {
        const updated = notifications.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        )
        setNotifications(updated)
        setUnreadCount(updated.filter(n => !n.read).length)

        const userId = getUser()?.id || getUser()?.email || 'anonymous'
        localStorage.setItem(`notifications_${userId}`, JSON.stringify(updated))
    }

    // Mark all as read
    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }))
        setNotifications(updated)
        setUnreadCount(0)

        const userId = getUser()?.id || getUser()?.email || 'anonymous'
        localStorage.setItem(`notifications_${userId}`, JSON.stringify(updated))
    }

    // Listen for course added events
    useEffect(() => {
        const handleCourseAdded = (event: CustomEvent) => {
            const { courseTitle, courseId } = event.detail
            addNotification(
                'New Course Available!',
                `${courseTitle} has been added to the course list. Enroll now to start learning!`,
                'course',
                `/dashboard/courses/${courseId}`
            )
        }

        const handleAssignmentAdded = (event: CustomEvent) => {
            const { assignmentTitle, dueDate } = event.detail
            addNotification(
                'New Assignment',
                `${assignmentTitle} has been assigned. Due date: ${dueDate}`,
                'assignment',
                '/dashboard/assignments'
            )
        }

        const handleAchievementEarned = (event: CustomEvent) => {
            const { achievementName } = event.detail
            addNotification(
                'Achievement Unlocked! 🎉',
                `Congratulations! You've earned the "${achievementName}" achievement.`,
                'achievement',
                '/dashboard/profile'
            )
        }

        window.addEventListener('courseAdded', handleCourseAdded as EventListener)
        window.addEventListener('assignmentAdded', handleAssignmentAdded as EventListener)
        window.addEventListener('achievementEarned', handleAchievementEarned as EventListener)

        return () => {
            window.removeEventListener('courseAdded', handleCourseAdded as EventListener)
            window.removeEventListener('assignmentAdded', handleAssignmentAdded as EventListener)
            window.removeEventListener('achievementEarned', handleAchievementEarned as EventListener)
        }
    }, [notifications])

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Load user data and fetch real stats
    useEffect(() => {
        const loadUserData = async () => {
            setLoading(true)
            try {
                const user = getUser()
                const fullName = getUserFullName()
                const email = getUserEmail()

                const savedProfilePic = localStorage.getItem('userProfilePicture')
                if (savedProfilePic) {
                    setProfilePicture(savedProfilePic)
                }

                if (user) {
                    const firstName = user.firstName || user.email?.split('@')[0] || 'User'
                    const lastName = user.lastName || ''
                    const finalFullName = fullName || user.fullName || `${firstName} ${lastName}`.trim() || firstName;
                    setUserName(finalFullName)
                    setUserFullName(finalFullName)
                    setUserEmail(email || user.email || '')

                    const initials = `${firstName.charAt(0)}${lastName.charAt(0) || firstName.charAt(1) || ''}`.toUpperCase()
                    setUserInitials(initials)
                } else {
                    const storedName = localStorage.getItem('userFullName')
                    const storedEmail = localStorage.getItem('userEmail')
                    const storedProfilePic = localStorage.getItem('userProfilePicture')

                    if (storedName) {
                        setUserFullName(storedName)
                        setUserName(storedName)
                        const nameParts = storedName.split(' ')
                        const firstName = nameParts[0] || 'User'
                        const initials = `${firstName.charAt(0)}${nameParts[1]?.charAt(0) || ''}`.toUpperCase()
                        setUserInitials(initials || firstName.charAt(0).toUpperCase())
                    }
                    if (storedEmail) setUserEmail(storedEmail)
                    if (storedProfilePic) setProfilePicture(storedProfilePic)

                    if (!storedName) {
                        setUserName('User')
                        setUserInitials('U')
                    }
                }

                // Load notifications
                loadNotifications()

                // Fetch real enrolled courses
                const userId = user?.id || user?.email || 'anonymous'
                const enrolledCoursesKey = `enrolledCourses_${userId}`
                const enrolledCourses = JSON.parse(localStorage.getItem(enrolledCoursesKey) || '[]')

                const summary = enrolledCourses.map((course: any) => ({
                    title: course.title,
                    progress: course.progress || 0
                }))

                if (summary.length === 0) {
                    setLearningSummary([{ title: "No courses enrolled", progress: 0 }])
                } else {
                    setLearningSummary(summary)
                }

                const userAchievements = JSON.parse(localStorage.getItem(`userAchievements_${userId}`) || '[]')
                if (userAchievements.length === 0) {
                    setAchievements([
                        { label: "No achievements yet", subText: "Complete courses to earn achievements", icon: "🏆" }
                    ])
                } else {
                    setAchievements(userAchievements)
                }

                const userTeam = JSON.parse(localStorage.getItem(`userTeam_${userId}`) || '[]')
                setTeamMembers(userTeam)

            } catch (error) {
                console.error('Error loading user data:', error)
                setLearningSummary([{ title: "No courses enrolled", progress: 0 }])
                setAchievements([{ label: "No achievements yet", subText: "Complete courses to earn achievements", icon: "🏆" }])
                setTeamMembers([])
            } finally {
                setLoading(false)
            }
        }

        const hour = new Date().getHours()
        if (hour < 12) setGreeting('Good Morning')
        else if (hour < 17) setGreeting('Good Afternoon')
        else setGreeting('Good Evening')

        loadUserData()

        const handleProfileUpdate = () => {
            loadUserData()
        }

        window.addEventListener('profileUpdated', handleProfileUpdate)
        return () => window.removeEventListener('profileUpdated', handleProfileUpdate)
    }, [])

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'course':
                return <BookOpen size={16} className="text-blue-500" />
            case 'achievement':
                return <Trophy size={16} className="text-yellow-500" />
            case 'assignment':
                return <MessageSquare size={16} className="text-purple-500" />
            default:
                return <AlertCircle size={16} className="text-gray-500" />
        }
    }

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Just now'
        if (diffMins < 60) return `${diffMins} min ago`
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    }

    const languages = [
        { code: 'EN', name: 'English (UK)', flag: '🇬🇧' },
        { code: 'FR', name: 'French', flag: '🇫🇷' },
        { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
        { code: 'DE', name: 'German', flag: '🇩🇪' },
        { code: 'JP', name: 'Japanese', flag: '🇯🇵' },
    ]

    const getLeftSpacing = () => {
        if (isMobile) return 'left-0'
        return sidebarCollapsed ? 'md:left-20' : 'md:left-64'
    }

    const handleCloseProfile = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsProfileOpen(false)
            setIsClosing(false)
        }, 300)
    }

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userFullName')
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userRole')
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        localStorage.removeItem('userProfilePicture')
        window.location.href = '/signin'
    }

    return (
        <>
            <nav
                className={`fixed top-0 right-0 ${getLeftSpacing()} bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-40 transition-all duration-300`}
            >
                <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 h-16 gap-2">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0"
                    >
                        <Menu size={20} className="text-gray-600 dark:text-gray-300" />
                    </button>

                    <div className="flex-1 min-w-0">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Anything"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        <div className="relative hidden md:flex">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Globe size={18} className="text-gray-600 dark:text-gray-300" />
                                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                                    En(UK)
                                </span>
                                <ChevronDown size={16} className="text-gray-400" />
                            </button>

                            {isLangOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => setIsLangOpen(false)}
                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                            >
                                                <span>{lang.flag}</span>
                                                <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Notifications Dropdown */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Bell size={20} className="text-gray-600 dark:text-gray-300" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>

                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                        {notifications.length > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-xs text-primary-600 hover:text-primary-700 transition"
                                            >
                                                Mark all as read
                                            </button>
                                        )}
                                    </div>

                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="text-center py-8">
                                                <Bell size={40} className="text-gray-300 mx-auto mb-3" />
                                                <p className="text-gray-500 text-sm">No notifications yet</p>
                                                <p className="text-xs text-gray-400 mt-1">When you get notifications, they'll appear here</p>
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                                {notifications.map((notification) => (
                                                    <Link
                                                        key={notification.id}
                                                        href={notification.link || '#'}
                                                        onClick={() => {
                                                            markAsRead(notification.id)
                                                            setIsNotificationsOpen(false)
                                                        }}
                                                        className={`block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                                            }`}
                                                    >
                                                        <div className="flex gap-3">
                                                            <div className="flex-shrink-0">
                                                                {getNotificationIcon(notification.type)}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                    {notification.title}
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                    {notification.message}
                                                                </p>
                                                                <p className="text-xs text-gray-400 mt-2">
                                                                    {formatTimeAgo(notification.createdAt)}
                                                                </p>
                                                            </div>
                                                            {!notification.read && (
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                                            )}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(true)}
                                className="flex items-center gap-1 pl-1 pr-1 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {profilePicture ? (
                                    <Image
                                        src={profilePicture}
                                        width={32}
                                        height={32}
                                        alt="Profile"
                                        className="rounded-full ring-2 ring-primary-200 dark:ring-gray-700 object-cover w-8 h-8"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center ring-2 ring-primary-200">
                                        <span className="text-white font-semibold text-xs">
                                            {userInitials || 'U'}
                                        </span>
                                    </div>
                                )}
                                <ChevronDown size={14} className="hidden sm:inline text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Profile Panel - Same as before */}
            {isProfileOpen && (
                <>
                    <div
                        className={`fixed inset-0 bg-black/50 z-40 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
                        onClick={handleCloseProfile}
                    />

                    <aside className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}>
                        <div className="p-6">
                            <button
                                onClick={handleCloseProfile}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>

                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="relative">
                                    {profilePicture ? (
                                        <Image
                                            src={profilePicture}
                                            alt="user"
                                            width={96}
                                            height={96}
                                            className="rounded-full ring-4 ring-primary-100 object-cover w-24 h-24"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center ring-4 ring-primary-100">
                                            <span className="text-white font-bold text-3xl">
                                                {userInitials || 'U'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mt-3">
                                    {greeting}, {userFullName}! 👋
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    {userEmail || 'Start your journey, achieve your target'}
                                </p>

                                <div className="flex gap-3">
                                    <CircleIcon icon={<Target size={16} />} />
                                    <CircleIcon icon={<BookOpen size={16} />} />
                                    <CircleIcon icon={<Clock size={16} />} />
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-lg font-semibold text-gray-900 mb-3">Learning Summary</p>
                                {learningSummary.length === 1 && learningSummary[0].title === "No courses enrolled" ? (
                                    <div className="text-center py-4 bg-gray-50 rounded-lg">
                                        <BookOpen size={32} className="text-gray-300 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">No courses enrolled yet</p>
                                        <Link href="/dashboard/courses" className="text-xs text-primary-600 hover:underline mt-1 inline-block">
                                            Browse Courses →
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {learningSummary.map((item, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                    <span className="truncate flex-1">{item.title}</span>
                                                    <span>{item.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all"
                                                        style={{ width: `${item.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <p className="text-lg font-semibold text-gray-900 mb-4">Achievements</p>
                                {achievements.length === 1 && achievements[0].label === "No achievements yet" ? (
                                    <div className="text-center py-4 bg-gray-50 rounded-lg">
                                        <Trophy size={32} className="text-gray-300 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">No achievements yet</p>
                                        <p className="text-xs text-gray-400 mt-1">Complete courses to earn badges</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {achievements.map((item, idx) => (
                                            <Achievement
                                                key={idx}
                                                label={item.label}
                                                subText={item.subText}
                                                icon={item.icon === "🏆" ? <Trophy size={22} className="text-yellow-500" /> : <CheckCircle size={22} className="text-primary-600" />}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {teamMembers.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-lg font-semibold text-gray-900">Team Members</p>
                                        <CirclePlus size={20} className="text-primary-600 cursor-pointer hover:text-primary-700 transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        {teamMembers.map((member, index) => (
                                            <TeamMember
                                                key={index}
                                                name={member.name}
                                                role={member.role}
                                                img={member.img}
                                                isActive={member.isActive}
                                            />
                                        ))}
                                    </div>
                                    <button className="mt-4 w-full bg-primary-50 hover:bg-primary-100 py-2.5 rounded-lg text-sm font-medium text-primary-700 transition-colors">
                                        See All Team Members
                                    </button>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-200">
                                <Link
                                    href="/dashboard/profile"
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                    onClick={handleCloseProfile}
                                >
                                    <User size={18} />
                                    Edit Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2 mt-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <LogOut size={18} />
                                    Log out
                                </button>
                            </div>
                        </div>
                    </aside>
                </>
            )}
        </>
    )
}
