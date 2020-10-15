import React, { Fragment, ReactElement, useEffect, useState } from "react";

import Movie from "../../model/Movie";
import * as Film from "../../model/Movie";
import ActorList from "../ActorList/ActorList";
import './MovieShow.sass'

interface Props {

  data: Movie;
}

function MovieShow(props: Props): ReactElement {
    const movie = props.data;
    const [infos, setInfos] = useState({} as any);
    const [isFavorite, setIsFavorite] = useState(
      Film.isInFavorites(props.data.id)
    );
    useEffect(() => {
      const fetchMovieDetails = async (filmId: number) => {
        let details = await Film.findDetails(filmId).catch((exception) => {
          console.error("ERROR", exception);
        });
  
        let { crew, cast } = await Film.findCast(filmId).catch((exception) => {
          console.error("ERROR", exception);
        });
        let detailedFilm = {
          details,
          cast,
          crew,
        };
  
        setInfos(detailedFilm);
      };
  
      fetchMovieDetails(props.data.id);
    }, [props.data.id]);
  return (
    <Fragment>
      <h1>{props.data.title}</h1>
      <button
        className={isFavorite ? "active" : undefined}
        onClick={() => {
          isFavorite
            ? Film.removeFromFavorites(movie.id)
            : Film.addToFavorites(movie.id);
          setIsFavorite(!isFavorite);
        }}
      >
        {!isFavorite ? "+" : "-"}
      </button>

      {infos.details && infos.details.backdrop_path ? (
        <img
          alt="banner of movie"
          className="banner"
          src={
            infos.details.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${infos.details.backdrop_path}`
              : "https://via.placeholder.com/200"
          }
        />
      ) : null}
      <div
        style={{
          boxSizing: "border-box",
          overflow: "auto",
          padding: "2em",
        }}
      >
        <img
          className="poster"
          alt="poster"
          src={
            props.data.posterPath
              ? `https://image.tmdb.org/t/p/w500/${props.data.posterPath}`
              : require('../../res/icons/no_poster.svg')
          }
        />
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
    </Fragment>
  );
}

export default MovieShow;
