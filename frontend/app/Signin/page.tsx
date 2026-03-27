import React from 'react';
import Image from 'next/image';
import Image1949 from '@/public/img/image1949.jpg';

const Signin = () => {
    return (
        <div className="flex h-screen bg-white">
            {/* Left Image Section */}
            <div className="hidden lg:flex  flex-col space-y-12 w-1/2 bg-gray-100 items-center justify-center">
                <Image
                    src={Image1949}
                    alt="Sign in"
                    width={500}
                    height={500}
                    className="object-cover w-auto h-auto rounded-lg shadow-lg"
                />
                <h1 className="text-5xl font-bold text-gray-800 mb-2 text-center">Learn and grow at <br /> your own pace </h1>
            </div>

            {/* Right Sign In Section */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8">
                <div className="w-full max-w-md items-center justify-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2 flex-col space-y-7 text-center">Create Your Trueminds <br /> Account </h1>
                    <p className="text-gray-600 mb-8 text-center flex-col space-y-4 "> Plan, manage, and elevate every moment from first <br /> idea to final applause</p>

                    <br />



                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* Password Input */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* Sign In Button */}
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
                        Sign In
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or</span>
                        </div>
                    </div>

                    {/* Google Sign In Button */}
                    <button

                        className="w-full bg-blue-500 hover:bg-blue-600 text-[#000000] font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <image href="data:image/svg+xml;base64,..." />
                        </svg>
                        Sign in with Google
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-600 mt-4">
                        Dont have an account?{' '}
                        <a href="/signup" className="text-green-500 hover:text-green-600 font-semibold">
                            Signup
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Signin;
