const CronSosReadService = require('../src/Services/CronService/CronSosReadService');

const execute = async () => {
  console.log('Running sos-read script ...');
  try {
    CronSosReadService.execute();
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`sos-read script finished.`);
  }
}

execute();
