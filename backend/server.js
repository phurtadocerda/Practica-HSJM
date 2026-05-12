require('dotenv').config({ path: './backend/.env' }); // Carga las variables de entorno desde el archivo .env en el directorio backend 

const express = require('express');
const cors = require('cors');

// Rutas
const authRoutes = require('./src/routes/authRoutes');
const cumpleanosRoutes = require('./src/routes/cumpleanosRoutes');
const documentoRoutes = require('./src/routes/documentoRoutes');
const anexoRoutes = require('./src/routes/anexoRoutes');
const path = require('path');

// Middleware de autenticación
const { authenticateToken } = require('./src/middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middlewares de seguridad y parseo (Globales)
app.use(cors()); 
app.use(express.json()); 

// Rutas Publicas
app.use('/api/auth', authRoutes); // Login y Register
app.use('/api/anexos', anexoRoutes);
app.use('/api/documentos', documentoRoutes);

//Rutas Protegidas
app.use('/api', authenticateToken, cumpleanosRoutes);

// Servidor de archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend encendido en el puerto ${PORT}`);
});