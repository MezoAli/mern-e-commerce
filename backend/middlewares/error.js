export default (err, req, res, next) => {
  let error = {
    message: err?.message || "Internal Server Error",
    statusCode: err?.statusCode || 500,
  };

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
