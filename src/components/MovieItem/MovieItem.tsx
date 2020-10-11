import React, { ReactElement } from "react";
import Movie from "../../model/Movie";
import * as Film from "../../model/Movie";
import Gauge from "../Gauge/Gauge";
import "./MovieItem.sass";
interface IMovieItemProps {
  data: Movie;
  onClick: Function;
}

export default function MovieItem(props: IMovieItemProps): ReactElement {
  function displayModal() {
    props.onClick(props.data.id);
  }
  return (
    <div
      className="MovieItem"
      onClick={displayModal}
      style={{
        border: Film.isInFavorites(props.data.id) ? "1px solid red" : undefined,
      }}
    >
      <Gauge
        note={props.data.voteAverage}
        max={10}
        style={{
          position: "absolute",
          width: "3em",
          height: "auto",
          top: "0.5em",
          left: "0.5em"
        }}
        bgGaugeColor="#222"
        strikeGaugeColor="white"
      />
      <img
        alt="poster"
        src={
          props.data.posterPath
            ? `https://image.tmdb.org/t/p/w500/${props.data.posterPath}`
            : "https://via.placeholder.com/200"
        }
      />
      <div>
        <h3>{props.data.title}</h3>
        <p>{props.data.releaseDate}</p>
      </div>
    </div>
  );
}
