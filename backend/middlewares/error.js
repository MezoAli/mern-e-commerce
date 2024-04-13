export default (err, req, res, next) => {
  let error = {
    message: err?.message || "Internal Server Error",
    statusCode: err?.statusCode || 500,
  };

  if (err.code === 11000) {
    error.message = `${err.keyValue.email} is already in use`;
    error.statusCode = 400;
  }
  if (err.name === "CastError") {
    error.message = `no item found with that ${err.value}`;
    error.statusCode = 404;
  }

  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(" ,");
    error.statusCode = 400;
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    return res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }
};
