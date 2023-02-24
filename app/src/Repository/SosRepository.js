const Repository = require('../Repository');

class SosRepository {
  static async getToken(type) {
    try {
      const mongo = await Repository.getInstance();
      const token_doc = await mongo.db.collection('tokens').findOne({ type });
      if (!token_doc) {
        throw new Error(`No ${type} documents!`);
      }
      return token_doc.token;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateToken(type, data) {
    try {
      const mongo = await Repository.getInstance();
      const update = await mongo.db.collection('tokens').updateOne(
        { type },
        {
          $set: {
            token: data,
            updatedAt: new Date(Date.now()),
          },
        },
        { upsert: true },
      );
      return update;
    } catch (err) {
      throw new Error(err);
    }
  }

  static updateTokens(data) {
    if (!data) {
      throw new Error('No data to update!');
    }

    const parsed_data = JSON.parse(data);
    const token_types = [ 'access_token', 'refresh_token' ];
    token_types.forEach(async (token_type) => {
      if (parsed_data[token_type]) {
        console.log(`writing "${token_type}: ${parsed_data[token_type]}" to document`);
        await SosRepository.updateToken(token_type, parsed_data[token_type]);
      }
    })
  }

  static getAccessToken() {
    return SosRepository.getToken('access_token');
  }

  static getRefreshToken() {
    return SosRepository.getToken('refresh_token');
  }
}

module.exports = SosRepository;
