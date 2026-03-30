"use client";

import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const handleResendEmail = () => {
        // Handle resend email logic
        console.log("Resending email to:", email);
    };

    if (!isSubmitted) {
        // Forgot Password Form State
        return (
            <div className="min-h-screen flex flex-col gap-5  items-center justify-center bg-[#f6f8f7] px-4">
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
                        Enter your email address and we'll send you a new password.
                    </p>


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
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Sending..." : "Reset password"}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6 text-center space-y-3">
                        <button
                            onClick={() => window.location.href = "/signin"}
                            className="text-sm text-primary-500 hover:text-primary-600 block w-full"
                        >
                            Back To Login
                        </button>

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
                        <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-[#1A1F1D] mb-3">
                    Check your email
                </h2>

                {/* Description */}
                <p className="text-[#404940] text-center mb-8">
                    After you sent us a secure reset link to{" "}
                    <span className="font-semibold text-[#1A1F1D]">{email}</span>, please check your inbox.
                </p>

                {/* Send Email Button */}
                <button
                    onClick={handleResendEmail}
                    className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors mb-6"
                >
                    Send email sign-up
                </button>

                {/* Help Links */}
                <div className="text-center space-y-3">
                    <p className="text-sm text-gray-500">
                        Don't receive this email?{" "}
                        <button
                            onClick={() => window.location.href = "/manage-account"}
                            className="text-primary-500 hover:text-primary-600"
                        >
                            Manage my account
                        </button>
                    </p>

                    <button
                        onClick={() => window.location.href = "/"}
                        className="text-sm text-gray-400 hover:text-gray-500 block w-full"
                    >
                        Back to homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;