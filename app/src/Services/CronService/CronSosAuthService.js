const SosService = require('../SosService');
const SosRepository = require('../../Repository/SosRepository');

class CronSosAuthService {
  static async execute(options) {
    if (CronSosAuthService.running) {
      console.log('CronSosAuthService running');
      return;
    }

    try {
      CronSosAuthService.running = true;
      console.log('Getting tokens ...');

      const envs = {
        id: process.env.SOS_APP_CLIENT_ID,
        secret: process.env.SOS_APP_CLIENT_SECRET,
        code: process.env.SOS_CODE // code must be manually generated and only used once
      };

      const data = await SosService.getTokensWithCode(envs);
      if (JSON.parse(data).hasOwnProperty('access_token')) {
        SosRepository.updateTokens(data);
        console.log('Updated tokens', data);
      } else {
        console.log('Cannot update tokens:', data);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

CronSosAuthService.running = false;

module.exports = CronSosAuthService;
