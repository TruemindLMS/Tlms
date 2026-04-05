"use client";

import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { forgotPassword } from "@/lib/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Email validation
        if (!email) {
            setError("Please enter your email address");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);

        try {
            // Call the actual API
            const response = await forgotPassword(email);

            if (response.success) {
                setIsSubmitted(true);
            } else {
                setError(response.message || "Failed to send reset link. Please try again.");
            }
        } catch (err: any) {
            console.error("Forgot password error:", err);
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendEmail = async () => {
        setIsLoading(true);
        try {
            await forgotPassword(email);
        } catch (err) {
            console.error("Resend error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isSubmitted) {
        // Forgot Password Form State
        return (
            <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-[#f6f8f7] px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img
                        width={400}
                        height={50}
                        src="/img/nlogo.png"
                        alt="Learning Illustration"
                    />
                </div>
                <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm">
                    <h1 className="text-2xl font-bold text-center text-[#1A1F1D] mb-2">Forgot your password?</h1>

                    {/* Description */}
                    <p className="text-[#404940] text-center mb-8">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#404940] mb-2">
                                EMAIL ADDRESS
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="you@example.com"
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6 text-center">
                        <Link
                            href="/signin"
                            className="text-sm text-primary-600 hover:text-primary-700"
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Email Sent Confirmation State
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f6f8f7] px-4">
            <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm">
                {/* Back Button */}
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm">Back</span>
                </button>

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-primary-500" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-[#1A1F1D] mb-3">
                    Check your email
                </h2>

                {/* Description */}
                <p className="text-[#404940] text-center mb-8">
                    We've sent a password reset link to{" "}
                    <span className="font-semibold text-[#1A1F1D]">{email}</span>.
                    Please check your inbox and follow the instructions.
                </p>

                {/* Resend Button */}
                <button
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-6 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Resend Email"
                    )}
                </button>

                {/* Help Links */}
                <div className="text-center space-y-3">
                    <p className="text-sm text-gray-500">
                        Didn't receive the email? Check your spam folder or{" "}
                        <button
                            onClick={() => window.location.href = "/contact"}
                            className="text-primary-600 hover:text-primary-700"
                        >
                            Contact Support
                        </button>
                    </p>

                    <Link
                        href="/signin"
                        className="text-sm text-gray-400 hover:text-gray-500 block"
                    >
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;