"use client";

import { BookOpenText } from "lucide-react";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface AssignmentCardType {
    title: string;
    number: string;
    color: string;
}

interface AssignmentType {
    id: number;
    courseTitle: string;
    status: string;
    details: string;
    dueDate: string;
    color: string;
    bgColor: string;
    value: number;
    submittedDate?: string;
}

export default function Assignmentpage() {
    const statues = ["Overdue", "Pending", "Submitted"];
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [assignments, setAssignments] = useState<AssignmentType[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        submitted: 0,
        pending: 0,
        overdue: 0
    });

    useEffect(() => {
        // Load assignments from localStorage or use default data
        const savedAssignments = localStorage.getItem('userAssignments');
        if (savedAssignments) {
            setAssignments(JSON.parse(savedAssignments));
        } else {
            setAssignments(AssignmentData);
            localStorage.setItem('userAssignments', JSON.stringify(AssignmentData));
        }
    }, []);

    useEffect(() => {
        // Calculate stats whenever assignments change
        const total = assignments.length;
        const submitted = assignments.filter(a => a.status === "Submitted").length;
        const pending = assignments.filter(a => a.status === "Pending").length;
        const overdue = assignments.filter(a => a.status === "Overdue").length;

        setStats({ total, submitted, pending, overdue });

        // Save to localStorage
        localStorage.setItem('userAssignments', JSON.stringify(assignments));
    }, [assignments]);

    const getCurrentUserId = () => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                return parsedUser?.id || parsedUser?.email || 'anonymous';
            }
        }
        return 'anonymous';
    };

    const handleSubmitAssignment = (assignmentId: number) => {
        setAssignments(prev => prev.map(assignment =>
            assignment.id === assignmentId && assignment.status === "Pending"
                ? {
                    ...assignment,
                    status: "Submitted",
                    value: 100,
                    submittedDate: new Date().toLocaleDateString(),
                    color: "text-primary-700",
                    bgColor: "bg-primary-50"
                }
                : assignment
        ));

        // Dispatch event to update dashboard stats
        window.dispatchEvent(new CustomEvent('assignmentUpdated'));
    };

    const filteredAssignments = statusFilter === "All"
        ? assignments
        : assignments.filter((card) => card.status === statusFilter);

    const AssignmentCardData: AssignmentCardType[] = [
        { title: "Total Assignment", number: stats.total.toString(), color: "text-blue-600" },
        { title: "Submitted", number: stats.submitted.toString(), color: "text-primary-500" },
        { title: "Pending", number: stats.pending.toString(), color: "text-primary-500" },
        { title: "Overdue", number: stats.overdue.toString(), color: "text-red-500" },
    ];

    return (
        <section className="w-full min-h-screen bg-cover ml-1 lg:ml-1 md:ml-5 bg-center bg-no-repeat " style={{ backgroundImage: "url('/img/tback.png')" }}>
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 mb-6">
                    <div className="flex items-center gap-2">
                        <BookOpenText className="w-6 h-6 text-primary-600" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                            My Assignments
                        </h1>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Week 4 — {stats.pending} pending, {stats.overdue} overdue
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {AssignmentCardData.map((card, index) => (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6" key={index}>
                            <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                            <h2 className={`text-3xl font-bold ${card.color} mt-2`}>
                                {card.number}
                            </h2>
                        </div>
                    ))}
                </div>

                {/* Filter Buttons */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 mb-6">
                    <div className="flex flex-wrap gap-3">
                        {["All", "Overdue", "Pending", "Submitted"].map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setStatusFilter(item)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all ${statusFilter === item
                                    ? "bg-primary-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Assignments List */}
                <div className="flex flex-col mb-5">
                    {statues.map((status) => {
                        const filtered = filteredAssignments.filter(
                            (card) => card.status === status
                        );

                        if (filtered.length === 0) return null;

                        return (
                            <div key={status} className="mb-6">
                                <h2 className="font-semibold mb-3 text-gray-700 uppercase text-sm tracking-wider">
                                    {status} ({filtered.length})
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filtered.map((card) => (
                                        <div
                                            key={card.id}
                                            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-base md:text-lg font-bold text-gray-900">
                                                    {card.courseTitle}
                                                </h3>
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full font-medium ${card.color} ${card.bgColor}`}
                                                >
                                                    {card.status}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-500 mb-2">{card.details}</p>

                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                                <p className="text-sm text-gray-500">
                                                    {card.status === "Overdue"
                                                        ? `Due: ${card.dueDate}`
                                                        : card.status === "Submitted"
                                                            ? `Submitted: ${card.submittedDate || card.dueDate}`
                                                            : `Pending since: ${card.dueDate}`}
                                                </p>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mt-4">
                                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                    <span>Progress</span>
                                                    <span className="font-medium">{card.value}%</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-500 ${card.status === "Overdue"
                                                            ? "bg-red-500"
                                                            : card.status === "Pending"
                                                                ? "bg-yellow-500"
                                                                : "bg-primary-500"
                                                            }`}
                                                        style={{ width: `${card.value}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            {card.status === "Pending" && (
                                                <button
                                                    onClick={() => handleSubmitAssignment(card.id)}
                                                    className="w-full mt-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition"
                                                >
                                                    Submit Assignment
                                                </button>
                                            )}

                                            {card.status === "Submitted" && (
                                                <div className="w-full mt-4 py-2 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium text-center">
                                                    ✓ Submitted Successfully
                                                </div>
                                            )}

                                            {card.status === "Overdue" && (
                                                <button
                                                    onClick={() => handleSubmitAssignment(card.id)}
                                                    className="w-full mt-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
                                                >
                                                    Submit Late
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredAssignments.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border">
                        <BookOpenText size={48} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Assignments Found</h3>
                        <p className="text-gray-500">Try changing your filter to see more assignments.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

// ASSIGNMENT DATA
const AssignmentData: AssignmentType[] = [];
