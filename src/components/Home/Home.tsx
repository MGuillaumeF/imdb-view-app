import React, { ReactElement, useEffect, useState } from 'react';
import Movie, { getData } from '../../model/Movie';
import MoviesList from '../MoviesList/MoviesList';
import SearchBar from '../SearchBar/SearchBar';
import './Home.sass';
import Modal from '../Modal/Modal';
import MovieShow from '../MovieShow/MovieShow';

export default function Home(): ReactElement {
  const [search, setSearch] = useState('');
  const [movieShowed, setMovieShowed] = useState<Movie>();
  const [movies, setMovies] = useState<Movie[]>();
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
    if (movies) {
      const mov = movies.find((mov) => {
        return movieId === mov.id;
      });
      setMovieShowed(mov);
    }
  }
  return (
    <div className='Home'>
      <SearchBar onSearch={getSearch} />
      {movies ? <MoviesList search={search} movies={movies} onClickItem={showMovie} /> : null}
      {movieShowed && movieShowed.id &&
      movieShowed.posterPath &&
      movieShowed.releaseDate &&
      movieShowed.title ? (
        <Modal
          onClose={() => {
            setMovieShowed(undefined);
          }}
        >
          <MovieShow data={movieShowed as Movie} />
          </Modal>
      ) : null}
    </div>
  );
}
