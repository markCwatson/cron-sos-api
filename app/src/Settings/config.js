module.exports = {
  CRON: [
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
