const URL = require("./../models/urlModel");

const shortenUrl = (req, res, next) => {
  // 1. Get the url from the body

  // 2. Shorten the url

  // 3. Return the shortened url
  res.status(201).json({
    status: "success",
    data: "url shortened successfully. Here's your new url ...",
  });
};

module.exports = { shortenUrl };
