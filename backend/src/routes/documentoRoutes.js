const express = require('express');
const router = express.Router();
const { getDocumentosPorCategoria } = require('../controllers/documentosController');


router.get('/:categoria', getDocumentosPorCategoria);

module.exports = router;