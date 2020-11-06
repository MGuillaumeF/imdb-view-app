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
  onClickItem: (id: number) => void;
}

/**
 * Movie List Component is a Layout Component to display as flex row list of MovieItem Component
 * @param props Data of MovieList
 * @link MovieItem
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
