import React, { ReactElement } from "react";
import "./ActorItem.sass";
export interface IActorItemProps {
  picture?: string;
  person: any;
}

function ActorItem(props: IActorItemProps): ReactElement {
  return (
    <div className="ActorItem">
      <img
        alt="actor"
        src={props.person.profile_path? `https://image.tmdb.org/t/p/w500${props.person.profile_path}` : require('../../res/icons/no_actor.svg')}
      />

      <p>
        <strong>{props.person.name}</strong>
      </p>
      <p>{props.person.character}</p>
    </div>
  );
}

export default ActorItem;
