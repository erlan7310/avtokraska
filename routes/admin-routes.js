const express = require('express');
const router = express.Router();
const productsRoutes = require('./admin-routes/products-routes');
const categoriesRoutes = require('./admin-routes/categories-routes');
const newsRoutes = require('./admin-routes/news-routes');
const userRoutes = require('./admin-routes/user-routes');
const bannerRoutes = require('./admin-routes/banners-routes');

router.get('/', (req, res) => {
  res.redirect('/admin/products');
});
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/news', newsRoutes);
router.use('/users', userRoutes);
router.use('/banners', bannerRoutes);

module.exports = router;