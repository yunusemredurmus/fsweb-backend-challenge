const express = require("express");
const router = express.Router();
const commentsModal = require("./comments-model");

router.get("/", async (req, res, next) => {
  try {
    const comments = await commentsModal.getAllComments();
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const comment = await commentsModal.getCommentById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
