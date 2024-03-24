const express = require('express');
const router = express.Router();
const ProductsController = require('../../controllers/productController');

router.get('/', ProductsController.getProducts);

module.exports = router;