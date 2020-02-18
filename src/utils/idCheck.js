
const responseFormatter = require("../utils/responseFormatter");

function checkId(role,req,res) {

  if (!role) {
    return responseFormatter(res, 404, "Client or business not found or not match", null);
  } 
  if (!role.user || role.user.toString() !== req.user.id) {
    return responseFormatter(res, 401, "Access denied 1", null);
  }
    
}

module.exports = checkId;