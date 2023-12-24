const express = require("express");
const passport = require('passport');
const urlController = require("./../controllers/urlController");

const router = express.Router();

router
  .route("/shorten-url")
  .post(
    passport.authenticate("jwt", { session: false }),
    urlController.shortenUrl
  );

router.route("/:urlId").get(urlController.visitUrl);

module.exports = router;
