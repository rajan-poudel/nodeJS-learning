const express = require("express");
const { json } = require("express");
const auth = require("../middlewares/auth");
const { signUp, signIn, verifyToken, userData, updateProfile, refreshToken} = require("../controller/auth_controller");
const authRouter = express.Router();


//signUp
authRouter.post("/api/signup", signUp)
//sign In  
authRouter.post("/api/signIn",signIn)
//verfiy token
authRouter.post("/api/verifyToken",verifyToken)
//refresh token
authRouter.post("/api/refresh-token",refreshToken)
//get user Data
authRouter.get("/api/profile",auth,userData)
//update profile
authRouter.put("/api/upadate-profile",auth,updateProfile)

module.exports = authRouter;
