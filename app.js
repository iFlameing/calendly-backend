const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

if (process.env.NODE_ENV === "test") {
  mongoose.connect("mongodb://localhost/APIAuthenticationTEST", {
    useNewUrlParser: true
  });
} else {
  mongoose.connect("mongodb://localhost/APIAuthentication", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/users", require("./routes/users"));

module.exports = app;
