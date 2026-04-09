'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    BookOpen,
    Award,
    Users,
    TrendingUp,
    Settings,
    HelpCircle,
    Moon,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
    X
} from 'lucide-react'

interface NavItem {
    name: string
    href: string
    icon: React.ElementType
    section?: 'general' | 'tools'
}

interface SidebarProps {
    onCollapse?: (collapsed: boolean) => void
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, section: 'general' },
    { name: 'Courses', href: '/dashboard/courses', icon: BookOpen, section: 'general' },
    { name: 'Task', href: '/dashboard/task', icon: Award, section: 'general' },
    { name: 'Team', href: '/dashboard/team', icon: Users, section: 'general' },
    { name: 'My Certificates', href: '/dashboard/certificate', icon: Award, section: 'general' },
    { name: 'Account & Settings', href: '/dashboard/userprofile', icon: Settings, section: 'tools' },
]

export default function Sidebar({ onCollapse }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const pathname = usePathname()

    // Check if mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth >= 768) {
                setIsMobileOpen(false)
            }
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        onCollapse?.(collapsed)
    }, [collapsed, onCollapse])

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    const generalNav = navigation.filter(item => item.section === 'general')
    const toolsNav = navigation.filter(item => item.section === 'tools')

    // Get width classes based on state
    const getWidthClasses = () => {
        if (isMobile) {
            return isMobileOpen ? 'w-64' : 'w-0 -translate-x-full'
        }
        return collapsed ? 'w-20' : 'w-64'
    }

    // Mobile menu button (visible only on mobile)
    const MobileMenuButton = () => (
        <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-gray-200 lg:hidden"
        >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
    )

    // Overlay for mobile
    const MobileOverlay = () => (
        <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            onClick={() => setIsMobileOpen(false)}
        />
    )

    return (
        <>
            <MobileMenuButton />
            <MobileOverlay />

            <aside
                className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-50 ${getWidthClasses()}`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                        {(!isMobile || (isMobile && isMobileOpen)) && !collapsed && (
                            <img
                                width={150}
                                height={42}
                                src="/img/logo.png"
                                alt="TalentFlow Logo"
                                className="object-contain"
                            />
                        )}
                        {!isMobile && (
                            <button
                                onClick={toggleCollapse}
                                className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 outline-none transition-colors ${collapsed ? 'mx-auto' : ''
                                    }`}
                            >
                                {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                            </button>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-6 overflow-hidden ">
                        {/* General Section */}
                        {(!collapsed || !isMobile) && (
                            <div className="px-3 mb-3">
                                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-0">
                                    General
                                </p>
                            </div>
                        )}

                        <div className={`${!collapsed ? 'mb-6' : 'mb-4'} px-3`}>
                            <div className="space-y-1">
                                {generalNav.map((item) => {
                                    const Icon = item.icon
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => isMobile && setIsMobileOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative ${isActive
                                                ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                } ${collapsed && !isMobile ? 'justify-center' : ''}`}
                                        >
                                            <Icon size={20} className={isActive ? 'text-primary-600 dark:text-primary-400' : ''} />
                                            {(!collapsed || isMobile) && <span className="text-sm font-medium">{item.name}</span>}
                                            {collapsed && !isMobile && (
                                                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                    {item.name}
                                                </span>
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Tools Section */}
                        {(!collapsed || !isMobile) && (
                            <div className="px-3 mb-3">
                                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3">
                                    Tools
                                </p>
                            </div>
                        )}

                        <div className="px-3">
                            <div className="space-y-1">
                                {toolsNav.map((item) => {
                                    const Icon = item.icon
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => isMobile && setIsMobileOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative ${isActive
                                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                } ${collapsed && !isMobile ? 'justify-center' : ''}`}
                                        >
                                            <Icon size={20} className={isActive ? 'text-primary-600 dark:text-primary-400' : ''} />
                                            {(!collapsed || isMobile) && <span className="text-sm font-medium">{item.name}</span>}
                                            {collapsed && !isMobile && (
                                                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                    {item.name}
                                                </span>
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </nav>

                    {/* Bottom Actions */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-3">
                        <div className="space-y-1">
                            <button
                                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative ${collapsed && !isMobile ? 'justify-center' : ''
                                    }`}
                            >
                                <HelpCircle size={20} />
                                {(!collapsed || isMobile) && <span className="text-sm font-medium hidden lg:block">Help</span>}
                                {collapsed && !isMobile && (
                                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                        Help
                                    </span>
                                )}
                            </button>

                            <button
                                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative ${collapsed && !isMobile ? 'justify-center' : ''
                                    }`}
                            >
                                <Moon size={20} />
                                {(!collapsed || isMobile) && <span className="text-sm font-medium hidden lg:block">Dark Mode</span>}
                                {collapsed && !isMobile && (
                                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                        Dark Mode
                                    </span>
                                )}
                            </button>

                            <Link href="/">
                                <button
                                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group relative ${collapsed && !isMobile ? 'justify-center' : ''
                                        }`}
                                >
                                    <LogOut size={20} />
                                    {(!collapsed || isMobile) && <span className="text-sm font-medium hidden lg:block">Logout</span>}
                                    {collapsed && !isMobile && (
                                        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-black text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                            Logout
                                        </span>
                                    )}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
