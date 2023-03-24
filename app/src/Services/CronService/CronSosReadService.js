const SosService = require("../SosService");
const displaySosData = require("../../../utils/displayData");

class CronSosReadService {
  static async execute(options) {
    console.log("Reading from SOS ...");
    try {
      const shippingOrders = await SosService.shipmentQuery();
      if (shippingOrders.data) {
        displaySosData(shippingOrders.data);
        return;
      }
      console.log("No shipment data");
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = CronSosReadService;
