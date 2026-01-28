interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="rounded-lg bg-destructive/15 p-4 border border-destructive/20">
            <p className="text-body2 text-destructive font-medium">{message}</p>
        </div>
    );
};
