import api from '../api/axios';

export const login = async (rut, password) => {
  const response = await api.post('/login', { rut, password });
  return response.data;
};

export const register = async (regData) => {
  const response = await api.post('/register', regData);
  return response.data;
};
