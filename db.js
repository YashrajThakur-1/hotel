const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/hotels";
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
