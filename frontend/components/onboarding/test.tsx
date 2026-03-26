'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
    Rocket,
    Users,
    TrendingUp,
    Package,
    Lightbulb,
    ArrowRight,
    Sparkles,
    Code,
    Paintbrush,
    Database,
    Clock,
    Crown,
    Target,
    Globe,
    Heart
} from 'lucide-react';
import Link from 'next/link';

const InnovationHub = () => {
    const [activeProject, setActiveProject] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const projects = [
        {
            title: "AI Healthcare Assistant",
            team: "HealthTech Squad",
            members: 6,
            progress: 78,
            depts: ["Data Science", "Engineering", "Design"],
            tech: ["Python", "TensorFlow", "React Native"],
            impact: "100,000+ users potential",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop"
        },
        {
            title: "Sustainable Agriculture Platform",
            team: "AgriTech",
            members: 5,
            progress: 45,
            depts: ["Data Science", "Design", "Marketing"],
            tech: ["React", "Node.js", "PostgreSQL"],
            impact: "500+ farmers helped",
            image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&h=400&fit=crop"
        },
        {
            title: "EdTech Gamification Engine",
            team: "Learning Lab",
            members: 4,
            progress: 92,
            depts: ["Engineering", "Design", "Data"],
            tech: ["Next.js", "TypeScript", "Redis"],
            impact: "200% engagement boost",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
        }
    ];

    const metrics = [
        { value: "24", label: "Active Projects", icon: <Rocket size={20} /> },
        { value: "156", label: "Innovation Hours", icon: <Lightbulb size={20} /> },
        { value: "12", label: "Prototypes", icon: <Package size={20} /> },
        { value: "3", label: "Patents", icon: <Crown size={20} /> }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
                        <Sparkles size={16} className="text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700">INNOVATION HUB</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        Where Ideas Become Reality
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Build real products, solve real problems, and make a real impact
                    </p>
                </div>

                {/* Stats */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {metrics.map((m, i) => (
                        <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all">
                            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                                {m.icon}
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{m.value}</div>
                            <div className="text-xs text-gray-500">{m.label}</div>
                        </div>
                    ))}
                </div>


                {/* Challenges & Events */}
                <div className={`grid md:grid-cols-2 gap-8 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {/* Innovation Challenges */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp size={20} className="text-emerald-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Innovation Challenges</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Climate Tech Hackathon", prize: "₦500,000", deadline: "5 days left" },
                                { name: "FinTech for Inclusion", prize: "₦300,000", deadline: "2 weeks left" },
                                { name: "AI for Social Good", prize: "₦400,000", deadline: "3 weeks left" }
                            ].map((c, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                    <div>
                                        <p className="font-medium text-gray-900">{c.name}</p>
                                        <p className="text-xs text-gray-400">{c.prize}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={12} className="text-red-400" />
                                        <span className="text-xs text-gray-500">{c.deadline}</span>
                                        <ArrowRight size={14} className="text-emerald-600 ml-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Globe size={20} className="text-emerald-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Demo Day - AI Healthcare", date: "Mar 28", attendees: 45 },
                                { name: "Design Thinking Workshop", date: "Mar 30", attendees: 32 },
                                { name: "Mentor Session: Strategy", date: "Apr 2", attendees: 28 }
                            ].map((e, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                    <div>
                                        <p className="font-medium text-gray-900">{e.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock size={10} className="text-gray-400" />
                                            <span className="text-xs text-gray-500">{e.date}</span>
                                            <Users size={10} className="text-gray-400 ml-1" />
                                            <span className="text-xs text-gray-500">{e.attendees} attending</span>
                                        </div>
                                    </div>
                                    <button className="text-xs text-emerald-600 font-medium">Join →</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className={`mt-12 text-center transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <Link href="/">
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all group">
                            Start Your Project
                            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </Link>
                    <p className="text-xs text-gray-400 mt-4">Join 50+ innovators building the future</p>
                </div>
            </div>
        </section>
    );
};

export default InnovationHub;