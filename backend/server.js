require('dotenv').config({ path: './backend/.env' }); // Carga las variables de entorno desde el archivo .env en el directorio backend 

const express = require('express');
const cors = require('cors');

// Rutas
const authRoutes = require('./src/routes/authRoutes');
const cumpleanosRoutes = require('./src/routes/cumpleanosRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

// Usar rutas
app.use('/api', authRoutes);
app.use('/api', cumpleanosRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend encendido en el puerto ${PORT}`);
});