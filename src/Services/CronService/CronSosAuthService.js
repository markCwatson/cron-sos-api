const SosService = require('../SosService');

const fs = require('fs');

class CronSosAuthService {
  static async execute(options) {
    console.log('Running once ...');
    let code = '';

    try {
      const data = fs.readFileSync('./tokens/code.txt', 'utf8');
      code = data.replace(/[\r\n]+/g, '');
    } catch (err) {
      console.error(err);
      return;
    }

    const envs = {
      id: process.env.SOS_APP_CLIENT_ID,
      secret: process.env.SOS_APP_CLIENT_SECRET
    };

    SosService.getAccessToken(envs.id, envs.secret, code, (data) => {
      const parsed_data = JSON.parse(data);
      console.log(parsed_data); // keep getting return message { error: 'invalid_grant' }
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

module.exports = CronSosAuthService;
