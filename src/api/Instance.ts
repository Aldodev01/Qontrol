import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://192.168.30.55:4000/api/',
  timeout: 20000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
});
export default Instance;
