"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ productId }) {
    const [addingToCart, setAddingToCart] = useState(false);
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState("");

    const handleAddToCart = async () => {
        const email = localStorage.getItem("email");

        if (!email) {
            setNotification("Please login first");
            setNotificationType("error");

            setTimeout(() => {
                setNotification("");
            }, 3000);

            return;
        }

        setAddingToCart(true);

        try {
            const response = await fetch(
                `http://localhost:8091/user/addToCart?email=${encodeURIComponent(
                    email
                )}&productId=${productId}`,
                {
                    method: "POST",
                }
            );

            const result = await response.text();

            if (response.ok) {
                setNotification(result);
                setNotificationType("success");
            } else {
                setNotification("Failed to add product to cart");
                setNotificationType("error");
            }

            setTimeout(() => {
                setNotification("");
            }, 3000);

        } catch (error) {
            console.error("Add to cart error:", error);

            setNotification("Something went wrong");
            setNotificationType("error");

            setTimeout(() => {
                setNotification("");
            }, 3000);
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <>
            {/* Add to Cart */}

            <Button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="cursor-pointer bg-gray-800 hover:bg-gray-700 px-8 py-5"
            >
                {addingToCart ? "Adding..." : "Add to Cart"}
            </Button>

            {/* Side Notification */}

            {notification && (
                <div
                    className={`fixed top-6 right-6 z-[100] min-w-[300px] max-w-sm rounded-lg border px-5 py-4 shadow-2xl ${
                        notificationType === "success"
                            ? "border-green-700 bg-gray-900 text-green-300"
                            : "border-red-700 bg-gray-900 text-red-300"
                    }`}
                >
                    <div className="flex items-start gap-3">

                        <div className="flex-1 text-sm font-medium">
                            {notification}
                        </div>

                        <button
                            type="button"
                            onClick={() => setNotification("")}
                            className="text-gray-500 hover:text-white cursor-pointer"
                        >
                            ×
                        </button>

                    </div>
                </div>
            )}
        </>
    );
}