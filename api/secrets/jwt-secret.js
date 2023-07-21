const JwtSecret = process.env.JWT_SECRET || "shh";
module.exports = {
  JWT_SECRET: JwtSecret,
};
