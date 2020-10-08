import React, { ReactElement, useEffect, useState } from 'react';
import Movie, { MovieEmpty } from '../../model/Movie';
import MoviesList from '../MoviesList/MoviesList';
import SearchBar from '../SearchBar/SearchBar';
import axios from 'axios';
import './Home.sass';
import Modal from '../Modal/Modal';

const getData = async (url: string = '') => {
  const response = await axios
    .get(url.trim() !== '' ? url : 'https://api.themoviedb.org/4/list/1', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGZjNmQ3OTVlMzhiNmI1NTdmOWNhN2FhZTFjYzViMyIsInN1YiI6IjVmN2NmNmFmZmRmYzlmMDAzOGI1OTBkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7mm9P-EFL-HdQVo2gxao0egAaHujxrm3XiuUzWiLnDY',
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    .catch((exception) => {
      console.error(exception);
      throw exception;
    });
  console.log(response);
  return response.data.results.map((movie: any) => {
    return {
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      id: movie.id,
      voteAverage: movie.vote_average,
      overview: movie.overview,
    };
  });
};

export default function Home(): ReactElement {
  const EMPTY_MOVIES_LIST: Movie[] = [];
  const EMPTY_MOVIES: MovieEmpty = {};
  const [search, setSearch] = useState('');
  const [movieShowed, setMovieShowed] = useState(EMPTY_MOVIES);
  const [movies, setMovies] = useState(EMPTY_MOVIES_LIST);
  useEffect(() => {
    getData().then((movies) => {
      return setMovies(movies);
    });
  }, []);
  function getSearch(value: string) {
    if (value !== search) {
      console.log(value);
      setSearch(value);
      let data: Promise<any>;
      if (value.trim() !== '') {
        data = getData(
          `https://api.themoviedb.org/4/search/movie?query=${encodeURIComponent(
            value
          )}&language=fr-FR`
        );
      } else {
        data = getData();
      }
      data.then((movies) => {
        return setMovies(movies);
      });
    }
  }
  function showMovie(movieId: number) {
    const mov = movies.find((mov) => {
      return movieId === mov.id;
    });
    setMovieShowed(mov || EMPTY_MOVIES);
  }
  return (
    <div className='Home'>
      <SearchBar onSearch={getSearch} />
      <MoviesList search={search} movies={movies} onClickItem={showMovie} />
      {movieShowed.id &&
      movieShowed.posterPath &&
      movieShowed.releaseDate &&
      movieShowed.title ? (
        <Modal
          data={movieShowed as Movie}
          onClose={() => {
            setMovieShowed(EMPTY_MOVIES);
          }}
        />
      ) : null}
    </div>
  );
}
