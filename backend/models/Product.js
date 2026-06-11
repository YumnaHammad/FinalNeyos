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
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
    filterTags: { type: [String], default: [] },
    images: { type: [String], default: [] },
    keyFeatures: { type: [String], default: [] },
    featureIcons: { type: [String], default: [] },
    variants: { type: [String], default: [] },
    isHot: { type: Boolean, default: false },
    dataSheetUrl: { type: String, default: '' },
    resources: {
      documents: [
        {
          title: { type: String, default: '' },
          url: { type: String, default: '' },
          type: { type: String, default: 'PDF' },
        },
      ],
      firmware: [
        {
          title: { type: String, default: '' },
          url: { type: String, default: '' },
          date: { type: String, default: '' },
        },
      ],
    },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

module.exports = mongoose.model('Product', productSchema);
