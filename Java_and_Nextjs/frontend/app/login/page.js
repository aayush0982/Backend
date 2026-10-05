"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const url = new URL(
                "http://localhost:8091/user/authenticateUser"
            );

            url.searchParams.append("email", email);
            url.searchParams.append("password", password);

            const response = await fetch(url.toString(), {
                method: "POST",
            });

            if (!response.ok) {
                setError("Invalid email or password");
                return;
            }

            const token = await response.text();

            if (!token) {
                setError("Login failed: JWT not received");
                return;
            }

            // Store JWT for API requests
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);

            // Store JWT in cookie so Next.js middleware can access it
            document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=3600; SameSite=Lax`;

            router.push("/");
            router.refresh();

        } catch (error) {
            console.error("Login error:", error);
            setError("Unable to connect to server");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-md rounded-xl border border-gray-800 bg-black p-8"
            >
                <h1 className="mb-6 text-2xl font-bold">
                    Login
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
                    className="mb-6 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white outline-none"
                    required
                />

                <button
                    type="submit"
                    className="w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-gray-200"
                >
                    Login
                </button>

                <p className="mt-5 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="text-white hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}
