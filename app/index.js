const CronService = require('./src/Services/CronService');
const Repository = require('./src/Repository');

// Initial call will establish connection to mongoDB.
// Implemented as a singleton, so future calls will be the instance.
try {
  //Repository.getInstance();
} catch (error) {
  console.error(err);
}

// Schedule the Cron jobs to query SOS.
// Setup in settings/config.js
try {
  CronService.schedule();
} catch (err) {
  console.error(err);
}
