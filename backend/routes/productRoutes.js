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
} = require('../controllers/productController');

router.post('/seed', seedDefaults);
router.get('/search_list', searchListLegacy);
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
