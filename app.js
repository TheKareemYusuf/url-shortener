const express = require("express");

const app = express();



app.get("/", (req, res) => {
  res.send("Hello World, let's shorten yout url!");
});



module.exports = app;
