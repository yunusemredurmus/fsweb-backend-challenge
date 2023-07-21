const express = require("express");
const router = express.Router();

const likesModel = require("./likes-model");
router.get("/postid/:id", async (req, res, next) => {
  try {
    const likes = await likesModel.getLikesPostId(req.params.id);
    if (likes < 1) {
      res.status(404).json({ message: "Post İçin begeni bulunamadı" });
    } else {
      res.status(200).json(likes);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/commentid/:id", async (req, res, next) => {
  try {
    const likes = await likesModel.getLikesCommentId(req.params.id);
    if (likes < 1) {
      res.status(404).json({ message: "Yorum için begeni bulunamadı." });
    } else {
      res.status(200).json(likes);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    //userİdvePostİdVarMi kontrolü yap
    const varMi = await likesModel.userİdvePostİdVarMi(
      req.body.user_id,
      req.body.post_id
    );
    if (varMi) {
      const updatedLike = await likesModel.updateLike(req.body);
      res.status(200).json(updatedLike);
    } else {
      const like = await likesModel.getCreateLike(req.body);
      res.status(201).json(like);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:user_id/:post_id", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
