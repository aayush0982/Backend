"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {

    const router = useRouter();

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
            setError("You are not logged in.");
            return;
        }

        const product = {
            productId: Number(productId),
            productName: productName,
            productCategory: productCategory,
            productPrice: Number(productPrice),
            productQuantity: Number(productQuantity),
        };

        try {

            const response = await fetch(
                "http://localhost:8087/addProduct",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },

                    body: JSON.stringify(product),
                }
            );

            if (!response.ok) {

                const errorText = await response.text();

                console.error("Add product error:", errorText);

                setError("Failed to add product.");
                return;
            }

            setMessage("Product added successfully!");

            setProductId("");
            setProductName("");
            setProductCategory("");
            setProductPrice("");
            setProductQuantity("");

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } catch (error) {

            console.error("Add product error:", error);

            setError("Unable to connect to product service.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 px-6 py-10 text-white">

            <div className="mx-auto max-w-2xl">

                {/* Back to Home */}

                <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="mb-8 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                >
                    <span className="text-xl leading-none">
                        ←
                    </span>

                    <span>
                        Back to Home
                    </span>
                </button>


                <h1 className="mb-2 text-3xl font-bold">
                    Add Product
                </h1>

                <p className="mb-8 text-gray-400">
                    Add a new product to your store.
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-xl"
                >

                    {/* Product ID */}
                    <div className="mb-5">

                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Product ID
                        </label>

                        <input
                            type="number"
                            value={productId}
                            onChange={(e) =>
                                setProductId(e.target.value)
                            }
                            placeholder="Enter product ID"
                            required
                            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-gray-400"
                        />

                    </div>


                    {/* Product Name */}
                    <div className="mb-5">

                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Product Name
                        </label>

                        <input
                            type="text"
                            value={productName}
                            onChange={(e) =>
                                setProductName(e.target.value)
                            }
                            placeholder="Enter product name"
                            required
                            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-gray-400"
                        />

                    </div>


                    {/* Product Category */}
                    <div className="mb-5">

                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Product Category
                        </label>

                        <input
                            type="text"
                            value={productCategory}
                            onChange={(e) =>
                                setProductCategory(e.target.value)
                            }
                            placeholder="e.g. Electronics"
                            required
                            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-gray-400"
                        />

                    </div>


                    {/* Product Price */}
                    <div className="mb-5">

                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Product Price
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={productPrice}
                            onChange={(e) =>
                                setProductPrice(e.target.value)
                            }
                            placeholder="Enter product price"
                            required
                            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-gray-400"
                        />

                    </div>


                    {/* Product Quantity */}
                    <div className="mb-8">

                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Product Quantity
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={productQuantity}
                            onChange={(e) =>
                                setProductQuantity(e.target.value)
                            }
                            placeholder="Enter quantity"
                            required
                            className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-gray-400"
                        />

                    </div>


                    {/* Error */}
                    {error && (
                        <div className="mb-5 rounded-lg border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
                    >
                        Add Product
                    </button>

                </form>

            </div>


            {/* Success Notification */}

            {message && (
                <div className="fixed right-6 top-6 z-50 rounded-lg border border-green-700 bg-gray-900 px-6 py-4 shadow-2xl">

                    <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                            ✓
                        </div>

                        <div>
                            <p className="font-semibold text-white">
                                Success
                            </p>

                            <p className="text-sm text-gray-400">
                                {message}
                            </p>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}
