const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');

dotenv.config({ path: require('path').join(__dirname, '../.env') });

const lightingSubs = [
  { name: 'LED Fixtures', slug: 'led-fixtures', subSubCategories: [{ name: 'Indoor Panels', slug: 'indoor-panels' }, { name: 'Outdoor Flood', slug: 'outdoor-flood' }] },
  { name: 'Smart Bulbs', slug: 'smart-bulbs', subSubCategories: [{ name: 'Wi-Fi Bulbs', slug: 'wifi-bulbs' }, { name: 'Zigbee Bulbs', slug: 'zigbee-bulbs' }] },
  { name: 'Lighting Controllers', slug: 'lighting-controllers', subSubCategories: [{ name: 'Dimmers', slug: 'dimmers' }, { name: 'Schedulers', slug: 'schedulers' }] },
  { name: 'Daylight Sensors', slug: 'daylight-sensors', subSubCategories: [{ name: 'Lux Meters', slug: 'lux-meters' }] },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await Category.findOneAndUpdate(
      { slug: 'smart-lighting' },
      { $set: { subCategories: lightingSubs } },
      { new: true }
    );
    if (!result) {
      console.log('Category smart-lighting not found.');
    } else {
      console.log(`Updated "${result.name}" with ${result.subCategories.length} sub-categories.`);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
