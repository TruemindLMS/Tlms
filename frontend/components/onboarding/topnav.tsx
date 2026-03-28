
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Topnav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const allowedRoutes = ['/', '/blog', '/about', '/courses', '/contact'];
    if (!allowedRoutes.includes(pathname)) return null;

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'Classroom' },
        { href: '/courses', label: ' Courses' },
        { href: '/contact', label: 'Contact Us' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };


    if (pathname?.startsWith('/dash')) {
        return null
    }

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img
                            width={150}
                            height={42}
                            src="/img/tlogo.png"
                            alt="Learning Illustration"

                        />
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${isActive(link.href)
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-gray-700 hover:text-primary'
                                    } transition-colors pb-1`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link
                            href="/Signin"
                            className="bg-white text-primary  border border-primary   px-8 py-1 rounded-2xl hover:bg-primary-200 transition-colors"
                        >
                            Login
                        </Link>

                        <Link
                            href="/Signin"
                            className="bg-primary-500 text-white px-8 py-1 rounded-2xl hover:bg-primary-600 transition-colors"
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
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${isActive(link.href)
                                    ? 'text-primary-600 bg-primary-100'
                                    : 'text-gray-700'
                                    } block px-4 py-2 hover:bg-gray-50 transition-colors`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-4 pt-4 border-t flex flex-col space-y-2 px-4">


                            <Link
                                href="/Signin"
                                className="bg-primary-300 text-white px-5 py-2 rounded-full hover:bg-primary-600 transition-colors text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </Link>

                            <Link
                                href="/Signin"
                                className="bg-primary-500 text-white px-5 py-2 rounded-full hover:bg-primary-600 transition-colors text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Topnav;