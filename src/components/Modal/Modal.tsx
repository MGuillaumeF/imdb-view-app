import React, { ReactElement } from 'react';
import Movie from '../../model/Movie';
import './Modal.sass';
interface IModalProps {
  data: Movie;
  onClose: Function;
}

export default function Modal(props: IModalProps): ReactElement {
  const onFadeClick = (event: any) => {
    props.onClose();
  };
  const onPopClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <div className='ModalFade' onClick={onFadeClick}>
      <div className='ModalContent' onClick={onPopClick}>
        <button>{'<3'}</button>
        <h1>{props.data.title}</h1>
        <img
          alt='poster'
          src={`https://image.tmdb.org/t/p/w500/${props.data.posterPath}`}
        />
        <ul>
          <li>
            <strong>Date</strong> : {props.data.releaseDate}
          </li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
