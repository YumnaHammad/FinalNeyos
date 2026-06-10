const express = require('express');
const router = express.Router();
const {
  listCategories,
  getCategoryBySlug,
  getSubCategoriesLegacy,
  getThirdLevelLegacy,
  createCategory,
  updateCategory,
  deleteCategory,
  loadDefaults,
  seedDefaults,
} = require('../controllers/categoryController');

router.get('/defaults', loadDefaults);
router.post('/seed', seedDefaults);
router.get('/sub_categories/:id', getSubCategoriesLegacy);
router.get('/third_level/:catId/:subId', getThirdLevelLegacy);
router.get('/', listCategories);
router.get('/:slug', getCategoryBySlug);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
