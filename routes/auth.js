const express = require("express");
const User = require("../models/user");
const bcryptjs =require("bcryptjs"); 
const jwt =require("jsonwebtoken");
const { json } = require("express");
const auth = require("../middlewares/auth");
const { signUp, signIn, verifyToken, userData } = require("../controller/auth_controller");
const authRouter = express.Router();


//signUp
authRouter.post("/api/signup", signUp)
//sign In  
authRouter.post("/api/signIn",signIn)
//verfiy token
authRouter.post("/api/verifyToken",verifyToken)
//get user Data
authRouter.get("/",auth,userData)

module.exports = authRouter;
