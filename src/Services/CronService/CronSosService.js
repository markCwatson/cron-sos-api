const SosService = require('../SosService');

const fs = require('fs');

class CronSosService {
  static async execute() {
    console.log('running...');
    let refresh_token = '';
    let access_token = '';

    try {
      const data = fs.readFileSync('./refresh_token.txt', 'utf8');
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
          console.log(`writng ${parsed_data[token_type]} to ${token_type}.txt`);
          fs.writeFile(`./${token_type}.txt`, parsed_data[token_type], (err) => {
            if (err) {
              console.error(err);
            }
          });

        }
      })
      access_token = parsed_data['access_token'];
      console.log('access_token', access_token)

      SosService.getShippingList(access_token, (data) => {
        const parsed_data = JSON.parse(data);
        parsed_data.data.forEach((so) => {
          console.log(so.customer);
        })
      });
    });

  }
}

module.exports = CronSosService;
