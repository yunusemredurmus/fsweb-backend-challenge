const Posts = require("./posts-model");
const { JWT_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken");
const db = require("../../data/db-config");

const payloadCheck = function (req, res, next) {
  try {
    const content = req.body.content;
    if (!content || content.trim() === "") {
      res.status(400).json({ message: "İçerik gereklidir" });
    } else if (content.length > 140) {
      res.status(400).json({ message: "140 karakterden büyük olamaz" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const checkUserId = (req, res, next) => {
  const requestUserId = parseInt(req.params.user_id);
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const loggedInUserId = decodedToken.user_id;
    if (requestUserId === loggedInUserId) {
      next();
    } else {
      res
        .status(401)
        .json({ error: "Yetkisiz işlem: Geçersiz kullanıcı kimliği" });
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
const checkOwnPost = async (req, res, next) => {
  const user_id = await req.decodeToken.user_id;
  const requestPostId = parseInt(req.params.post_id);

  try {
    const result = await db("posts")
      .select("user_id")
      .where("post_id", requestPostId)
      .first();

    if (result) {
      const postOwnerId = result.user_id;
      if (postOwnerId === user_id) {
        next();
      } else {
        res.status(401).json({
          error: "kullanıcı eşleşmedi",
          postOwnerId: postOwnerId,
          user_id: user_id,
        });
      }
    } else {
      res.status(401).json({ error: "Post sahibi bulunamadı" });
    }
  } catch (error) {
    res.status(401).json({ error: "error" });
  }
};

module.exports = { payloadCheck, checkUserId, checkOwnPost };
