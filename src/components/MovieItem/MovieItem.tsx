import React, { ReactElement } from "react";
import Movie from "../../model/Movie";
import './MovieItem.sass'
interface IMovieItemProps {
  data: Movie;
}

export default function MovieItem(props: IMovieItemProps): ReactElement {
    function displayModal() {
        alert(props.data.title)
    }
  return (
    <div className='MovieItem' onClick={displayModal}>
      <img alt="poster" src={"https://image.tmdb.org/t/p/w500/" + props.data.posterPath} />
      <div>

      <h3>{props.data.title}</h3>
      <p>{props.data.releaseDate}</p>
      </div>
    </div>
  );
}
