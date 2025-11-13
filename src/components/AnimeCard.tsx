import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AnimeCard({ anime }: { anime: any }) {
  const navigate = useNavigate();
  const img =
    anime.images?.jpg?.image_url || anime.images?.jpg?.large_image_url || "/placeholder.png";

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea
        sx={{ flexGrow: 1 }}
        onClick={() => navigate(`/detail/${anime.mal_id}`)}
      >
        <CardMedia component="img" height="320" image={img} alt={anime.title} />
        <CardContent>
          <Typography variant="subtitle1" noWrap>
            {anime.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ⭐ {anime.score ?? "N/A"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
