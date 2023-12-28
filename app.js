const express = require("express");

const bodyParser = require("body-parser");

const urlRouter = require("./routes/urlRoutes");
const userAuthRouter = require("./routes/userAuthRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware to parse user information
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User authentication middleware
require("./authentication/userAuth");

app.get("/", (req, res) => {
  res.send("Hello World, let's shorten yout url!");
});

app.use("/api/v1/", userAuthRouter);
app.use("/api/v1/url/", urlRouter);
app.use("/api/v1/user/", userRouter);

module.exports = app;
