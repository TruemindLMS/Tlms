'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, CheckCircle, Loader2, ArrowRight, Home, RefreshCw } from 'lucide-react';
import { logoutUser, logout } from '@/lib/api';

export default function SignoutPage() {
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const performLogout = async () => {
            try {
                // Call the logout API (optional - clears session on backend)
                await logoutUser();
                setStatus('success');

                // Redirect to home after 3 seconds
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            } catch (error: any) {
                console.error('Logout error:', error);
                setErrorMessage(error.message || 'Failed to logout properly');
                setStatus('error');
            }
        };

        performLogout();
    }, [router]);

    const handleManualRedirect = () => {
        router.push('/');
    };

    const handleRetryLogout = async () => {
        setStatus('loading');
        setErrorMessage('');

        try {
            // Clear local storage manually if API fails
            logout();
            setStatus('success');
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error: any) {
            setErrorMessage('Could not complete logout. Please clear your browser data manually.');
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-priamry-600 to-primary-500 px-6 py-8 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                            {status === 'loading' && <Loader2 size={40} className="text-white animate-spin" />}
                            {status === 'success' && <LogOut size={40} className="text-white" />}
                            {status === 'error' && <LogOut size={40} className="text-white" />}
                        </div>
                        <h1 className="text-2xl font-bold text-white">
                            {status === 'loading' && 'Signing Out...'}
                            {status === 'success' && 'Signed Out Successfully'}
                            {status === 'error' && 'Sign Out Failed'}
                        </h1>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-8">
                        {status === 'loading' && (
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                                </div>
                                <p className="text-gray-600">
                                    Please wait while we securely sign you out...
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    You will be redirected to the homepage shortly.
                                </p>
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <CheckCircle size={48} className="text-primary-500" />
                                </div>
                                <p className="text-gray-700 mb-2">
                                    You have been successfully signed out.
                                </p>
                                <p className="text-sm text-gray-500 mb-6">
                                    Thank you for using TalentFlow. We hope to see you again soon!
                                </p>
                                <div className="space-y-3">
                                    <button
                                        onClick={handleManualRedirect}
                                        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Home size={18} />
                                        Return to Homepage
                                        <ArrowRight size={18} />
                                    </button>
                                    <Link
                                        href="/signin"
                                        className="block w-full text-center text-gray-600 hover:text-primary-600 transition-colors text-sm"
                                    >
                                        Sign in again →
                                    </Link>
                                </div>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="text-center">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                    <p className="text-primary-700 text-sm">
                                        {errorMessage || 'An error occurred while trying to sign out.'}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <button
                                        onClick={handleRetryLogout}
                                        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <RefreshCw size={18} />
                                        Retry Sign Out
                                    </button>
                                    <button
                                        onClick={handleManualRedirect}
                                        className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                    >
                                        Go to Homepage
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-500">
                            © {new Date().getFullYear()} TalentFlow. All rights reserved.
                        </p>
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">
                        For your security, we recommend closing all browser windows after signing out.
                    </p>
                </div>
            </div>
        </div>
    );
}