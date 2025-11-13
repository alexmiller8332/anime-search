import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

// Fetch search results; if query is empty, return top anime
export async function fetchAnime(query: string) {
  const endpoint =
    query && query.trim().length > 0
      ? `${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=24`
      : `${BASE_URL}/top/anime?limit=24`;
  const res = await axios.get(endpoint);
  // Jikan returns data.data for list endpoints
  return res.data.data;
}

export async function fetchAnimeDetail(id: string) {
  const res = await axios.get(`${BASE_URL}/anime/${id}`);
  return res.data.data;
}
