import React, { ReactElement } from 'react';
import Movie from '../../model/Movie';
import MovieItem from '../MovieItem/MovieItem';
import './MoviesList.sass';
interface IMoviesListProps {
  search: string;
  movies: Movie[];
  onClickItem: Function;
}

export default function MoviesList(props: IMoviesListProps): ReactElement {
  const movies = props.movies.filter((movie) => {
    const re = new RegExp(props.search, 'gi');
    return props.search.trim() === '' || re.test(movie.title);
  });
  return (
    <div className='MoviesList'>
      {movies.map((movie: Movie) => (
        <MovieItem key={movie.id} data={movie} onClick={props.onClickItem} />
      ))}
    </div>
  );
}
