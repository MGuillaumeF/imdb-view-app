import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import './SearchBar.sass';

interface ISearchBarProps {
  /**
   * The callback of search bar when enter or button is clicked
   */
  onSearch: Function;
}

/**
 * The Search bar component with 
 * @param props
 */
export default function SearchBar({ onSearch }: ISearchBarProps): ReactElement {
  const [currentValue, setCurrentValue] = useState<string>('');
  const updateIfemptySearchValue = () => {
    if (currentValue.trim() === '') {
      onClick();
    }
  };
  useEffect(updateIfemptySearchValue, [currentValue]);
  const onClick = () => {
    onSearch(currentValue);
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClick();
  };
  return (
    <form className='SearchBar' onSubmit={onSubmit}>
      <input
        placeholder='Search'
        type='text'
        value={currentValue}
        onChange={onChange}
      />
      <button onClick={onClick}>Search</button>
    </form>
  );
}
