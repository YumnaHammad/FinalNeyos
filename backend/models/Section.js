const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    page: { type: String, required: true },
    sectionName: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed, default: [] },
  },
  { timestamps: true }
);

sectionSchema.index({ page: 1, sectionName: 1 }, { unique: true });

module.exports = mongoose.model('Section', sectionSchema);
