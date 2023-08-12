import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.212.20.156:7000', // Replace this with your API base URL
});

export default api;