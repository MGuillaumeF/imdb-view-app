import React, { ReactElement, useEffect, useState } from 'react';

import Movie from '../../../model/Movie';
import * as Film from '../../../model/Movie';
import ActorList from '../../Actor/ActorList/ActorList';
import './MovieShow.sass';
import icon from '../../../icons/heart.svg';
import { Logger } from '../../../logger';
const LOGGER = Logger.getInstance();

interface IMovieShowProps {
  /**
   * Data of movie to display
   */
  data: Movie;
}

function MovieShow(props: IMovieShowProps): ReactElement {
  const movie = props.data;
  const [infos, setInfos] = useState({} as any);
  const [isFavorite, setIsFavorite] = useState(
    Film.isInFavorites(props.data.id)
  );
  useEffect(() => {
    const fetchMovieDetails = async (filmId: number) => {
      let details = await Film.findDetails(filmId).catch((exception) => {
        LOGGER.error('ERROR', exception);
      });

      let { crew, cast } = await Film.findCast(filmId).catch((exception) => {
        LOGGER.error('ERROR', exception);
      });
      let detailedFilm = {
        details,
        cast,
        crew
      };

      setInfos(detailedFilm);
    };

    fetchMovieDetails(props.data.id);
  }, [props.data.id]);
  return (
    <div className='MovieShow'>
      <h1>{props.data.title}</h1>
      <button
        className={isFavorite ? 'active' : undefined}
        onClick={() => {
          isFavorite
            ? Film.removeFromFavorites(movie.id)
            : Film.addToFavorites(movie.id);
          setIsFavorite(!isFavorite);
        }}
      >
        <img src={icon} alt='favorite icone' />
      </button>

      {infos.details && infos.details.backdrop_path ? (
        <img
          alt='banner of movie'
          className='banner'
          src={`https://image.tmdb.org/t/p/w500${infos.details.backdrop_path}`}
        />
      ) : null}
      <div
        style={{
          boxSizing: 'border-box',
          overflow: 'auto',
          padding: '2em'
        }}
      >
        {props.data.posterPath ? (
          <img
            className='poster'
            alt='poster'
            src={`https://image.tmdb.org/t/p/w500/${props.data.posterPath}`}
          />
        ) : null}
        <ul>
          <li>
            <strong>Date</strong> : {props.data.releaseDate}
          </li>
          <li>
            <p>
              <strong>Resume</strong> : {movie.overview}
            </p>
          </li>
          <li>
            <p>
              <strong>Distribution</strong> :
            </p>
          </li>
        </ul>
        {infos.cast ? <ActorList actors={infos.cast} /> : null}
      </div>
    </div>
  );
}

export default MovieShow;
