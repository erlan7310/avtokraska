const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');

router.get('/', UserController.getAllUsers);
router.get('/add', UserController.showCreateForm);
router.post('/add', UserController.createUser);
router.get('/edit/:id', UserController.showEditForm);
router.post('/edit/:id', UserController.updateUser);
router.get('/delete/:id', UserController.deleteUser);
router.post('/changePassword', UserController.changePassword);

module.exports = router;