const User = require("./../models/userModel");
const URL = require("./../models/urlModel");
const AppError = require("./../utils/appError");

const getAllUrl = async (req, res, next) => {
  try {
    // get user id
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return new AppError("User not found", 404);
    }
    // use user id to query url database
    const allUrl = await URL.find().where("ownerId").equals(userId);

    // return all documents that matches the user id in url db
    res.status(200).json({
      status: "success",
      data: allUrl,
      message: "All shortened user by you",
    });
  } catch (error) {
    next(error);
  }
};

const getUrlDetails = async (req, res, next) => {
  try {
    // get user id
    const userId = req.user._id;

    // find user with the id in the db
    const user = await User.findById(userId);
    console.log(userId);

    // get the url from body
    const url = req.params.url;

    // return error if user is not in database
    if (!user) {
      return new AppError("User not found", 404);
    }

    // get the details of the url using the shortened url
    const urlDetails = await URL.findOne({ newUrlId: url });
    console.log(urlDetails.ownerId.toString());
    if (!urlDetails) {
      return new AppError("URL details not found", 404);
    }

    if (userId.toString() === urlDetails.ownerId.toString()) {
      return res.status(200).json({
        status: "success",
        data: urlDetails,
        message: "All shortened URLs by you",
      });
    } else {
      return new AppError("You do not have access", 403);
    }

  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUrl, getUrlDetails };
