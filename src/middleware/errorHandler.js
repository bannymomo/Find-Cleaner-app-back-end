const responseFormatter = require("../utils/responseFormatter");

module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    responseFormatter(res, 400, err.message, null);
  }

  if (err.name === "CastError") {
    responseFormatter(res, 400, err.message, null);
  }
  if (err.type === "entity.parse.failed") {
    responseFormatter(res, 400, "entity parse failed", null);
  }
  if (err.name === "ObjectParameterError") {
    responseFormatter(res, 400, err.message, null);
  }
  console.error(err);
  responseFormatter(res, 500, "something unexpected happened", null);
};
