const express = require('express');
const router = express.Router();
const FrontController = require('../controllers/frontController');

router.get('/', FrontController.getMain);
router.get('/catalog', FrontController.getProducts);
router.get('/catalog/:id', FrontController.getProduct);
router.get('/news', FrontController.getNews);
router.get('/news/:id', FrontController.getNewsById);
router.get('/contacts', FrontController.getContacts);
router.get('/search-products', FrontController.searchProducts);

module.exports = router;