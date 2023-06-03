const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const response = (req, res, user) => {
  const token = jwt.sign({ id: user._id }, "passwordKey");

  res.status(200).json({
    token: token,
    data: user,
  });
};

const signUp = async (req, res, next) => {
  //get data from client
  //post that data in database
  //return that data to user
  try {
    const { name, email, password } = req.body;

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

    const token = jwt.sign({ id: user._id }, "passwordKey");
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
    const verified = jwt.verify(token, "passwordKey");
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
    const user =await User.findById(req.user);

  try {
     response(req, res, user);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { signIn, signUp, verifyToken,userData };
