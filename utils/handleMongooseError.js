const handleMongooseError = (error, data, next) => {
    error.status = 400;
    error.message = "Missing required fields";
    next();
}

module.exports = handleMongooseError;