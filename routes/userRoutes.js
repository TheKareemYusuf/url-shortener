const express = require("express");
const passport = require('passport');
const userController = require("./../controllers/userController");

const router = express.Router();

router
  .route("/links")
  .get(
    passport.authenticate("jwt", { session: false }),
    userController.getAllUrl
  );

router
  .route("/links/:url")
  .get(
    passport.authenticate("jwt", { session: false }),
    userController.getUrlDetails
  );



module.exports = router;
