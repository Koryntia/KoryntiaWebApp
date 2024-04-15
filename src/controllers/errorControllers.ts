import AppError from '../utils/AppError';
const { ERRORS, STATUS, STATUS_CODE } = require("../constants/index");

const handleCastErrorDB = (err: any): AppError => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return AppError(message, 400);
};

const handleDuplicatefieldsDB = (err: any): AppError => {
    const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message = `Duplicate Entry ${value} Already Exists.`;
    return AppError(message, 400);
};

const handleValidationErrorDB = (err: any): AppError => {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    const message = `Invalid input data\n${errors.join('\n')}`;
    return AppError(message, 400);
};

const handleValidationErrorExpress = (err: any): AppError => {
    const errors = Object.values(err.errors).map((e: any) => e.msg);
    const message = `Invalid input data\n${errors.join('\n')}`;
    return AppError(message, 400);
};

const handleJWTError = (): AppError => {
    return AppError(ERRORS.UNAUTHORIZED.INVALID_JWT, 401);
};

const handleJWTExpiredError = (): AppError => {
    return AppError(ERRORS.UNAUTHORIZED.EXPIRED_JWT, 401);
};

const sendErrorPro = (err: AppError): void => {
    if (err.isOperational) {
        console.log('Operational error:', err.message);
    } else {
        console.error('Unexpected error:', err);
    }
};

const errorHandler = (err: any): void => {
    console.error('Error:', err);
    if (err.name === 'CastError') {
        handleCastErrorDB(err);
    } else if (err.code === 11000) {
        handleDuplicatefieldsDB(err);
    } else if (err.name === 'ValidationError') {
        handleValidationErrorDB(err);
    } else if (err.type === 'expressValidationError') {
        handleValidationErrorExpress(err);
    } else if (err.name === 'JsonWebTokenError') {
        handleJWTError();
    } else if (err.name === 'TokenExpiredError') {
        handleJWTExpiredError();
    } else {
        sendErrorPro(err);
    }
};

export default errorHandler;
