const express = require('express');
const router = express.Router();
const {
  listProducts,
  getProduct,
  searchListLegacy,
  createProduct,
  updateProduct,
  deleteProduct,
  seedDefaults,
  updateSpecifications,
  downloadDataSheet,
} = require('../controllers/productController');

router.post('/seed', seedDefaults);
router.get('/search_list', searchListLegacy);
router.get('/', listProducts);
router.put('/:id/specifications', updateSpecifications);
router.get('/:slug/datasheet', downloadDataSheet);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
