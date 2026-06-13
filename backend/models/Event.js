const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    dateDisplay: { type: String, default: '' },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String, default: '' },
    booth: { type: String, default: '' },
    category: { type: String, default: 'IoT', trim: true },
    registrationUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: ['register', 'coming_soon', 'ended'],
      default: 'register',
    },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
