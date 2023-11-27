const express = require("express");
const urlController = require("./../controllers/urlController");

const router = express.Router();

router.route("/shorten-url").post(urlController.shortenUrl);

module.exports = router;
