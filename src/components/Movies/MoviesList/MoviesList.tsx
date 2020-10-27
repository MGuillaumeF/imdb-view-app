import React, { ReactElement } from 'react';
import Movie from '../../../model/Movie';
import { MovieItem } from '..';
import './MoviesList.sass';

interface IMoviesListProps {
  /**
   * Search value to found items in MovieList
   */
  search: string;
  /**
   * Data for Movies
   */
  movies: Movie[];
  /**
   * Function called when Movie Item of List is clicked 
   */
  onClickItem: (id : number) => void;
}

/**
 * Function to create Movie List Component
 * @param props Data of MovieList
 */
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
