'use client';

import Image from "next/image";
import { useState } from "react";
import { HardDriveUpload } from "lucide-react";
import Link from "next/link";

export default function Onboardingone() {
    const [bio, setBio] = useState("");

    return (
        <div className="min-h-screen flex flex-col justify-between bg-[#f6f8f7]">
            {/* Top Step Indicator */}
            <div className="text-center text-sm tracking-widest text-gray-400 mb-6 mt-4">
                STEP 1 OF 4
            </div>

            {/* Card Container */}
            <div className="flex flex-1 items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-sm w-full max-w-lg p-8">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Personalize your profile
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-sm mb-8">
                        Add a profile picture and a brief bio so we can customize your
                        learning path.
                    </p>

                    {/* Upload Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center relative">
                            <Image
                                src="/img/camera-icon.png"
                                alt="upload"
                                width={28}
                                height={28}
                                className="opacity-60"
                            />
                        </div>

                        <button className="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium hover:underline">
                            <HardDriveUpload size={18} /> Upload Photo
                        </button>
                    </div>

                    {/* Bio Input */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            BRIEF BIO
                        </label>

                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            maxLength={250}
                            placeholder="Tell us about your professional background and learning goals..."
                            className="w-full h-28 border border-gray-400 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        />

                        <div className="flex justify-between items-center mt-2 mb-6">
                            <p className="text-sm text-gray-600">
                                Help us understand your context to suggest relevant courses.
                            </p>
                            <span className="text-xs text-gray-400">
                                {bio.length}/250
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white mt-15">

                <button className="font-semibold text-sm text-gray-500 hover:text-gray-700">
                    Skip for now
                </button>

                <div className="flex-1 flex justify-center gap-3">
                    <button className="px-5 py-2 rounded-md border border-green-600 text-green-600 text-sm font-medium hover:bg-green-50">
                        Back
                    </button>

                    <button className="px-5 py-2 rounded-md bg-green-700 text-white text-sm font-medium hover:bg-green-800">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}