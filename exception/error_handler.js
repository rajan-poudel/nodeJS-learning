const handleInternalServerError = (err, res) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
    status_code: 500,
  });
};

const handleNotFoundError = (res, message, status, error) => {
  res
    .status(status)
    .json({ message: message, error: error, status_code: status });
};

module.exports = {
  handleInternalServerError,
  handleNotFoundError,
};
