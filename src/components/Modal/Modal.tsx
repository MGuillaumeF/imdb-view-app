import React, { ReactElement, useEffect, useState } from 'react';
import Movie from '../../model/Movie';
import * as Film from '../../model/Movie';
import './Modal.sass';
interface IModalProps {
  data: Movie;
  onClose: Function;
}

export default function Modal(props: IModalProps): ReactElement {
  const [movie, setMovie] = useState(props.data);
  const [infos, setInfos] = useState({} as any);
  const [isFavorite, setIsFavorite] = useState(
    Film.isInFavorites(props.data.id)
  );
  useEffect(() => {
    const fetchMovieDetails = async (filmId: number) => {
      let details = await Film.findDetails(filmId).catch((exception) => {
        console.error('ERROR', exception);
      });

      let { crew, cast } = await Film.findCast(filmId).catch((exception) => {
        console.error('ERROR', exception);
      });
      let detailedFilm = {
        details,
        cast,
        crew,
      };

      setInfos(detailedFilm);
      console.log('call');
    };

    fetchMovieDetails(props.data.id);
  }, []);

  const onFadeClick = () => {
    props.onClose();
  };
  const onPopClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <div className='ModalFade' onClick={onFadeClick}>
      <div className='ModalContent' onClick={onPopClick}>
        {infos.details && infos.details.backdrop_path ? (
          <img
            className='banner'
            src={`https://image.tmdb.org/t/p/original${infos.details.backdrop_path}`}
          />
        ) : null}
        <div
          style={{
            boxSizing: 'border-box',
            overflow: 'auto',
            marginTop:
              infos.details && infos.details.backdrop_path ? '200px' : '',
          }}
        >
          {/*
        <div className={'FilmModal__Crew'}>
        {film.cast
          ? film.cast.map((actor) => <FilmCrew person={actor} />)
          : null}
        </div>*/}
          <button
            className={isFavorite ? 'active' : undefined}
            onClick={() => {
              isFavorite
                ? Film.removeFromFavorites(movie.id)
                : Film.addToFavorites(movie.id);
              setIsFavorite(!isFavorite);
            }}
          >
            {!isFavorite ? '+' : '-'}
          </button>
          <h1>{props.data.title}</h1>
          <img
            className='poster'
            alt='poster'
            src={`https://image.tmdb.org/t/p/w500/${props.data.posterPath}`}
          />
          <ul>
            <li>
              <strong>Date</strong> : {props.data.releaseDate}
            </li>
            <li>
              <strong>Resume</strong> : <p>{movie.overview}</p>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
