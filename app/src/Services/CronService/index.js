const { resolve } = require('path');
const cron = require('node-cron');

const config = require('../../Settings/config');

class CronService {
  static schedule() {
    const { CRON } = config;
    CRON.map(({ SCHEDULE, JOB_CLASS, OPTIONS }) => {
      const job = cron.schedule(SCHEDULE, async () => {
        const filePath = resolve(__dirname, `${JOB_CLASS}.js`);
        const module = require(filePath);
        await module.execute(OPTIONS);
        if (OPTIONS?.runOnce) {
          job.stop();
        }
      })
    });
  }
}

module.exports = CronService;
