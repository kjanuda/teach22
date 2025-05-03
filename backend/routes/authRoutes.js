const express = require('express');
const router = express.Router();
const { register, resetPassword,loginUser } = require('../controllers/authController');

router.post('/register', register);
router.post('/reset-password', resetPassword);
router.post('/login', loginUser);
module.exports = router;
