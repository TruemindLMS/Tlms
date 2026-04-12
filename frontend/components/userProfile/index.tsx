"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Loader2,
  User,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import SectionCard from "@/components/userSettings/components/sectioncard";
import FormField from "@/components/userSettings/components/form-field";
import {
  profileApi,
  getUser,
  getUserFullName,
  getUserEmail,
  getUserRole,
  isAuthenticated,
  forgotPassword,
} from "@/lib/api";

const UserProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setIsSaving] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [visibletext, setVisibleText] = useState("");

  const [editedGender, setEditedGender] = useState(0);
  const [visible, setVisible] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedPostalCode, setEditedPostalCode] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedDateOfBirth, setEditedDateOfBirth] = useState("");

  const [userEmail, setUserEmail] = useState("");

  const user = getUser();

  // Set isClient to true after mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/signin");
      return;
    }
    fetchProfileAndStats();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPhotoUrl(previewUrl);

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("PhotoFile", file);
      formData.append("PhotoUrl", URL.createObjectURL(file));

      formData.append("Address", editedAddress || "");
      formData.append("PostalCode", String(editedPostalCode || ""));
      formData.append("Location", editedLocation || "");
      formData.append(
        "DateOfBirth",
        editedDateOfBirth ? new Date(editedDateOfBirth).toISOString() : "",
      );
      formData.append("Gender", String(Number(editedGender)));

      const updated = await profileApi.update(formData);
      setProfile(updated);

      const savedUrl = updated?.photoUrl || updated?.data?.photoUrl;
      if (savedUrl) {
        setPhotoUrl(savedUrl);
        if (isClient) {
          localStorage.setItem("userProfilePicture", savedUrl);
        }
      }

      setVisibleText("Profile photo updated!");
      setTimeout(() => setVisibleText(""), 3000);
    } catch (error: any) {
      console.error("Photo upload failed:", error.message);
      setVisibleText("Failed to update photo.");
      setTimeout(() => setVisibleText(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const fetchProfileAndStats = async () => {
    setLoading(true);
    setError(null);

    try {
      // Only access localStorage on the client
      if (isClient) {
        const savedProfilePic = localStorage.getItem("userProfilePicture");
        if (savedProfilePic) {
          setProfilePicture(savedProfilePic);
          setPhotoUrl(savedProfilePic);
        }
      }

      // Fetch profile data from API
      const profileResponse = await profileApi.get();
      const profileData = profileResponse?.data || profileResponse;

      if (profileData?.photoUrl) {
        setPhotoUrl(profileData.photoUrl);
        if (isClient) {
          localStorage.setItem("userProfilePicture", profileData.photoUrl);
        }
      }

      setProfile(profileData);
      setEditedAddress(profileData?.address || "");
      setEditedPostalCode(profileData?.postalCode || "");
      setEditedLocation(profileData?.location || "");
      setEditedDateOfBirth(
        profileData?.dateOfBirth ? profileData.dateOfBirth.split("T")[0] : "",
      );
      setEditedGender(profileData?.gender ?? 0);

    } catch (error: any) {
      console.error("Error fetching profile:", error?.message || error);
      setError("Unable to load profile data. Showing cached data.");

      if (!profile) {
        setProfile({
          firstName: "User",
          lastName: "",
          email: getUserEmail() || "user@talentflow.com",
          role: getUserRole() || "Student",
          jobTitle: "Student",
          bio: "No bio added yet",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      const formData = new FormData();

      formData.append("Address", editedAddress || "");
      formData.append("PostalCode", String(editedPostalCode || ""));
      formData.append("Location", editedLocation || "");
      formData.append(
        "DateOfBirth",
        editedDateOfBirth ? new Date(editedDateOfBirth).toISOString() : "",
      );
      formData.append("Gender", String(Number(editedGender)));

      const updated = await profileApi.update(formData);
      setProfile(updated);
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      console.log("Error name:", error.name);
      console.log("Error message:", error.message);
      console.log("Error stack:", error.stack);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedGender(profile.gender);
    setPhotoUrl(profile.photoUrl);
    setPhotoFile(null);
    setIsEditing(false);

    setEditedAddress(profile?.address || "");
    setEditedPostalCode(profile?.postalCode || "");
    setEditedLocation(profile?.location || "");
    setEditedDateOfBirth(
      profile?.dateOfBirth ? profile.dateOfBirth.split("T")[0] : "",
    );
  };

  const handleUpdatePassword = async () => {
    setVisible("");
    if (!userEmail) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword(userEmail);
      if (response.success) {
        setVisible("Check your email for the reset Link");
        // Fixed: Use setTimeout instead of nested useEffect
        setTimeout(() => {
          setVisible("");
        }, 10000);
      } else {
        setError(
          response.message || "Failed to send reset link. Please try again.",
        );
      }
    } catch (error) {
      setError("Could not send reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fullName =
    user?.fullName ||
    (user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : "") ||
    getUserFullName() ||
    user?.firstName ||
    "User";

  const email = user?.email || getUserEmail() || "user@talentflow.com";
  const role = profile?.role || getUserRole() || "Student";
  const jobTitle = profile?.jobTitle || role;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2
            size={40}
            className="animate-spin text-primary-600 mx-auto mb-4"
          />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }
  if (!profile) return <div>Failed to load profile</div>;

  return (
    <div className="max-w-full mx-auto py-6 md:py-10 ml-1 lg:ml-1 md:ml-5 px-4">
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="relative ">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            id="photo-upload"
            onChange={handleImageChange}
          />
          {photoUrl || profilePicture || profile?.photoUrl ? (
            <Image
              src={photoUrl || profile?.photoUrl || (profilePicture as string)}
              alt="user"
              height={200}
              width={200}
              className="h-35 w-35 rounded-full"
            />
          ) : (
            <div className="w-35 h-35 rounded-full bg-gray-100" />
          )}
          <label htmlFor="photo-upload">
            <Image
              className="absolute right-1 -bottom-1 cursor-pointer h-8 w-8"
              src={"/img/edit-pic.png"}
              alt="edit"
              height={30}
              width={30}
            />
          </label>
          {visibletext && (
            <p className="text-sm h-10 w-40 absolute -bottom-12 right-0 text-green-600 mt-2">
              {visibletext}
            </p>
          )}
        </div>
        <p className=" mt-2 text-2xl md:text-[44px] font-extrabold text-[#1C2A39]">
          {fullName}
        </p>
        <p className="text-lg md:text-3xl font-medium text-[#6B7280]">
          {jobTitle}
        </p>
      </div>
      {/* Profile Info Form like UI */}
      <div className="flex flex-col gap-6 mt-6 mb-6">
        <SectionCard title="Personal Information" icon={User}>
          <div className="grid gap-6 ">
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                label="Full Name"
                placeholder="Full Name"
                value={fullName}
                className="w-full text-[#6B7280] font-medium h-10 rounded-sm border-none bg-gray-100 outline-none focus:ring-0"
                disabled
              />
              <FormField
                label="Email"
                placeholder="Email"
                value={email}
                className="w-full text-[#6B7280] font-medium h-10 rounded-sm border-none bg-gray-100 outline-none focus:ring-0"
                disabled
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                label="Date of Birth"
                placeholder="Date of Birth"
                type="date"
                value={editedDateOfBirth}
                onChange={(e) => setEditedDateOfBirth(e.target.value)}
                disabled={!isEditing}
              />
              <div className="flex flex-col gap-2 w-full">
                <label className="text-base lg:text-xl text-[#1C2A39] font-normal">
                  Gender
                </label>
                <select
                  value={editedGender}
                  onChange={(e) => setEditedGender(Number(e.target.value))}
                  disabled={!isEditing}
                  className="w-full text-[#6B7280] px-3 font-medium h-10 rounded-sm border-none bg-[#F3F4F6] outline-none focus:ring-0"
                >
                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                  <option value={2}>Other</option>
                </select>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Address" icon={MapPin}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Address"
              placeholder="Your address"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
              disabled={!isEditing}
            />
            <FormField
              label="Location (City/State)"
              placeholder="City, State"
              value={editedLocation}
              disabled={!isEditing}
              onChange={(e) => setEditedLocation(e.target.value)}
            />
            <FormField
              label="Postal Code"
              placeholder="Postal code"
              value={editedPostalCode}
              disabled={!isEditing}
              onChange={(e) => setEditedPostalCode(e.target.value)}
            />
          </div>
        </SectionCard>
      </div>
      <div>
        {isEditing ? (
          <div className="">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="text-white mr-4 font-medium p-2 px-5 sm:px-8 text-lg sm:text-xl bg-primary-500 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="text-white font-medium p-2 px-5 sm:px-8 text-lg sm:text-xl bg-primary-500 rounded-md"
            >
              {saving ? "saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-white font-medium p-2 px-5 sm:px-8 text-lg sm:text-xl bg-primary-500 rounded-md"
          >
            Edit
          </button>
        )}
      </div>
      <div className="mt-5">
        <SectionCard title="Reset Password" icon={Settings}>
          <div className="mb-2 sm:flex items-end gap-4">
            <FormField
              label="Email"
              placeholder="johndoeemail.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button
              onClick={handleUpdatePassword}
              className="text-white font-medium mt-2 h-10 w-50 sm:w-55 text-lg bg-primary-500 rounded-md"
            >
              Get Reset Token
            </button>
          </div>
          <div className="h-10">
            {visible && (
              <p className="text-sm text-green-600 mt-2">{visible}</p>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default UserProfile;