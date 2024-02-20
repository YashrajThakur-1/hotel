const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to mongo db Server");
});
db.on("error", (error) => {
  console.log("MongoDb Connection Error", error);
});
db.on("disconnected", () => {
  console.log("DisConnected to mongo db Server");
});
