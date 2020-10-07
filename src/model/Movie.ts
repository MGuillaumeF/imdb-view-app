export default interface Movie {
  title: string;
  posterPath: string;
  releaseDate: string;
  id: number;
  voteAverage: number;
}
export interface MovieEmpty {
  title?: string;
  posterPath?: string;
  releaseDate?: string;
  id?: number;
  voteAverage?: number;
}
