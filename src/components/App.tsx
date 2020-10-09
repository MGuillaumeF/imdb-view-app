import React, { useState } from 'react';
import President, { ECountry, IPresident } from './President/President';
import PresidentForm from './President/PresidentForm';

export default function App() {
  const [presidents, setPresidents] = useState<IPresident[]>([
    {
      firstName: 'Coco',
      lastName: 'Lastico',
      country: ECountry.FRANCE,
      isCurrent: true,
    },
    {
      firstName: 'Duck',
      lastName: 'Naze',
      country: ECountry.USA,
      isCurrent: true,
    },
  ]);
  const onAddPresident = (
    firstName: string,
    age: number,
    country: ECountry,
    isCurrent: boolean = false
  ) => {
    setPresidents([
      ...presidents,
      {
        firstName: firstName,
        lastName: firstName,
        country: country,
        isCurrent: isCurrent,
      },
    ]);
  };
  return (
    <>
      {presidents.map((president, index) => {
        return <President key={index} {...president} />;
      })}
      <PresidentForm onAddPresident={onAddPresident} />
    </>
  );
}
