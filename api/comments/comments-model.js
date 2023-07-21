const db = require("../../data/db-config");

function getAllComments() {
  return db("comments");
}

function getCommentById(id) {
  return db("comments").where({ id }).first();
}

function getCommentsByPostId(post_id) {
  return db("comments").where({ post_id });
}

function getCommentsByUserId(user_id) {
  return db("comments").where({ user_id });
}

function addComment(comment) {
  return db("comments").insert(comment);
}

function updateComment(id, comment) {
  return db("comments").where({ id }).update(comment);
}

function deleteComment(id) {
  return db("comments").where({ id }).del();
}

module.exports = {
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  getCommentsByUserId,
  addComment,
  updateComment,
  deleteComment,
};
