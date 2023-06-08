//Import package from packages
const express = require('express')
const dotenv = require('dotenv').config()

//Import from other file  
const authRouter = require("./routes/auth.js");
const adminRoute = require('./routes/admin.js');
const productRouter = require('./routes/product.js');
const connectionDatabase = require('./utils/db.js');
const addCommonMetadata = require('./middlewares/common.js');
const { notFound, errorHandler } = require('./middlewares/error.js');

//INIT

//Database connection
connectionDatabase();
const app = express()
const PORT =process.env.PORT;


//middleware
app.use(express.json());
app.use(authRouter); 
app.use(adminRoute);
app.use(productRouter);
// app.use(addCommonMetadata);

//ERROR HANDLER

app.use(notFound);
app.use(errorHandler);


//home
app.listen(PORT ,()=>{ 
    console.log(`Connect at Port ${PORT} ` )
})