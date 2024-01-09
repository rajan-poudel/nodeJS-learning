const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const meta = require("../middlewares/common");
const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const { use } = require("../routes/auth");

const response = (req, res, user) => {
  res.status(200).json({
    data: user,
    meta,
  });
};

const signUp = asyncHandler(async (req, res, next) => {
  //get data from client
  //post that data in database
  //return that data to user
  try {
    const { name, email, password, address, type } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exist!!! ",
        status_code: 400,
        error: true,
      });
    }

    const hasedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hasedPassword,
      name,
      address,
      type,
    });

    user = await user.save();
    response(req, res, user);
    // res.json(user);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

//sign In
const signIn = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User with this email doesn't  exist!!! ",
        status_code: 400,
        error: true,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password!!! ",
        status_code: 401,
        error: true,
      });
    }

    // Create tokens
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Update the user's access token in the database
    user.token.access_token = accessToken;
    user.token.refresh_token = refreshToken;

    await user.save();

    //response
    await response(req, res, user);
  } catch (e) {
    res.status(500).json({
      message: e.message,
      status_code: 500,
      error: true,
    });
  }
});

//refresh-token
const refreshToken = asyncHandler(async (req, res, next) => {
  const { refresh_token: incomingRefreshToken } = req.body;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Refresh token is missing" });
  }

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new access token and refresh token
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Update the user's access token and refresh in the database
    user.token.access_token = accessToken;
    user.token.refresh_token = refreshToken;
    await user.save();
    await response(req, res, user.token);
  } catch (error) {
    res.status(500).json({ message: error, status_code: 500, error: true });
  }
});

//verfiy token

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(500).json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(500).json(false);
    }
    const user = await User.findById(verified.id);
    if (!user) {
      return res.status(500).json(false);
    }
    res.json(true);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

//get user data
const userData = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    response(req, res, user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

const updateProfile = asyncHandler(async (req, res, next) => {
  try {
    const { name, password, email, address, type } = req.body;

    const user = await User.findById(req.user);
    const hasedPassword = await bcryptjs.hash(password, 8);

    if (user) {
      user.name = name || user.name;

      user.email = email || user.email;
      user.password = hasedPassword || user.hasedPassword;
      user.address = address || user.address;
      user.type = type || user.type;
      const updateUser = await user.save();
      response(req, res, updateUser);
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = {
  signIn,
  signUp,
  verifyToken,
  refreshToken,
  userData,
  updateProfile,
};
