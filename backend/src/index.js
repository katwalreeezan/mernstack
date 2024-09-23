const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
const router = require("../routes/userRoutes");
mongoose
  .connect(
    "mongodb+srv://reejan:reejan@reejans.ihgpz.mongodb.net/myform?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected"));

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/users", router);
app.listen(port, () => {
  console.log("server is running");
});
