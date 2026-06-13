const express = require('express');
const router = express.Router();
const {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  seedDefaults,
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/blogController');

router.post('/seed', seedDefaults);

router.get('/categories/list', listCategories);
router.get('/category', listCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

router.get('/', listBlogs);
router.get('/:id', getBlog);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
