"use client";

import { useState } from "react";
import ProductCard from "@/components/productcard";

export default function ProductList({ initialProducts }) {

    const [products, setProducts] = useState(initialProducts);

    const [showFilter, setShowFilter] = useState(false);

    // Filter type
    const [filterType, setFilterType] = useState("price");

    // Price
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Category
    const [category, setCategory] = useState("");

    const [error, setError] = useState("");

    const handleFilter = async () => {

        setError("");

        // ---------------- PRICE FILTER ----------------

        if (filterType === "price") {

            if (!minPrice || !maxPrice) {
                setError(
                    "Please enter both minimum and maximum price"
                );
                return;
            }

            if (Number(minPrice) > Number(maxPrice)) {
                setError(
                    "Minimum price cannot be greater than maximum price"
                );
                return;
            }

            try {

                const response = await fetch(
                    `http://localhost:8087/getByRange?minPrice=${encodeURIComponent(
                        minPrice
                    )}&maxPrice=${encodeURIComponent(maxPrice)}`
                );

                if (!response.ok) {
                    setError("Failed to filter products");
                    return;
                }

                const filteredProducts = await response.json();

                setProducts(filteredProducts);
                setShowFilter(false);

            } catch (error) {

                console.error("Price filter error:", error);
                setError("Unable to filter products");

            }

            return;
        }

        // ---------------- CATEGORY FILTER ----------------

        if (filterType === "category") {

            if (!category.trim()) {
                setError("Please enter a category");
                return;
            }

            try {

                const response = await fetch(
                    `http://localhost:8087/getByCategoryWise?categoryName=${encodeURIComponent(
                        category.trim()
                    )}`
                );

                if (!response.ok) {
                    setError("Failed to filter products");
                    return;
                }

                const filteredProducts = await response.json();

                setProducts(filteredProducts);
                setShowFilter(false);

            } catch (error) {

                console.error("Category filter error:", error);
                setError("Unable to filter products");

            }
        }
    };

    // ---------------- CLEAR FILTER ----------------

    const clearFilter = () => {

        setProducts(initialProducts);

        setMinPrice("");
        setMaxPrice("");
        setCategory("");

        setFilterType("price");

        setError("");
    };

    return (
        <div className="relative flex-1">

            {/* Filter Buttons */}

            <div className="flex justify-end px-8 pt-6">

                <button
                    type="button"
                    onClick={() => {
                        setShowFilter(true);
                        setError("");
                    }}
                    className="rounded-lg border border-gray-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Filter
                </button>

                {(minPrice || maxPrice || category) && (
                    <button
                        type="button"
                        onClick={clearFilter}
                        className="ml-3 rounded-lg border border-gray-600 px-5 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800"
                    >
                        Clear Filter
                    </button>
                )}

            </div>


            {/* Product Grid */}

            <div className="mt-8 mb-8 grid h-fit grid-cols-4 gap-8 px-8">

                {products.length > 0 ? (

                    products.map((product) => (
                        <ProductCard
                            key={product.productId}
                            product={product}
                        />
                    ))

                ) : (

                    <div className="col-span-4 py-20 text-center text-gray-400">
                        No products found.
                    </div>

                )}

            </div>


            {/* Filter Popup */}

            {showFilter && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

                    <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-950 p-6 text-white shadow-2xl">


                        {/* Header */}

                        <div className="mb-6 flex items-center justify-between">

                            <h2 className="text-xl font-semibold">
                                Filter Products
                            </h2>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowFilter(false);
                                    setError("");
                                }}
                                className="text-2xl text-gray-400 hover:text-white"
                            >
                                ×
                            </button>

                        </div>


                        {/* Filter Type */}

                        <div className="mb-6">

                            <label className="mb-2 block text-sm text-gray-400">
                                Filter By
                            </label>

                            <div className="grid grid-cols-2 gap-3">

                                {/* Price */}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setFilterType("price");
                                        setError("");
                                    }}
                                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                                        filterType === "price"
                                            ? "border-white bg-white text-black"
                                            : "border-gray-700 text-gray-300 hover:bg-gray-800"
                                    }`}
                                >
                                    By Price
                                </button>


                                {/* Category */}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setFilterType("category");
                                        setError("");
                                    }}
                                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                                        filterType === "category"
                                            ? "border-white bg-white text-black"
                                            : "border-gray-700 text-gray-300 hover:bg-gray-800"
                                    }`}
                                >
                                    By Category
                                </button>

                            </div>

                        </div>


                        {/* ---------------- PRICE ---------------- */}

                        {filterType === "price" && (

                            <>

                                {/* Minimum Price */}

                                <div className="mb-4">

                                    <label className="mb-2 block text-sm text-gray-400">
                                        Minimum Price
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={minPrice}
                                        onChange={(e) =>
                                            setMinPrice(e.target.value)
                                        }
                                        placeholder="e.g. 1000"
                                        className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-gray-500"
                                    />

                                </div>


                                {/* Maximum Price */}

                                <div className="mb-4">

                                    <label className="mb-2 block text-sm text-gray-400">
                                        Maximum Price
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={maxPrice}
                                        onChange={(e) =>
                                            setMaxPrice(e.target.value)
                                        }
                                        placeholder="e.g. 200000"
                                        className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-gray-500"
                                    />

                                </div>

                            </>

                        )}


                        {/* ---------------- CATEGORY ---------------- */}

                        {filterType === "category" && (

                            <div className="mb-4">

                                <label className="mb-2 block text-sm text-gray-400">
                                    Category
                                </label>

                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setError("");
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleFilter();
                                        }
                                    }}
                                    placeholder="e.g. Microwave"
                                    className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-gray-500"
                                />

                            </div>

                        )}


                        {/* Error */}

                        {error && (

                            <p className="mb-4 text-sm text-red-400">
                                {error}
                            </p>

                        )}


                        {/* Buttons */}

                        <div className="flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={() => {
                                    setShowFilter(false);
                                    setError("");
                                }}
                                className="rounded-lg border border-gray-700 px-5 py-2 text-sm text-gray-300 hover:bg-gray-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleFilter}
                                className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-200"
                            >
                                Apply Filter
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}