import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
});

let isOffline = false;

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => {
    isOffline = false;
    return response;
  },
  (error: AxiosError) => {
    if (!error.response || error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      isOffline = true;
      console.warn('Backend offline - usando modo offline');
      return Promise.reject({ offline: true, message: 'Sistema em modo offline' });
    }
    return Promise.reject(error);
  }
);

export const checkOnlineStatus = () => !isOffline;

export default api;
