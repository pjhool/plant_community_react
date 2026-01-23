import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

interface LoadingProps {
    className?: string;
    size?: number;
}

export function Loading({ className, size = 24 }: LoadingProps) {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            <Loader2 className="animate-spin text-primary" size={size} />
        </div>
    );
}
