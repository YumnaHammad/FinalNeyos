const mongoose = require('mongoose');

const salesInquirySchema = new mongoose.Schema(
  {
    userType: { type: String, enum: ['business', 'personal'], default: 'business' },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '' },
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, default: '' },
    message: { type: String, required: true },
    companyName: { type: String, default: '' },
    businessRole: { type: String, default: '' },
    industry: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    subscribe: { type: Boolean, default: false },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    productSlug: { type: String, default: '' },
    productModel: { type: String, default: '' },
    productTitle: { type: String, default: '' },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', default: null },
    status: { type: String, enum: ['new', 'read'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SalesInquiry', salesInquirySchema);
