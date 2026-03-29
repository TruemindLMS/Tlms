'use client'

import { useState, useEffect } from 'react'
import { Search, Globe, ChevronDown, Bell, Menu, X, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface TopnavvProps {
    onMenuClick?: () => void
    sidebarCollapsed?: boolean
}

export default function Topnavv({ onMenuClick, sidebarCollapsed = false }: TopnavvProps) {
    const [isLangOpen, setIsLangOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isMobile, setIsMobile] = useState(false)

    // Check if mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const languages = [
        { code: 'EN', name: 'English (UK)', flag: '🇬🇧' },
        { code: 'FR', name: 'French', flag: '🇫🇷' },
        { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
        { code: 'DE', name: 'German', flag: '🇩🇪' },
        { code: 'JP', name: 'Japanese', flag: '🇯🇵' },
    ]

    // Calculate left spacing based on sidebar state and screen size
    const getLeftSpacing = () => {
        if (isMobile) return 'left-0'
        return sidebarCollapsed ? 'md:left-20' : 'md:left-64'
    }

    return (
        <nav
            className={`fixed top-0 right-0 ${getLeftSpacing()} bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-40 transition-all duration-300`}
        >
            <div className="flex items-center justify-between px-4 md:px-6 h-16">
                {/* Search Bar - Center */}
                <div className="flex-1 max-w-2xl mx-2 md:mx-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Anything"
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                    </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-1 md:gap-4">
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                                                // Handle language change
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

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-1 md:gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-primary-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Image
                                src="/img/Profile-img-1.jpg"
                                width={36}
                                height={36}
                                alt="Profile"
                                className="rounded-full ring-2 ring-primary-200 dark:ring-gray-700"
                            />
                            <ChevronDown size={16} className="hidden sm:inline text-primary-400" />
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsProfileOpen(false)}
                                />
                                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src="/img/Profile-img-1.jpg"
                                                width={48}
                                                height={48}
                                                alt="Profile"
                                                className="rounded-full"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">Charlotte Jane</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">charlotte@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <Link
                                            href="/dash/userprofile"
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700"
                                        >
                                            <User size={16} />
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/dash/settings"
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700"
                                        >
                                            <User size={16} />
                                            Settings
                                        </Link>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                                        <Link
                                            href="/signin"
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-red-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700"
                                        >
                                            Log out
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}