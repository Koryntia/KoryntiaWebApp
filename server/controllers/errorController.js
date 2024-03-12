const AppError = require("../utils/AppError");
const { ERRORS, STATUS, STATUS_CODE } = require("../constants/index");

const handleCastErrorDB = (err) => {
    const message = `invalid ${err.path}:${err.value}.`;
    return new AppError(message, 400);
};
const handleDuplicatefieldsDB = (err) => {
    const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message = `Duplicate Entery ${value} Already Exists.`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data\n${errors.join("\n")}`;
    return new AppError(message, 400);
};
const handleValidationErrorExpress = (err) => {
    const errors = Object.values(err.errors).map((el) => el.msg);
    const message = `Invalid input data\n${errors.join("\n")}`;
    return new AppError(message, 400);
};
const handleJWTError = () => {
    return new AppError(ERRORS.UNAUTHORIZED.INVALID_JWT, 401);
};
const handleJWTExpiredError = () => new AppError(ERRORS.UNAUTHORIZED.EXPIRED_JWT, 401);
const sendErrorDev = (err, req, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};
const sendErrorPro = (err, req, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    //programming errors:don't leak error details
    console.error("Error", err);
    return res.status(500).json({
        status: "error",
        message: "something went wrong",
    });
};
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || STATUS.ERROR;
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, req, res);
    } else {
        if (err.name === "CastError") err = handleCastErrorDB(err);
        if (err.code === 11000) err = handleDuplicatefieldsDB(err);
        if (err.name === "ValidationError") err = handleValidationErrorDB(err);
        if (err.type === "expressValidationError") err = handleValidationErrorExpress(err);
        if (err.name === "JsonWebTokenError") err = handleJWTError();
        if (err.name === "TokenExpiredError") err = handleJWTExpiredError();
        sendErrorPro(err, req, res);
    }
    next();
};
