import { Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Anime } from "../features/anime/types";

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 250, m: 1 }}>
      <CardActionArea onClick={() => navigate(`/detail/${anime.mal_id}`)}>
        <CardMedia
          component="img"
          height="350"
          image={anime.images.jpg.image_url}
          alt={anime.title}
        />
        <CardContent>
          <Typography variant="h6">{anime.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            ⭐ {anime.score ?? "N/A"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
