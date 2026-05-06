const prisma = require('../config/prisma');

const getDocumentosPorCategoria = async (req, res) => {
  const { categoria } = req.params; // Ejemplo: 'accidentes'
  
  try {
    const documentos = await prisma.documento.findMany({
      where: { categoria: categoria },
      orderBy: { titulo: 'asc' }
    });
    
    res.json({ success: true, documentos });
  } catch (error) {
    console.error(`Error al obtener documentos de ${categoria}:`, error);
    res.status(500).json({ 
      success: false, 
      message: 'No se pudieron cargar los archivos desde la base de datos' 
    });
  }
};

module.exports = { getDocumentosPorCategoria };