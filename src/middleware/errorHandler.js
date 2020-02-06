module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json(err.message);
  }

  if (err.name === "CastError") {
    return res.status(400).json(err.message);
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json("entity parse failed");
  }
  console.error(err);
  return res.status(500).json("something unexpected happened");
};
