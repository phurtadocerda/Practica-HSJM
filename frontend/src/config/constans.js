const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getUploadUrl = (filename) => {
  const baseUrl = API_BASE.replace('/api', '');
  return `${baseUrl}/uploads/${filename}`;
};