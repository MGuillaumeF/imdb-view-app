import React, { ReactElement } from "react";
import "./ActorItem.sass";
interface IActorItemProps {
  picture?: string;
  person: any;
}

function ActorItem(props: IActorItemProps): ReactElement {
  return (
    <div className="ActorItem">
      <img
        alt="actor"
        src={props.person.profile_path? `https://image.tmdb.org/t/p/w500${props.person.profile_path}` : 'https://via.placeholder.com/200'}
      />

      <p>
        <strong>{props.person.name}</strong>
      </p>
      <p>{props.person.character}</p>
    </div>
  );
}

export default ActorItem;
