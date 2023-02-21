const SosService = require('../SosService');

const fs = require('fs');

class CronSosRenewService {
  static async execute(options) {
    console.log('Renewing SOS tokens...');
    let refresh_token = '';

    try {
      const data = fs.readFileSync('./tokens/refresh_token.txt', 'utf8');
      refresh_token = data.replace(/[\r\n]+/g, '');
    } catch (err) {
      console.error(err);
      return;
    }

    SosService.refresh(refresh_token, (data) => {
      const parsed_data = JSON.parse(data);
      const token_types = [ 'access_token', 'refresh_token' ];

      token_types.forEach((token_type) => {
        if (parsed_data[token_type]) {
          console.log(`writng ${parsed_data[token_type]} to tokens/${token_type}.txt`);
          fs.writeFile(`./tokens/${token_type}.txt`, parsed_data[token_type], (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      })
    });
  }
}

module.exports = CronSosRenewService;
