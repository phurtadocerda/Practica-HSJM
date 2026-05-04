require('dotenv').config({ path: './backend/.env' }); // Carga las variables de entorno desde el archivo .env en el directorio backend 

const express = require('express');
const cors = require('cors');

// Rutas
const authRoutes = require('./src/routes/authRoutes');
const cumpleanosRoutes = require('./src/routes/cumpleanosRoutes');

// Middleware de autenticación
const { authenticateToken } = require('./src/middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

// Rutas Publicas
app.use('/api', authRoutes); // Login y Register

//Rutas Protegidas
app.use('/api', authenticateToken, cumpleanosRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend encendido en el puerto ${PORT}`);
});