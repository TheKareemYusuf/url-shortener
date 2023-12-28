const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "Please enter the url"],
    },
    newUrlId: {
      type: String,
      unique: true,
    },
    shortenedUrl: {
      type: String,
    },
    numOfClicks: {
      type: Number,
      required: true,
      default: 0,
    },
    ownerName: {
      type: String,
      // get the creator from creatorSchema
      ref: "User",
    },
    ownerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" },
  },
  { timestamps: true }
);

const URL = mongoose.model("URL", UrlSchema);

module.exports = URL;
