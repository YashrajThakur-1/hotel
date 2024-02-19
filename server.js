const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const db = require("./db");
const menuRoutes = require("./routes/MenuRoutes");
const PersonRouter = require("./routes/PersonRoutes");

app.use("/api", menuRoutes);
app.use("/auth", PersonRouter);

app.listen(3000, (req, res) => {
  console.log("The server listening on  http://localhost:3000");
});
