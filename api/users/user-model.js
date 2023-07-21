const db = require("../../data/db-config");

getAllUsers = () => {
  return db("users");
};

getUserById = (id) => {
  return db("users").where("user_id", id);
};



getUserByUsername = (username) => {
  return db("users").where("username", username).first();
};

addUser = (user) => {
  return db("users").insert(user).returning("*");
};

updateUser = (id, user) => {
  return db("users").where("user_id", id).update(user).returning("*");
};

deleteUser = (id) => {
  return db("users").where("user_id", id).del().returning("*");
};


module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  addUser,
  updateUser,
  deleteUser,
};
