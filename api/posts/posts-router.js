const express = require("express");
const postsModel = require("./posts-model.js");
const router = express.Router();
const mw = require("../auth/auth-middleware");

router.get("/", mw.restricted,async (req, res, next) => {
  try {
    const posts = await postsModel.getPost();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id",mw.restricted, async (req, res, next) => {
  try {
    const post = await postsModel.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.post("/add",mw.restricted, async (req, res, next) => {
  try {
    const newPost = await postsModel.insertPost(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", mw.restricted, async (req, res, next) => {
  try {
    const updatedPost = await postsModel.updatePost(req.params.id, req.body);
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id",mw.restricted, async (req, res, next) => {
  try {
    await postsModel.deletePost(req.params.id);
    res.status(200).json({ message: "Post silindi." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
