import { EHTTP_METHOD, request, Headers, Query } from '../comm';
import i18next from 'i18next';

const REACT_APP_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGZjNmQ3OTVlMzhiNmI1NTdmOWNhN2FhZTFjYzViMyIsInN1YiI6IjVmN2NmNmFmZmRmYzlmMDAzOGI1OTBkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7mm9P-EFL-HdQVo2gxao0egAaHujxrm3XiuUzWiLnDY';
const REACT_APP_TMBD_KEY = 'f8fc6d795e38b6b557f9ca7aae1cc5b3';

const headers: Headers = {
  Authorization: `Bearer ${REACT_APP_TOKEN}`,
  'Content-Type': 'application/json;charset=utf-8'
};

async function movieDbAPIRequest(params: {
  pathname: string;
  method: EHTTP_METHOD;
  query?: Query;
  headers?: Headers;
}) {
  const response = await request({
    method: EHTTP_METHOD.GET,
    href: `https://api.themoviedb.org${params.pathname}`,
    query: {
      language: i18next.language === 'fr' ? 'fr-FR' : 'en',
      ...params.query
    },
    headers: { ...headers, ...params.headers }
  }).catch((exception) => {
    console.error(exception);
    throw exception;
  });

  return response;
}
export default interface Movie {
  title: string;
  posterPath: string;
  releaseDate: string;
  id: number;
  voteAverage: number;
  backdrop_path: string;
  overview: string;
}
export const getData = async (url: string = ''): Promise<Movie[]> => {
  const response = await movieDbAPIRequest({
    method: EHTTP_METHOD.GET,
    pathname: url.trim() !== '' ? url : '/4/list/1'
  }).catch((exception) => {
    console.error(exception);
    throw exception;
  });

  const JSONResponse = JSON.parse(response.body);
  return JSONResponse.results.map((movie: any) => {
    return {
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      id: movie.id,
      voteAverage: movie.vote_average,
      overview: movie.overview
    };
  });
};

export async function search(query: string): Promise<Movie[]> {
  const response = await movieDbAPIRequest({
    method: EHTTP_METHOD.GET,
    pathname: '/4/search/movie',
    query: {
      query
    }
  });

  const JSONResponse = JSON.parse(response.body);
  return JSONResponse.results.map((movie: any) => {
    return {
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      id: movie.id,
      voteAverage: movie.vote_average,
      overview: movie.overview
    };
  });
}

export async function findDetails(movieId: number) {
  const response = await movieDbAPIRequest({
    method: EHTTP_METHOD.GET,
    pathname: `/3/movie/${movieId}`,
    query: {
      api_key: REACT_APP_TMBD_KEY
    }
  });

  return JSON.parse(response.body);
}

export async function findCast(movieId: number) {
  const response = await movieDbAPIRequest({
    method: EHTTP_METHOD.GET,
    pathname: `/3/movie/${movieId}/credits`,
    query: {
      api_key: REACT_APP_TMBD_KEY
    }
  });

  return JSON.parse(response.body);
}

export async function getNowPlaying() {
  const response = await movieDbAPIRequest({
    method: EHTTP_METHOD.GET,
    pathname: '/3/movie/now_playing',
    query: {
      api_key: REACT_APP_TMBD_KEY,
      region: 'FR'
    }
  });

  return JSON.parse(response.body);
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
