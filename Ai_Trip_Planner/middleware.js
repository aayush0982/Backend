import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/new_trip"];
const publicRoutes = ["/login"];


export async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoutes = protectedRoutes.includes(path)
    const isPublicRoutes = publicRoutes.includes(path)

    const cookie =  req.cookies.get("session")?.value;
    console.log("Raw session cookie:", cookie); 

    const session = await decrypt(cookie);
    console.log("Decrypted session:", session); 

    if (isProtectedRoutes && !session?.userId) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isPublicRoutes && session?.userId) {
        return NextResponse.redirect(new URL('/new_trip', req.nextUrl))
    }

    return NextResponse.next();


}