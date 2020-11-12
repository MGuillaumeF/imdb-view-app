import React, { ReactElement } from 'react';
import './ActorItem.sass';
import noPoster from '../../../icons/no_image.svg';

export interface IActorItemProps {
  person: any;
}

function ActorItem(props: IActorItemProps): ReactElement {
  return (
    <div className='ActorItem'>
      {props.person.profile_path ? (
        <img
          alt='actor'
          src={`https://image.tmdb.org/t/p/w500${props.person.profile_path}`}
        />
      ) : (
        <img src={noPoster} alt={props.person.name} />
      )}

      <p>
        <strong>{props.person.name}</strong>
      </p>
      <p>{props.person.character}</p>
    </div>
  );
}

export default ActorItem;
