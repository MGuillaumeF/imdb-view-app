import axios from 'axios';

export default interface Movie {
  title: string;
  posterPath: string;
  releaseDate: string;
  id: number;
  voteAverage: number;
  backdrop_path: string;
  overview: string;
}
export interface MovieEmpty {
  title?: string;
  posterPath?: string;
  releaseDate?: string;
  id?: number;
  voteAverage?: number;
}

const REACT_APP_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGZjNmQ3OTVlMzhiNmI1NTdmOWNhN2FhZTFjYzViMyIsInN1YiI6IjVmN2NmNmFmZmRmYzlmMDAzOGI1OTBkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7mm9P-EFL-HdQVo2gxao0egAaHujxrm3XiuUzWiLnDY';
const REACT_APP_TMBD_KEY = 'f8fc6d795e38b6b557f9ca7aae1cc5b3';

export async function search(query: string) {
  const response = await axios.get(
    'https://api.themoviedb.org/4/search/movie',
    {
      params: {
        language: 'fr-FR',
        query,
      },
      headers: {
        Authorization: 'Bearer ' + REACT_APP_TOKEN,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );

  return response.data;
}

export async function findDetails(movieId: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        language: 'fr-FR',
        api_key: REACT_APP_TMBD_KEY,
      },
      headers: {
        Authorization: 'Bearer ' + REACT_APP_TOKEN,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );

  return response.data;
}

export async function findCast(movieId: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      params: {
        language: 'fr-FR',
        api_key: REACT_APP_TMBD_KEY,
      },
      headers: {
        Authorization: 'Bearer ' + REACT_APP_TOKEN,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );

  return response.data;
}

export async function getNowPlaying(movieId: number) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing`,
    {
      params: {
        language: 'fr-FR',
        api_key: REACT_APP_TMBD_KEY,
        region: 'FR',
      },
      headers: {
        Authorization: 'Bearer ' + REACT_APP_TOKEN,
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
  );

  return response.data;
}

export function getFavorites() {
  const jsonFav = window.localStorage.getItem('@MyMovieList::Favorites');
  return jsonFav ? JSON.parse(jsonFav) : [];
}

export function addToFavorites(filmId: number) {
  const favorites = getFavorites();

  if (!favorites.includes(filmId)) {
    console.log('Not prensent, add : ', favorites, filmId);
    window.localStorage.setItem(
      '@MyMovieList::Favorites',
      JSON.stringify([...favorites, filmId])
    );
  }
}

export function isInFavorites(filmId: number) {
  const favorites = getFavorites();

  return favorites.includes(filmId);
}

export function removeFromFavorites(filmId: number) {
  const favoritesFilms = getFavorites();
  const result = favoritesFilms.filter((f: number) => {
    return f !== filmId;
  });

  window.localStorage.setItem(
    '@MyMovieList::Favorites',
    JSON.stringify(result)
  );
}
