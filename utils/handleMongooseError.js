const handleMongooseError = (error, data, next) => {
    error.status = 400;
    error.message = "missing field favorite";
    next();
}

module.exports = handleMongooseError;