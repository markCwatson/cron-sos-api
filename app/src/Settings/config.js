module.exports = {
  CRON: [
    {
      SCHEDULE: '* * * * * *',
      JOB_CLASS: 'CronSosAuthService',
      OPTIONS: {
        runOnce: true,
      }
    },
    {
      SCHEDULE: '25 * * * * *',
      JOB_CLASS: 'CronSosReadService',
      OPTIONS: null,
    },
    {
      SCHEDULE: '0 0 15 */2 0',
      JOB_CLASS: 'CronSosRenewService',
      OPTIONS: null,
    },
  ],
};
