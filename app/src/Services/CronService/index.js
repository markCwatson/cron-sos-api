const { resolve } = require('path');
const cron = require('node-cron');

const config = require('../../Settings/config');

class CronService {
  static schedule() {
    const { CRON } = config;
    CRON.map(({ SCHEDULE, JOB_CLASS, OPTIONS }) => {
      const job = cron.schedule(SCHEDULE, async () => {
        const filePath = resolve(__dirname, `${JOB_CLASS}.js`);
        let module;
        try {
          module = require(filePath);
        } catch (err) {
          throw new Error(`Error loading module ${filePath}: ${err}`);
        }
        await module.execute(OPTIONS);
        if (OPTIONS?.runOnce) {
          console.log(`Stopping ${JOB_CLASS}.`);
          job.stop();
        }
      })
    });
    console.log('Cron jobs scheduled!');
  }
}

module.exports = CronService;
