const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: "No auth token, access denied!!",
        status_code: 401,
        error:true
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: "No auth token, access denied!!",
        status_code: 401,
        error:true
      });
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) {
        return res.status(401).json({
          message: "Token authorization failed, access denied!!",
          status_code: 401,
        error:true
        });
      }

      req.user = verified.id;
      req.token = token;
      next();
    } catch (err) {
      return res.status(401).json({
        message: "Token authorization failed, access denied!!",
        status_code: 401,
        error:true
        
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status_code: 500,
      error:true

    });
  }
};

module.exports = auth;
