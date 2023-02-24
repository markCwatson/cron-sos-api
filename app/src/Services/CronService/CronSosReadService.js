const SosService = require('../SosService');
const SosRepository = require('../../Repository/SosRepository');

class CronSosReadService {
  static async execute(options) {
    console.log('Reading from SOS ...');
    try {
      const access_token = await SosRepository.getAccessToken();
      // \todo check access_token
      const data = await SosService.shipmentQuery(access_token);
      if (data) {
        CronSosReadService.displaySosData(data);
        return;
      }
      console.log('No shipment data');
    } catch (err) {
      console.error(err);
    }
  }

  static displaySosData(data) {
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
  }
}

module.exports = CronSosReadService;
