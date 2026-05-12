const express = require('express');
const router = express.Router();
const { getAnexos, deleteAnexo, createAnexo, updateAnexo } = require('../controllers/anexoController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// RUTA PÚBLICA: Todos pueden ver los anexos
router.get('/', getAnexos);

// RUTA PROTEGIDA: Solo usuarios con token válido pueden borrar
router.delete('/:id', authenticateToken, deleteAnexo);
router.post('/', authenticateToken, createAnexo);
router.put('/:id', authenticateToken, updateAnexo);

module.exports = router;