// استدعاء API من backend
import axios from 'axios';

const API_BASE = "http://localhost:5000"; // غيّرها إلى رابط سيرفرك على Railway لاحقاً

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
  return res.data;
};

export const getBots = async () => {
  const res = await axios.get(`${API_BASE}/bots`);
  return res.data;
};

export const getBotById = async (id) => {
  const res = await axios.get(`${API_BASE}/bots/${id}`);
  return res.data;
};

export const updateBotSettings = async (id, settings) => {
  const res = await axios.put(`${API_BASE}/bots/${id}`, settings);
  return res.data;
};

export const getStats = async () => {
  const res = await axios.get(`${API_BASE}/stats`);
  return res.data;
};
