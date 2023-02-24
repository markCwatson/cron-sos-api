const https = require('https');
const querystring = require('querystring');

class SosService {
  static sendHttpRequest(options, requestBody = null) {
    return new Promise((resolve, reject) => {
      let req = https.request(options, (res) => {
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

  static async getTokensWithCode({ id, secret, code }) {
    const options = {
      host: 'api.sosinventory.com',
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const requestBody = {
      grant_type: 'authorization_code',
      client_id: id,
      client_secret: secret,
      code: code,
      redirect_uri: 'https://www.google.com/'
    };

    try {
      const data = await SosService.sendHttpRequest(options, requestBody);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async refresh(refreshToken) {
    const options = {
      host: 'api.sosinventory.com',
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const requestBody = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };

    try {
      const data = await SosService.sendHttpRequest(options, requestBody);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async shipmentQuery(token) {
    const options = {
      host: 'api.sosinventory.com',
      path: '/api/v2/shipment',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const data = await SosService.sendHttpRequest(options);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = SosService;
