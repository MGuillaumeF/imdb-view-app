import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { Logger } from '../../logger';

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
import image from '../../icons/image.svg';
import table from '../../icons/table.svg';
import ToggleButtonGroup from '../ToggleButton/ToggleButtonGroup';
import { Gauge } from '../Gauge';

const LOGGER = Logger.getInstance();

export default function Home(): ReactElement {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState('grid');
  const [movieShowed, setMovieShowed] = useState<Movie>();
  const [movies, setMovies] = useState<Movie[]>();
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language);
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    Data.getData().then((movies) => {
      return setMovies(movies);
    });
  }, [currentLanguage, i18n]);
  function getSearch(value: string) {
    if (value !== search) {
      LOGGER.debug(value);
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

  function moviesToTableData(data: Movie[] | undefined) {
    const hRows: ITRow[] = [];
    const bRows: ITRow[] = [];
    const movieKeyProperties: any = {
      id: 'MOVIE.ID',
      title: 'MOVIE.TITLE',
      posterPath: 'MOVIE.POSTER',
      releaseDate: 'MOVIE.RELEASE_DATE',
      voteAverage: 'MOVIE.VOTE_AVERAGE',
      overview: 'MOVIE.OVERVIEW'
    };
    if (data) {
      data.forEach((movie, index) => {
        const cols = Object.keys(movie);
        if (index === 0) {
          hRows.push({
            id: 'hr_0',
            cells: cols.map((col) => {
              return {
                id: `hr_0_${col}`,
                rawContent: col,
                content: t(movieKeyProperties[col]),
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
              rawContent: tmp[col],
              content:
                col === 'posterPath' ? (
                  <img
                    onDoubleClick={() => showMovie(movie.id)}
                    style={{ width: '6em' }}
                    src={`https://image.tmdb.org/t/p/w500/${tmp[col]}`}
                    alt=''
                  />
                ) : col === 'voteAverage' ? (<Gauge
                  value={movie.voteAverage}
                  title={`${movie.title} - ${movie.voteAverage}/10`}
                  description={`The note of movie : ${movie.title}`}
                  max={10}
                  style={{
                    width: '3em',
                    height: 'auto'
                  }}
                  bgGaugeColor='#222'
                />) : undefined
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

  const changeLang = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const movieTableData = moviesToTableData(movies);
  return (
    <div className='Home'>
      <MenuBar title={t(ETRANSLATION_KEYS.TITLE)} />
      <SearchBar onSearch={getSearch} inputDefinition={{ id: 'searchInput' }} />
      <ToggleButtonGroup
        defaultValue='grid'
        style={{ position: 'relative', marginLeft: 'auto', marginTop: '5px' }}
        buttons={[
          {
            id: 'tableDisplayButton',
            value: 'table',
            objectContent: (
              <img
                style={{
                  margin: 'auto',
                  verticalAlign: 'middle',
                  width: '24px',
                  height: '24px'
                }}
                src={table}
                alt=''
              />
            )
          },
          {
            id: 'gridDisplayButton',
            value: 'grid',
            objectContent: (
              <img
                style={{
                  margin: 'auto',
                  verticalAlign: 'middle',
                  width: '24px',
                  height: '24px'
                }}
                src={image}
                alt=''
              />
            )
          }
        ]}
        onChangeToggle={(a) => {
          setDisplay(a);
        }}
      />
      {display === 'table' && movieTableData.bRows ? (
        <Table
          hRows={movieTableData.hRows}
          isSortable
          bRows={movieTableData.bRows}
        />
      ) : null}

      {movies && display === 'grid' ? (
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
