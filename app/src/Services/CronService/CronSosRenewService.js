const SosService = require('../SosService');
const SosRepository = require('../../Repository/SosRepository');

class CronSosRenewService {
  static async execute(options) {
    console.log('Renewing SOS tokens...');
    try {
      const refresh_token = await SosRepository.getRefreshToken();
      const data = await SosService.refresh(refresh_token);
      if (JSON.parse(data).hasOwnProperty('access_token')) {
        SosRepository.updateTokens(data);
        return;
      }
      console.log('Cannot renew tokens:', data);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = CronSosRenewService;
