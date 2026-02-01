'use client';

import { useAuth } from "../hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "@/core/components/Loading";

const publicPaths = ['/login', '/signup', '/verify-email', '/'];
const guestOnlyPaths = ['/login', '/signup'];

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading) {
            const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'));
            const isGuestOnlyPath = guestOnlyPaths.some(path => pathname === path || pathname.startsWith(path + '/'));

            if (!user && !isPublicPath) {
                router.push('/login');
            } else if (user && isGuestOnlyPath) {
                router.push('/');
            } else if (user && !user.isOnboarded && !pathname.startsWith('/onboarding')) {
                // Redirect to onboarding if user is not onboarded and not already there
                router.push('/onboarding/setup');
            }
            // Allow access to onboarding pages even if onboarded (for editing profile)
        }
    }, [user, isLoading, router, pathname]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loading size="lg" />
            </div>
        );
    }

    if (!user && !publicPaths.includes(pathname)) {
        return null;
    }

    return <>{children}</>;
};
