import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeDetail } from "../api/jikan";
import { Anime } from "../features/anime/types";
import { CircularProgress, Container, Typography, CardMedia } from "@mui/material";

export default function Detail() {
  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getAnimeDetail(id!);
      setAnime(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>{anime?.title}</Typography>
      <CardMedia
        component="img"
        image={anime?.images.jpg.image_url}
        sx={{ width: 300, borderRadius: 2 }}
      />
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {anime?.synopsis}
      </Typography>
    </Container>
  );
}
