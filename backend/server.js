const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json()); 

// 1. CONEXIÓN A LA BÓVEDA
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'intranet_hospital',
  password: 'admin1212', // <---- PON TU CLAVE AQUÍ
  port: 5432,
});

// 2. RUTA DEL LOGIN
app.post('/api/login', async (req, res) => {
  const { rut, password } = req.body;
  try {
    // CAMBIO 1: Buscamos si el RUT y la contraseña coinciden, y ahora pedimos también el "rol"
    const result = await pool.query(
      'SELECT nombres, apellido_paterno, area_trabajo, rol FROM usuarios WHERE rut = $1 AND password = $2', 
      [rut, password]
    );
    
    if (result.rows.length > 0) {
      // Le mandamos a React el nombre completo uniendo nombres y apellido
      const usuarioEncontrado = result.rows[0];
      const nombreCompleto = `${usuarioEncontrado.nombres} ${usuarioEncontrado.apellido_paterno}`;
      
      // CAMBIO 2: Agregamos el "rol" en el paquete de datos que le enviamos a React
      res.json({ 
        success: true, 
        user: { 
          nombre: nombreCompleto, 
          area: usuarioEncontrado.area_trabajo,
          rol: usuarioEncontrado.rol // <--- AQUÍ ENVÍAMOS EL ROL AL FRONTEND
        } 
      });
    } else {
      res.json({ success: false, message: 'RUT o contraseña incorrectos' });
    }
  } catch (err) {
    console.error("Error en Login:", err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// 3. RUTA DE CUMPLEAÑOS (Usando la misma tabla de usuarios)
app.get('/api/cumpleanos', async (req, res) => {
  try {
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;

    // Magia de Postgres: Extrae el día y mes de la fecha de nacimiento completa
    const query = `
      SELECT nombres, apellido_paterno, area_trabajo as unidad 
      FROM usuarios 
      WHERE EXTRACT(DAY FROM fecha_nacimiento) = $1 
      AND EXTRACT(MONTH FROM fecha_nacimiento) = $2
    `;
    
    const result = await pool.query(query, [dia, mes]);
    
    // Formateamos los datos para que React los entienda igual que antes
    const cumpleaneros = result.rows.map((persona, index) => ({
      id: index + 1,
      nombre: `${persona.nombres} ${persona.apellido_paterno}`,
      cargo: "Funcionario(a)", // Como no hay campo cargo, ponemos algo genérico
      unidad: persona.unidad
    }));

    res.json(cumpleaneros);
  } catch (err) {
    console.error("Error en Cumpleaños:", err);
    res.status(500).json({ message: 'Error al obtener cumpleaños' });
  }
});

// 4. RUTA PARA REGISTRAR UN NUEVO FUNCIONARIO
app.post('/api/register', async (req, res) => {
  // Extraemos los datos
  const { 
    nombres, 
    apellidoPaterno, 
    apellidoMaterno, 
    rut, 
    fechaNacimiento, 
    areaTrabajo, 
    password 
  } = req.body;
  
  try {
    // Insertamos en las columnas de la base de datos
    // Nota: No necesitamos insertar el 'rol' aquí, porque en la BD le pusimos DEFAULT 'funcionario'
    const query = `
      INSERT INTO usuarios (nombres, apellido_paterno, apellido_materno, rut, fecha_nacimiento, area_trabajo, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    
    const values = [
      nombres, 
      apellidoPaterno, 
      apellidoMaterno, 
      rut, 
      fechaNacimiento, 
      areaTrabajo, 
      password
    ];
    
    await pool.query(query, values);
    res.json({ success: true, message: '¡Funcionario registrado con éxito!' });
  } catch (err) {
    console.error("Error al registrar:", err);
    res.status(500).json({ success: false, message: 'Error al guardar en la base de datos' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend encendido en el puerto ${PORT}`);
});