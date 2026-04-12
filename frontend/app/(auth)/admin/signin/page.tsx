// app/(auth)/admin/signin/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, Shield, Lock, Mail, Loader2 } from 'lucide-react'
import { loginUser } from '@/lib/api'

// Function to decode JWT token and extract claims
function decodeJWT(token: string): any {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        return JSON.parse(jsonPayload)
    } catch (error) {
        console.error('Failed to decode JWT:', error)
        return null
    }
}

export default function AdminSigninPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('admin@talentflow.com')
    const [password, setPassword] = useState('TalentFlow@2026!')
    const [keepSignedIn, setKeepSignedIn] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccessMessage('')

        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address')
            return
        }

        setLoading(true)

        try {
            console.log('🟡 Admin login attempt for:', email)

            const response = await loginUser(email, password)
            console.log('🟢 Admin login response:', response)

            // Extract token from response - handling both response.data and direct response
            const token = response?.data?.token || (response as any)?.token
            const refreshToken = response?.data?.refreshToken || (response as any)?.refreshToken
            const responseData = response?.data || response

            if (!token) {
                setError('Authentication failed. No token received.')
                setLoading(false)
                return
            }

            // Decode the JWT token to get the role
            const decodedToken = decodeJWT(token)
            console.log('🔍 Decoded token:', decodedToken)

            // Extract role from decoded token
            let userRole = 'Student'
            if (decodedToken) {
                // Check for role in different possible claim locations
                userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
                    decodedToken['role'] ||
                    decodedToken['Role'] ||
                    'Student'
            }

            console.log(`🟢 User role from token: "${userRole}"`)

            // Check if user has admin role (case-insensitive)
            const isAdmin = userRole?.toLowerCase() === 'admin' ||
                userRole?.toLowerCase() === 'administrator'

            console.log(`🟢 Is Admin? ${isAdmin} (Role: ${userRole})`)

            if (!isAdmin) {
                setError(`Access Denied: This portal is for administrators only. Your role is "${userRole}". Please contact support if you believe this is an error.`)
                setLoading(false)
                return
            }

            // Store authentication data
            if (keepSignedIn) {
                localStorage.setItem('authToken', token)
                if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
                if (responseData) localStorage.setItem('user', JSON.stringify(responseData))
                localStorage.setItem('isAuthenticated', 'true')
                console.log('✅ Stored in localStorage (persistent)')
            } else {
                sessionStorage.setItem('authToken', token)
                if (refreshToken) sessionStorage.setItem('refreshToken', refreshToken)
                if (responseData) sessionStorage.setItem('user', JSON.stringify(responseData))
                sessionStorage.setItem('isAuthenticated', 'true')
                console.log('✅ Stored in sessionStorage (temporary)')
            }

            // Store user details - safely access properties
            const emailAddr = (responseData as any)?.email || email
            const fullName = (responseData as any)?.fullName || emailAddr

            localStorage.setItem('userFullName', fullName)
            localStorage.setItem('userEmail', emailAddr)
            localStorage.setItem('userRole', userRole)
            localStorage.setItem('isAdmin', 'true')

            setSuccessMessage('Admin login successful! Redirecting to admin dashboard...')

            console.log('🔴 Redirecting to /admindashboard')

            // Redirect to admin dashboard
            setTimeout(() => {
                window.location.href = '/admindashboard'
            }, 500)

        } catch (err: any) {
            console.error('🔴 Admin login error:', err)
            setError(err.message || 'Failed to sign in. Please check your credentials.')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* Left Side - Admin Brand Section */}
                <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 min-h-[40vh] lg:min-h-screen flex flex-col justify-between p-6 sm:p-8 md:p-10">
                    <div className="mb-8 lg:mb-0">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield size={40} className="text-purple-500" />
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                                Admin Portal
                            </h1>
                        </div>
                        <p className="text-sm sm:text-md text-gray-300 mt-1">
                            TALENTFLOW ADMIN DASHBOARD
                        </p>
                    </div>

                    <div className="hidden md:flex flex-col gap-6 lg:gap-8 my-8 lg:my-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Manage your platform
                            <br />
                            with full control
                        </h2>

                        <div className="space-y-3 md:space-y-4">
                            {[
                                'User Management & Analytics',
                                'Course & Content Administration',
                                'Certificate Verification System',
                                'Real-time Platform Monitoring'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-5 h-5 border border-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    </div>
                                    <span className="text-gray-300 text-sm md:text-[16px]">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block border border-purple-500/30 p-6 md:p-8 rounded-xl bg-white/5 backdrop-blur-sm mt-8 lg:mt-0">
                        <p className="text-gray-300 italic text-sm md:text-base mb-4">
                            "The admin portal gives us complete visibility and control
                            over our learning platform. Absolutely essential!"
                        </p>
                        <div>
                            <p className="font-semibold text-white">
                                Merit Okonkwo
                            </p>
                            <p className="text-sm text-gray-400">
                                PLATFORM ADMINISTRATOR
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Admin Sign In Form */}
                <div className="w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 md:px-8 lg:px-12 overflow-auto">
                    <div className="w-full max-w-md mx-auto">
                        {/* Admin Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full flex items-center gap-2">
                                <Shield size={16} />
                                <span className="text-sm font-semibold">Admin Access</span>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="mb-6 md:mb-8 text-center">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                Admin Sign In
                            </h2>
                            <p className="text-sm md:text-base text-gray-500">
                                Access the administrative dashboard
                            </p>
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
                                {successMessage}
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Admin Login Form */}
                        <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    ADMIN EMAIL
                                </label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@talentflow.com"
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                                    PASSWORD
                                </label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        disabled={loading}
                                        required
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

                            {/* Options Row */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={keepSignedIn}
                                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                        disabled={loading}
                                    />
                                    <span className="text-sm text-gray-600">
                                        Keep me signed in
                                    </span>
                                </label>

                                <Link
                                    href="/forgotpassword"
                                    className="text-sm text-purple-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Access Dashboard
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Secure Access Only
                                </span>
                            </div>
                        </div>

                        {/* Back to User Sign In */}
                        <p className="text-center text-sm text-gray-600">
                            Not an admin?{' '}
                            <Link href="/signin" className="text-purple-600 hover:underline font-medium">
                                User Sign In
                            </Link>
                        </p>

                        {/* Security Notice */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">
                                🔒 This area is restricted to authorized personnel only
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}