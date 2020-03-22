const express = require("express");
const router = express.Router();
const {
    getCommentById,
    getAllComment,    
} = require("../controllers/comment");

router.get("/", getAllComment);

router.get("/:commentId", getCommentById);

module.exports = router;