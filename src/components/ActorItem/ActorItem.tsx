import React, { ReactElement } from 'react';
import Rectangle from '../Rectangle/Rectangle';
import './ActorItem.sass';

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
        <Rectangle
          text='Actor not found'
          textColor='#FFF'
          width={500}
          height={750}
          secondaryColor='#00FFFF'
          primaryColor='#0000FF'
        />
      )}

      <p>
        <strong>{props.person.name}</strong>
      </p>
      <p>{props.person.character}</p>
    </div>
  );
}

export default ActorItem;
