import axios from 'axios';

const service = axios.create({
  baseURL: '',
  timeout: 5000,
});

service.interceptors.request.use();

service.interceptors.response.use();

export default service;
