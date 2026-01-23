import { Loader2 } from "lucide-react";
import { cn } from "@/core/utils/cn";

interface LoadingProps {
    className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
    return (
        <div className="flex items-center justify-center p-4">
            <Loader2 className={cn("h-8 w-8 animate-spin text-primary", className)} />
        </div>
    );
};
