import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import './SearchBar.sass';
interface ISearchBarProps {
  onSearch: Function;
}

export default function SearchBar(props: ISearchBarProps): ReactElement {
  const [currentValue, setCurrentValue] = useState('');
  const updateIfemptySearchValue = () => {
    if (currentValue.trim() === '') {
      onClick();
    }
  };
  useEffect(updateIfemptySearchValue, [currentValue]);
  const onClick = () => {
    props.onSearch(currentValue);
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };
  return (
    <div className='SearchBar'>
      <input
        placeholder='Search'
        type='text'
        value={currentValue}
        onChange={onChange}
      />
      <button onClick={onClick}>Search</button>
    </div>
  );
}
