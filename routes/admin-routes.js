const express = require('express');
const router = express.Router();
const productsRoutes = require('./admin-routes/products-routes');
const categoriesRoutes = require('./admin-routes/categories-routes');
const newsRoutes = require('./admin-routes/news-routes');
const userRoutes = require('./admin-routes/user-routes');
const bannerRoutes = require('./admin-routes/banners-routes');
const upload = require('../multerConfig');

router.get('/', (req, res) => {
  res.redirect('/admin/products');
});
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/news', newsRoutes);
router.use('/users', userRoutes);
router.use('/banners', bannerRoutes);
router.post('/upload-media', upload.single('file'), (req, res) => {
  let photoUrl = '';
  if(req.file){
    photoUrl = `/uploads/${req.file.filename}`;
  }
  res.json({ location: photoUrl });
})

module.exports = router;