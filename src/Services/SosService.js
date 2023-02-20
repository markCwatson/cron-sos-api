const https = require('https');
const querystring = require('querystring');

class SosService {
  static sendHttpRequest(options, requestBody, onResult) {
    let req = https.request(options, (res) => {
      let output = '';

      res.on('data', (chunk) => {
        output += chunk;
      });

      res.on('end', () => {
        onResult(output);
      });
    });

    req.on('error', (err) => {
      console.error('error: ' + err.message);
    });

    if (requestBody) {
      req.write(querystring.stringify(requestBody));
    }

    req.end();
  };

  // untested
  static getAccessToken(id, secret, code, callback) {
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
      redirect_uri: 'https://www.google.com'
    };

    SosService.sendHttpRequest(
      options,
      requestBody,
      (data) => {
        callback(data);
      }
    );
  }

  static refresh(refreshToken, callback) {
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

    SosService.sendHttpRequest(
      options,
      requestBody,
      (data) => {
        callback(data);
      }
    );
  }

  static getShippingList(token, callback) {
    console.log('getShippingList', token);
    const options = {
      host: 'api.sosinventory.com',
      path: '/api/v2/shipment',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    SosService.sendHttpRequest(
      options,
      null,
      (data) => {
        callback(data);
      }
    );
  }
}

module.exports = SosService;
