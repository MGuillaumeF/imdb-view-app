import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import Button from '../Button/Button';
import './SearchBar.sass';

interface ISearchBarProps extends React.HTMLProps<HTMLFormElement> {
  /**
   * The callback of search bar when enter or button is clicked
   */
  onSearch: Function;
  inputDefinition?: React.HTMLProps<HTMLInputElement>;
}

/**
 * The Search bar component with
 * @param props
 */
export default function SearchBar({onSearch, inputDefinition, ...props}: ISearchBarProps): ReactElement {
  const [currentValue, setCurrentValue] = useState<string>('');
  const updateIfemptySearchValue = () => {
    if (currentValue.trim() === '') {
      onSubmit();
    }
  };
  useEffect(updateIfemptySearchValue, [currentValue]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };
  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    onSearch(currentValue);
  };
  return (
    <form {...props} className='SearchBar' onSubmit={onSubmit}>
      <input
        {...inputDefinition}
        placeholder='Search'
        type='text'
        value={currentValue}
        onChange={onChange}
      />
      <Button submit name='Search' />
    </form>
  );
}
