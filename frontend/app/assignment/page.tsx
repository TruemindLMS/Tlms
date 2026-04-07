"use client";

import { BookOpenText, Plus } from "lucide-react";
import { useState, useEffect } from "react";

// ASSIGNMENT DATA - Starts empty, will be populated from API/localStorage
interface Assignment {
  id: string;
  courseTitle: string;
  status: "Overdue" | "Pending" | "Submitted";
  details: string;
  dueDate: string;
  color: string;
  bgColor: string;
  value: number;
  description?: string;
  points?: number;
}

export default function Assignmentpage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  const statues = ["Overdue", "Pending", "Submitted"];

  // Load assignments from localStorage or API
  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = () => {
    setLoading(true);
    try {
      // Try to load from localStorage first
      const savedAssignments = localStorage.getItem("userAssignments");
      if (savedAssignments) {
        setAssignments(JSON.parse(savedAssignments));
      } else {
        // Start with empty array - no assignments until given
        setAssignments([]);
        localStorage.setItem("userAssignments", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error loading assignments:", error);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate counts dynamically from assignments
  const totalAssignments = assignments.length;
  const submittedCount = assignments.filter(a => a.status === "Submitted").length;
  const pendingCount = assignments.filter(a => a.status === "Pending").length;
  const overdueCount = assignments.filter(a => a.status === "Overdue").length;

  // Card data with real counts
  const cardData = [
    { title: "Total Assignment", number: totalAssignments.toString(), color: "text-primary-600", icon: "📋" },
    { title: "Submitted", number: submittedCount.toString(), color: "text-green-500", icon: "✅" },
    { title: "Pending", number: pendingCount.toString(), color: "text-yellow-500", icon: "⏳" },
    { title: "Overdue", number: overdueCount.toString(), color: "text-red-500", icon: "⚠️" },
  ];

  const filteredAssignments =
    statusFilter === "All"
      ? assignments
      : assignments.filter((card) => card.status === statusFilter);

  // Get upcoming and overdue counts
  const upcomingCount = pendingCount;
  const overdueCountTotal = overdueCount;

  // Function to add a new assignment (for teachers/admins)
  const addNewAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      courseTitle: "New Assignment",
      status: "Pending",
      details: "Course Name",
      dueDate: new Date().toLocaleDateString(),
      color: "text-yellow-700",
      bgColor: "bg-yellow-50",
      value: 0,
      description: "Assignment description here",
      points: 100,
    };

    const updatedAssignments = [...assignments, newAssignment];
    setAssignments(updatedAssignments);
    localStorage.setItem("userAssignments", JSON.stringify(updatedAssignments));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-50">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <BookOpenText className="w-6 h-6 text-primary-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                My Assignments
              </h1>
            </div>
            {/* Only show add button for teachers/admins - you can add role check here */}
            <button
              onClick={addNewAssignment}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition"
            >
              <Plus size={18} />
              Add Assignment
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {totalAssignments === 0
              ? "No assignments yet. Check back later!"
              : `${upcomingCount} upcoming, ${overdueCountTotal} overdue`}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow" key={index}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <h2 className={`text-3xl font-bold ${card.color} mt-2`}>
                {card.number}
              </h2>
            </div>
          ))}
        </div>

        {/* Filter Buttons - Only show if there are assignments */}
        {assignments.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 my-6">
            <div className="flex flex-wrap gap-3">
              {["All", "Overdue", "Pending", "Submitted"].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setStatusFilter(item)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer ${statusFilter === item
                    ? "bg-primary-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {item}
                  {item !== "All" && (
                    <span className="ml-2 text-xs">
                      ({assignments.filter(a => a.status === item).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty State - No Assignments */}
        {assignments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpenText size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assignments Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Your instructor hasn't posted any assignments yet. Check back later for new tasks.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <span>📧</span>
              <span>You'll be notified when new assignments are added</span>
            </div>
          </div>
        )}

        {/* Assignment Details by Status - Only show if there are assignments */}
        {assignments.length > 0 && (
          <div className="flex flex-col mb-5">
            {statues.map((status) => {
              const filtered = filteredAssignments.filter(
                (card) => card.status === status
              );

              if (filtered.length === 0) return null;

              return (
                <div key={status} className="mb-8">
                  <h2 className={`font-semibold mb-4 text-lg ${status === "Overdue" ? "text-red-600" :
                    status === "Pending" ? "text-yellow-600" :
                      "text-green-600"
                    }`}>
                    {status} ({filtered.length})
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((card) => (
                      <div
                        key={card.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-bold text-gray-900">
                            {card.courseTitle}
                          </h3>
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${card.status === "Overdue"
                              ? "bg-red-100 text-red-700"
                              : card.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                              }`}
                          >
                            {card.status}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 mb-2">{card.details}</p>

                        <div className="flex items-center mb-3">
                          <p className="text-sm text-gray-500">
                            {card.status === "Overdue"
                              ? `Due: ${card.dueDate}`
                              : card.status === "Submitted"
                                ? `Submitted: ${card.dueDate}`
                                : `Pending since: ${card.dueDate}`}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">Progress</span>
                            <span className="text-xs font-medium">{card.value}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${card.status === "Overdue"
                                ? "bg-red-500"
                                : card.status === "Pending"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                }`}
                              style={{ width: `${card.value}%` }}
                            />
                          </div>
                        </div>

                        {/* Action Buttons based on status */}
                        {card.status === "Pending" && (
                          <button className="mt-4 w-full py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition">
                            Submit Assignment
                          </button>
                        )}

                        {card.status === "Overdue" && (
                          <button className="mt-4 w-full py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition">
                            Request Extension
                          </button>
                        )}

                        {card.status === "Submitted" && (
                          <div className="mt-4 flex items-center justify-center gap-2">
                            <span className="text-xs text-green-600">✓ Graded</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500 cursor-pointer hover:text-primary-600">
                              View Feedback
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}