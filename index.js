//Import package from packages
const express = require('express')
const mongoose = require('mongoose')

//Import from other file
const authRouter = require("./routes/auth.js");
const adminRoute = require('./routes/admin.js');

//INIT
const app = express()
const PORT = 3000;
// const DB ="mongodb+srv://iamrjn:rajan500@cluster0.oebdyer.mongodb.net/?retryWrites=true&w=majority";
const DB ="mongodb://127.0.0.1:27017/nodeLearning?retryWrites=true&w=majority"

//middleware
app.use(express.json());
app.use(authRouter); 
app.use(adminRoute);

mongoose.connect(DB).then( ()=>{
  console.log("Connection Successful");
}).catch((e)=>{
  console.log(e);
});

//office
// app.listen(PORT,"192.168.101.22" ,()=>{ 
//   console.log(`Connect at Port ${PORT} ` )
// })
//home
app.listen(PORT ,()=>{ 
    console.log(`Connect at Port ${PORT} ` )
})