import axios from "axios";

const api = axios.create({
  baseURL: "https://api.jikan.moe/v4",
});

export const searchAnime = async (query: string) => {
  const response = await api.get(`/anime?q=${query}&limit=20`);
  return response.data.data;
};

export const getAnimeDetail = async (id: string) => {
  const response = await api.get(`/anime/${id}`);
  return response.data.data;
};

export default api;