interface AppError {
    message: string;
    statusCode: number;
    status: string;
    isOperational: boolean;
}

const AppError = (message: string, statusCode: number): AppError => {
    const status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    const error: AppError = {
        message,
        statusCode,
        status,
        isOperational: true
    };
    return error;
};

export default AppError;
