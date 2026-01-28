'use client';

import { useAuth } from "../hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "@/core/components/Loading";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const publicPaths = ['/login', '/signup', '/verify-email'];

    useEffect(() => {
        if (!isLoading) {
            const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'));

            if (!user && !isPublicPath) {
                // If user is not logged in and trying to access private route
                router.push('/login');
            } else if (user && isPublicPath) {
                // If user is already logged in and trying to access auth pages
                router.push('/');
            }
        }
    }, [user, isLoading, router, pathname]);

    // Show loading spinner while checking auth state
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loading size="lg" />
            </div>
        );
    }

    // If not on public path and no user, don't render children (waiting for redirect)
    if (!user && !publicPaths.includes(pathname)) {
        return null;
    }

    return <>{children}</>;
};
