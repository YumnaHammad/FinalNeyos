const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Category = require('../models/Category');
const Product = require('../models/Product');
const categoryDefaults = require('../constants/categoryDefaults');
const productDefaults = require('../constants/productDefaults');

dotenv.config({ path: path.join(__dirname, '../.env') });

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    for (const item of categoryDefaults) {
      await Category.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, new: true });
      console.log(`Category: ${item.name}`);
    }

    for (const item of productDefaults) {
      await Product.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, new: true });
      console.log(`Product: ${item.title}`);
    }

    console.log('Catalogue seed complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
})();
