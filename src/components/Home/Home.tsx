import React, { ReactElement, useEffect, useState } from "react";
import Movie from "../../model/Movie";
import MoviesList from "../MoviesList/MoviesList";
import SearchBar from "../SearchBar/SearchBar";
import axios from 'axios';
import "./Home.sass";
import Modal from "../Modal/Modal";

const getData = async () => {
  const response = await axios.get('https://api.themoviedb.org/4/list/1', {
    headers: {
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGZjNmQ3OTVlMzhiNmI1NTdmOWNhN2FhZTFjYzViMyIsInN1YiI6IjVmN2NmNmFmZmRmYzlmMDAzOGI1OTBkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7mm9P-EFL-HdQVo2gxao0egAaHujxrm3XiuUzWiLnDY',
        'Content-Type' : 'application/json;charset=utf-8'
    },
  });
  console.log(response)
  return response.data.results.map((movie : any) => {
      return {
      title: movie.title,
      posterPath : movie.poster_path,
      releaseDate : movie.release_date,
      id : movie.id
    }
  })
};


export default function Home(): ReactElement {
  const EMPTY_MOVIES_LIST: Movie[] = [];
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState(EMPTY_MOVIES_LIST);
  useEffect(() => {
    getData()
      .then((movies) => {
        return setMovies(movies);
      })
      .catch((exception) => {
        console.error(exception);
      });
  }, []);
  function getSearch(value: string) {
    console.log(value);
    setSearch(value);
  }
  return (
    <div className="Home"> 
      <SearchBar onSearch={getSearch} />
      <MoviesList search={search} movies={movies} />
      <Modal data={{
      title: 'TITI',
      posterPath : 'iii',
      releaseDate : '2020',
      id : 1
    }}/>
    </div>
  );
}
