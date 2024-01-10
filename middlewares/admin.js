const jwt = require("jsonwebtoken");
const User = require("../models/user");

const admin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No auth token, access denied!!",
      });
    }
    const token = authHeader.split(" ")[1];
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) {
        return res.status(401).json({
          message: "Token authorization failed, access denied!!",
          status_code: 401,
        });
      }
      const user = await User.findById(verified.userId);
      if (user.type == "User") {
        return res
          .status(401)
          .json({
            message: "you are not a admin",
            status_code: 401,
            error: true,
          });
      }
      req.user = verified.id;
      req.token = token;
      next();
    } catch (err) {
      return res.status(401).json({
        error: err,
        message: "Token authorization failed, access denied!!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
module.exports = admin;
