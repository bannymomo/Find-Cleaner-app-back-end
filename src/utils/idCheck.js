const responseFormatter = require("../utils/responseFormatter");

function checkId(role, req, res) {
    if (!role) {
        return responseFormatter(
            res,
            404,
            `Client or business not found or not match`,
            null
        );
    }

    if (!role.user || role.user._id.toString() !== req.user.id) {
        return responseFormatter(res, 401, "Access denied", null);
    }
}

module.exports = checkId;
