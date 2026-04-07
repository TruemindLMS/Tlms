'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Check, ArrowRight, User, Mail, Lock, Loader2 } from 'lucide-react'
import { registerUser, sendOtp } from '@/lib/api'

export default function SignupPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [selectedRole, setSelectedRole] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role)
        setStep(2)
        setError('')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        if (!agreeTerms) {
            setError('Please agree to the Terms of Service')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address')
            return
        }

        setLoading(true)

        try {
            const nameParts = formData.fullName.trim().split(' ')
            const firstName = nameParts[0]
            const lastName = nameParts.slice(1).join(' ')

            // Register user
            await registerUser({
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                firstName,
                lastName,
                role: selectedRole
            })

            // Send OTP
            await sendOtp(formData.email)

            // Store user data temporarily
            localStorage.setItem('pendingUserData', JSON.stringify({
                fullName: formData.fullName,
                email: formData.email,
                role: selectedRole
            }))

            // Redirect to OTP verification
            window.location.href = `/verify-otp?email=${encodeURIComponent(formData.email)}&role=${encodeURIComponent(selectedRole)}`

        } catch (err: any) {
            console.error('Signup error:', err)
            if (err.message?.includes('already exists')) {
                setError('Account already exists. Please sign in.')
            } else {
                setError(err.message || 'Failed to create account')
            }
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-white">
            <div className="flex flex-col lg:flex-row min-h-screen w-full">
                {/* Left Side - Brand Section */}
                <div className="w-full lg:w-[578px] relative bg-[#004222] min-h-[40vh] lg:min-h-screen flex flex-col justify-center p-6 sm:p-8 md:p-10">
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                            TalentFlow
                        </h1>
                        <p className="text-sm text-white/80 mt-1">
                            TRUEMINDS INNOVATIONS
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Start your journey
                            <br />
                            with us today
                        </h2>

                        <div className="space-y-3">
                            {['Access to 500+ courses', 'Personalized learning paths'].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 border border-white/80 rounded-full flex items-center justify-center">
                                        <Check size={12} className="text-white/80" />
                                    </div>
                                    <span className="text-white/80 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:flex-1 bg-white flex items-center justify-center py-12 px-4">
                    <div className="w-full max-w-md">
                        {/* Tabs */}
                        <div className="flex gap-6 mb-8 border-b border-gray-200">
                            <Link href="/signin" className="text-xl text-gray-500 pb-2">
                                Sign in
                            </Link>
                            <Link href="/signup" className="text-xl text-primary-600 border-b-2 border-primary-600 pb-2">
                                Sign up
                            </Link>
                        </div>

                        {step === 1 ? (
                            // Role Selection
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Choose your role</h2>
                                <button
                                    onClick={() => handleRoleSelect('individual')}
                                    className="w-full p-4 border rounded-lg hover:border-primary-500 transition-colors text-left"
                                >
                                    <div className="font-semibold">Individual Learner</div>
                                    <div className="text-sm text-gray-500">Learn at your own pace</div>
                                </button>
                                <button
                                    onClick={() => handleRoleSelect('organization')}
                                    className="w-full p-4 border rounded-lg hover:border-primary-500 transition-colors text-left"
                                >
                                    <div className="font-semibold">Organization</div>
                                    <div className="text-sm text-gray-500">Train your team</div>
                                </button>
                            </div>
                        ) : (
                            // Sign Up Form
                            <>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold">Create account</h2>
                                    <p className="text-gray-500">Join as {selectedRole}</p>
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSignUp} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            FULL NAME
                                        </label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                disabled={loading}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            EMAIL
                                        </label>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="email@example.com"
                                                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                disabled={loading}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                PASSWORD
                                            </label>
                                            <div className="relative">
                                                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    placeholder="Password"
                                                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    disabled={loading}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                CONFIRM
                                            </label>
                                            <div className="relative">
                                                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    placeholder="Confirm"
                                                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    disabled={loading}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                >
                                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span className="text-sm text-gray-600">
                                            I agree to the Terms of Service
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Creating account...
                                            </>
                                        ) : (
                                            <>
                                                Create account
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <p className="text-center text-sm text-gray-600 mt-6">
                                    Already have an account?{' '}
                                    <Link href="/signin" className="text-primary-600 hover:underline">
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