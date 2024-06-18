const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
//mongoose.connect();
const connectdb = async () => {
  //545767
  try {
    await mongoose.connect(URI);
    console.log("connection success to db");
  } catch (error) {
    console.error("db connection failed");
    process.exit(0);
  }
};

module.exports = connectdb;
