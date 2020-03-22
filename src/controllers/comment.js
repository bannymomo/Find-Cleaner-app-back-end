const Comment = require("../models/comment");
const responseFormatter = require("../utils/responseFormatter");

const { convertQuery } = require("../utils/helper");

async function getCommentById (req, res) {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId)
        .populate("client", "firstName lastName photo")
        .populate("business")
        .exec();
    if (!comment) {
        return responseFormatter(res, 404, "Comment not found", null);
    }
    return responseFormatter(res, 200, null, comment);
}

async function getAllComment (req, res) {
    const total = await Comment.find()
        .countDocuments()
        .exec();
    const { pagination } = convertQuery(req.query, total);
    const { businessId } = req.query;
    const { page, pageSize } = pagination;

    if (!businessId) {
        const commentList = await Comment.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
        return responseFormatter(res, 200, null, { data: commentList, pagination });
    }
    const commentList = await Comment.find({ business: businessId })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
    return responseFormatter(res, 200, null, { data: commentList, pagination });
}

module.exports = {
    getCommentById,
    getAllComment
}
