const express = require("express");
const User = require("../models/user");
const bcryptjs =require("bcryptjs"); 
const jwt =require("jsonwebtoken");
const { json } = require("express");
const auth = require("../middlewares/auth");
const authRouter = express.Router();


//signUp
authRouter.post("/api/signup", async (req, res) => {
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

  const hasedPassword= await  bcryptjs.hash(password,8); 

    let user = new User({
      email,
      password: hasedPassword,
      name,
    });

    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({
        error:e.message 
    });
  }
});

//sign In  

authRouter.post("/api/signIn",async (req,res)=>{
  try {
   const {email,password} = req.body;

   const user =( await User.findOne({email })).toObject();

  if (!user) {
    return res
        .status(400)
        .json({ msg: "User with same email doesn't  exist!!! " });
  }

const isMatch= await bcryptjs.compare (password,user.password); 

if (!isMatch) { 
  return res
  .status(400)
  .json({ msg: "Icorrect password!!! " });
}

const token =jwt.sign({id:user._id},"passwordKey");
res.json({user,token,rajan:[user]});
    
  } catch (e) {
    res.status(500).json({
      error:e.message  
  });
  }
})
//verfiy token

authRouter.post("/api/verifyToken",async (req,res)=>{
  try {
   const token = req.header("x-auth-token");
   if(!token){
    return  res.status(500).json(false);
   }
   const verified=jwt.verify(token,"passwordKey" );
   if (!verified) {
    return res.status(500).json(false); 

   }
   const user = await User.findById(verified.id);
   if (!user) {
    return res.status(500).json(false);

   }
   res.json(true)
    
  } catch (e) {
    res.status(500).json({
      error:e.message  
  });
  }
})

//get user Data


authRouter.get("/",auth,async(req,res)=>{
  const user =User.findById(req.user);
  res.json({
    ...User._doc,token:req.token
  })

});

authRouter.get("/hello", (req,res)=>{
  res.json({
    "name":"Rajan"
  })

});
module.exports = authRouter;
