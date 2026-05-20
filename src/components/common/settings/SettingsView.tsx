"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import PageHeader from "@/components/common/headers/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useAuthStore } from "@/store/authStore";
import { getCurrentUser, updateCurrentUser } from "@/services/auth/auth.service";

export default function SettingsView() {
    const { setUser } = useAuthStore();
    const [fetching, setFetching] = useState(true);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [updatingPassword, setUpdatingPassword] = useState(false);

    // Profile State
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        address: "",
    });

    // Password State
    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    // =========================
    // FETCH PROFILE
    // =========================
    const fetchProfile = async () => {
        try {
            setFetching(true);
            const response = await getCurrentUser();
            const user = response.data.user;

            setProfileData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                role: user.role || "EMPLOYEE",
                address: user.address || "",
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to load profile settings.");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // =========================
    // PROFILE CHANGE HANDLERS
    // =========================
    const handleProfileChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    // =========================
    // SAVE PROFILE CHANGES
    // =========================
    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!profileData.name || !profileData.email) {
            toast.error("Name and Email are required.");
            return;
        }

        try {
            setUpdatingProfile(true);
            const res = await updateCurrentUser({
                name: profileData.name,
                email: profileData.email,
                phone: profileData.phone,
                address: profileData.address,
            });

            if (res.data.success) {
                toast.success("Profile updated successfully!");
                // Sync with Zustand auth state for header/sidebar updates
                setUser(res.data.user);
            }
        } catch (error: any) {
            console.error(error);
            const msg = error.response?.data?.message || "Failed to update profile.";
            toast.error(msg);
        } finally {
            setUpdatingProfile(false);
        }
    };

    // =========================
    // UPDATE PASSWORD
    // =========================
    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwordData.newPassword) {
            toast.error("Please enter a new password.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setUpdatingPassword(true);
            const res = await updateCurrentUser({
                password: passwordData.newPassword,
            });

            if (res.data.success) {
                toast.success("Password updated successfully!");
                setPasswordData({
                    newPassword: "",
                    confirmPassword: "",
                });
            }
        } catch (error: any) {
            console.error(error);
            const msg = error.response?.data?.message || "Failed to update password.";
            toast.error(msg);
        } finally {
            setUpdatingPassword(false);
        }
    };

    // =========================
    // LOADING STATE
    // =========================
    if (fetching) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 size={36} className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <PageHeader
                title="Settings"
                description="Manage your account and application settings."
                breadcrumbs={[{ label: "Settings" }]}
            />

            <div className="grid gap-6 xl:grid-cols-3">
                {/* Profile Settings */}
                <form
                    onSubmit={handleSaveProfile}
                    className="rounded-3xl border border-border bg-card p-6 xl:col-span-2 flex flex-col justify-between"
                >
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            Profile Settings
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Update your personal and contact details.
                        </p>

                        <div className="mt-8 grid gap-6 md:grid-cols-2">
                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground">
                                    Full Name
                                </label>
                                <Input
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleProfileChange}
                                    placeholder="Enter full name"
                                    className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground">
                                    Email Address
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    placeholder="Enter email"
                                    className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground">
                                    Phone Number
                                </label>
                                <Input
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleProfileChange}
                                    placeholder="Enter phone number"
                                    className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground">
                                    Role
                                </label>
                                <Input
                                    disabled
                                    value={profileData.role}
                                    className="h-12 rounded-2xl border-border bg-background/50 px-4 opacity-75 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Bio / Address */}
                        <div className="mt-6">
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Address
                            </label>
                            <Textarea
                                name="address"
                                value={profileData.address}
                                onChange={handleProfileChange}
                                placeholder="Enter address details..."
                                className="rounded-2xl border-border bg-background px-4 py-3 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 min-h-[120px] resize-none transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <Button
                            type="submit"
                            disabled={updatingProfile}
                            className="h-12 rounded-2xl px-6 bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:shadow-lg hover:shadow-primary/20"
                        >
                            {updatingProfile ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </form>

                {/* Security Settings */}
                <form
                    onSubmit={handleUpdatePassword}
                    className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between"
                >
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            Security
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Update your password to keep account secure.
                        </p>

                        <div className="mt-8 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground">
                                    New Password
                                </label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="••••••••"
                                    className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-foreground">
                                    Confirm Password
                                </label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="••••••••"
                                    className="h-12 rounded-2xl border-border bg-background px-4 hover:border-primary/50 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Button
                            type="submit"
                            disabled={updatingPassword}
                            className="w-full h-12 rounded-2xl px-6 bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:shadow-lg hover:shadow-primary/20"
                        >
                            {updatingPassword ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
