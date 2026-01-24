import { Button } from "@/core/components/Button";
import { AuthService } from "../services/auth-service";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SocialAuthButtons = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setError } = useAuth();

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await AuthService.signInWithGoogle();
            router.push("/");
        } catch (error: any) {
            console.error(error);
            setError(error.message || "Failed to sign in with Google");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                isLoading={isLoading}
                className="w-full flex items-center justify-center gap-2"
                type="button"
            >
                {/* Simple Google Icon SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
            </Button>
            {/* Apple Sign In can be added here similarly */}
        </div>
    );
};
