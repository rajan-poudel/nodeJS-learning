const mongoose = require('mongoose')

// const DB ="mongodb+srv://iamrjn:rajan500@cluster0.oebdyer.mongodb.net/?retryWrites=true&w=majority";
const DB ="mongodb://127.0.0.1:27017/nodeLearning?retryWrites=true&w=majority"


 async function connect (){
    await mongoose.connect(DB)
        .then(() => console.log("Connection Successful"))
        .catch((err) => console.log(err))
}

module.exports = connect;