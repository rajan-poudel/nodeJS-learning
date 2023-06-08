const notFound = (req, res, next) => {
  const err = new Error(`Not Found - ${req.originUrl}`);
  res.status(404).json({
    error: err.message,
    statusCode:404
  });
//   next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    error: err.message,
    statusCode:statusCode
  });
};

module.exports = { notFound, errorHandler };
