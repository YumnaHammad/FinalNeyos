const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, indexesSynced: false };
}

async function syncFilterIndexes() {
  if (cached.indexesSynced) return;
  const FilterConfig = require('../models/FilterConfig');
  try {
    await FilterConfig.collection.dropIndex('attribute_1');
  } catch {
    /* legacy index may not exist */
  }
  await FilterConfig.syncIndexes();
  cached.indexesSynced = true;
}

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nexyos';

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri)
      .then(async (mongooseInstance) => {
        console.log('Connected to MongoDB Successfully');
        await syncFilterIndexes();
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

mongoose.connection.on('error', (err) => {
  console.error('MongoDB runtime error:', err.message);
});

module.exports = connectDB;
