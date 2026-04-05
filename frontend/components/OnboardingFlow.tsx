'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HardDriveUpload, BadgeCheck, CheckIcon, ChevronRight, Loader2 } from "lucide-react";
import { onboardingApi, profileApi, getUser, getUserFullName } from "@/lib/api";

// Types
type Role = {
    id: string;
    shortLabel: string;
    label: string;
    icon: React.ReactNode;
};

type Goal = {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
};

// Data
const roles: Role[] = [
    {
        id: "pm",
        shortLabel: "PM",
        label: "Project Management",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
        ),
    },
    {
        id: "uiux",
        shortLabel: "UI/UX",
        label: "UI/UX Design",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
        ),
    },
    {
        id: "frontend",
        shortLabel: "Frontend",
        label: "Frontend Development",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        id: "backend",
        shortLabel: "Backend",
        label: "Backend Development",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
        ),
    },
    {
        id: "graphic",
        shortLabel: "Graphic Design",
        label: "Graphic Design",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
            </svg>
        ),
    },
    {
        id: "social",
        shortLabel: "Social Media",
        label: "Social Media Management",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
        ),
    },
];

const goals: Goal[] = [
    {
        id: "upskilling",
        title: "Upskilling",
        description: "Deepen my current technical expertise and stay relevant.",
        icon: TrendingUp,
    },
    {
        id: "career-change",
        title: "Career Change",
        description: "Transition into a new industry or high-demand role.",
        icon: BriefcaseBusinessIcon,
    },
    {
        id: "personal-interest",
        title: "Personal Interest",
        description: "Learn new things for the joy of discovery and curiosity.",
        icon: BadgeCheck,
    },
    {
        id: "certification",
        title: "Certification",
        description: "Gain industry-recognized credentials to boost my CV.",
        icon: BrainCog,
    },
];

// Import icons
import { TrendingUp, BriefcaseBusinessIcon, BrainCog } from "lucide-react";

// Navigation Component - Consistent across all steps
const NavigationButtons = ({ onBack, onNext, onSkip, showSkip = true, isLastStep = false, nextButtonText = "Continue", loading = false }: any) => {
    return (
        <div className="border-t border-gray-200 w-full bg-white px-6 py-5">
            <div className="flex items-center justify-center gap-4 max-w-[700px] mx-auto">
                {onBack && (
                    <button
                        onClick={onBack}
                        disabled={loading}
                        className="flex-1 border-2 border-[#2d6a4f] text-[#2d6a4f] font-semibold text-base py-3 rounded-2xl hover:bg-[#f0f7f3] transition-colors disabled:opacity-50"
                    >
                        Back
                    </button>
                )}
                {!isLastStep ? (
                    <button
                        onClick={onNext}
                        disabled={loading}
                        className="flex-1 bg-[#2d6a4f] text-white font-semibold text-base py-3 rounded-2xl shadow-md hover:bg-[#245a42] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                        {loading ? 'Saving...' : nextButtonText}
                    </button>
                ) : (
                    <button
                        onClick={onNext}
                        disabled={loading}
                        className="flex-1 bg-[#2d6a4f] text-white font-semibold text-base py-3 rounded-2xl shadow-md hover:bg-[#245a42] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                        {loading ? 'Completing...' : 'Go to Dashboard'}
                    </button>
                )}
            </div>

            {showSkip && !isLastStep && (
                <p
                    onClick={onSkip}
                    className="text-center text-sm text-gray-400 mt-3 cursor-pointer hover:text-gray-600 transition-colors"
                >
                    Skip for now
                </p>
            )}
        </div>
    );
};

export default function OnboardingFlow() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [bio, setBio] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("uiux");
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState<string>("");

    const totalSteps = 4;

    // Load user data on mount
    useEffect(() => {
        const user = getUser();
        const fullName = getUserFullName();
        if (fullName) {
            setName(fullName);
        } else if (user?.firstName) {
            setName(`${user.firstName} ${user.lastName || ''}`);
        } else {
            setName("there");
        }
    }, []);

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSkip = () => {
        if (step < totalSteps) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const toggleGoal = (id: string) => {
        setSelectedGoals((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleComplete = async () => {
        setLoading(true);
        try {
            // Step 1: Submit bio
            if (bio) {
                await onboardingApi.submitBio({ bio });
            }

            // Step 2: Update profile with role and goals
            await profileApi.update({
                role: selectedRole,
                goals: selectedGoals,
                bio: bio,
            });

            // Mark onboarding as completed
            localStorage.setItem('onboardingCompleted', 'true');

            console.log({
                bio,
                selectedRole,
                selectedGoals,
                name
            });

            // Redirect to dashboard
            router.push('/dash');
        } catch (error) {
            console.error('Onboarding completion error:', error);
            // Still redirect even if API fails
            router.push('/dash');
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <StepOne
                        bio={bio}
                        setBio={setBio}
                        profilePicture={profilePicture}
                        setProfilePicture={setProfilePicture}
                        profilePicturePreview={profilePicturePreview}
                        setProfilePicturePreview={setProfilePicturePreview}
                        onNext={handleNext}
                        onBack={step > 1 ? handleBack : undefined}
                        onSkip={handleSkip}
                        loading={loading}
                    />
                );
            case 2:
                return (
                    <StepTwo
                        selectedRole={selectedRole}
                        setSelectedRole={setSelectedRole}
                        onNext={handleNext}
                        onBack={handleBack}
                        onSkip={handleSkip}
                        loading={loading}
                    />
                );
            case 3:
                return (
                    <StepThree
                        selectedGoals={selectedGoals}
                        toggleGoal={toggleGoal}
                        goals={goals}
                        onNext={handleNext}
                        onBack={handleBack}
                        onSkip={handleSkip}
                        loading={loading}
                    />
                );
            case 4:
                return (
                    <StepFour
                        name={name}
                        onComplete={handleComplete}
                        onBack={handleBack}
                        loading={loading}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f8f7]">
            {/* Step Indicator */}
            {step !== 4 && (
                <div className="text-center text-sm tracking-widest text-gray-400 py-4">
                    STEP {step} OF {totalSteps}
                </div>
            )}
            {renderStep()}
        </div>
    );
}

// Step 1: Personalize Profile
function StepOne({ bio, setBio, profilePicture, setProfilePicture, profilePicturePreview, setProfilePicturePreview, onNext, onBack, onSkip, loading }: any) {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePicture(file);
            const previewUrl = URL.createObjectURL(file);
            setProfilePicturePreview(previewUrl);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f6f8f7]">
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="bg-white rounded-2xl shadow-sm w-full max-w-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Personalize your profile
                    </h1>
                    <p className="text-gray-600 text-sm mb-8">
                        Add a profile picture and a brief bio so we can customize your
                        learning path.
                    </p>

                    <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center relative overflow-hidden">
                            {profilePicturePreview ? (
                                <img
                                    src={profilePicturePreview}
                                    alt="Profile preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Image
                                    src="/img/camera-icon.png"
                                    alt="upload"
                                    width={28}
                                    height={28}
                                    className="opacity-60"
                                />
                            )}
                        </div>
                        <label className="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium hover:underline cursor-pointer">
                            <HardDriveUpload size={18} />
                            Upload Photo
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                                disabled={loading}
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            BRIEF BIO
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            maxLength={250}
                            placeholder="Tell us about your professional background and learning goals..."
                            className="w-full h-28 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            disabled={loading}
                        />
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-600">
                                Help us understand your context to suggest relevant courses.
                            </p>
                            <span className="text-xs text-gray-400">{bio.length}/250</span>
                        </div>
                    </div>
                </div>
            </div>
            <NavigationButtons
                onBack={onBack}
                onNext={onNext}
                onSkip={onSkip}
                showSkip={true}
                isLastStep={false}
                loading={loading}
            />
        </div>
    );
}

// Step 2: Role Selection
function StepTwo({ selectedRole, setSelectedRole, onNext, onBack, onSkip, loading }: any) {
    return (
        <div className="min-h-screen flex flex-col bg-[#f5f5f3]">
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-4xl">
                    <div className="text-center mb-8">
                        <h1 className="text-[32px] md:text-[40px] font-bold text-gray-900 mb-2">
                            What's your role?
                        </h1>
                        <p className="text-gray-500 text-base">
                            We'll personalise your learning experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {roles.map((role) => {
                            const isSelected = selectedRole === role.id;
                            return (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.id)}
                                    disabled={loading}
                                    className={`flex flex-col items-center justify-center gap-3 rounded-2xl py-8 px-4 transition-all duration-150 ${isSelected
                                        ? "bg-[#2d6a4f] text-white shadow-lg scale-[1.02]"
                                        : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.01]"
                                        }`}
                                >
                                    <span className={isSelected ? "text-white" : "text-[#2d6a4f]"}>
                                        {role.icon}
                                    </span>
                                    <span className={`text-sm font-semibold text-center ${isSelected ? "text-white" : "text-gray-800"
                                        }`}>
                                        {role.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <NavigationButtons
                onBack={onBack}
                onNext={onNext}
                onSkip={onSkip}
                showSkip={true}
                isLastStep={false}
                loading={loading}
            />
        </div>
    );
}

// Step 3: Goals Selection
function StepThree({ selectedGoals, toggleGoal, goals, onNext, onBack, onSkip, loading }: any) {
    return (
        <div className="min-h-screen flex flex-col bg-[#f6f8f7]">
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-[32px] md:text-[40px] font-bold text-gray-900 mb-2">
                            What are your goals?
                        </h1>
                        <p className="text-gray-500 text-base">
                            Select the primary outcomes you hope to achieve with TalentFlow.
                        </p>
                    </div>

                    <div className="grid gap-3">
                        {goals.map((goal: Goal) => {
                            const isSelected = selectedGoals.includes(goal.id);
                            return (
                                <div
                                    key={goal.id}
                                    onClick={() => !loading && toggleGoal(goal.id)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all ${isSelected ? "bg-[#2d6a4f] text-white" : "bg-white border border-gray-200"
                                        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <GoalCard
                                        icon={goal.icon}
                                        title={goal.title}
                                        description={goal.description}
                                        isSelected={isSelected}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <NavigationButtons
                onBack={onBack}
                onNext={onNext}
                onSkip={onSkip}
                showSkip={true}
                isLastStep={false}
                loading={loading}
            />
        </div>
    );
}

function GoalCard({ title, description, icon: Icon, isSelected }: any) {
    return (
        <div className="flex items-center gap-4">
            <div
                className={`h-12 w-12 flex items-center justify-center rounded-lg ${isSelected ? "bg-white/20" : "bg-[#E7E8E6]"
                    }`}
            >
                <Icon className={`${isSelected ? "text-white" : "text-green-700"}`} size={24} />
            </div>
            <div className="flex-1">
                <p className={`text-lg font-bold ${isSelected ? "text-white" : "text-gray-900"}`}>
                    {title}
                </p>
                <p className={`text-sm ${isSelected ? "text-white/80" : "text-gray-600"}`}>
                    {description}
                </p>
            </div>
            <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected
                    ? "bg-white border-white"
                    : "border-gray-300 bg-transparent"
                    }`}
            >
                {isSelected && <CheckIcon size={14} className="text-green-700" />}
            </div>
        </div>
    );
}

// Step 4: Completion
function StepFour({ name, onComplete, onBack, loading }: any) {
    const steps = [
        { label: "Profile set up", completed: true },
        { label: "Role selected", completed: true },
        { label: "Goals set", completed: true },
        { label: "Ready to start", completed: true },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#f6f8f7]">
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="max-w-2xl w-full">
                    <div className="bg-[#EAF3DE] rounded-2xl p-8 text-center mb-8">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <BadgeCheck className="w-20 h-20 text-green-700" />
                            <h2 className="text-2xl font-bold text-[#085041]">
                                You're all set up, {name}!
                            </h2>
                            <p className="text-[#0F6E56] leading-relaxed">
                                All steps complete. Your workspace is ready —<br />
                                your courses, tools, and cohort are waiting.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        {steps.map((step) => (
                            <div
                                key={step.label}
                                className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-[12px] font-semibold text-gray-500"
                            >
                                <div className="w-[18px] h-[18px] rounded-full bg-[#EAF3DE] flex items-center justify-center">
                                    <CheckIcon size={10} className="text-green-700" />
                                </div>
                                {step.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Last page navigation */}
            <div className="border-t border-gray-200 w-full bg-white px-6 py-5">
                <div className="flex items-center justify-center gap-4 max-w-[700px] mx-auto">
                    <button
                        onClick={onBack}
                        disabled={loading}
                        className="flex-1 border-2 border-[#2d6a4f] text-[#2d6a4f] font-semibold text-base py-3 rounded-2xl hover:bg-[#f0f7f3] transition-colors disabled:opacity-50"
                    >
                        Back
                    </button>
                    <button
                        onClick={onComplete}
                        disabled={loading}
                        className="flex-1 bg-[#2d6a4f] text-white font-semibold text-base py-3 rounded-2xl shadow-md hover:bg-[#245a42] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                        {loading ? 'Completing...' : 'Go to Dashboard'}
                    </button>
                </div>
            </div>
        </div>
    );
}