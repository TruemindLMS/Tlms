"use client";

import { BookOpenText } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function Assignmentpage() {
  const statues = ["Overdue", "Pending", "Submitted"];
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredAssignments =
  statusFilter === "All"
    ? Assignment
    : Assignment.filter((card) => card.status === statusFilter);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-50 ">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 mb-6">
          <div className="flex items-center gap-2">
            <BookOpenText className="w-6 h-6 text-primary-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              My Assignments
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Week 4 — 4 upcoming, 2 overdue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AssignmentCard.map((card, index) => (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6" key={index}>
              <p className="text-2xl text-gray-500 font-bold">{card.title}</p>
              <h2 className={`text-2xl font-bold ${card.color}`}>
                {card.number}
              </h2>
            </div>
          ))}
        </div>

        {/* SORT */}
        <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 my-6">
          <div className="flex flex-wrap gap-3 mb-5">
            {[
              "All",
              "Overdue",
              "Pending",
              "Submitted",
            ].map((item, index) => (
              <button
              key={index}
              onClick={() => setStatusFilter(item)}
                className={` flex-1 px-2 py-3 border border-gray-300 rounded-xl hover:shadow-md cursor-pointer transition ${ statusFilter === item ? "bg-primary-500 text-white border-primary-500" : "border-gray-300 hover:shadow-md" }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* ASSIGNMENTS */}
        </div>

        {/* ASSIGNMENT DETAILS */}
        <div className="flex flex-col mb-5">
          <div className="flex flex-col">
            {statues.map((status) => {
              const filtered = filteredAssignments.filter(
                (card) => card.status === status,
              );

              if (filtered.length === 0) return null;

              return (
                <div key={status} className="mb-6">
                  <h2 className="font-semibold mb-3 uppercase">{status}</h2>

                  <div className="flex flex-col gap-6">
                    {filtered.map((card, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                      >
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-bold">
                            {card.courseTitle}
                          </h2>

                          <p
                            className={`text-sm px-2 py-1 rounded-xl ${card.color} ${card.bgColor}`}
                          >
                            {card.status}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <p className={`mr-2 text-2xl ${card.color}`}>•</p>
                          <p className="text-md text-gray-500">
                           { status === "Overdue"  ? "Due" : status === "Submitted" ? "Submitted" : status === "Pending" && "Pending since" } {card.dueDate}
                          </p>
                        </div>

                        {/* PROGRESS BAR */}
                        <div className="flex items-center gap-3 mt-3">
                          <ResponsiveContainer width="100%" height={20}>
                            <BarChart layout="vertical" data={[card]}>
                              <XAxis type="number" domain={[0, 100]} hide />
                              <YAxis
                                dataKey="courseTitle"
                                type="category"
                                hide
                              />

                              <Bar
                                dataKey="value"
                                fill={
                                  status === "Overdue"
                                    ? "#f87171"
                                    : status === "Pending"
                                      ? "#facc15"
                                      : "#34d399"
                                }
                                background={{ fill: "#eee" }}
                                barSize={20}
                                radius={[0, 10, 10, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>

                          <span className="text-sm font-semibold">
                            {card.value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

//ASSIGNMENT CARD DATA
const AssignmentCard = [
  { title: "Total Assignment", number: "14", color: "text-primary-600" },
  { title: "Submitted", number: "8", color: "text-green-500" },
  { title: "Pending", number: "4", color: "text-yellow-500" },
  { title: "Overdue", number: "2", color: "text-red-500" },
];

// ASSIGNMENT DATA
const Assignment = [
  {
    courseTitle: "Responsive layout challenge",
    status: "Overdue",
    details: "Frontend Dev",
    dueDate: "Mar 27",
    color: "text-red-700",
    bgColor: "bg-red-50",
    value: 75,
  },
  {
    courseTitle: "Responsive layout challenge",
    status: "Overdue",
    details: "Frontend Dev",
    dueDate: "Mar 27",
    color: "text-red-700",
    bgColor: "bg-red-50",
    value: 25,
  },
  {
    courseTitle: "Responsive layout challenge",
    status: "Overdue",
    details: "Frontend Dev",
    dueDate: "Mar 27",
    color: "text-red-700",
    bgColor: "bg-red-50",
    value: 50,
  },

  {
    courseTitle: "Responsive layout challenge",
    status: "Submitted",
    details: "Frontend Dev",
    dueDate: "Mar 27",
    color: "text-green-700",
    bgColor: "bg-green-50",
    value: 100,
  },
  {
    courseTitle: "Responsive layout challenge",
    status: "Submitted",
    details: "Frontend Dev",
    dueDate: "Mar 27",
    color: "text-green-700",
    bgColor: "bg-green-50",
    value: 100,
  },
  {
    courseTitle: "Responsive layout challenge",
    status: "Pending",
    details: "Frontend Dev",
    dueDate: "Mar 27",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    value: 80,
  },
];
