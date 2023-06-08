const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const meta = require("../middlewares/common");

const jwt = require("jsonwebtoken");
const { use } = require("../routes/auth");

const response = (req, res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({
    meta,
    token: token,
    data: user,
  });
};

const signUp = async (req, res, next) => {
  //get data from client
  //post that data in database
  //return that data to user
  try {
    const { name, email, password, address, type } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exist!!! " });
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
};

//sign In
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = (await User.findOne({ email })).toObject();

    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with same email doesn't  exist!!! " });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Icorrect password!!! " });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    await response(req, res, user);
    // res.json({token,rajan:[user]});
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

//verfiy token

const verifyToken = async (req, res, next) => {
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
};

//get user data
const userData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    response(req, res, user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name,password, email, address, type } = req.body;

    const user = await User.findById(req.user);
    const hasedPassword = await bcryptjs.hash(password, 8);


    if (user) {
      user.name = name || user.name;

      user.email = email || user.email;
      user.password = hasedPassword || user.hasedPassword
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
};

module.exports = { signIn, signUp, verifyToken, userData, updateProfile };
