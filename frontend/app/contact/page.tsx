
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ContactChannel = 'email' | 'chat' | 'phone' | 'video';
type Priority = 'low' | 'medium' | 'high' | 'urgent';

const contactMethods = [
    { id: 'email' as const, title: 'Email Support', icon: '📧', desc: 'Detailed inquiries', time: '< 4h', gradient: 'primary-200', action: 'support@aeonyx.com' },
    { id: 'chat' as const, title: 'Live Chat', icon: '💬', desc: 'Instant answers', time: '< 2 min', gradient: 'from-cyan-500 to-blue-500', action: 'Start Chat' },
    { id: 'phone' as const, title: 'Priority Hotline', icon: '📞', desc: 'Urgent issues', time: '< 10 min', gradient: 'from-emerald-500 to-teal-500', action: '+1 (888) 123-4567' },
    { id: 'video' as const, title: 'Video Consult', icon: '🎥', desc: 'Screen sharing', time: 'Next day', gradient: 'from-orange-500 to-red-500', action: 'Schedule Call' },
];

const faqs = [
    { q: 'How do I reset my password?', a: 'Click "Forgot Password" on login page or contact support for assistance.' },
    { q: 'Can I get a refund?', a: 'Yes, we offer 30-day money-back guarantee for all courses.' },
    { q: 'Are certificates accredited?', a: 'Yes, all certificates are verifiable and industry-recognized.' },
    { q: 'How to access offline materials?', a: 'Download our mobile app and save courses for offline viewing.' },
];

export default function ContactPage() {
    const [activeChannel, setActiveChannel] = useState<ContactChannel>('email');
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: '', priority: 'medium' as Priority,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '', priority: 'medium' });
        setTimeout(() => setShowSuccess(false), 5000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-500 to-primary-500">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                        <span className="text-sm text-gray-300">WE'RE HERE 24/7</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
                        Let's Connect
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Get instant support from our team — average response time under 2 minutes
                    </p>
                </motion.div>

                {/* Contact Channels */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {contactMethods.map((method, idx) => (
                        <motion.button
                            key={method.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setActiveChannel(method.id)}
                            className={`relative p-5 rounded-2xl text-left transition-all ${activeChannel === method.id
                                ? `bg-gradient-to-br ${method.gradient} shadow-lg scale-105`
                                : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            <div className="text-3xl mb-2">{method.icon}</div>
                            <h3 className="font-semibold text-white">{method.title}</h3>
                            <p className="text-xs text-gray-300 mt-1">{method.desc}</p>
                            <div className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full bg-white/20">
                                {method.time}
                            </div>
                            <div className="mt-3 pt-2 text-xs text-purple-200 font-mono truncate">
                                {method.action}
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Main Content: Form + FAQs */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
                                    <i className="fas fa-envelope text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                                    <p className="text-gray-400 text-sm">Fill out the form and we'll respond within {contactMethods.find(m => m.id === activeChannel)?.time}</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                                        <select
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                                        >
                                            <option value="low">Low - General inquiry</option>
                                            <option value="medium">Medium - Need help</option>
                                            <option value="high">High - Urgent</option>
                                            <option value="urgent">Urgent - Critical issue</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition resize-none"
                                        placeholder="Describe your issue in detail..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-primary-300 text-white shadow-lg hover:shadow-xl transition disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <i className="fas fa-spinner fa-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Send Message
                                            <i className="fas fa-paper-plane" />
                                        </span>
                                    )}
                                </motion.button>
                            </form>

                            {/* Success Toast */}
                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 shadow-2xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <i className="fas fa-check-circle text-white text-xl" />
                                            <div>
                                                <p className="font-semibold text-white">Message Sent!</p>
                                                <p className="text-emerald-100 text-sm">We'll respond within {contactMethods.find(m => m.id === activeChannel)?.time}</p>
                                            </div>
                                            <button onClick={() => setShowSuccess(false)} className="ml-auto text-white">
                                                <i className="fas fa-times" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* FAQ & Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Live Status Card */}
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary-500 to-teal-500 flex items-center justify-center">
                                    <i className="fas fa-headset text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Live Support Status</h3>
                                    <p className="text-xs text-gray-400">Currently active</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                                </span>
                                <span className="text-sm text-emerald-400">1 agents online now</span>
                                <span className="text-xs text-gray-500 ml-auto">Avg wait: &lt;2 min</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-white/10"
                >
                    {[
                        { icon: 'fa-headset', text: '24/7 Support' },
                        { icon: 'fa-bolt', text: 'Instant Response' },
                        { icon: 'fa-globe', text: 'Global Coverage' },
                        { icon: 'fa-lock', text: 'Secure & Private' },
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                            <i className={`fas ${badge.icon} text-purple-400`} />
                            <span>{badge.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <style >{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
        </div>
    );
}