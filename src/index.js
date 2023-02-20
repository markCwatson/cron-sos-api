const CronService = require('./Services/CronService');

try {
  CronService.schedule();
} catch (error) {
  console.log(err);
}
