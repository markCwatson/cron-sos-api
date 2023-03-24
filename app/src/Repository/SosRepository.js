const Repository = require('../Repository');

class SosRepository {
  // Create or replace a document in the SOS repository
  // There can only ever be one document.
  // Returns document if successful, null if not
  static async create(data) {
    try {
      const mongo = await Repository.getInstance();
      const { value } = await mongo.db.collection('sosTokens').findOneAndReplace(
        { _id: { $exists: true } },
        {
          ...data,
          updatedAt: new Date(Date.now()),
        },
        {
          upsert: true,
          returnDocument: 'after',
        },
      );

      return value;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Select an access token defined by the `type` parameter
  // Returns token if successful, undefined if invalid type, null if document does not exist
  static async select(type) {
    try {
      const mongo = await Repository.getInstance();
      const document = await mongo.db
        .collection('sosTokens')
        .findOne({ _id: { $exists: true } });
      return document ? document[type] : null;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Replaces the SOS token document with `data`
  // Returns updated document if successful, null if not
  static async update(data) {
    try {
      const mongo = await Repository.getInstance();
      const { value } = await mongo.db.collection('sosTokens').findOneAndReplace(
        { _id: { $exists: true } },
        {
          ...data,
          updatedAt: new Date(Date.now()),
        },
        {
          upsert: false,
          returnDocument: 'after',
        },
      );
      return value;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Should return 0 when no document was created, then always 1 after
  static async getCount() {
    try {
      const mongo = await Repository.getInstance();
      return mongo.db
        .collection('sosTokens')
        .countDocuments();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = SosRepository;
