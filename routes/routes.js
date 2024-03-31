const express = require('express');
const router = express.Router();
const BannersController = require('../controllers/bannersController');
const ProductsController = require('../controllers/productController');
const NewsController = require('../controllers/newsController');
const ContactsController = require('../controllers/contactsController');

router.get('/', BannersController.front.getBanners);
router.get('/catalog', ProductsController.front.getProducts);
router.get('/news', NewsController.front.getNews);
router.get('/contacts', ContactsController.front.getContacts);

module.exports = router;