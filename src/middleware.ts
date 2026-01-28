import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Placeholder for authentication check
    // In a real app, you would check for a session cookie or Firebase token
    const isAuthenticated = false;

    // Protected routes
    const protectedPaths = ["/", "/onboarding"];
    const isProtectedPath = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

    if (isProtectedPath && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname === "/login" && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
