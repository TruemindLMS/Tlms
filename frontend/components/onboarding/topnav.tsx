'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ExploreDropdown from '@/app/explore/page';

const Topnav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const pathname = usePathname();

    const allowedRoutes = ['/', '/blog', '/about', '/courses', '/contact', '/explore', '/faq'];

    // Check dashboard routes first
    if (pathname?.startsWith('/dashboard')) {
        return null;
    }

    // If not in allowedRoutes, return null
    if (!allowedRoutes.includes(pathname)) {
        return null;
    }

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/explore', label: 'Explore' },
        { href: '/about', label: 'About Us' },
        { href: '/faq', label: 'Help/FAQ' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    const handleExploreClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsExploreOpen(!isExploreOpen);
    };

    return (
        <>
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex gap-2">
                            <Link href="/">
                                <img
                                    width={150}
                                    height={42}
                                    src="/img/logo.png"
                                    alt="Learning Illustration"
                                    className="cursor-pointer"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                link.label === 'Explore' ? (
                                    <button
                                        key={link.href}
                                        onClick={handleExploreClick}
                                        className={`${isExploreOpen ? 'text-primary-600' : isActive(link.href) ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors font-medium pb-1`}
                                    >
                                        {link.label}
                                    </button>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`${isActive(link.href)
                                            ? 'text-primary-600 border-b-2 border-primary-600'
                                            : 'text-gray-700 hover:text-primary-600'
                                            } transition-colors font-medium pb-1`}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* Auth Buttons - Public Version (No Sign Out) */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <Link
                                href="/signin"
                                className="bg-white text-primary-600 border border-primary-600 px-8 py-1 rounded-2xl hover:bg-primary-50 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-primary-600 text-white px-8 py-1 rounded-2xl hover:bg-primary-700 transition-colors"
                            >
                                Get started
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-gray-700"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden py-4 border-t">
                            {navLinks.map((link) => (
                                link.label === 'Explore' ? (
                                    <button
                                        key={link.href}
                                        onClick={() => {
                                            setIsExploreOpen(!isExploreOpen);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`${isActive(link.href)
                                            ? 'text-primary-600 bg-primary-50'
                                            : 'text-gray-700'
                                            } block px-4 py-2 hover:bg-gray-50 transition-colors`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                            <div className="mt-4 pt-4 border-t flex flex-col space-y-2 px-4">
                                <Link
                                    href="/signin"
                                    className="bg-primary-100 text-primary-700 px-5 py-2 rounded-full hover:bg-primary-200 transition-colors text-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-primary-600 text-white px-5 py-2 rounded-full hover:bg-primary-700 transition-colors text-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Explore Dropdown */}
            <ExploreDropdown isOpen={isExploreOpen} onClose={() => setIsExploreOpen(false)} />
        </>
    );
};

export default Topnav;