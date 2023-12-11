require("dotenv").config();

// importing and assigning environment variables

module.exports = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  BASE: process.env.BASE,
};
