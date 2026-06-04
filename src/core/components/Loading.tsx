import { Loader2 } from "lucide-react";
import { cn } from "@/core/utils/cn";

interface LoadingProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export const Loading = ({ className, size = "md" }: LoadingProps) => {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-10 w-10",
        lg: "h-16 w-16"
    };

    return (
        <div className="flex items-center justify-center p-8" role="status" aria-label="Loading">
            <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />
        </div>
    );
};
