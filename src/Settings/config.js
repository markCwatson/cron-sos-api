module.exports = {
  CRON: [
    {
      SCHEDULE: '0/30 * * * * *',
      JOB_CLASS: 'CronSosService',
      OPTIONS: null,
    },
  ],
};
