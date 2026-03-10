const express = require('express');
const { register, adminLogin } = require('../controllers/authController');
const { registrationLimiter, adminLoginLimiter } = require('../middleware/rateLimiter');

const router = express.Router();


router.post('/register', registrationLimiter, register);
router.post('/admin-login', adminLoginLimiter, adminLogin);

module.exports = router;
