const express = require('express');
const router = express.Router();
const { getAnexos, deleteAnexo, createAnexo, updateAnexo } = require('../controllers/anexoController');
const { authenticateToken } = require('../middlewares/authMiddleware');


router.get('/', getAnexos);
router.delete('/:id', authenticateToken, deleteAnexo);
router.post('/', authenticateToken, createAnexo);
router.put('/:id', authenticateToken, updateAnexo);

module.exports = router;