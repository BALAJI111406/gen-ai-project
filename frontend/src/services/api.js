import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const studentAPI = {
  upload: (formData) => api.post('/students/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: () => api.get('/students'),
  delete: (id) => api.delete(`/students/${id}`),
};

export const hallAPI = {
  create: (data) => api.post('/halls', data),
  getAll: () => api.get('/halls'),
  update: (id, data) => api.put(`/halls/${id}`, data),
  delete: (id) => api.delete(`/halls/${id}`),
};

export const seatingAPI = {
  generate: (data) => api.post('/seating/generate', data),
  getAll: () => api.get('/seating'),
  getById: (id) => api.get(`/seating/${id}`),
  downloadPDF: (id) => api.get(`/seating/${id}/pdf`, { responseType: 'blob' }),
  override: (id, data) => api.put(`/seating/${id}/override`, data),
  getStats: () => api.get('/seating/stats/dashboard'),
};

export default api;
