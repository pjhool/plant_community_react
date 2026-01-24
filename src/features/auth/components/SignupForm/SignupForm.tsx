import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/core/components/Button";
import { AuthService } from "../../services/auth-service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/use-auth";

const signupSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        displayName: z.string().min(2, "Display name must be at least 2 characters"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setError, error: authError } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            await AuthService.signUpWithEmail(data.email, data.password, data.displayName);
            // Onboarding flow could be triggered here or via redirect
            router.push("/onboarding/setup");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to create account.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="your@email.com"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="displayName" className="block text-sm font-medium mb-1">
                    Display Name
                </label>
                <input
                    id="displayName"
                    type="text"
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Nickname"
                    {...register("displayName")}
                />
                {errors.displayName && (
                    <p className="text-red-500 text-xs mt-1">{errors.displayName.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="••••••"
                    {...register("password")}
                />
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    placeholder="••••••"
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
            </div>

            {authError && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {authError}
                </div>
            )}

            <Button type="submit" className="w-full" isLoading={isLoading}>
                Sign Up
            </Button>
        </form>
    );
};
