const mongoose = require('mongoose');

const filterItemSchema = new mongoose.Schema(
  {
    item: { type: String, required: true, trim: true },
    slug: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: true }
);

const filterConfigSchema = new mongoose.Schema(
  {
    attribute: { type: String, required: true, trim: true },
    slug: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
    categorySlug: { type: String, default: '' },
    subCategorySlug: { type: String, default: '' },
    subSubCategorySlug: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    items: { type: [filterItemSchema], default: [] },
  },
  { timestamps: true }
);

filterConfigSchema.index(
  { slug: 1, categorySlug: 1, subCategorySlug: 1, subSubCategorySlug: 1 },
  { unique: true }
);

module.exports = mongoose.model('FilterConfig', filterConfigSchema);
