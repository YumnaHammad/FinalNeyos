const express = require('express');
const router = express.Router();
const {
  create,
  listAll,
  getStats,
  updateStatus,
  remove,
} = require('../controllers/salesInquiryController');

router.post('/', create);
router.get('/stats', getStats);
router.get('/', listAll);
router.patch('/:id', updateStatus);
router.delete('/:id', remove);

module.exports = router;
