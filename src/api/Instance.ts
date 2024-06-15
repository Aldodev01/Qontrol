import {InitializeStorage} from '@src/context/Storage';
import axios from 'axios';

const newToken = InitializeStorage.getString('token');

const Instance = axios.create({
  baseURL: 'http://localhost:4000/api/',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    Authorization: `Bearer ${newToken}`,
  },
});
export default Instance;
