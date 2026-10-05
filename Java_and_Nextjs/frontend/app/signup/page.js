"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("CUSTOMER");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const url = new URL("http://localhost:8091/user/addUser");

            url.searchParams.append("email", email);
            url.searchParams.append("password", password);
            url.searchParams.append("userRole", role);

            const response = await fetch(url.toString(), {
                method: "POST",
            });

            if (response.status === 201) {
                router.push("/login");
                return;
            }

            setError("Signup failed");

        } catch (error) {
            console.error("Signup error:", error);
            setError("Unable to connect to server");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">

            <form
                onSubmit={handleSignup}
                className="w-full max-w-md rounded-xl border border-gray-800 bg-black p-8"
            >
                <h1 className="mb-6 text-2xl font-bold">
                    Create Account
                </h1>

                {error && (
                    <p className="mb-4 text-sm text-red-500">
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white outline-none"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white outline-none"
                    required
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mb-6 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white outline-none"
                >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-gray-200"
                >
                    Sign Up
                </button>

                <p className="mt-5 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-white hover:underline"
                    >
                        Login
                    </a>
                </p>
            </form>

        </div>
    );
}