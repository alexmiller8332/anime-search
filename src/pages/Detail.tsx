import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAnimeDetail } from "../api/jikan";
import { Container, Typography, CircularProgress, Button, Box, CardMedia } from "@mui/material";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAnimeDetail(id);
        setAnime(data);
      } catch (err: any) {
        setError(err?.message ?? "Failed to fetch detail");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Button onClick={() => navigate(-1)}>← Back</Button>
      <Typography variant="h4" gutterBottom>
        {anime?.title}
      </Typography>

      {anime?.images?.jpg?.large_image_url && (
        <CardMedia
          component="img"
          image={anime.images.jpg.large_image_url}
          alt={anime.title}
          sx={{ width: "100%", maxWidth: 480, borderRadius: 2, mb: 2 }}
        />
      )}

      <Typography paragraph>{anime?.synopsis ?? "No synopsis available."}</Typography>

      <Typography variant="body2" color="text.secondary">
        Episodes: {anime?.episodes ?? "—"} | Score: {anime?.score ?? "—"} | Status: {anime?.status ?? "—"}
      </Typography>
    </Container>
  );
}
