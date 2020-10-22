import React, { ReactElement } from 'react';
import ActorItem, { IActorItemProps } from '../ActorItem/ActorItem';
import './ActorList.sass';
interface Props {
  actors: IActorItemProps[];
}

function ActorList({ actors }: Props): ReactElement {
  return (
    <div className={'ActorList'}>
      {actors.map((actor: any) => (
        <ActorItem key={actor.id} person={actor} />
      ))}
    </div>
  );
}

export default ActorList;
