const { JWT_SECRET } = require("../secrets/jwt-secret");
const userModel = require("../users/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const restricted = (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader) {
      res.status(401).json({ message: "Token gereklidir" });
    } else {
      jwt.verify(tokenHeader, JWT_SECRET, (err, decodeToken) => {
        if (err) {
          res.status(401).json({ message: "Token gecersizdir" });
        } else {
          req.decodeToken = decodeToken;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

const payloadCheck = function (req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "username ve password gereklidir" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const userNameCheck = async function (req, res, next) {
  try {
    const { username, email } = req.body;
    const isUserName = await userModel.findUserBy({ username: username });
    const isUserEmail = await userModel.findUserBy({ email: email });
    if (isUserName) {
      res.status(401).json({ message: "username alınmıştır" });
    } else if (isUserEmail) {
      res.status(401).json({ message: "email alınmıştır" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const loginPasswordCheck = async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findUserBy({ username: username });
    if (!user) {
      res.status(404).json({ message: "böyle bir user yok" });
    } else {
      let isPasswordValid = bcryptjs.compareSync(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: "geçersiz kriterler" });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  loginPasswordCheck,
  userNameCheck,
  payloadCheck,
  restricted,
};
