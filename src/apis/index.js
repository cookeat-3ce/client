import axios from 'axios';
import { getCookie } from '../hooks';

const instance = axios.create({
  baseURL: 'https://api.cookeat.site:443/api',
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
