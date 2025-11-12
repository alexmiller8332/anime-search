import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAnimeList } from "../features/anime/animeSlice";
import SearchBar from "../components/SearchBar";
import AnimeCard from "../components/AnimeCard";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";


  import { useCallback } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.anime);


  const handleSearch = useCallback(
    (query: string) => {
      dispatch(fetchAnimeList(query));
    },
    [dispatch]
  );


  return (
    <div style={{ padding: 20 }}>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2} justifyContent="center" marginTop={2}>
          {list.map((anime) => (
            <Grid key={anime.mal_id}>
              <AnimeCard anime={anime} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
