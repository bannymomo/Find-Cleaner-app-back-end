const { validateToken } = require("../utils/jwt");
const responseFormatter = require("../utils/responseFormatter");
const { CLIENT_ROLE, BUSINESS_ROLE } = require("../utils/variables");

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
    if (req.user.role === CLIENT_ROLE) {
        return next();
    }
    return responseFormatter(res, 401, "Access denied", null);
}

function authGuardBusiness(req, res, next) {
    if (req.user.role === BUSINESS_ROLE) {
        return next();
    }
    return responseFormatter(res, 401, "Access denied", null);
}

module.exports = { authGuard, authGuardClient, authGuardBusiness };
