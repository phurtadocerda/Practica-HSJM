// La IP del servidor de archivos del hospital
const FILES_SERVER_BASE = 'http://10.5.131.63/intranet';

export const ENDPOINTS = {
  // Base para la mayoría de los PDFs
  DOCS: `${FILES_SERVER_BASE}/wp-content/uploads`,
  
  // Base específica para la carpeta de Accidentes
  ACCIDENTES: `${FILES_SERVER_BASE}/Accidentes`,
  
  // Tu nuevo Backend de Node.js (cámbialo a localhost si pruebas local)
  API: 'http://localhost:5000/api' 
};