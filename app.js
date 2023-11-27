const express = require("express");

const bodyParser = require("body-parser");

const urlRouter  = require('./routes/urlRoutes');

const app = express();

// Middleware to parse user information
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World, let's shorten yout url!");
});

app.use(urlRouter)



module.exports = app;
