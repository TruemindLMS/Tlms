'use client'

import { User, ChevronRight } from 'lucide-react'

interface RoleSelectionProps {
    onRoleSelect?: (role: string) => void
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
    const roles = [
        { id: 'individual', title: 'Individual Learner', icon: User },
        { id: 'student', title: 'Student', icon: User },
        { id: 'professional', title: 'Professional', icon: User },
    ]

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    What is your role?
                </h2>
                <p className="text-gray-500 text-sm">
                    Select the option that best describes you
                </p>
            </div>

            <div className="space-y-3">
                {roles.map((role) => {
                    const Icon = role.icon
                    return (
                        <button
                            key={role.id}
                            onClick={() => onRoleSelect?.(role.id)}
                            className="w-full group text-left p-4 rounded-xl border-2 border-gray-200 hover:border-primary-500 transition-all duration-300 bg-white hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary-50">
                                        <Icon size={20} className="text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {role.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Learn at your own pace
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}