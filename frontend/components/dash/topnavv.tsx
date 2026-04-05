'use client'

import { useState, useEffect } from 'react'
import { Search, Globe, ChevronDown, Bell, Menu, X, User, Target, BookOpen, Clock, CheckCircle, Trophy, Star, CirclePlus, LogOut, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getUser, getUserFullName, getUserEmail } from '@/lib/api'

interface TopnavvProps {
    onMenuClick?: () => void
    sidebarCollapsed?: boolean
}

// Helper Components
const CircleIcon = ({ icon }: { icon: React.ReactNode }) => (
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">
        {icon}
    </div>
)

const Achievement = ({ label, subText, icon }: { label: string; subText: string; icon: React.ReactNode }) => (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="text-green-600">{icon}</div>
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
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
        )}
    </div>
)

export default function Topnavv({ onMenuClick, sidebarCollapsed = false }: TopnavvProps) {
    const [isLangOpen, setIsLangOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isMobile, setIsMobile] = useState(false)
    const [userName, setUserName] = useState('')
    const [userFullName, setUserFullName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userInitials, setUserInitials] = useState('')
    const [profilePicture, setProfilePicture] = useState<string | null>(null)
    const [greeting, setGreeting] = useState('Good Morning')

    // Check if mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Load user data and set greeting
    useEffect(() => {
        const loadUserData = () => {
            const user = getUser()
            const fullName = getUserFullName()
            const email = getUserEmail()

            // Get profile picture from localStorage
            const savedProfilePic = localStorage.getItem('userProfilePicture')
            if (savedProfilePic) {
                setProfilePicture(savedProfilePic)
            }

            if (user) {
                const firstName = user.firstName || user.email?.split('@')[0] || 'User'
                const lastName = user.lastName || ''
                setUserName(firstName)
                setUserFullName(fullName || `${firstName} ${lastName}`.trim())
                setUserEmail(email || user.email || '')

                // Generate initials from first and last name
                const initials = `${firstName.charAt(0)}${lastName.charAt(0) || firstName.charAt(1) || ''}`.toUpperCase()
                setUserInitials(initials)
            } else {
                // Fallback to localStorage directly if getUser fails
                const storedName = localStorage.getItem('userFullName')
                const storedEmail = localStorage.getItem('userEmail')
                const storedProfilePic = localStorage.getItem('userProfilePicture')

                if (storedName) {
                    setUserFullName(storedName)
                    const nameParts = storedName.split(' ')
                    const firstName = nameParts[0] || 'User'
                    setUserName(firstName)
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
        }

        // Set greeting based on time of day
        const hour = new Date().getHours()
        if (hour < 12) setGreeting('Good Morning')
        else if (hour < 17) setGreeting('Good Afternoon')
        else setGreeting('Good Evening')

        loadUserData()

        // Listen for profile updates
        const handleProfileUpdate = () => {
            const updatedPic = localStorage.getItem('userProfilePicture')
            if (updatedPic) setProfilePicture(updatedPic)

            const user = getUser()
            if (user) {
                const firstName = user.firstName || user.email?.split('@')[0] || 'User'
                const lastName = user.lastName || ''
                setUserName(firstName)
                setUserFullName(`${firstName} ${lastName}`.trim())
                const initials = `${firstName.charAt(0)}${lastName.charAt(0) || ''}`.toUpperCase()
                setUserInitials(initials || firstName.charAt(0).toUpperCase())
            }
        }

        window.addEventListener('profileUpdated', handleProfileUpdate)
        return () => window.removeEventListener('profileUpdated', handleProfileUpdate)
    }, [])

    const languages = [
        { code: 'EN', name: 'English (UK)', flag: '🇬🇧' },
        { code: 'FR', name: 'French', flag: '🇫🇷' },
        { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
        { code: 'DE', name: 'German', flag: '🇩🇪' },
        { code: 'JP', name: 'Japanese', flag: '🇯🇵' },
    ]

    const teamMembers = [
        { name: 'John Stephen', role: 'UI Designer', img: '/img/Profile-img-1.jpg', isActive: true },
        { name: 'Isaac McVinnie', role: 'Frontend Dev', img: '/img/Profile-img-1.jpg', isActive: true },
        { name: 'David Underline', role: 'Backend Dev', img: '/img/Profile-img-1.jpg', isActive: true },
        { name: 'Tola Afolabi', role: 'Project Manager', img: '/img/Profile-img-1.jpg', isActive: false },
    ]

    // Calculate left spacing based on sidebar state and screen size
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
        // Handle logout logic here
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
                    {/* Menu Button for Mobile - Only show on mobile when sidebar is collapsed */}
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0"
                    >
                        <Menu size={20} className="text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Search Bar - Takes remaining space */}
                    <div className="flex-1 min-w-0">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Anything"
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        {/* Language Selector - Hide on mobile */}
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

                            {/* Language Dropdown */}
                            {isLangOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsLangOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setIsLangOpen(false)
                                                }}
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

                        {/* Notifications */}
                        <div className="relative">
                            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <Bell size={20} className="text-gray-600 dark:text-gray-300" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                        </div>

                        {/* User Profile Button with Dynamic Avatar */}
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
                                        className="rounded-full ring-2 ring-green-200 dark:ring-gray-700 object-cover w-8 h-8"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center ring-2 ring-green-200">
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

            {isProfileOpen && (
                <>
                    <div
                        className={`fixed inset-0 bg-black/50 z-40 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
                        onClick={handleCloseProfile}
                    />

                    {/* Profile Panel with slide animation */}
                    <aside className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}>
                        <div className="p-6">
                            {/* Close Button */}
                            <button
                                onClick={handleCloseProfile}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>

                            {/* Profile Header with Dynamic Avatar */}
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="relative">
                                    {profilePicture ? (
                                        <Image
                                            src={profilePicture}
                                            alt="user"
                                            width={96}
                                            height={96}
                                            className="rounded-full ring-4 ring-green-100 object-cover w-24 h-24"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center ring-4 ring-green-100">
                                            <span className="text-white font-bold text-3xl">
                                                {userInitials || 'U'}
                                            </span>
                                        </div>
                                    )}
                                    <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                                        <ChevronDown size={14} />
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mt-3">
                                    {greeting}, {userName}! 👋
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    {userEmail || 'Start your journey, achieve your target'}
                                </p>

                                {/* Quick Action Icons */}
                                <div className="flex gap-3">
                                    <CircleIcon icon={<Target size={16} />} />
                                    <CircleIcon icon={<BookOpen size={16} />} />
                                    <CircleIcon icon={<Clock size={16} />} />
                                </div>
                            </div>

                            {/* Learning Summary */}
                            <div className="mb-6">
                                <p className="text-lg font-semibold text-gray-900 mb-3">Learning Summary</p>
                                <div className="space-y-2">
                                    <div>
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>UI/UX Design</span>
                                            <span>75%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Frontend Development</span>
                                            <span>60%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full w-3/5 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Backend Development</span>
                                            <span>45%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full w-2/5 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements Section */}
                            <div className="mb-6">
                                <p className="text-lg font-semibold text-gray-900 mb-4">Achievements</p>
                                <div className="space-y-2">
                                    <Achievement
                                        label="Completed Courses"
                                        subText="UI/UX Intermediate"
                                        icon={<CheckCircle size={22} className="text-green-600" />}
                                    />
                                    <Achievement
                                        label="Certificates Earned"
                                        subText="UI/UX Track"
                                        icon={<Trophy size={22} className="text-yellow-500" />}
                                    />
                                    <Achievement
                                        label="Top Performer"
                                        subText="Week 1"
                                        icon={<Star size={22} className="text-yellow-400" />}
                                    />
                                </div>
                            </div>

                            {/* Team Members Section */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-lg font-semibold text-gray-900">Team Members</p>
                                    <CirclePlus size={20} className="text-green-600 cursor-pointer hover:text-green-700 transition-colors" />
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

                                <button className="mt-4 w-full bg-green-50 hover:bg-green-100 py-2.5 rounded-lg text-sm font-medium text-green-700 transition-colors">
                                    See All Team Members
                                </button>
                            </div>

                            {/* Divider and Actions */}
                            <div className="pt-4 border-t border-gray-200">
                                <Link
                                    href="/dashboard/profile"
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                    onClick={handleCloseProfile}
                                >
                                    <User size={18} />
                                    Edit Profile
                                </Link>
                            </div>
                        </div>
                    </aside>
                </>
            )}
        </>
    )
}