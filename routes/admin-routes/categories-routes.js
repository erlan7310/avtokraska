const express = require('express');
const router = express.Router();
const CategoriesController = require('../../controllers/categoriesController');

router.get('/', CategoriesController.getAllCategories);
router.get('/add', CategoriesController.showCreateForm);
router.post('/add', CategoriesController.createCategory);
router.get('/edit/:id', CategoriesController.showEditForm);
router.post('/edit/:id', CategoriesController.updateCategory);
router.get('/delete/:id', CategoriesController.deleteCategory);

module.exports = router;