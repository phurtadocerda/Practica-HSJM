import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajusta al puerto de tu backend
});

// Interceptor para agregar el token JWT a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token inválido o expirado, redirigir al login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Ajusta según tu ruta de login
    }
    return Promise.reject(error);
  }
);

export default api;