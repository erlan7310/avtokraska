const express = require('express');
const router = express.Router();
const NewsController = require('../../controllers/newsController');
const upload = require('../../multerConfig');

router.get('/', NewsController.getAllNews);
router.get('/add', NewsController.showCreateForm);
router.post('/add', upload.single('photo'), NewsController.createNews);
router.get('/edit/:id', NewsController.showEditForm);
router.post('/edit/:id', upload.single('photo'), NewsController.updateNews);
router.get('/delete/:id', NewsController.deleteNews);

module.exports = router;