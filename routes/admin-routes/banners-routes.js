const express = require('express');
const router = express.Router();
const BannersController = require('../../controllers/bannersController');
const upload = require('../../multerConfig'); 

router.get('/', BannersController.getAllBanners);
router.get('/edit/:id', BannersController.showEditForm);
router.post('/edit/:id', upload.single('photo'), BannersController.updateBanner);

module.exports = router;