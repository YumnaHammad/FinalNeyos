const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Section = require('../models/Section');
const sec1Defaults = require('../constants/sec1Defaults');
const sec3Defaults = require('../constants/sec3Defaults');
const sec4Defaults = require('../constants/sec4Defaults');
const sec5Defaults = require('../constants/sec5Defaults');
const sec6Defaults = require('../constants/sec6Defaults');
const sec7Defaults = require('../constants/sec7Defaults');
const sec8Defaults = require('../constants/sec8Defaults');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Section numbers match admin sidebar routes (/section/N → sec_N)
const dummySections = [
  {
    page: 'global',
    sectionName: 'sec_1',
    content: sec1Defaults,
  },
  { page: 'global', sectionName: 'sec_3', content: sec3Defaults },
  { page: 'global', sectionName: 'sec_4', content: sec4Defaults },
  { page: 'global', sectionName: 'sec_5', content: sec5Defaults },
  { page: 'global', sectionName: 'sec_6', content: sec6Defaults },
  {
    page: 'global',
    sectionName: 'sec_7',
    content: [{ kind: 'capabilities', ...sec7Defaults }],
  },
  { page: 'global', sectionName: 'sec_8', content: sec8Defaults },
];

const seedAllSections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    for (const section of dummySections) {
      await Section.findOneAndUpdate(
        { page: 'global', sectionName: section.sectionName },
        section,
        { upsert: true, new: true }
      );
      console.log(`Seeded global - ${section.sectionName}`);
    }

    console.log('All sections updated (sec numbers match sidebar).');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedAllSections();
