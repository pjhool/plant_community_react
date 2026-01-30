"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "@/core/components/Button";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const { signOut, user } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/login");
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
            <h1 className="text-4xl font-bold">Welcome directly to Plant Community</h1>
            <p className="text-xl">Hello, {user?.displayName || 'Gardener'}!</p>
            <p className="text-gray-500">Find the best care for your plants!</p>

            <Button onClick={handleSignOut} variant="destructive">
                Sign Out / 로그아웃
            </Button>
            <p className="text-sm text-gray-400 mt-2">
                (Sign out to access Login/Signup pages)
            </p>
        </main>
    );
}
