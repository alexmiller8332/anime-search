export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: { image_url: string };
  };
  score: number;
  synopsis: string;
}
