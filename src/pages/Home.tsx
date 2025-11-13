import React, { useEffect, useState, useCallback } from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchBar from "../components/SearchBar";
import AnimeCard from "../components/AnimeCard";
import { fetchAnime } from "../api/jikan";

export default function Home() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch handler (stable)
  const doFetch = useCallback(async (q: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnime(q);
      setList(data);
    } catch (err: any) {
      setError(err?.message ?? "Failed to fetch");
      setList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // initial load -> top anime
  useEffect(() => {
    doFetch("");
  }, [doFetch]);

  // run search when query changes (SearchBar already debounces)
  useEffect(() => {
    // only search when query length >= 1 OR if empty (to show top anime)
    // We call doFetch for any change; SearchBar throttles calls.
    doFetch(query);
  }, [query, doFetch]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Anime Search
      </Typography>

      <SearchBar value={query} onChange={setQuery} minChars={1} debounceMs={500} />

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" sx={{ my: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && list.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }}>
          No anime found.
        </Typography>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {list.map((anime) => (
          <Grid key={anime.mal_id} >
            <AnimeCard anime={anime} />
          </Grid>
          // <Grid item key={anime.mal_id} xs={12} sm={6} md={3}>
          //   <AnimeCard anime={anime} />
          // </Grid>
        ))}
      </Grid>
    </Container>
  );
}
