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
  },
  { timestamps: true }
);

const URL = mongoose.model("URL", UrlSchema);

module.exports = URL;
