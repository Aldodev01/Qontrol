import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://localhost:4000/api/',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
});
export default Instance;
