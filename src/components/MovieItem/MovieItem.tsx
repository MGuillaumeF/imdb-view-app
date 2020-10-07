import React, { ReactElement } from 'react';
import Movie from '../../model/Movie';
import Evaluation from '../Evaluation/Evaluation';
import './MovieItem.sass';
interface IMovieItemProps {
  data: Movie;
  onClick: Function;
}

export default function MovieItem(props: IMovieItemProps): ReactElement {
  function displayModal() {
    props.onClick(props.data.id);
  }
  return (
    <div className='MovieItem' onClick={displayModal}>
      <img
        alt='poster'
        src={'https://image.tmdb.org/t/p/w500/' + props.data.posterPath}
      />
      <div>
        <Evaluation note={props.data.voteAverage} />
        <h3>{props.data.title}</h3>
        <p>{props.data.releaseDate}</p>
      </div>
    </div>
  );
}
