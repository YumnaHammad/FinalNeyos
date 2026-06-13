const mongoose = require('mongoose');

const registeredUserSchema = new mongoose.Schema(
  {
    type: { type: String, default: '' },
    country: { type: String, default: '' },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    companyName: { type: String, default: '' },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    verificationCode: { type: String, default: '' },
    partnerPortal: { type: String, enum: ['yes', 'no', ''], default: '' },
    subscribe: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RegisteredUser', registeredUserSchema);
