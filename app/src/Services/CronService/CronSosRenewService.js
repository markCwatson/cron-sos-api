const SosService = require('../SosService');
const SosRepository = require('../../Repository/SosRepository');

class CronSosRenewService {
  static async execute(options) {
    console.log('Renewing SOS tokens...');
    const refresh_token = SosRepository.getRefreshToken();
    try {
      SosService.refresh(refresh_token, (data) => {
        SosRepository.updateTokens(data);
      });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = CronSosRenewService;
