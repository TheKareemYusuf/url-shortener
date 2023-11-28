const URL = require("./../models/urlModel");

const shortenUrl = async (req, res, next) => {
  try {
    // 1. Get the url from the body
    const url = req.body.originalUrl;

    // 2. Generate a unique id
    function generateUrlId() {
      return Math.random().toString(36).slice(2);
    }
    const newUrlId = generateUrlId();

    // 3. Save both the unique id and url in the database
    const newUrl = await URL.create({
      originalUrl: url,
      shortenedUrl: newUrlId,
    });

    // 4. Return the shortened url
    res.status(201).json({
      status: "success",
      data: newUrl,
      message: "url shortened successfully. Here's your new url ...",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { shortenUrl };
