import React, { ReactElement, useEffect, useState } from 'react';
import Movie from '../../model/Movie';
import * as Data from '../../model/Movie';
import MoviesList from '../MoviesList/MoviesList';
import SearchBar from '../SearchBar/SearchBar';
import './Home.sass';
import Modal from '../Modal/Modal';
import MovieShow from '../MovieShow/MovieShow';
import Table from '../Table/Table';
import { ITRow } from '../Table/TRow/TRow';
import MenuBar from '../MenuBar/MenuBar';

import { useTranslation } from 'react-i18next';

import i18next from 'i18next';
import ETRANSLATION_KEYS from '../../locales/TranslationKeys';
import Button from '../Button/Button';




function moviesToTableData(data: Movie[] | undefined) {
  const hRows: ITRow[] = [];
  const bRows: ITRow[] = [];
  if (data) {
    data.forEach((movie, index) => {
      const cols = Object.keys(movie);
      if (index === 0) {
        hRows.push({
          id: 'hr_0',
          cells: cols.map((col) => {
            return {
              id: `hr_0_${col}`,
              content: col,
              header: true
            };
          })
        });
      }
      const tmp: any = movie;
      bRows.push({
        id: `br_${index}`,
        cells: cols.map((col) => {
          return {
            id: `br_${index}_${col}`,
            content: tmp[col]
          };
        })
      });
    });
  }

  return {
    hRows,
    bRows
  };
}

export default function Home(): ReactElement {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [movieShowed, setMovieShowed] = useState<Movie>();
  const [movies, setMovies] = useState<Movie[]>();
  useEffect(() => {
    Data.getData().then((movies) => {
      return setMovies(movies);
    });
  }, []);
  function getSearch(value: string) {
    if (value !== search) {
      console.log(value);
      setSearch(value);
      let data: Promise<any>;
      if (value.trim() !== '') {
        data = Data.search(value);
      } else {
        data = Data.getData();
      }
      data.then((movies) => {
        return setMovies(movies);
      });
    }
  }
  function showMovie(movieId: number) {
    if (movies) {
      const mov = movies.find((mov) => {
        return movieId === mov.id;
      });
      setMovieShowed(mov);
    }
  }
  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const movieTableData = moviesToTableData(movies);
  return (
    <div className='Home'>
      <MenuBar title={t(ETRANSLATION_KEYS.TITLE)}/>
      <SearchBar onSearch={getSearch} />
      {movieTableData.bRows ? (
        <Table
          hRows={movieTableData.hRows}
          isSortable
          bRows={movieTableData.bRows}
        />
      ) : null}

      {movies ? (
        <MoviesList search={search} movies={movies} onClickItem={showMovie} />
      ) : null}
      {movieShowed &&
      movieShowed.id &&
      movieShowed.posterPath &&
      movieShowed.releaseDate &&
      movieShowed.title ? (
        <Modal
          onClose={() => {
            setMovieShowed(undefined);
          }}
        >
          <MovieShow data={movieShowed as Movie} />
        </Modal>
      ) : null}


      <div style={{margin : 'auto', marginTop:"3em", width:"2em", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

      <Button
          onClick={() => {
            changeLang('fr');
          }}
        >
          FR
        </Button>
        <Button
          onClick={() => {
            changeLang('en');
          }}
        >
          EN
        </Button>
      </div>
    </div>
  );
}
