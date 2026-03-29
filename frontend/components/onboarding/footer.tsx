import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Facebook,
    Instagram,
    Youtube,
    Sms,
    Call,
    Location,
    ArrowRight,
    ArrowRight2,
    Send2,
    Xrp
} from 'iconsax-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Courses', href: '/courses' },
        { name: 'Contact', href: '/contact' },
        { name: 'Blog', href: '/blog' },
    ];

    const supportLinks = [
        { name: 'Help Center', href: '/' },
        { name: 'Terms of Service', href: '/' },
        { name: 'Privacy Policy', href: '/' },
        { name: 'Cookie Policy', href: '/' },
        { name: 'FAQs', href: '/' },
    ];

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', color: '#1877F2' },
        { icon: Xrp, href: 'https://twitter.com', color: '#1DA1F2' },
        { icon: Xrp, href: 'https://linkedin.com', color: '#0A66C2' },
        { icon: Instagram, href: 'https://instagram.com', color: '#E4405F' },
        { icon: Youtube, href: 'https://youtube.com', color: '#FF0000' },
        { icon: Xrp, href: 'https://github.com', color: '#333' },
    ];

    const contactInfo = [
        { icon: Sms, text: 'support@lms.com', href: 'mailto:support@lms.com' },
        { icon: Call, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
        { icon: Location, text: '123 Learning St, Education City, EC 12345', href: '#' },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-400 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img
                                width={150}
                                height={42}
                                src="/img/tlogo.png"
                                alt="Learning Illustration"

                            />
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Empowering learners worldwide with quality education.
                            Learn anytime, anywhere with our comprehensive learning platform.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
                                >
                                    <social.icon
                                        size={16}
                                        color='white'
                                        className="text-gray-300 group-hover:text-gray-900 transition-colors"
                                        variant="Bold"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-lg text-white relative inline-block">
                            Quick Links
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-primary-500 rounded-full"></div>
                        </h2>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <ArrowRight2
                                            size={14}
                                            color='white'
                                            className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                                        />
                                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-lg text-white relative inline-block">
                            Support
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-primary-500 rounded-full"></div>
                        </h2>
                        <ul className="space-y-2">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <ArrowRight2
                                            size={14}
                                            color='white'
                                            className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                                        />
                                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="space-y-6">
                        {/* Newsletter */}
                        <div className="space-y-3">
                            <h2 className="font-bold text-lg text-white relative inline-block">
                                Newsletter
                                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-primary-500 rounded-full"></div>
                            </h2>
                            <p className="text-gray-300 text-sm">
                                Get the latest updates on our courses and exclusive offers.
                            </p>
                            <form className="flex flex-col gap-3">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-emerald-500 to-primary-500 hover:from-emerald-600 hover:to-primary-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                                >
                                    <span>Subscribe</span>
                                    <Send2 size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-xs text-gray-400">
                                    By subscribing you agree to our{' '}
                                    <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 pt-2">
                            {contactInfo.map((contact, index) => (
                                <a
                                    key={index}
                                    href={contact.href}
                                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                                >
                                    <contact.icon
                                        size={16}
                                        color='white'
                                        className="text-emerald-500 group-hover:scale-110 transition-transform"
                                        variant="Bold"
                                    />
                                    <span className="text-sm group-hover:translate-x-1 transition-transform">{contact.text}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} LMS. All rights reserved. | Designed  for learners
                        </p>
                        <div className="flex gap-6">
                            <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Privacy
                            </Link>
                            <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Terms
                            </Link>
                            <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Cookies
                            </Link>
                            <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style >{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </footer>
    );
};

export default Footer;