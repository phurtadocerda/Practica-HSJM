const prisma = require('../config/prisma');

const getCumpleanos = async (req, res) => {
  try {
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;

    const result = await prisma.$queryRaw`
      SELECT nombres, apellido_paterno, area_trabajo as unidad
      FROM usuarios
      WHERE EXTRACT(DAY FROM fecha_nacimiento) = ${dia}
      AND EXTRACT(MONTH FROM fecha_nacimiento) = ${mes}
    `;

    const cumpleaneros = result.map((persona, index) => ({
      id: index + 1,
      nombre: `${persona.nombres} ${persona.apellido_paterno}`,
      cargo: "Funcionario(a)",
      unidad: persona.unidad
    }));

    res.json(cumpleaneros);
  } catch (err) {
    console.error("Error en Cumpleaños:", err);
    res.status(500).json({ message: 'Error al obtener cumpleaños' });
  }
};

module.exports = { getCumpleanos };