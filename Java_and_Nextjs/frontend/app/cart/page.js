"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/productcard";
import CartProductCard from "@/components/cartproductcard";

export default function CartPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadCart = async () => {

            try {

                // Get logged-in user's email from localStorage
                const email = localStorage.getItem("email");

                if (!email) {
                    setError("Please login to view your cart.");
                    setLoading(false);
                    return;
                }

                // Get user details
                const userResponse = await fetch(
                    `http://localhost:8091/user/getUserByEmail?email=${encodeURIComponent(
                        email
                    )}`
                );

                if (!userResponse.ok) {
                    throw new Error("Failed to fetch user");
                }

                const user = await userResponse.json();

                // Cart contains only product IDs
                const cart = user.cart || [];

                if (cart.length === 0) {
                    setProducts([]);
                    setLoading(false);
                    return;
                }

                // Get complete product details for every product ID
                const productRequests = cart.map(async (productId) => {

                    try {

                        const productResponse = await fetch(
                            `http://localhost:8087/getById?productId=${encodeURIComponent(
                                productId
                            )}`
                        );

                        if (!productResponse.ok) {
                            return null;
                        }

                        return await productResponse.json();

                    } catch (error) {

                        console.error(
                            `Failed to fetch product ${productId}:`,
                            error
                        );

                        return null;
                    }
                });

                const cartProducts = await Promise.all(productRequests);

                // Remove failed product requests
                setProducts(
                    cartProducts.filter((product) => product !== null)
                );

            } catch (error) {

                console.error("Cart error:", error);
                setError("Unable to load cart.");

            } finally {

                setLoading(false);

            }
        };

        loadCart();

    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">

            {/* Add your Navbar here */}
            <div className="mb-8">
                <Navbar />
            </div>

            {/* Cart Content */}
            <main className="flex-1 px-8">

                <div className="max-w-7xl mx-auto">

                    {/* Loading */}
                    {loading && (
                        <div className="py-20 text-center text-gray-400">
                            Loading your cart...
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="py-20 text-center text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Empty Cart */}
                    {!loading && !error && products.length === 0 && (
                        <div className="py-20 text-center">

                            <p className="text-xl text-gray-300">
                                Your cart is empty
                            </p>

                            <p className="mt-2 text-gray-500">
                                Add some products to your cart.
                            </p>

                        </div>
                    )}

                    {/* Cart Products */}
                    {!loading && !error && products.length > 0 && (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                            {products.map((product) => (

                                <CartProductCard
                                    key={product.productId}
                                    product={product}
                                />

                            ))}

                        </div>

                    )}

                </div>

            </main>

            {/* Add your Footer here */}
            <div className="mt-16">
                <Footer />
            </div>

        </div>
    );
}