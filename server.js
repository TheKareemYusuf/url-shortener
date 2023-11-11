const app = require('./app');
const CONFIG = require('./config/config');



app.listen(CONFIG.PORT, () => {
    console.log(`url-shortener app listening on port ${CONFIG.PORT}`);
  });