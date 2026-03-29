'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Check, ArrowRight, User, Mail, Lock } from 'lucide-react'
import { Google } from 'iconsax-react'
import RoleSelection from "@/app/(auth)/RoleSelection"

export default function SignupPage() {
    const [step, setStep] = useState(1) // 1: Role Selection, 2: Account Details
    const [selectedRole, setSelectedRole] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreeTerms, setAgreeTerms] = useState(false)

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role)
        setStep(2)
    }

    const handleBackToRole = () => {
        setStep(1)
    }

    return (
        <div className="min-h-screen w-full bg-white">
            {/* Main Container */}
            <div className="flex flex-col lg:flex-row min-h-screen w-full">
                {/* Left Side - Brand Section */}
                <div className="w-full lg:w-[578px] bg-primary-600 min-h-[40vh] lg:min-h-screen flex flex-col  gap-3 md:5 lg:gap-28 p-6 sm:p-8 md:p-10">
                    <div className="mb-8 lg:mb-0">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                            TalentFlow
                        </h1>
                        <p className="text-sm sm:text-md text-white/80 mt-1">
                            TRUEMINDS INNOVATIONS
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 lg:gap-8 my-8 lg:my-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Start your journey
                            <br />
                            with us today
                        </h2>

                        <div className="space-y-3 md:space-y-4 hidden md:flex flex-col">
                            {[
                                'Access to 500+ courses',
                                'Personalized learning paths',
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 border border-white/80 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check size={12} className="text-white/80" />
                                    </div>
                                    <span className="text-white/80 text-sm md:text-[16px]">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block border border-white/30 p-6 md:p-6 rounded-xl bg-white/10 backdrop-blur-sm mt-8 lg:mt-0">
                        <p className="text-white/90 italic text-sm md:text-base mb-4">
                            "Joining TalentFlow was the best decision for my career.
                            The learning experience is unmatched!"
                        </p>
                        <div>
                            <p className="font-semibold text-white">
                                Obiajulu
                            </p>
                            <p className="text-sm text-white/70">
                                SENIOR DEVELOPER
                            </p>
                        </div>
                    </div>

                    <div className="md:hidden mt-6">
                        <div className="space-y-2">
                            {[
                                'Access to 500+ courses',
                                'Personalized learning paths',
                                'Industry-recognized certificates'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-4 h-4 border border-white/80 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check size={10} className="text-white/80" />
                                    </div>
                                    <span className="text-white/80 text-xs">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full lg:flex-1 min-h-[50vh] bg-white flex items-center justify-center py-12 px-4 sm:px-6 md:px-8 lg:px-12">
                    <div className="w-full max-w-md">
                        {/* Tabs */}
                        <div className="flex justify-start gap-6 md:gap-8 mb-6 md:mb-8 border-b border-gray-200">
                            <Link
                                href="/signin"
                                className="text-xl md:text-2xl text-gray-500 font-medium pb-2 hover:text-gray-700 transition-colors"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/signup"
                                className="text-xl md:text-2xl text-primary-600 font-medium border-b-2 border-primary-600 pb-2"
                            >
                                Sign up
                            </Link>
                        </div>

                        {/* Back Button for Step 2 */}
                        {step === 2 && (
                            <button
                                onClick={handleBackToRole}
                                className="mb-6 text-sm text-gray-500 hover:text-primary-600 flex items-center gap-1 transition-colors"
                            >
                                ← Back to role selection
                            </button>
                        )}

                        {/* Step 1: Role Selection */}
                        {step === 1 && (
                            <RoleSelection onRoleSelect={handleRoleSelect} />
                        )}

                        {/* Step 2: Account Details */}
                        {step === 2 && (
                            <>
                                {/* Welcome Text */}
                                <div className="mb-6 md:mb-8">
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                        Create account
                                    </h2>
                                    <p className="text-sm md:text-base text-gray-500">
                                        Join as {selectedRole === 'individual' ? 'an Individual Learner' : selectedRole}
                                    </p>
                                </div>

                                {/* Selected Role Badge */}
                                <div className="mb-6">
                                    <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full inline-flex items-center gap-2 text-sm">
                                        <User size={14} />
                                        <span className="capitalize">
                                            {selectedRole === 'individual' ? 'Individual Learner' : selectedRole}
                                        </span>
                                    </div>
                                </div>

                                {/* Sign Up Form */}
                                <form className="space-y-4 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                            FULL NAME
                                        </label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="John Doe"
                                                className="w-full pl-10 pr-3 md:pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                            EMAIL ADDRESS
                                        </label>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="email@company.com"
                                                className="w-full pl-10 pr-3 md:pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Password and Confirm Password in a row */}
                                    <div className='flex gap-4'>
                                        {/* Password */}
                                        <div className="flex-1">
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                                PASSWORD
                                            </label>
                                            <div className="relative">
                                                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Create a password"
                                                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="flex-1">
                                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                                CONFIRM PASSWORD
                                            </label>
                                            <div className="relative">
                                                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Confirm"
                                                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Terms Agreement */}
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                        />
                                        <span className="text-xs md:text-sm text-gray-600">
                                            I agree to the{' '}
                                            <Link href="/terms" className="text-primary-600 hover:underline">
                                                Terms of Service
                                            </Link>
                                            {' '}and{' '}
                                            <Link href="/privacy" className="text-primary-600 hover:underline">
                                                Privacy Policy
                                            </Link>
                                        </span>
                                    </label>

                                    {/* Sign Up Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
                                    >
                                        Create account
                                        <ArrowRight size={18} />
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            OR
                                        </span>
                                    </div>
                                </div>

                                {/*  Sign Up with others  */}
                                <div className='flex gap-4'>
                                    <button className="w-full flex items-center justify-center gap-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors mb-6">
                                        <Google color='#283c30ff' size={20} />
                                        <span className="text-sm font-medium text-gray-700">
                                            Google
                                        </span>
                                    </button>

                                    <button className="w-full flex items-center justify-center text-center gap-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors mb-6">
                                        <Google color='#283c30ff' size={20} />
                                        <span className="text-sm font-medium text-gray-700">
                                            Linkedin
                                        </span>
                                    </button>

                                </div>

                                {/* Sign In Link */}
                                <p className="text-center text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link href="/signin" className="text-primary-600 hover:underline font-medium">
                                        Sign in
                                    </Link>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}