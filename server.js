const express = require("express");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const db = require("./db");
const menuRoutes = require("./routes/MenuRoutes");
const PersonRouter = require("./routes/PersonRoutes");
app.use("/api", menuRoutes);
app.use("/auth", PersonRouter);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
server.on("error", (error) => {
  console.error("Server Error:", error);
});
