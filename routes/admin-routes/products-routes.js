const express = require('express');
const router = express.Router();
const ProductsController = require('../../controllers/productController');
const upload = require('../../multerConfig'); 

router.get('/', ProductsController.getAllProducts);
router.get('/add', ProductsController.showCreateForm);
router.post('/add', upload.single('photo'), ProductsController.createProduct);
router.get('/edit/:id', ProductsController.showEditForm);
router.post('/edit/:id', upload.single('photo'), ProductsController.updateProduct);
router.get('/delete/:id', ProductsController.deleteProduct);

module.exports = router;