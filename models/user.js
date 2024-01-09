 const mongoose = require('mongoose');

 const userSchema =mongoose.Schema({

    name :{ 
        type:String,
        reuired:true,
        trim:true
    },
    email :{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(value) =>{ 
                const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
               return value.match(re); 
            },
            message:"Please enter a valid email",
        }
    },
    password :{
        required:true,
        type:String,
        validate:{
            validator:(value) => { 
               return value.length > 6; 
            },
            message:"Please enter greater then 6 character ",
        }

    },
    address:{
        type:String,
        default:"",

    },
    type:{
        type:String,
        default:"User",
    },
    token:{
        access_token:{
            type:String,
            default:"",
        },
        refresh_token:{
            type:String,
            default:"",
        },
    }

    
    

 },{
    timestamps: true,
    _id: true,
    
  });

 const User = mongoose.model("user", userSchema );
 module.exports =User; 