'use client';

import { SignupForm } from "@/features/auth/components/SignupForm/SignupForm";
import { SocialAuthButtons } from "@/features/auth/components/SocialAuthButtons";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create an Account</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Join the community of plant lovers
                    </p>
                </div>

                <SignupForm />

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                <SocialAuthButtons />

                <div className="text-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
                    <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
