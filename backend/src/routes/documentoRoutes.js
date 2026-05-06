const express = require('express');
const router = express.Router();
const { getDocumentosPorCategoria } = require('../controllers/documentosController');

// Aquí es donde definimos el "camino" /api/documentos/:categoria
router.get('/:categoria', getDocumentosPorCategoria);

module.exports = router;