interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="rounded-md bg-destructive/15 p-3">
            <p className="text-sm text-destructive">{message}</p>
        </div>
    );
};
