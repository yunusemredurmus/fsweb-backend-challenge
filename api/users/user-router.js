const express = require("express");
const router = express.Router();
const usersModal = require("./user-model");
const bcryptjs = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET || "shh";
const jwt = require("jsonwebtoken");
const {
  loginPasswordCheck,
  userNameCheck,
} = require("../auth/auth-middleware.js");

router.get("/", async (req, res) => {
  try {
    const users = await usersModal.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await usersModal.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const kullanici = await usersModal.getUserById(req.params.id);
    const updatedUser = await usersModal.updateUser(req.params.id, req.body);
    if (!kullanici) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const kullanici = await usersModal.getUserById(req.params.id);
    const deletedUser = await usersModal.deleteUser(req.params.id);
    if (kullanici < 1) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(kullanici);
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const model = {
      username: username,
      password: bcryptjs.hashSync(password),
      email: email,
    };
    const insertedRecord = await usersModal.addUser(model);
    res.status(201).json(insertedRecord);
  } catch (error) {
    next(error);
  }
});

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await usersModal.getUserByUsername(username);
    if (!user) {
      res.status(404).json({ message: "böyle bir user yok" });
    } else {
      const passwordValid = await bcryptjs.compare(password, user.password);
      if (!passwordValid) {
        res.status(401).json({ message: "password gecersizdir" });
      } else {
        const token = generateToken(user, "1d");
        res.json({
          message: `welcome, ${req.body.username}`,
          token: token,
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
