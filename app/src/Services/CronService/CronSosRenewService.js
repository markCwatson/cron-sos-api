const SosService = require('../SosService');

class CronSosRenewService {
  static async execute() {
    console.log('Start CronSosRenewService job');
    try {
      const result = await SosService.refreshTokens();
      console.log(`SOS tokens were${result ? ' ' : ' not '}refreshed`);
    } catch (err) {
      console.error(err);
    } finally {
      console.log('End CronSosRenewService job');
    }
  }
}

module.exports = CronSosRenewService;
