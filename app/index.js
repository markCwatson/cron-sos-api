const CronService = require('./src/Services/CronService');
const Repository = require('./src/Repository');

(async () => {
  try {
    // Initial call will establish connection to mongoDB.
    // Implemented as a singleton, so future calls will be the instance.
    console.log('Connecting to database...');
    await Repository.getInstance();

    // Schedule the Cron jobs to query SOS.
    // Setup in settings/config.js
    console.log('Scheduling Cron jobs...');
    CronService.schedule();
  } catch (err) {
    console.error(err);
  }
})();
