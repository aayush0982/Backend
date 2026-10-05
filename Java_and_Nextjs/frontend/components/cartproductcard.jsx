"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function CartProductCard({ product }) {

    const router = useRouter();

    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState("");

    const handleClick = () => {
        router.push(`/product/${product.productId}`);
    };

    const handleRemoveFromCart = async () => {

        const email = localStorage.getItem("email");

        if (!email) {
            setNotification("Please login first");
            setNotificationType("error");

            setTimeout(() => {
                setNotification("");
            }, 3000);

            return;
        }

        try {

            const response = await fetch(
                `http://localhost:8091/user/removeFromCart?email=${encodeURIComponent(
                    email
                )}&productId=${product.productId}`,
                {
                    method: "POST",
                }
            );

            const result = await response.text();

            if (response.ok) {

                setNotification(result);
                setNotificationType("success");

                setTimeout(() => {
                    window.location.reload();
                }, 1200);

            } else {

                setNotification("Failed to remove product from cart");
                setNotificationType("error");

                setTimeout(() => {
                    setNotification("");
                }, 3000);
            }

        } catch (error) {

            console.error("Remove from cart error:", error);

            setNotification("Something went wrong");
            setNotificationType("error");

            setTimeout(() => {
                setNotification("");
            }, 3000);
        }
    };

    return (
        <Card className="relative mx-auto w-full max-w-sm bg-gray-800 text-gray-300 pt-0">

            <img
                src="https://substackcdn.com/image/fetch/$s_!Zy5l!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbfb09bb5-a484-4ffd-b6b4-c0000abfefdd_522x538.jpeg"
                alt={product.productName}
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
            />

            <CardHeader>

                <CardTitle className="text-gray-200 font-bold text-2xl">
                    {product.productName}
                </CardTitle>

                <CardDescription className="text-gray-300">

                    <p>
                        ₹ {product.productPrice}
                    </p>

                    <p
                        className={
                            product.productQuantity > 0
                                ? "text-green-300"
                                : "text-red-300"
                        }
                    >
                        {product.productQuantity > 0
                            ? "In Stock"
                            : "Out of Stock"}
                    </p>

                </CardDescription>

            </CardHeader>

            <CardFooter className="bg-gray-800 border-0 p-4 flex gap-3">

                {/* View Product */}

                <Button
                    onClick={handleClick}
                    className="cursor-pointer hover:bg-gray-700 flex-1 py-5"
                >
                    View Product
                </Button>


                {/* Remove From Cart */}

                <button
                    type="button"
                    onClick={handleRemoveFromCart}
                    title="Remove from Cart"
                    className="
                        bg-red-700
                        cursor-pointer
                        h-10
                        w-10
                        shrink-0
                        flex
                        items-center
                        justify-center
                        rounded-md
                        hover:bg-red-600
                        transition-colors
                        p-0
                    "
                >

                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-amber-50 hover:text-white transition-colors"
                    >
                        <path
                            d="M5.00014 14H18.1359C19.1487 14 19.6551 14 20.0582 13.8112C20.4134 13.6448 20.7118 13.3777 20.9163 13.0432C21.1485 12.6633 21.2044 12.16 21.3163 11.1534L21.9013 5.88835C21.9355 5.58088 21.9525 5.42715 21.9031 5.30816C21.8597 5.20366 21.7821 5.11697 21.683 5.06228C21.5702 5 21.4155 5 21.1062 5H4.50014M2 2H3.24844C3.51306 2 3.64537 2 3.74889 2.05032C3.84002 2.09463 3.91554 2.16557 3.96544 2.25376C4.02212 2.35394 4.03037 2.48599 4.04688 2.7501L4.95312 17.2499C4.96963 17.514 4.97788 17.6462 5.03456 17.7462C5.08446 17.8344 5.15998 17.9054 5.25111 17.9497C5.35463 18 5.48694 18 5.75156 18H19M7.5 21.5H7.51M16.5 21.5H16.51M8 21.5C8 21.7761 7.77614 22 7.5 22C7.22386 22 7 21.7761 7 21.5C7 21.2239 7.22386 21 7.5 21C7.77614 21 8 21.2239 8 21.5ZM17 21.5C17 21.7761 16.7761 22 16.5 22C16.2239 22 16 21.7761 16 21.5C16 21.2239 16.2239 21 16.5 21C16.7761 21 17 21.5 17 21.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                </button>

            </CardFooter>


            {/* Side Notification */}

            {notification && (
                <div
                    className={`fixed top-6 right-6 z-[100] min-w-[300px] max-w-sm rounded-lg border px-5 py-4 shadow-2xl ${notificationType === "success"
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
                            className="text-gray-500 hover:text-white"
                        >
                            ×
                        </button>

                    </div>

                </div>
            )}

        </Card>
    );
}