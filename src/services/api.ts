// src/services/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001', // apunta a tu json‑server
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
