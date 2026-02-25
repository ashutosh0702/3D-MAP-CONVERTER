import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isAuth = !!req.auth;
    const isAuthPage =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/register");
    const isProtected =
        req.nextUrl.pathname.startsWith("/dashboard") ||
        req.nextUrl.pathname.startsWith("/trip");

    // Redirect authenticated users away from auth pages
    if (isAuth && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Redirect unauthenticated users to login for protected pages
    if (!isAuth && isProtected) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/dashboard/:path*", "/trip/:path*", "/login", "/register"],
};
