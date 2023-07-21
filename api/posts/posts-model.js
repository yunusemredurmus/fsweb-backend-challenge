const db = require("../../data/db-config");
const postsModel = require("../posts/posts-model");

async function getPost() {
  const allPosts = await db("posts as p")
    .rightJoin("users as u", "u.user_id", "p.user_id")
    .select("p.post_id", "p.content", "u.user_id", "u.username");
  return allPosts;
}

const insertPost = async function (post) {
  const [insertedId] = await db("posts").insert(post);
  return await getPostById(insertedId);
};
const remove = async function (post_id) {
  return db("posts").where("post_id", post_id).del();
};

module.exports = { insertPost, getPost, remove };
