// استدعاء API من backend
import axios from 'axios';
import { API_URL } from "./config";

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const getBots = async () => {
  const res = await axios.get(`${API_URL}/bots`);
  return res.data;
};

export const getBotById = async (id) => {
  const res = await axios.get(`${API_URL}/bots/${id}`);
  return res.data;
};

export const updateBotSettings = async (id, settings) => {
  const res = await axios.put(`${API_URL}/bots/${id}`, settings);
  return res.data;
};

export const getStats = async () => {
  const res = await axios.get(`${API_URL}/stats`);
  return res.data;
};
