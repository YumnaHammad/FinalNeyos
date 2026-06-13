const express = require('express');
const router = express.Router();
const {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  seedDefaults,
  getMeta,
} = require('../controllers/eventController');

router.post('/seed', seedDefaults);
router.get('/meta', getMeta);

router.get('/', listEvents);
router.get('/:id', getEvent);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
