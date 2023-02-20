const { resolve } = require('path');
const cron = require('node-cron');

const config = require('../../Settings/config');

class CronService {
  static schedule() {
    const { CRON } = config;
    CRON.map(({ SCHEDULE, JOB_CLASS, OPTIONS }) => cron.schedule(SCHEDULE, async () => {
      const filePath = resolve(__dirname, `${JOB_CLASS}.js`);

      const module = require(filePath);
      await module.execute(OPTIONS);
    }));
  }
}

module.exports = CronService;
