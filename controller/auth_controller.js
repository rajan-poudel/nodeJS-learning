const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const meta = require("../middlewares/common");
const asyncHandler = require("express-async-handler");
const { handleInternalServerError, handleNotFoundError } = require('../exception/error_handler');


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
    let image ="";
    if (req.file) {
      image = req.file.path;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleNotFoundError(res,"User with this email already exist!!! " ,400)
    }

    const hasedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hasedPassword,
      name,
      address,
      type,
      image,
    });

    user = await user.save();
    response(req, res, user);
    // res.json(user);
  } catch (e) {
    handleInternalServerError(e, res);

  }
});

//sign In
const signIn = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
     return handleNotFoundError(res,"User with this email doesn't  exist!!! " ,400)
      
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return handleNotFoundError(res,"Incorrect password!!! " ,401)
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
    const result = user.toObject();
    delete result.__v;
    delete result._id;

    //response
    await response(req, res, result);
  } catch (e) {
    handleInternalServerError(e, res);
  }
});

//refresh-token
const refreshToken = asyncHandler(async (req, res, next) => {
  const { refresh_token: incomingRefreshToken } = req.body;

  if (!incomingRefreshToken) {
    return handleNotFoundError(res,"Refresh token is missing" ,401)
  }

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return handleNotFoundError(res,"User not found" ,404)

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
    handleInternalServerError(error, res);
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
    handleInternalServerError(err, res);
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
    handleInternalServerError(err, res);

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
