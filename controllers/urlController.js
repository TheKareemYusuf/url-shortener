// importing the URL model and the config file to get access to environment variables

const URL = require("./../models/urlModel");
const CONFIG = require("./../config/config");
const AppError = require("./../utils/appError");

// Creating the function that shortens the url
const shortenUrl = async (req, res, next) => {
  try {
    // 1. Get the url from the body and the baseUrl from the config file
    const url = req.body.originalUrl;
    const baseUrl = CONFIG.BASE;

    // console.log(req.user);

    // 2. Generate a unique id
    function generateUrlId() {
      return Math.random().toString(36).slice(2);
    }

    // Assign the returned value from the generate function to newUrlId
    const newUrlId = generateUrlId();

    const shortenedUrl = `${baseUrl}/api/v1/${newUrlId}`;

    // 3. Save both the unique id and url to the database
    const newUrl = await URL.create({
      originalUrl: url,
      newUrlId,
      shortenedUrl,
      // ownerId: req.user._id,
    });

    // 4. Return the shortened url
    res.status(201).json({
      status: "success",
      data: newUrl,
      message: `url shortened successfully. Here's your new url ${shortenedUrl}`,
    });
  } catch (error) {
    next(error);
  }
};

// creating the funtions that handles shortened url to the original url
const visitUrl = async (req, res, next) => {
  try {
    // 1. Get the url id from the query params
    const urlId = req.params.urlId;

    // 2. Find the document in the database
    const url = await URL.findOne({ newUrlId: urlId });

    // 2. Check if there's an id and redirect to the original url
    if (url) {
      console.log(url);

      await URL.updateOne({ newUrlId: urlId }, { $inc: { numOfClicks: 1 } });
      // await URL.updateOne({newUrlId: urlId})

      return res.redirect(url.originalUrl);
    } else {
      return new AppError("url not found", 404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { shortenUrl, visitUrl };
