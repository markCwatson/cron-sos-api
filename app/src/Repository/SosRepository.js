const fs = require('fs');

class SosRepository {
  static getToken(type) {
    let access_token = null;
    try {
      const data = fs.readFileSync(`./tokens/${type}.txt`, 'utf8');
      access_token = data.replace(/[\r\n]+/g, '');
    } catch (err) {
      console.error(err);
    } finally {
      return access_token;
    }
  }

  static getAccessToken() {
    return SosRepository.getToken('access_token');
  }

  static getRefreshToken() {
    return SosRepository.getToken('refresh_token');
  }

  static updateTokens(data) {
    if (!data) {
      console.error('No data to update!');
      return;
    }

    const parsed_data = JSON.parse(data);
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
  }
}

module.exports = SosRepository;
