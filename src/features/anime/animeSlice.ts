import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchAnime } from "../../api/jikan";
import { Anime } from "./types";

interface AnimeState {
  list: Anime[];
  loading: boolean;
  error: string | null;
}

const initialState: AnimeState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchAnimeList = createAsyncThunk(
  "anime/fetchAnimeList",
  async (query: string) => {
    if (query.trim().length === 0) return [];
    return await searchAnime(query);
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimeList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnimeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch anime";
      });
  },
});

export default animeSlice.reducer;
