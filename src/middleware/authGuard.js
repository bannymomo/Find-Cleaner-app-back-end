const { validateToken } = require("../utils/jwt");
const responseFormatter = require("../utils/responseFormatter");

function authGuard(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return responseFormatter(res, 401, "Access denied", null);
  }

  const contentArr = authHeader.split(" ");
  if (contentArr.length !== 2 || contentArr[0] !== "Bearer") {
    return responseFormatter(res, 401, "Access denied", null);
  }

  const decoded = validateToken(contentArr[1]);
  if (decoded) {
    req.user = decoded;
    return next();
  }
  return responseFormatter(res, 401, "Access denied", null);
}

function authGuardClient(req, res, next) {
  if (req.user.role === "client") {
    return next();
  }
  return responseFormatter(res, 401, "Access denied", null);
}

function authGuardBusiness(req, res, next) {
  if (req.user.role === "business") {
    return next();
  }
  return responseFormatter(res, 401, "Access denied", null);
}

module.exports = { authGuard, authGuardClient, authGuardBusiness };
