require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const router = require("./routes/routes");
const { credentials } = require("./auth/passport");
credentials(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(router);

//need to add user name and password in env file

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started on port 5000 and db connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
