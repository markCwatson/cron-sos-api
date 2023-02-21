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

    SosService.shipmentQuery(access_token, (data) => {
      const parsed_data = JSON.parse(data);
      parsed_data.data.forEach((so) => {
        console.log('\nCustomer ', so.customer.name);
        console.log('Billing company ', so.billing.company);
        console.log('Billing company email ', so.billing.email);
        console.log('Ship to company ', so.shipping.company);
        console.log('Ship to email ', so.shipping.email);

        so.lines.forEach((line) => {
          if (line.serials.length > 0) {
            line.serials.forEach((serial) => {
              console.log('Lines S/N ', serial.name);
            });
          }
        });
      })
    });
  }
}

module.exports = CronSosReadService;
