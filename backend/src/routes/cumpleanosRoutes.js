const express = require('express');
const { getCumpleanos } = require('../controllers/cumpleanosController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/cumpleanos', authenticateToken, getCumpleanos);

module.exports = router;