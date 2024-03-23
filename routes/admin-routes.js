const express = require('express');
const router = express.Router();
const productsRoutes = require('./admin-routes/products-routes');
const newsRoutes = require('./admin-routes/news-routes');
const userRoutes = require('./admin-routes/user-routes');
const AuthController = require('../controllers/authController');

router.get('/', productsRoutes);
router.use('/news', newsRoutes);
router.use('/users', userRoutes);

module.exports = router;