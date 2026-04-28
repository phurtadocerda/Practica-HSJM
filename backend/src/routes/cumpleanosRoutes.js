const express = require('express');
const { getCumpleanos } = require('../controllers/cumpleanosController');

const router = express.Router();

router.get('/cumpleanos', getCumpleanos);

module.exports = router;