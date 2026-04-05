"use client";

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Check, ArrowRight, Loader2 } from 'lucide-react'
import { Google } from 'iconsax-react'
import { loginUser } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      const response = await loginUser(email, password)

      if (response.token) {
        // Store session based on "Keep me signed in" preference
        if (keepSignedIn) {
          localStorage.setItem('authToken', response.token)
          localStorage.setItem('refreshToken', response.refreshToken)
          localStorage.setItem('user', JSON.stringify(response.user))
          localStorage.setItem('isAuthenticated', 'true')
        } else {
          sessionStorage.setItem('authToken', response.token)
          sessionStorage.setItem('refreshToken', response.refreshToken)
          sessionStorage.setItem('user', JSON.stringify(response.user))
          sessionStorage.setItem('isAuthenticated', 'true')
        }

        // Redirect to dashboard or home page
        router.push('/dashboard')
      } else {
        setError(response.message || 'Login failed. Please try again.')
      }
    } catch (err: any) {
      console.error('Login error:', err)

      if (err.message?.includes('404') || err.message?.includes('not found')) {
        setError('Unable to connect to the server. Please check if the backend is running.')
      } else if (err.message?.includes('500')) {
        setError('Server error. Please try again later.')
      } else if (err.message?.includes('Invalid credentials') || err.message?.includes('password')) {
        setError('Invalid email or password. Please try again.')
      } else if (err.message?.includes('network')) {
        setError('Network error. Please check your connection.')
      } else {
        setError(err.message || 'Failed to sign in. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row min-h-screen w-full">
        {/* Left Side */}
        <div className="w-full lg:w-[578px] relative bg-[#004222] min-h-[40vh] lg:min-h-screen flex flex-col md:justify-between p-6 sm:p-8 md:p-10">
          {/* Logo */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              TalentFlow
            </h1>
            <p className="text-sm sm:text-md text-white/80 mt-1">
              TRUEMINDS INNOVATIONS
            </p>
          </div>

          {/* Tagline */}
          <div className="flex flex-col gap-6 lg:gap-8 my-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Develop talent.
              <br />
              Design the future.
            </h2>

            <div className="space-y-4 hidden md:flex flex-col">
              {[
                'Curated Learning Pathways',
                'AI-Driven Skill Assessments',
                'Global Certification Network'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 border border-white/80 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white/80" />
                  </div>
                  <span className="text-white/80 text-sm md:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="hidden lg:block border border-white/30 p-6 rounded-xl bg-white/10 backdrop-blur-sm">
            <p className="text-white/90 italic text-sm mb-4">
              "TalentFlow transformed how our team approaches growth.
              The experience is surgical, intuitive, and effective."
            </p>
            <div>
              <p className="font-semibold text-white">
                Annalie Osei
              </p>
              <p className="text-sm text-white/70">
                PRINCIPAL OF THE COMPANY
              </p>
            </div>
          </div>

          <div className="absolute z-10 top-0 right-0">
            <img
              src="/img/gaddd.png"
              alt="Decoration"
              className="w-full h-full drop-shadow-2xl"
            />
          </div>
          <div className="absolute z-10 top-0 right-0">
            <img
              src="/img/gadd.png"
              alt="Decoration"
              className="w-full h-full drop-shadow-2xl"
            />
          </div>

          {/* Mobile Features */}
          <div className="md:hidden mt-6 space-y-2">
            {[
              "Curated Learning Pathways",
              "AI-Driven Skill Assessments",
              "Global Certification Network",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 h-4 border border-white/80 rounded-full flex items-center justify-center">
                  <Check size={10} className="text-white/80" />
                </div>
                <span className="text-white/80 text-xs">{feature}</span>
              </div>
            ))}
          </div>

          <div className="absolute z-10 bottom-0 left-0">
            <img
              src="/img/gad.png"
              alt="Decoration"
              className="w-[680px] h-56 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:flex-1 min-h-[50vh] lg:min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Tabs */}
            <div className="flex gap-6 mb-8 border-b border-gray-200">
              <Link
                href="/signin"
                className="text-xl text-primary-600 font-medium border-b-2 border-primary-600 pb-2"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="text-xl text-gray-500 font-medium pb-2 hover:text-gray-700"
              >
                Sign up
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-500">
                Sign in to your account to continue
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@company.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  disabled={loading}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 pr-10 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex justify-between w-full items-center">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    disabled={loading}
                  />
                  Keep me signed in
                </label>
                <Link
                  href="/forgotpassword"
                  className="text-sm text-primary-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to dashboard
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="border-t border-gray-300"></div>
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-2 text-sm text-gray-500">
                OR
              </span>
            </div>

            {/* Google */}
            <button
              className="w-full flex items-center justify-center gap-3 px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => {
                // TODO: Implement Google OAuth
                console.log('Google sign in clicked')
              }}
            >
              <Google color='#283c30ff' size={20} />
              <span className="text-sm font-medium">
                Sign in with Google
              </span>
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-6">
              New to the platform?{" "}
              <Link
                href="/signup"
                className="text-primary-600 font-medium hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}