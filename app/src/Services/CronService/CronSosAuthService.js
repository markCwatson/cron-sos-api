const SosService = require('../SosService');
const SosRepository = require('../../Repository/SosRepository');

class CronSosAuthService {
  static async execute(options) {
    console.log('Getting tokens ...');

    const envs = {
      id: process.env.SOS_APP_CLIENT_ID,
      secret: process.env.SOS_APP_CLIENT_SECRET,
      code: process.env.SOS_CODE // code must be manually generated and only used once
    };

    try {
      SosService.getAccessToken(envs, (data) => {
        SosRepository.updateTokens(data);
        console.log('Updated tokens', data);
      });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = CronSosAuthService;
