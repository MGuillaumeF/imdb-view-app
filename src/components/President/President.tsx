import React from 'react';
export interface IPresident {
  firstName: string;
  lastName: string;
  country: ECountry;
  isCurrent: boolean;
}

export enum ECountry {
  FRANCE = 'France',
  USA = 'USA',
}

export default function President(props: IPresident) {
  return (
    <ul>
      {Object.entries(props).map((item, index) => {
        return item[1] === false ? null : (
          <li key={index}>
            <strong>{item[0]}</strong> : {`${item[1]}`}
          </li>
        );
      })}
    </ul>
  );
}
