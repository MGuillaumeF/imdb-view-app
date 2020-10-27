import React, { ReactElement } from 'react';
import ActorItem, { IActorItemProps } from '../ActorItem/ActorItem';
import './ActorList.sass';


interface IActorListProps {
  /**
   * Actor item props list 
   */
  actors: IActorItemProps[];
}

/**
 * Function to create Actor List 
 * @param actors list of actors
 */
function ActorList({ actors }: IActorListProps): ReactElement {
  return (
    <div className={'ActorList'}>
      {actors.map((actor: any) => (
        <ActorItem key={actor.id} person={actor} />
      ))}
    </div>
  );
}

export default ActorList;
