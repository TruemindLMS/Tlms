'use client'

import { useState } from 'react'
import Sidebar from "@/components/dash/sidenav"
import Topnavv from '@/components/dash/topnavv'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 ">
            {/* Sidebar */}
            <Sidebar onCollapse={setSidebarCollapsed} />

            {/* Mobile sidebar overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Top Navigation */}
            <Topnavv onMenuClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} sidebarCollapsed={sidebarCollapsed} />

            {/* Main Content */}
            <main className={`pt-16 transition-all duration-300 bg-gray-100 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
                }`}>
                <div className="p-4 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}