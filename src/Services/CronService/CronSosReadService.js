const SosService = require('../SosService');

const fs = require('fs');

class CronSosReadService {
  static async execute(options) {
    console.log('Reading from SOS ...');
    let access_token = '';

    try {
      const data = fs.readFileSync('./tokens/access_token.txt', 'utf8');
      access_token = data.replace(/[\r\n]+/g, '');
    } catch (err) {
      console.error(err);
      return;
    }

    SosService.getShippingList(access_token, (data) => {
      const parsed_data = JSON.parse(data);
      parsed_data.data.forEach((so) => {
        console.log(so.customer);
      })
    });
  }
}

module.exports = CronSosReadService;
