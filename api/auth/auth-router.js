const router = require("express").Router();
const JWT_SECRET = process.env.JWT_SECRET || "shh";
const mw = require("./auth-middleware");
const bcryptjs = require("bcryptjs");
const userModel = require("../users/user-model");
const jwt = require("jsonwebtoken");

function generateToken(payload, expireTime) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expireTime });
}

router.post(
  "/register",
  mw.payloadCheck,
  mw.userNameCheck,
  async (req, res, next) => {
    try {
      const model = {
        username: req.body.username,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password),
      };
      const insertedRecord = await userModel.insertUser(model);
      res.status(201).json(insertedRecord);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/login",
  mw.payloadCheck,
  mw.loginPasswordCheck,
  async (req, res, next) => {
    try {
      const payloaded = await userModel.findUserBy({
        username: req.body.username,
      });

      const token = generateToken(payloaded, "1d");
      res.json({
        message: `welcome, ${req.body.username}`,
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;