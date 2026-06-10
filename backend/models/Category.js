const mongoose = require('mongoose');

const subSubCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { _id: true }
);

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, default: '' },
    subSubCategories: { type: [subSubCategorySchema], default: [] },
  },
  { _id: true }
);

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    subCategories: { type: [subCategorySchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
