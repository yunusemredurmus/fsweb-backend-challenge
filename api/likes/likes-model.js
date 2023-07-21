const db = require("../../data/db-config");

function getAllLikes() {
  return db("likes");
}

function getLikeById(id) {
  return db("likes").where({ id }).first();
}

function getLikesByPostId(post_id) {
  return db("likes").where({ post_id });
}

function getLikesByUserId(user_id) {
  return db("likes").where({ user_id });
}

async function addLike(like) {
  await db("likes").insert(like);
  await db("posts")
    .where({ post_id: like.post_id })
    .increment("like_sayisi", 1);
  return getLikesByPostId(like.post_id);
}

const existLike = async (like) => {
  const likeExist = await db("likes").where({
    user_id: like.user_id,
    post_id: like.post_id,
  });
  return likeExist;
};

async function deleteLike(like) {
  await db("likes")
    .where({
      user_id: like.user_id,
      post_id: like.post_id,
    })
    .del();
  await db("posts")
    .where({ post_id: like.post_id })
    .decrement("like_sayisi", 1);
  return getLikesByPostId(like.post_id);
}

module.exports = {
  getAllLikes,
  getLikeById,
  getLikesByPostId,
  getLikesByUserId,
  addLike,
  deleteLike,
  existLike,
};
