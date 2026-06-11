const express = require('express');
const router = express.Router();
const {
  listFilters,
  getFilter,
  createFilter,
  updateFilter,
  deleteFilter,
  seedDefaults,
} = require('../controllers/filterConfigController');

router.post('/seed', seedDefaults);
router.get('/', listFilters);
router.get('/:id', getFilter);
router.post('/', createFilter);
router.put('/:id', updateFilter);
router.delete('/:id', deleteFilter);

module.exports = router;
