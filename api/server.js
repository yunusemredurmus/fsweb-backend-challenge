const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome Twitter Clone" });
});

server.use("/users", require("./users/user-router"));
server.use("/likes", require("./likes/likes-router"));
server.use("/comments", require("./comments/comments-router"));
server.use("/posts", require("./posts/posts-router"));

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server hatası ! " });
});



module.exports = server;
