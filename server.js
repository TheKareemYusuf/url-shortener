const app = require("./app");
const CONFIG = require("./config/config");
const { connetToMongoDB } = require("./db");

connetToMongoDB();

app.listen(CONFIG.PORT, () => {
  console.log(`url-shortener app listening on port ${CONFIG.PORT}`);
});
  