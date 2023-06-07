const mongoose = require("mongoose");

const connectionDatabase = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connection MONGODB  Successful"))
    .catch((err) => console.log(err));
};

module.exports = connectionDatabase;
