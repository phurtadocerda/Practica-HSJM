const express = require('express');
const { login, register, getAreas } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/areas', authenticateToken, getAreas);

module.exports = router;