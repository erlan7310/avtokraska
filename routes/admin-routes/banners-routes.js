const express = require('express');
const router = express.Router();
const BannersController = require('../../controllers/bannersController');

router.get('/', BannersController.getAllBanners);

module.exports = router;