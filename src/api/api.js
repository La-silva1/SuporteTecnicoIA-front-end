// src/api/api.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://srv1119481.hstgr.cloud:8080", // <- seu backend .NET
  headers: {
    "Content-Type": "application/json"
  }
});


// 🔐 Interceptador opcional: adiciona o token JWT automaticamente
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =========================
// 🔹 ENDPOINTS DE LOGIN
// =========================
export const criarConta = async (dados) => {
  try {
    const response = await api.post("/crie-uma-conta", dados);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao criar conta." };
  }
};

export const entrar = async (dados) => {
  try {
    const response = await api.post("/entrar", dados);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao entrar." };
  }
};

// =========================
// 🔹 ENDPOINTS DE CHAMADOS
// =========================
export const abrirChamado = async (dados) => {
  try {
    const response = await api.post("/abrir-chamado", dados);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao abrir chamado." };
  }
};

export const listarChamados = async () => {
  try {
    const response = await api.get("/meus-chamados");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao listar chamados." };
  }
};

export const avaliarChamado = async (id, dados) => {
  try {
    const response = await api.post(`/avaliar-chamado/${id}`, dados);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao avaliar chamado." };
  }
};

export const removerChamado = async (id) => {
  try {
    const response = await api.delete(`/chamados/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erro ao remover chamado." };
  }
};

export default api;
