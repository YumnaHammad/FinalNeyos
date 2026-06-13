const express = require('express');
const router = express.Router();
const {
  register,
  login,
  listAll,
  create,
  update,
  remove,
} = require('../controllers/registrationController');

router.post('/register', register);
router.post('/login', login);
router.get('/', listAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
