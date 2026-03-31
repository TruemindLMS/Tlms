'use client'

import { Suspense } from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2, ArrowRight, Mail } from 'lucide-react'

// Main component wrapped with Suspense
export default function VerifyOTPPage() {
    return (
        <Suspense fallback={<OTPLoadingFallback />}>
            <VerifyOTPContent />
        </Suspense>
    )
}

// Loading fallback component
function OTPLoadingFallback() {
    return (
        <div className="min-h-screen flex bg-[#004222] items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                    <Loader2 size={40} className="text-primary-600 animate-spin mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
                </div>
            </div>
        </div>
    )
}

// Main content component that uses useSearchParams
function VerifyOTPContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get('email')

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [countdown, setCountdown] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        if (!email) {
            router.push('/signup')
            return
        }
    }, [email, router])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (countdown > 0 && !canResend) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        } else if (countdown === 0) {
            setCanResend(true)
        }
        return () => clearTimeout(timer)
    }, [countdown, canResend])

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        // Clear error when user starts typing
        if (errorMessage) {
            setErrorMessage('')
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 6)
        const otpArray = pastedData.split('')
        const newOtp = [...otp]

        otpArray.forEach((char, idx) => {
            if (idx < 6 && /^\d$/.test(char)) {
                newOtp[idx] = char
            }
        })

        setOtp(newOtp)

        // Focus on the next empty input or last input
        const lastFilledIndex = newOtp.findLastIndex(char => char !== '')
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
        inputRefs.current[focusIndex]?.focus()

        // Clear error when user pastes
        if (errorMessage) {
            setErrorMessage('')
        }
    }

    const handleVerifyOTP = async () => {
        const otpValue = otp.join('')
        if (otpValue.length !== 6) {
            setErrorMessage('Please enter the 6-digit code')
            return
        }

        setStatus('verifying')
        setErrorMessage('')

        try {
            //  Replace with  actual API call
            // const response = await fetch('/api/auth/verify-otp', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         email,
            //         otp: otpValue
            //     })
            // })
            // const data = await response.json()
            // if (!response.ok) throw new Error(data.message)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Check OTP - Default code is 654321
            if (otpValue === '654321') {
                // Get stored user data
                const userData = JSON.parse(localStorage.getItem('pendingUserData') || '{}')

                // Store user data permanently
                localStorage.setItem('userFullName', userData.fullName)
                localStorage.setItem('userEmail', userData.email)
                localStorage.setItem('userRole', userData.role)
                localStorage.setItem('isAuthenticated', 'true')

                // Clear pending data
                localStorage.removeItem('pendingUserData')

                setStatus('success')

                // Redirect to onboarding after 2 seconds
                setTimeout(() => {
                    router.push('/signuponboarding/onboarding1')
                }, 2000)
            } else {
                throw new Error('Invalid OTP code. Please check and try again.')
            }

        } catch (error) {
            console.error('OTP verification error:', error)
            setStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Invalid verification code. Please try again.')
        }
    }

    const handleResendOTP = async () => {
        if (!canResend) return

        setResendLoading(true)

        try {
            //  Replace with  actual API call
            // const response = await fetch('/api/auth/resend-otp', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email })
            // })
            // const data = await response.json()
            // if (!response.ok) throw new Error(data.message)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Reset OTP inputs
            setOtp(['', '', '', '', '', ''])
            setCountdown(60)
            setCanResend(false)
            setErrorMessage('')
            setStatus('idle')

            alert('A new verification code has been sent to your email!')

            // Focus on first input
            inputRefs.current[0]?.focus()

        } catch (error) {
            console.error('Resend error:', error)
            setErrorMessage('Failed to resend OTP. Please try again.')
        } finally {
            setResendLoading(false)
        }
    }

    const handleContinueToOnboarding = () => {
        router.push('/signuponboarding/onboarding1')
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen flex bg-[#004222] items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Email Verified Successfully!
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Your email has been confirmed. Now let's personalize your profile.
                        </p>
                        <div className="bg-primary-50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-primary-700">
                                <strong>Next step:</strong> Complete your profile to get personalized course recommendations.
                            </p>
                        </div>
                        <button
                            onClick={handleContinueToOnboarding}
                            className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                        >
                            Continue to Profile Setup
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex bg-[#004222] items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail size={40} className="text-primary-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Verify Your Email
                        </h2>
                        <p className="text-gray-600">
                            We've sent a 6-digit verification code to
                        </p>
                        <p className="text-lg font-semibold text-primary-600 mt-1">
                            {email}
                        </p>
                    </div>

                    {/* OTP Input Fields */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                            Enter Verification Code
                        </label>
                        <div className="flex justify-center gap-2 md:gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                                    autoFocus={index === 0}
                                    disabled={status === 'verifying'}
                                />
                            ))}
                        </div>
                        {errorMessage && (
                            <p className="text-red-500 text-sm text-center mt-3">
                                {errorMessage}
                            </p>
                        )}
                        {/* Demo hint */}
                        <p className="text-xs text-gray-400 text-center mt-3">
                            Demo code: <span className="font-mono font-semibold">654321</span>
                        </p>
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerifyOTP}
                        disabled={status === 'verifying'}
                        className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2"
                    >
                        {status === 'verifying' ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            'Verify & Continue'
                        )}
                    </button>

                    {/* Resend Section */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            Didn't receive the code?
                        </p>
                        {canResend ? (
                            <button
                                onClick={handleResendOTP}
                                disabled={resendLoading}
                                className="text-primary-600 font-medium hover:text-primary-700 transition-colors disabled:opacity-50"
                            >
                                {resendLoading ? (
                                    <>
                                        <Loader2 size={14} className="inline animate-spin mr-1" />
                                        Sending...
                                    </>
                                ) : (
                                    'Resend Code'
                                )}
                            </button>
                        ) : (
                            <p className="text-sm text-gray-400">
                                Resend available in {countdown} seconds
                            </p>
                        )}
                    </div>

                    {/* Back to Signup Link */}
                    <div className="mt-6 text-center">
                        <Link href="/signup" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                            ← Back to Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}