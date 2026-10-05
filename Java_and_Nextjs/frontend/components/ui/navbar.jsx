"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [adminMenu, setAdminMenu] = useState(false);
    const [searchError, setSearchError] = useState("");

    // =========================================================
    // ACCOUNT SIDE PANEL
    // =========================================================

    const [showAccountPanel, setShowAccountPanel] = useState(false);
    const [user, setUser] = useState(null);

    const [editName, setEditName] = useState(false);
    const [newName, setNewName] = useState("");
    const [accountMessage, setAccountMessage] = useState("");
    const [accountError, setAccountError] = useState("");
    const [accountLoading, setAccountLoading] = useState(false);

    // =========================================================
    // DELETE PRODUCT
    // =========================================================

    const [showDeletePanel, setShowDeletePanel] = useState(false);
    const [deleteProductName, setDeleteProductName] = useState("");
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [deleteError, setDeleteError] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);

    // =========================================================
    // GET LOGGED-IN USER
    // =========================================================

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");

        setEmail(storedEmail);

        if (!storedEmail) {
            setRole(null);
            return;
        }

        const getUser = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8091/user/getUserByEmail?email=${encodeURIComponent(
                        storedEmail
                    )}`
                );

                if (!response.ok) {
                    setRole(null);
                    return;
                }

                const userData = await response.json();

                setUser(userData);
                setRole(userData.userRole);

            } catch (error) {
                console.error("Error getting user:", error);
                setRole(null);
            }
        };

        getUser();
    }, []);

    // =========================================================
    // OPEN ACCOUNT PANEL
    // =========================================================

    const openAccountPanel = async () => {

        if (!email) {
            router.push("/login");
            return;
        }

        setShowAccountPanel(true);
        setAccountError("");
        setAccountMessage("");
        setEditName(false);

        try {

            const response = await fetch(
                `http://localhost:8091/user/getUserByEmail?email=${encodeURIComponent(
                    email
                )}`
            );

            if (!response.ok) {
                setAccountError("Unable to load user information.");
                return;
            }

            const userData = await response.json();

            setUser(userData);
            setNewName(userData.userName || "");

        } catch (error) {

            console.error("Account error:", error);
            setAccountError("Unable to connect to user service.");

        }
    };

    // =========================================================
    // CLOSE ACCOUNT PANEL
    // =========================================================

    const closeAccountPanel = () => {
        setShowAccountPanel(false);
        setEditName(false);
        setAccountError("");
        setAccountMessage("");
    };

    // =========================================================
    // UPDATE USER NAME
    // =========================================================

    const handleUpdateName = async () => {

        if (!email) {
            return;
        }

        if (!newName.trim()) {
            setAccountError("Name cannot be empty.");
            return;
        }

        setAccountLoading(true);
        setAccountError("");
        setAccountMessage("");

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

            if (!response.ok) {
                setAccountError("Failed to update name.");
                return;
            }

            // Update displayed user information
            setUser((previousUser) => ({
                ...previousUser,
                userName: newName.trim(),
            }));

            setEditName(false);

            setAccountMessage(result || "Name updated successfully.");

            setTimeout(() => {
                setAccountMessage("");
            }, 3000);

        } catch (error) {

            console.error("Update name error:", error);
            setAccountError("Unable to connect to user service.");

        } finally {

            setAccountLoading(false);

        }
    };

    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setEmail(null);
        setRole(null);
        setUser(null);

        setShowAccountPanel(false);

        router.push("/");
        router.refresh();
    };

    // =========================================================
    // SEARCH PRODUCT
    // =========================================================

    const handleSearch = async (e) => {

        e.preventDefault();

        if (!search.trim()) {
            return;
        }

        setSearchError("");

        try {

            const response = await fetch(
                `http://localhost:8087/getByName?productName=${encodeURIComponent(
                    search.trim()
                )}`
            );

            if (!response.ok) {
                setSearchError("Product not found");
                return;
            }

            const product = await response.json();

            router.push(`/product/${product.productId}`);

        } catch (error) {

            console.error("Search error:", error);
            setSearchError("Unable to search product");

        }
    };

    // =========================================================
    // OPEN DELETE PANEL
    // =========================================================

    const openDeletePanel = () => {

        setAdminMenu(false);

        setDeleteProductName("");
        setDeleteProduct(null);
        setDeleteError("");
        setDeleteMessage("");
        setDeleteLoading(false);

        setShowDeletePanel(true);
    };

    // =========================================================
    // CLOSE DELETE PANEL
    // =========================================================

    const closeDeletePanel = () => {
        setShowDeletePanel(false);
        window.location.href = "/";
    };


    // =========================================================
    // FIND PRODUCT
    // =========================================================

    const handleFindProduct = async () => {

        if (!deleteProductName.trim()) {
            setDeleteError("Please enter a product name.");
            return;
        }

        setDeleteError("");
        setDeleteMessage("");
        setDeleteProduct(null);
        setDeleteLoading(true);

        try {

            const response = await fetch(
                `http://localhost:8087/getByName?productName=${encodeURIComponent(
                    deleteProductName.trim()
                )}`
            );

            if (!response.ok) {
                setDeleteError("Product not found.");
                return;
            }

            const product = await response.json();

            setDeleteProduct(product);

        } catch (error) {

            console.error("Find product error:", error);
            setDeleteError("Unable to find product.");

        } finally {

            setDeleteLoading(false);

        }
    };


    // =========================================================
    // DELETE PRODUCT
    // =========================================================

    const handleDeleteProduct = async () => {

        if (!deleteProduct) {
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setDeleteError("You are not logged in.");
            return;
        }

        setDeleteError("");
        setDeleteMessage("");
        setDeleteLoading(true);

        try {

            const response = await fetch(
                `http://localhost:8087/deleteProduct?productId=${deleteProduct.productId}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {

                const errorText = await response.text();

                console.error(
                    "Delete product error:",
                    errorText
                );

                setDeleteError("Failed to delete product.");
                return;
            }

            // Show success message
            setDeleteMessage(
                `${deleteProduct.productName} deleted successfully!`
            );

            // Clear product data
            setDeleteProduct(null);
            setDeleteProductName("");

            // Close panel and fully reload Home page
            setTimeout(() => {

                window.location.href = "/";

            }, 1000);

        } catch (error) {

            console.error("Delete product error:", error);

            setDeleteError(
                "Unable to connect to product service."
            );

        } finally {

            setDeleteLoading(false);

        }
    };
    return (
        <>
            {/* =====================================================
                NAVBAR
            ====================================================== */}

            <nav className="w-full border-b-2 border-gray-600 bg-black text-white">

                <div className="mx-auto flex h-20 items-center gap-32 px-6">

                    {/* Logo */}

                    <div className="flex shrink-0 items-center">

                        <a
                            href="/"
                            className="flex items-center gap-1 text-2xl font-bold"
                        >

                            <img
                                src="https://png.pngtree.com/png-vector/20250830/ourmid/pngtree-2d-random-business-logo-abstract-clipart-png-image_17326848.webp"
                                alt=""
                                height={50}
                                width={50}
                            />

                            OneShop

                        </a>

                    </div>

                    {/* =================================================
                        SEARCH BAR
                    ================================================== */}

                    <form
                        onSubmit={handleSearch}
                        className="relative flex flex-1"
                    >

                        <div className="relative w-full">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300"
                            >

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0"
                                />

                            </svg>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setSearchError("");
                                }}
                                placeholder="Search products..."
                                className="h-12 w-full rounded-lg border border-gray-600 bg-black pl-12 pr-4 text-sm text-gray-300 placeholder-gray-300 outline-none transition focus:border-gray-500 focus:bg-gray-700 focus:ring-2 focus:ring-gray-500"
                            />

                            {searchError && (

                                <div className="absolute left-0 top-14 z-50 w-full rounded-lg border border-gray-700 bg-gray-900 p-4 text-sm text-red-400 shadow-xl">
                                    {searchError}
                                </div>

                            )}

                        </div>

                    </form>

                    {/* =================================================
                        RIGHT SIDE
                    ================================================== */}

                    <div className="flex shrink-0 items-center gap-4">

                        {/* ADMIN */}

                        {role === "ADMIN" && (

                            <div className="relative flex items-center">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setAdminMenu(!adminMenu)
                                    }
                                    className="flex h-10 items-center justify-center rounded-lg border border-gray-600 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
                                >
                                    Admin
                                </button>

                                {adminMenu && (

                                    <div className="absolute right-0 top-12 z-50 w-44 rounded-lg border border-gray-700 bg-gray-900 p-2 shadow-xl">

                                        <a
                                            href="/admin/addproduct"
                                            onClick={() =>
                                                setAdminMenu(false)
                                            }
                                            className="block rounded-md px-4 py-3 text-sm text-white hover:bg-gray-800"
                                        >
                                            Add Product
                                        </a>

                                        <button
                                            type="button"
                                            onClick={openDeletePanel}
                                            className="block w-full rounded-md px-4 py-3 text-left text-sm text-white hover:bg-gray-800"
                                        >
                                            Delete Product
                                        </button>

                                    </div>

                                )}

                            </div>

                        )}

                        {/* =================================================
                            CART
                        ================================================== */}

                        <a
                            href="/cart"
                            aria-label="Shopping cart"
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-gray-800"
                        >

                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-amber-50"
                            >

                                <path
                                    d="M5.00014 14H18.1359C19.1487 14 19.6551 13.3777 20.0582 13.0432C20.4134 12.6633 20.2044 12.16 20.3163 11.1534L20.9013 5.88835C20.9355 5.58088 20.9525 5.42715 20.9031 5.30816C20.8597 5.20366 20.7821 5.11697 20.683 5.06228C20.5702 5 20.4155 5 20.1062 5H4.50014M2 2H3.24844C3.51306 2 3.64537 2 3.74889 2.05032C3.84002 2.09463 3.91554 2.16557 3.96544 2.25376C4.02212 2.35394 4.03037 2.48599 4.04688 2.7501L4.95312 17.2499C4.96963 17.514 4.97788 17.6461 5.03456 17.7462C5.08446 17.8344 5.15998 17.9054 5.25111 17.9497C5.35463 18 5.48694 18 5.75156 18H19M7.5 21.5H7.51M16.5 21.5H16.51M8 21.5C8 21.7761 7.77614 22 7.5 22C7.22386 22 7 21.7761 7 21.5C7 21.2239 7.22386 21 7.5 21C7.77614 21 8 21.5 8 21.5ZM17 21.5C17 21.7761 16.7761 22 16.5 22C16.2239 22 16 21.7761 16 21.5C16 21.2239 16 21.5 16.7761 21.5C17 21.5 17 21.5Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                            </svg>

                        </a>

                        {/* =================================================
                            ACCOUNT / LOGIN
                        ================================================== */}

                        {email ? (

                            <button
                                type="button"
                                onClick={openAccountPanel}
                                aria-label="Account"
                                className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-gray-800"
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    className="h-7 w-7"
                                >

                                    <path
                                        d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5Z"
                                    />

                                </svg>

                            </button>

                        ) : (

                            <button
                                type="button"
                                onClick={() => router.push("/login")}
                                className="flex h-10 items-center justify-center rounded-lg border border-gray-600 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                Login
                            </button>

                        )}

                    </div>

                </div>

            </nav>

            {/* =========================================================
                ACCOUNT SIDE PANEL
            ========================================================== */}

            {showAccountPanel && (

                <>

                    {/* Overlay */}

                    <div
                        className="fixed inset-0 z-[60] bg-black/60"
                        onClick={closeAccountPanel}
                    />

                    {/* Side Panel */}

                    <div className="fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l border-gray-700 bg-gray-950 p-6 text-white shadow-2xl">

                        {/* Header */}

                        <div className="mb-8 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-semibold">
                                    Account
                                </h2>

                                <p className="mt-1 text-sm text-gray-400">
                                    Your account information
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={closeAccountPanel}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl text-gray-400 transition hover:bg-gray-800 hover:text-white"
                            >
                                ×
                            </button>

                        </div>

                        {/* Account Error */}

                        {accountError && (

                            <div className="mb-5 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                                {accountError}
                            </div>

                        )}

                        {/* User Information */}

                        {user && (

                            <div className="space-y-5">

                                {/* Name */}

                                <div className="rounded-xl border border-gray-700 bg-gray-900 p-5">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm text-gray-400">
                                                Name
                                            </p>

                                            {!editName ? (

                                                <p className="mt-1 text-lg font-medium text-white">
                                                    {user.userName || "Not set"}
                                                </p>

                                            ) : (

                                                <input
                                                    type="text"
                                                    value={newName}
                                                    onChange={(e) =>
                                                        setNewName(e.target.value)
                                                    }
                                                    className="mt-2 w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-sm text-white outline-none focus:border-gray-500"
                                                    autoFocus
                                                />

                                            )}

                                        </div>

                                        {!editName && (

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setNewName(
                                                        user.userName || ""
                                                    );
                                                    setEditName(true);
                                                    setAccountError("");
                                                }}
                                                className="rounded-md px-3 py-2 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
                                            >
                                                Edit
                                            </button>

                                        )}

                                    </div>

                                    {editName && (

                                        <div className="mt-3 flex gap-2">

                                            <button
                                                type="button"
                                                onClick={handleUpdateName}
                                                disabled={accountLoading}
                                                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
                                            >
                                                {accountLoading
                                                    ? "Saving..."
                                                    : "Save"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditName(false);
                                                    setAccountError("");
                                                }}
                                                className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-white transition hover:bg-gray-700"
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    )}

                                </div>

                                {/* Email */}

                                <div className="rounded-xl border border-gray-700 bg-gray-900 p-5">

                                    <p className="text-sm text-gray-400">
                                        Email
                                    </p>

                                    <p className="mt-1 break-all text-white">
                                        {user.userEmail}
                                    </p>

                                </div>

                                {/* Role */}

                                <div className="rounded-xl border border-gray-700 bg-gray-900 p-5">

                                    <p className="text-sm text-gray-400">
                                        Role
                                    </p>

                                    <p className="mt-1 text-white">
                                        {user.userRole}
                                    </p>

                                </div>

                                {/* Success */}

                                {accountMessage && (

                                    <div className="rounded-lg border border-green-700 bg-green-950/40 px-4 py-3 text-sm text-green-300">
                                        {accountMessage}
                                    </div>

                                )}

                                {/* Logout */}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="mt-4 w-full rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                                >
                                    Logout
                                </button>

                            </div>

                        )}

                    </div>

                </>

            )}

            {/* =========================================================
                DELETE PRODUCT SIDE PANEL
            ========================================================== */}

            {showDeletePanel && (

                <>

                    {/* Overlay */}

                    <div
                        className="fixed inset-0 z-[60] bg-black/60"
                        onClick={closeDeletePanel}
                    />

                    {/* Side Panel */}

                    <div className="fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l border-gray-700 bg-gray-950 p-6 text-white shadow-2xl">

                        {/* Header */}

                        <div className="mb-8 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-semibold">
                                    Delete Product
                                </h2>

                                <p className="mt-1 text-sm text-gray-400">
                                    Search for a product before deleting it.
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={closeDeletePanel}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl text-gray-400 transition hover:bg-gray-800 hover:text-white"
                            >
                                ×
                            </button>

                        </div>

                        {/* Product Name */}

                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Product Name
                        </label>

                        <div className="flex gap-2">

                            <input
                                type="text"
                                value={deleteProductName}
                                onChange={(e) => {
                                    setDeleteProductName(e.target.value);
                                    setDeleteError("");
                                    setDeleteProduct(null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleFindProduct();
                                    }
                                }}
                                placeholder="e.g. IPhone 16"
                                className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gray-500"
                            />

                            <button
                                type="button"
                                onClick={handleFindProduct}
                                disabled={deleteLoading}
                                className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {deleteLoading ? "..." : "Find"}
                            </button>

                        </div>

                        {/* Error */}

                        {deleteError && (

                            <div className="mt-4 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                                {deleteError}
                            </div>

                        )}

                        {/* Found Product */}

                        {deleteProduct && (

                            <div className="mt-6 rounded-xl border border-gray-700 bg-gray-900 p-5">

                                <p className="mb-4 text-sm font-medium text-gray-400">
                                    Product found
                                </p>

                                <div className="space-y-3 text-sm">

                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-400">
                                            Product ID
                                        </span>

                                        <span className="font-medium text-white">
                                            {deleteProduct.productId}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-400">
                                            Name
                                        </span>

                                        <span className="text-right font-medium text-white">
                                            {deleteProduct.productName}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-400">
                                            Category
                                        </span>

                                        <span className="text-white">
                                            {deleteProduct.productCategory}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-400">
                                            Price
                                        </span>

                                        <span className="text-white">
                                            ₹{deleteProduct.productPrice}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="text-gray-400">
                                            Quantity
                                        </span>

                                        <span className="text-white">
                                            {deleteProduct.productQuantity}
                                        </span>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={handleDeleteProduct}
                                    disabled={deleteLoading}
                                    className="mt-6 w-full rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {deleteLoading
                                        ? "Deleting..."
                                        : "Delete Product"}
                                </button>

                            </div>

                        )}

                        {/* Success */}

                        {deleteMessage && (

                            <div className="mt-6 rounded-lg border border-green-700 bg-green-950/40 px-4 py-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                                        ✓
                                    </div>

                                    <div>

                                        <p className="font-semibold text-white">
                                            Success
                                        </p>

                                        <p className="text-sm text-gray-400">
                                            {deleteMessage}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </>

            )}

        </>
    );
}