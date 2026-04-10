"use client";

import { BookOpenText, Plus, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { assignmentApi, Assignment, getUserRole } from "@/lib/api";

interface AssignmentCardType {
    title: string;
    number: string;
    color: string;
}

interface LocalAssignmentType {
    id: string;
    courseTitle: string;
    status: string;
    details: string;
    dueDate: string;
    color: string;
    bgColor: string;
    value: number;
    submittedDate?: string;
    backendId?: string;
}

interface AssignmentSummary {
    totalAssignments: number;
    submittedAssignments: number;
    pendingAssignments: number;
    overdueAssignments: number;
}

// Modal component for creating assignments (Mentors only)
function CreateAssignmentModal({
    isOpen,
    onClose,
    onSuccess
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [formData, setFormData] = useState({
        courseId: '',
        lessonId: '',
        title: '',
        description: '',
        dueDateUtc: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Convert local datetime to UTC ISO string
            const utcDate = new Date(formData.dueDateUtc).toISOString();

            const assignmentData: any = {
                courseId: formData.courseId,
                title: formData.title,
                description: formData.description,
                dueDateUtc: utcDate
            };

            // Only add lessonId if provided
            if (formData.lessonId) {
                assignmentData.lessonId = formData.lessonId;
            }

            await assignmentApi.create(assignmentData);
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                courseId: '',
                lessonId: '',
                title: '',
                description: '',
                dueDateUtc: ''
            });
        } catch (err: any) {
            setError(err.message || 'Failed to create assignment');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Create New Assignment</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Assignment title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description *
                        </label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            rows={3}
                            placeholder="Assignment description"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Course ID *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.courseId}
                            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Course ID (UUID)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lesson ID (Optional)
                        </label>
                        <input
                            type="text"
                            value={formData.lessonId}
                            onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Lesson ID (UUID)"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date *
                        </label>
                        <input
                            type="datetime-local"
                            required
                            value={formData.dueDateUtc}
                            onChange={(e) => setFormData({ ...formData, dueDateUtc: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Assignment'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Assignmentpage() {
    const statues = ["Overdue", "Pending", "Submitted"];
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [assignments, setAssignments] = useState<LocalAssignmentType[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        submitted: 0,
        pending: 0,
        overdue: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isMentor, setIsMentor] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Determine user role
    useEffect(() => {
        const role = getUserRole();
        setIsMentor(role === 'Mentor' || role === 'Admin');
    }, []);

    // Load assignments from API
    useEffect(() => {
        loadAssignments();
    }, []);

    const loadAssignments = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Fetch both assignments and summary
            const [backendAssignments, summary] = await Promise.all([
                assignmentApi.getAll(),
                assignmentApi.getSummary().catch(() => null)
            ]);

            // Update stats from summary if available
            if (summary) {
                setStats({
                    total: summary.totalAssignments || 0,
                    submitted: summary.submittedAssignments || 0,
                    pending: summary.pendingAssignments || 0,
                    overdue: summary.overdueAssignments || 0
                });
            }

            // If no assignments returned
            if (!backendAssignments || backendAssignments.length === 0) {
                setAssignments([]);
                setIsLoading(false);
                return;
            }

            // Transform backend assignments to local format
            const transformedAssignments = backendAssignments.map((assignment: Assignment) => {
                // Determine status
                let status = assignment.status || 'Pending';
                const dueDate = new Date(assignment.dueDateUtc || assignment.dueDate || '');
                const now = new Date();

                // Override status based on due date if not submitted
                if (status !== 'Submitted' && dueDate < now) {
                    status = 'Overdue';
                }

                // Calculate progress value
                let value = 0;
                if (status === 'Submitted') value = 100;
                else if (status === 'Overdue') value = 30;
                else value = 60;

                return {
                    id: assignment.id,
                    backendId: assignment.id,
                    courseTitle: assignment.courseTitle || assignment.title || 'Untitled Assignment',
                    status,
                    details: assignment.description || '',
                    dueDate: dueDate.toLocaleDateString(),
                    submittedDate: assignment.submittedDateUtc || assignment.submittedDate
                        ? new Date(assignment.submittedDateUtc || assignment.submittedDate || '').toLocaleDateString()
                        : undefined,
                    color: status === 'Submitted' ? 'text-primary-700' : status === 'Overdue' ? 'text-red-700' : 'text-yellow-700',
                    bgColor: status === 'Submitted' ? 'bg-primary-50' : status === 'Overdue' ? 'bg-red-50' : 'bg-yellow-50',
                    value
                };
            });

            setAssignments(transformedAssignments);

            // Update stats from assignments if summary not available
            if (!summary) {
                const total = transformedAssignments.length;
                const submitted = transformedAssignments.filter(a => a.status === "Submitted").length;
                const pending = transformedAssignments.filter(a => a.status === "Pending").length;
                const overdue = transformedAssignments.filter(a => a.status === "Overdue").length;
                setStats({ total, submitted, pending, overdue });
            }

            // Save to localStorage as backup
            localStorage.setItem('userAssignments', JSON.stringify(transformedAssignments));
        } catch (err: any) {
            console.error('Failed to load assignments:', err);
            setError(err.message || 'Failed to load assignments. The API might not be available yet.');

            // Fallback to localStorage
            const savedAssignments = localStorage.getItem('userAssignments');
            if (savedAssignments) {
                try {
                    const parsed = JSON.parse(savedAssignments);
                    setAssignments(parsed);

                    // Recalculate stats
                    const total = parsed.length;
                    const submitted = parsed.filter((a: LocalAssignmentType) => a.status === "Submitted").length;
                    const pending = parsed.filter((a: LocalAssignmentType) => a.status === "Pending").length;
                    const overdue = parsed.filter((a: LocalAssignmentType) => a.status === "Overdue").length;
                    setStats({ total, submitted, pending, overdue });
                } catch (e) {
                    console.error('Failed to parse saved assignments:', e);
                }
            } else {
                setAssignments([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitAssignment = async (assignmentId: string) => {
        const assignment = assignments.find(a => a.id === assignmentId);
        if (!assignment || assignment.status === "Submitted") return;

        try {
            // Call the API to submit the assignment
            await assignmentApi.submit(assignment.backendId || assignmentId, {
                textResponse: `Assignment submitted on ${new Date().toLocaleString()}`
            });

            // Update local state
            setAssignments(prev => prev.map(assignment =>
                assignment.id === assignmentId
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

            // Update stats
            setStats(prev => ({
                ...prev,
                submitted: prev.submitted + 1,
                pending: prev.pending - 1
            }));

            // Save to localStorage
            const updatedAssignments = assignments.map(a =>
                a.id === assignmentId
                    ? { ...a, status: "Submitted", value: 100, submittedDate: new Date().toLocaleDateString(), color: "text-primary-700", bgColor: "bg-primary-50" }
                    : a
            );
            localStorage.setItem('userAssignments', JSON.stringify(updatedAssignments));

            // Dispatch event to update dashboard stats
            window.dispatchEvent(new CustomEvent('assignmentUpdated'));

            console.log('✅ Assignment submitted successfully');
        } catch (err: any) {
            console.error('Failed to submit assignment:', err);
            alert(`Failed to submit assignment: ${err.message}`);
        }
    };

    const filteredAssignments = statusFilter === "All"
        ? assignments
        : assignments.filter((card) => card.status === statusFilter);

    const AssignmentCardData: AssignmentCardType[] = [
        { title: "Total Assignment", number: stats.total.toString(), color: "text-blue-600" },
        { title: "Submitted", number: stats.submitted.toString(), color: "text-primary-500" },
        { title: "Pending", number: stats.pending.toString(), color: "text-yellow-500" },
        { title: "Overdue", number: stats.overdue.toString(), color: "text-red-500" },
    ];

    if (isLoading) {
        return (
            <section className="w-full min-h-screen bg-cover ml-1 lg:ml-1 md:ml-5 bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/tback.png')" }}>
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                        <span className="ml-2 text-gray-600">Loading assignments...</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full min-h-screen bg-cover ml-1 lg:ml-1 md:ml-5 bg-center bg-no-repeat" style={{ backgroundImage: "url('/img/tback.png')" }}>
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BookOpenText className="w-6 h-6 text-primary-600" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                                {isMentor ? 'Manage Assignments' : 'My Assignments'}
                            </h1>
                        </div>
                        {isMentor && (
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                            >
                                <Plus size={18} />
                                Create Assignment
                            </button>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Week 4 — {stats.pending} pending, {stats.overdue} overdue
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                        {error}
                        <button
                            onClick={loadAssignments}
                            className="ml-4 text-sm underline hover:no-underline"
                        >
                            Retry
                        </button>
                    </div>
                )}

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
                                                            : `Due: ${card.dueDate}`}
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

                                            {/* Action Button - Only show for Interns */}
                                            {!isMentor && (
                                                <>
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
                                                </>
                                            )}

                                            {/* Mentor View - Show submission status */}
                                            {isMentor && (
                                                <div className="w-full mt-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium text-center">
                                                    {card.status === "Submitted" ? "✓ Submitted" : "Awaiting Submission"}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredAssignments.length === 0 && !isLoading && (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm border">
                        <BookOpenText size={48} className="text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Assignments Found</h3>
                        <p className="text-gray-500">
                            {isMentor
                                ? "Create a new assignment to get started."
                                : "No assignments available at the moment."}
                        </p>
                        {isMentor && (
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                            >
                                Create First Assignment
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Create Assignment Modal */}
            <CreateAssignmentModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={loadAssignments}
            />
        </section>
    );
}