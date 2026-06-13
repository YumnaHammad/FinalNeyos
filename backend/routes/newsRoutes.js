const express = require('express');
const router = express.Router();
const {
  listNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
  seedDefaults,
  getMeta,
  listYears,
} = require('../controllers/newsController');

router.post('/seed', seedDefaults);
router.get('/meta', getMeta);
router.get('/years', listYears);

router.get('/', listNews);
router.get('/:id', getNews);
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

module.exports = router;
