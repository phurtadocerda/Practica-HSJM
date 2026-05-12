const prisma = require('../config/prisma');

const getAnexos = async (req, res) => {
  try {
    const anexos = await prisma.anexo.findMany({
      orderBy: { unidad: 'asc' } // Los ordena alfabéticamente por unidad
    });
    
    // Respondemos con el formato que espera tu Frontend
    res.json({ success: true, anexos });
  } catch (error) {
    console.error("Error en getAnexos:", error);
    res.status(500).json({ 
      success: false, 
      message: "No se pudieron obtener los anexos" 
    });
  }
};

const createAnexo = async (req, res) => {
  const { anexo, unidad, usuario, cargo, mail } = req.body;

  // Validación de seguridad por rol
  if (req.user.rol !== 'administrador') {
    return res.status(403).json({ success: false, message: "No autorizado" });
  }

  try {
    const nuevoAnexo = await prisma.anexo.create({
      data: {
        anexo: anexo,
        unidad,
        usuario,
        cargo,
        email: mail // Mapeo de mail a email (Prisma)
      }
    });
    
    res.json({ success: true, anexo: nuevoAnexo });
  } catch (error) {
    console.error("Error al crear anexo:", error);
    res.status(500).json({ success: false, message: "Error al guardar el registro" });
  }
};


const deleteAnexo = async (req, res) => {
  const { id } = req.params;
  
  if (req.user.rol !== 'administrador') {
    return res.status(403).json({ 
      success: false, 
      message: "No tienes permisos para realizar esta acción" 
    });
  }

  try {
    await prisma.anexo.delete({
      where: { id: parseInt(id) }
    });
    res.json({ success: true, message: "Anexo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error interno al eliminar" });
  }
};

const updateAnexo = async (req, res) => {
  const { id } = req.params;
  const { anexo, unidad, usuario, cargo, email } = req.body;

  if (req.user.rol !== 'administrador') {
    return res.status(403).json({ success: false, message: "No autorizado" });
  }

  try {
    const actualizado = await prisma.anexo.update({
      where: { id: Number(id) },
      data: {
        anexo: anexo, // Mapeamos 'anexo' del form al campo 'numero' de la DB
        unidad,
        usuario,
        cargo,
        email
      }
    });
    res.json({ success: true, anexo: actualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al actualizar el registro" });
  }
};

module.exports = { getAnexos, deleteAnexo, updateAnexo, createAnexo };
