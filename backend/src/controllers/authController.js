const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');

const login = async (req, res) => {
  const { rut, password } = req.body;
  try {
    // Buscar usuario por RUT
    const usuarioEncontrado = await prisma.usuario.findUnique({
      where: {
        rut: rut
      },
      select: {
        nombres: true,
        apellido_paterno: true,
        area_trabajo: true,
        rol: true,
        password: true
      }
    });

    // Verificar si el usuario existe y la contraseña coincide
    if (usuarioEncontrado && await bcrypt.compare(password, usuarioEncontrado.password)) {
      const nombreCompleto = `${usuarioEncontrado.nombres} ${usuarioEncontrado.apellido_paterno}`;

      res.json({
        success: true,
        user: {
          nombre: nombreCompleto,
          area: usuarioEncontrado.area_trabajo,
          rol: usuarioEncontrado.rol
        }
      });
    } else {
      res.json({ success: false, message: 'RUT o contraseña incorrectos' });
    }
  } catch (err) {
    console.error("Error en Login:", err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

const register = async (req, res) => {
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
    // 1. Verificar si el funcionario ya existe en TU base de datos
    const existeFuncionario = await prisma.usuario.findUnique({
      where: { rut: rut }
    });
    if (existeFuncionario) {
      return res.status(400).json({ 
        success: false, 
        message: 'El funcionario ya está registrado' 
      });
    }
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Guardar el nuevo funcionario en la base de datos
    await prisma.usuario.create({
      data: {
        nombres: nombres,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        rut: rut,
        fecha_nacimiento: new Date(fechaNacimiento),
        area_trabajo: areaTrabajo,
        password: hashedPassword
      }
    });

    res.json({ success: true, message: '¡Funcionario registrado con éxito!' });
  } catch (err) {
    console.error("Error al registrar:", err);
    res.status(500).json({ success: false, message: 'Error al guardar en la base de datos' });
  }
};

module.exports = { login, register };