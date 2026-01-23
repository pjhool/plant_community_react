import { Loader2 } from "lucide-react";
import { cn } from "@/core/utils/cn";

interface LoadingProps {
    className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
    return (
        <div className="flex items-center justify-center p-8">
            <Loader2 className={cn("h-10 w-10 animate-spin text-primary", className)} />
        </div>
    );
};
