import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/core/components/Button";
import { AuthService } from "../../services/auth-service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/use-auth";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setError, error: authError } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            await AuthService.signInWithEmail(data.email, data.password);
            router.push("/");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to login. Please check your credentials.");
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

            {authError && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {authError}
                </div>
            )}

            <Button type="submit" className="w-full" isLoading={isLoading}>
                Log In
            </Button>
        </form>
    );
};
