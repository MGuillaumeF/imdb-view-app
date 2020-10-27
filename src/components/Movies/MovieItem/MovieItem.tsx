import React, { ReactElement, useState } from 'react';
import Movie from '../../../model/Movie';
import * as Film from '../../../model/Movie';
import Gauge from '../../Gauge/Gauge';
import './MovieItem.sass';
import Rectangle from '../../Rectangle/Rectangle';

interface IMovieItemProps {
  /**
   * Data of Movie
   */
  data: Movie;
  /**
   * Function called when Movie Item is clicked
   */
  onClick: (id : number) => void;
}

/**
 * Function to get Rectangle when poster of movie is not available
 */
function getEmptyPoster() : ReactElement {
  return <Rectangle
  text='Poster not found'
  textColor='white'
  width={500}
  height={750}
  primaryColor='#FF0000'
  secondaryColor='#FFFF00'
/>
}

/**
 * Component to display a movie item with poster, title and release date
 */
export default function MovieItem(props: IMovieItemProps): ReactElement {
  const [imageLoading, setImageLoading] = useState(false);
  function displayModal() {
    props.onClick(props.data.id);
  }
  return (
    <div
      className='MovieItem'
      onClick={displayModal}
      style={{
        border: Film.isInFavorites(props.data.id) ? '1px solid red' : undefined
      }}
    >
      <Gauge
        note={props.data.voteAverage}
        max={10}
        style={{
          position: 'absolute',
          width: '3em',
          height: 'auto',
          top: '0.5em',
          left: '0.5em'
        }}
        bgGaugeColor='#222'
      />
      {props.data.posterPath ? (
        <img
          alt='poster'
          style={{display : imageLoading ? 'block' : 'none'}}
          src={`https://image.tmdb.org/t/p/w500/${props.data.posterPath}`} onLoad={()=> {setImageLoading(true)}}
        />
      ) : getEmptyPoster()}
      {props.data.posterPath && !imageLoading ? getEmptyPoster() : null}
      <div>
        <h3>{props.data.title}</h3>
        <p>{props.data.releaseDate}</p>
      </div>
    </div>
  );
}
