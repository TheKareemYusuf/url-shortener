const URL = require("./../models/urlModel");
const CONFIG = require('./../config/config');

const shortenUrl = async (req, res, next) => {
  try {
    // 1. Get the url from the body
    const url = req.body.originalUrl;
    const baseUrl = CONFIG.BASE

    // 2. Generate a unique id
    function generateUrlId() {
      return Math.random().toString(36).slice(2);
    }
    const newUrlId = generateUrlId();

    const shortenedUrl = `${baseUrl}/${newUrlId}`

    // 3. Save both the unique id and url in the database
    const newUrl = await URL.create({
      originalUrl: url,
      newUrlId,
      shortenedUrl,
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


const visitUrl = async (req, res, next ) => {
  try {
    // 1. Get the url id from the query params
    const urlId = req.params.urlId
    
    // 2. Find the document in the database
    const url = await URL.findOne({newUrlId: urlId})

    // 2. Check if there's an id and redirect to the original url
    if (url) {
      return res.redirect(url.originalUrl)
      
    } else {
      res.status(404).json({
        status: "fail",
        message: "Not found"
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { shortenUrl, visitUrl };
