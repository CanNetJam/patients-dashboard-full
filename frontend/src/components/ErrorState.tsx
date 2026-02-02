type ErrorStateProps = {
    title?: string;
    message?: string;
};

export const ErrorState: React.FC<ErrorStateProps> = ({
    title = "Something went wrong",
    message = "An unexpected error occurred. Please try again.",
}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <div className="text-3xl">⚠️</div>

            <h2 className="text-lg font-semibold text-red-700">
                {title}
            </h2>

            <p className="text-sm text-red-600">
                {message}
            </p>
        </div>
    );
};
