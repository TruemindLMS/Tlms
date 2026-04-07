'use client'

import { Suspense } from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Check, Loader2, ArrowRight, Mail, AlertCircle } from 'lucide-react'
import { verifyOtp, sendOtp } from '@/lib/api'

export default function VerifyOTPPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" size={40} /></div>}>
            <VerifyOTPContent />
        </Suspense>
    )
}

function VerifyOTPContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get('email')
    const role = searchParams.get('role')

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [countdown, setCountdown] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [resendMessage, setResendMessage] = useState('')
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        if (!email) {
            router.push('/signup')
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

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        if (errorMessage) setErrorMessage('')
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
        if (e.key === 'Enter' && otp.every(d => d !== '')) {
            handleVerifyOTP()
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
        const lastFilledIndex = newOtp.findLastIndex(char => char !== '')
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
        inputRefs.current[focusIndex]?.focus()
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
            const response = await verifyOtp(email!, otpValue)

            if (response.success || response.token) {
                const userDataStr = localStorage.getItem('pendingUserData')
                if (userDataStr) {
                    const userData = JSON.parse(userDataStr)
                    localStorage.setItem('userFullName', userData.fullName)
                    localStorage.setItem('userEmail', userData.email)
                    localStorage.setItem('userRole', userData.role || role || 'Student')
                    localStorage.setItem('isAuthenticated', 'true')
                    localStorage.removeItem('pendingUserData')
                }

                if (response.token) {
                    localStorage.setItem('authToken', response.token)
                }

                if (response.user) {
                    localStorage.setItem('user', JSON.stringify(response.user))
                }

                setStatus('success')
                setTimeout(() => {
                    router.push('/onboarding')
                }, 2000)
            } else {
                throw new Error(response.message || 'Invalid OTP code')
            }
        } catch (error: any) {
            setStatus('error')
            setErrorMessage(error.message || 'Invalid verification code')
            setTimeout(() => setStatus('idle'), 3000)
        }
    }

    const handleResendOTP = async () => {
        if (!canResend) return

        setResendLoading(true)
        setErrorMessage('')
        setResendMessage('')

        try {
            const response = await sendOtp(email!)
            if (response.success) {
                setResendMessage('✅ New code sent! Check your email.')
                setOtp(['', '', '', '', '', ''])
                setCountdown(60)
                setCanResend(false)
                inputRefs.current[0]?.focus()
                setTimeout(() => setResendMessage(''), 5000)
            } else {
                throw new Error(response.message || 'Failed to resend')
            }
        } catch (error: any) {
            setErrorMessage(error.message || 'Failed to resend OTP')
            setTimeout(() => setErrorMessage(''), 5000)
        } finally {
            setResendLoading(false)
        }
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen flex bg-[#004222] items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
                    <p className="text-gray-600 mb-6">Your email has been confirmed.</p>
                    <button
                        onClick={() => router.push('/onboarding')}
                        className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                        Continue <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#004222] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail size={40} className="text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
                    <p className="text-gray-600">We sent a 6-digit code to</p>
                    <p className="text-lg font-semibold text-primary-600 mt-1">{email}</p>
                </div>

                <div className="mb-8">
                    <div className="flex justify-center gap-2">
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
                                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                                autoFocus={index === 0}
                                disabled={status === 'verifying'}
                            />
                        ))}
                    </div>

                    {errorMessage && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center gap-2 text-red-600">
                                <AlertCircle size={16} />
                                <p className="text-sm">{errorMessage}</p>
                            </div>
                        </div>
                    )}

                    {resendMessage && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-600 text-sm text-center">{resendMessage}</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleVerifyOTP}
                    disabled={status === 'verifying'}
                    className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 mb-4 flex items-center justify-center gap-2"
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

                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                    {canResend ? (
                        <button
                            onClick={handleResendOTP}
                            disabled={resendLoading}
                            className="text-primary-600 font-medium hover:text-primary-700"
                        >
                            {resendLoading ? 'Sending...' : 'Resend Code'}
                        </button>
                    ) : (
                        <p className="text-sm text-gray-400">Resend available in {countdown} seconds</p>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <Link href="/signup" className="text-sm text-gray-500 hover:text-gray-700">
                        ← Back to Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}