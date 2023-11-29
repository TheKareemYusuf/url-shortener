const express = require("express");
const urlController = require("./../controllers/urlController");

const router = express.Router();

router.route("/shorten-url").post(urlController.shortenUrl);

router.route("/:urlId").get(urlController.visitUrl)

module.exports = router;
