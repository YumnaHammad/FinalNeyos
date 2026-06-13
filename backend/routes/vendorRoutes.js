const express = require('express');
const router = express.Router();
const {
  login,
  getProfile,
  updateProfile,
  listVendorProducts,
  createVendorProduct,
  updateVendorProduct,
  deleteVendorProduct,
  getDashboardStats,
  listAll,
  createVendor,
  updateVendor,
  deleteVendor,
  seedDefault,
  requireVendor,
} = require('../controllers/vendorController');
const {
  listForVendor,
  getVendorStats,
  updateVendorStatus,
} = require('../controllers/salesInquiryController');
const { listAll: listRegistrations } = require('../controllers/registrationController');

// Public
router.post('/login', login);
router.post('/seed', seedDefault);

// Vendor portal (requires X-Vendor-Id header)
router.get('/me', requireVendor, getProfile);
router.put('/me', requireVendor, updateProfile);
router.get('/dashboard', requireVendor, getDashboardStats);
router.get('/inquiries/stats', requireVendor, getVendorStats);
router.get('/inquiries', requireVendor, listForVendor);
router.patch('/inquiries/:id', requireVendor, updateVendorStatus);
router.get('/registrations', requireVendor, listRegistrations);
router.get('/products', requireVendor, listVendorProducts);
router.post('/products', requireVendor, createVendorProduct);
router.put('/products/:id', requireVendor, updateVendorProduct);
router.delete('/products/:id', requireVendor, deleteVendorProduct);

// Admin vendor management
router.get('/', listAll);
router.post('/', createVendor);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

module.exports = router;
