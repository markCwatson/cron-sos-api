module.exports = (shippingOrders) => {
  shippingOrders.forEach((so) => {
    console.log("\nCustomer ", so.customer.name);
    console.log("Billing company ", so.billing.company);
    console.log("Billing company email ", so.billing.email);
    console.log("Ship to company ", so.shipping.company);
    console.log("Ship to email ", so.shipping.email);

    so.lines.forEach((line) => {
      if (line.serials.length > 0) {
        line.serials.forEach((serial) => {
          console.log("Lines S/N ", serial.name);
        });
      }
    });
  });
};
