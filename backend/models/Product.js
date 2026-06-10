const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    model: { type: String, default: '' },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    categorySlug: { type: String, default: '' },
    subCategorySlug: { type: String, default: '' },
    subSubCategorySlug: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isNew: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

module.exports = mongoose.model('Product', productSchema);
