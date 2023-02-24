const https = require('https');
const querystring = require('querystring');

class SosService {
  static sendHttpRequest(options, requestBody = null) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let output = '';

        res.on('data', (chunk) => {
          output += chunk;
        });

        res.on('end', () => {
          resolve(output);
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      if (requestBody) {
        req.write(querystring.stringify(requestBody));
      }

      req.end();
    });
  }

  static async queryHandler({ path, token }) {
    const options = {
      host: 'api.sosinventory.com',
      path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    // Prevent race conditions on SOS access
    await SosService.semaphore.acquire();

    try {
      const data = await SosService.sendHttpRequest(options);
      return data;
    } catch (err) {
      throw new Error(`Failed to handle query: ${err.message}`);
    } finally {
      SosService.semaphore.release();
    }
  }

  static async oauthHandler(requestBody) {
    const options = {
      host: 'api.sosinventory.com',
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    // Prevent race conditions on SOS access
    await SosService.semaphore.acquire();

    try {
      const data = await SosService.sendHttpRequest(options, requestBody);
      return data;
    } catch (err) {
      throw new Error(err);
    } finally {
      SosService.semaphore.release();
    }
  }

  static async getTokensWithCode({ id, secret, code }) {
    const data = await SosService.oauthHandler({
      grant_type: 'authorization_code',
      client_id: id,
      client_secret: secret,
      code: code,
      redirect_uri: 'https://www.google.com/'
    });
    return data;
  }

  static async refresh(refreshToken) {
    const data = await SosService.oauthHandler({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });
    return data;
  }

  static async shipmentQuery(token) {
    const data = await SosService.queryHandler({
      path: '/api/v2/shipment',
      token
    });
    return data;
  }

  static async invoiceQuery(token) {
    const data = await SosService.queryHandler({
      path: '/api/v2/invoice',
      token
    });
    return data;
  }

  static async customerQuery(token) {
    const data = await SosService.queryHandler({
      path: '/api/v2/customer',
      token
    });
    return data;
  }

  static async serializedInventoryQuery(token) {
    const data = await SosService.queryHandler({
      path: '/api/v2/serial',
      token
    });
    return data;
  }
}

SosService.Semaphore = class Semaphore {
  constructor(count) {
    this.count = count;
    this.waiting = [];
  }

  async acquire() {
    if (this.count > 0) {
      this.count--;
    } else {
      await new Promise((resolve) => {
        this.waiting.push(resolve);
      });
      return this.acquire();
    }
  }

  release() {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      resolve();
    } else {
      this.count++;
    }
  }
};

// A global shared counting semaphore resource
SosService.semaphore = new SosService.Semaphore(1);

module.exports = SosService;
