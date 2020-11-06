import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import Movie, * as Data from '../../model/Movie';
import SearchBar from '../SearchBar';
import Modal from '../Modal';
import { MovieShow, MoviesList } from '../Movies';
import { Table, ITRow } from '../Table';
import MenuBar from '../MenuBar';
import Button from '../Button';

import './Home.sass';

import ETRANSLATION_KEYS from '../../locales/TranslationKeys';
import flagFR from '../../icons/flags/fr.svg';

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
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language);
  useEffect(() => {
    Data.getData().then((movies) => {
      return setMovies(movies);
    });
  }, [currentLanguage]);
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
    setCurrentLanguage(lang)
  };

  const movieTableData = moviesToTableData(movies);
  return (
    <div className='Home'>
      <MenuBar title={t(ETRANSLATION_KEYS.TITLE)} />
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

      <div
        style={{
          margin: 'auto',
          marginTop: '3em',
          width: '2em',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Button
          onClick={() => {
            changeLang('fr');
          }}
        >
          <img alt='fr-flag' src={flagFR} />
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
