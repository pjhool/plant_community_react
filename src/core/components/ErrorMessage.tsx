import { AlertCircle } from "lucide-react";
import { cn } from "../utils/cn";

interface ErrorMessageProps {
    message: string;
    className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
    return (
        <div className={cn("flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive", className)}>
            <AlertCircle size={16} />
            <span>{message}</span>
        </div>
    );
}
