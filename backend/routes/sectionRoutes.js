const express = require('express');
const router = express.Router();
const { getSection, updateSection, deleteSection } = require('../controllers/sectionController');
const { listCategories, getSubCategoriesLegacy, getThirdLevelLegacy } = require('../controllers/categoryController');
const { listProducts, searchListLegacy } = require('../controllers/productController');
const sec3Defaults = require('../constants/sec3Defaults');
const sec4Defaults = require('../constants/sec4Defaults');
const sec5Defaults = require('../constants/sec5Defaults');
const sec6Defaults = require('../constants/sec6Defaults');
const sec7Defaults = require('../constants/sec7Defaults');
const sec8Defaults = require('../constants/sec8Defaults');

// Defaults must be registered BEFORE /sec/:num
router.get('/sec/3/defaults', (req, res) => res.json(sec3Defaults));
router.get('/sec/4/defaults', (req, res) => res.json(sec4Defaults));
router.get('/sec/5/defaults', (req, res) => res.json(sec5Defaults));
router.get('/sec/6/defaults', (req, res) => res.json(sec6Defaults));
router.get('/sec/7/defaults', (req, res) => res.json(sec7Defaults));
router.get('/sec/8/defaults', (req, res) => res.json(sec8Defaults));

router.get('/sec/:num', (req, res, next) => {
  req.params.page = 'global';
  req.params.sectionName = `sec_${req.params.num}`;
  next();
}, getSection);

router.put('/sec/:num', (req, res, next) => {
  req.params.page = 'global';
  req.params.sectionName = `sec_${req.params.num}`;
  next();
}, updateSection);

router.delete('/sec/:num', (req, res, next) => {
  req.params.page = 'global';
  req.params.sectionName = `sec_${req.params.num}`;
  next();
}, deleteSection);

// PORTAL ALIASES (legacy frontend paths)
router.get('/all_products/:a/:b/:c', (req, res, next) => {
  req.query.legacy = '1';
  listProducts(req, res, next);
});
router.get('/search_list/:a/:b/:c', (req, res, next) => {
  searchListLegacy(req, res, next);
});
router.get('/product/categories', (req, res, next) => {
  req.query.legacy = '1';
  listCategories(req, res, next);
});
router.get('/product/sub_categories/:id', getSubCategoriesLegacy);
router.get('/product/third_level_cat/:catId/:subId', getThirdLevelLegacy);

module.exports = router;
