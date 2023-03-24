const querystring = require("querystring");
const axios = require("axios");
const SosRepository = require("../Repository/SosRepository");

class SosService {
  static async convertCode(code) {
    const data = await SosService.oauthHandler({
      grant_type: "authorization_code",
      client_id: process.env.SOS_APP_CLIENT_ID,
      client_secret: process.env.SOS_APP_CLIENT_SECRET,
      code,
      redirect_uri: "https://www.google.com/", // must be same url used when code was obtained
    });

    if (!SosService.validateKeys(data)) {
      return false;
    }

    const result = await SosRepository.create(data);
    if (result) {
      return true;
    }
    return false;
  }

  static async refreshTokens() {
    const token = await SosRepository.select("refresh_token");
    if (!token) {
      return false;
    }

    const data = await SosService.oauthHandler({
      grant_type: "refresh_token",
      refresh_token: token,
    });

    if (!SosService.validateKeys(data)) {
      return false;
    }

    const result = await SosRepository.update(data);
    if (result) {
      return true;
    }
    return false;
  }

  static async shipmentQuery() {
    const token = await SosRepository.select("access_token");
    const { data } = await SosService.queryHandler("api/v2/shipment", token);
    return data;
  }

  /** @private */
  static async queryHandler(path, token) {
    const options = {
      url: `https://api.sosinventory.com/${path}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const data = await axios(options);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /** @private */
  static async oauthHandler(requestBody) {
    const options = {
      url: "https://api.sosinventory.com/oauth2/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: querystring.stringify(requestBody),
    };

    try {
      const { data } = await axios(options);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /** @private */
  static validateKeys(parsedData) {
    const requiredKeys = [
      "access_token",
      "token_type",
      "expires_in",
      "refresh_token",
    ];
    return requiredKeys.every((key) =>
      Object.prototype.hasOwnProperty.call(parsedData, key)
    );
  }
}

module.exports = SosService;
