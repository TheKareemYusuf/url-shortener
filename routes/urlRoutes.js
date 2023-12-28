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
  // .get(
  //   passport.authenticate("jwt", { session: false }),
  //   urlController.getAllUrl
  // );


router.route("/:urlId").get(urlController.visitUrl);


// router
//   .route("/user")
//   .get(
//     passport.authenticate("jwt", { session: false }),
//     urlController.getAllUrl
//   );

module.exports = router;
