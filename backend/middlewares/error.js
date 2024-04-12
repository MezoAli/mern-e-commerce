export default (err, req, res, next) => {
  let error = {
    message: err?.message || "Internal Server Error",
    statusCode: err?.statusCode || 500,
  };

  if (process.env.NODE_ENV === "PRODUCTION") {
    if (err.name === "CastError") {
      error.message = `no item found with that ${err.value}`;
      error.statusCode = 404;
    }
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    if (err.name === "CastError") {
      error.message = `no item found with that ${err.value}`;
      error.statusCode = 404;
    }
    return res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }
};
