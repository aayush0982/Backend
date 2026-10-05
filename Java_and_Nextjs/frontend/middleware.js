import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("token")?.value;

    const pathname = request.nextUrl.pathname;

    const protectedRoutes = [
        "/account",
        "/cart",
        "/admin",
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    if (
        (pathname === "/login" || pathname === "/signup") &&
        token
    ) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/account/:path*",
        "/cart/:path*",
        "/admin/:path*",
        "/login",
        "/signup",
    ],
};
