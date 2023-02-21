const CronService = require('./Services/CronService');


try {
  CronService.schedule();
} catch (err) {
  console.log(err);
}
