exports.success = (req, res, message, status) => {
  res.status(status || 200).send({
    error: "",
    body: message,
    status,
  });
};
exports.error = (req, res, message, status) => {
  res.status(status || 500).send({
    error: message || "Internal server error",
    body: "",
    status,
  });
};
