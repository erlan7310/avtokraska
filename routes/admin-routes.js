const express = require('express');
const router = express.Router();
const productsRoutes = require('./products-routes');
const newsRoutes = require('./news-routes');

router.get('/', productsRoutes);
router.use('/news', newsRoutes);

module.exports = router;