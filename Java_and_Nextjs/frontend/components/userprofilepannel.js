"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function UserProfilePanel({ open, onClose }) {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);

    const [notification, setNotification] = useState("");

    useEffect(() => {
        if (!open) return;

        const email = localStorage.getItem("email");

        if (!email) {
            return;
        }

        const getUser = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8091/user/getUserByEmail?email=${encodeURIComponent(
                        email
                    )}`,
                    {
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                const data = await response.json();

                setUser(data);
                setNewName(data.userName || "");
            } catch (error) {
                console.error("Get user error:", error);
            }
        };

        getUser();
    }, [open]);

    const handleUpdateName = async () => {
        const email = localStorage.getItem("email");

        if (!email || !newName.trim()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `http://localhost:8091/user/updateUserName?email=${encodeURIComponent(
                    email
                )}&newName=${encodeURIComponent(newName.trim())}`,
                {
                    method: "POST",
                }
            );

            const result = await response.text();

            if (response.ok) {
                setUser((previousUser) => ({
                    ...previousUser,
                    userName: newName.trim(),
                }));

                setEditing(false);
                setNotification(result || "Name updated successfully");

                setTimeout(() => {
                    setNotification("");
                }, 3000);
            } else {
                setNotification("Failed to update name");
            }
        } catch (error) {
            console.error("Update name error:", error);
            setNotification("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("token");

        onClose();

        window.location.href = "/";
    };

    if (!open) {
        return null;
    }

    return (
        <>
            {/* Dark background */}
            <div
                className="fixed inset-0 z-40 bg-black/50"
                onClick={onClose}
            />

            {/* Side Panel */}
            <div className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-gray-900 text-gray-200 shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-800 px-6 py-5">

                    <h2 className="text-lg font-semibold">
                        My Account
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer text-2xl text-gray-400 hover:text-white"
                    >
                        ×
                    </button>

                </div>

                {/* User Information */}
                <div className="px-6 py-8">

                    {user ? (
                        <>

                            {/* Avatar */}
                            <div className="mb-6 flex justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-700 text-3xl font-bold">
                                    {(user.userName || user.userEmail)
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                            </div>

                            {/* Name */}
                            <div className="mb-6">

                                <p className="mb-2 text-sm text-gray-500">
                                    Name
                                </p>

                                {editing ? (
                                    <div className="flex gap-2">

                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) =>
                                                setNewName(e.target.value)
                                            }
                                            placeholder="Enter your name"
                                            className="min-w-0 flex-1 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-200 outline-none focus:border-gray-500"
                                        />

                                        <Button
                                            onClick={handleUpdateName}
                                            disabled={loading}
                                            className="cursor-pointer bg-gray-700 hover:bg-gray-600"
                                        >
                                            {loading ? "..." : "Save"}
                                        </Button>

                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between gap-4">

                                        <p className="font-medium">
                                            {user.userName || "No name added"}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => setEditing(true)}
                                            className="cursor-pointer text-sm text-gray-400 hover:text-white"
                                        >
                                            Edit
                                        </button>

                                    </div>
                                )}

                            </div>

                            {/* Email */}
                            <div className="mb-6">

                                <p className="mb-2 text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="break-all font-medium">
                                    {user.userEmail}
                                </p>

                            </div>

                            {/* Role */}
                            <div className="mb-8">

                                <p className="mb-2 text-sm text-gray-500">
                                    Role
                                </p>

                                <p className="font-medium">
                                    {user.userRole}
                                </p>

                            </div>

                            {/* Logout */}
                            <Button
                                onClick={handleLogout}
                                className="w-full cursor-pointer bg-red-700 hover:bg-red-600"
                            >
                                Logout
                            </Button>

                        </>
                    ) : (
                        <p className="text-center text-gray-400">
                            Loading...
                        </p>
                    )}

                </div>

            </div>

            {/* Side Notification */}
            {notification && (
                <div
                    className="fixed top-6 right-6 z-[100] min-w-[300px] max-w-sm rounded-lg border border-green-700 bg-gray-900 px-5 py-4 text-green-300 shadow-2xl"
                >
                    <div className="flex items-start gap-3">

                        <div className="flex-1 text-sm font-medium">
                            {notification}
                        </div>

                        <button
                            type="button"
                            onClick={() => setNotification("")}
                            className="cursor-pointer text-gray-500 hover:text-white"
                        >
                            ×
                        </button>

                    </div>
                </div>
            )}
        </>
    );
}