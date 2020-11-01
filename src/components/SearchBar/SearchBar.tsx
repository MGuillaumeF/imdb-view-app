import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import Button, { EBUTTON_TYPE } from '../Button';
import './SearchBar.sass';
import { useTranslation } from 'react-i18next';


interface ISearchBarProps extends React.HTMLProps<HTMLFormElement> {
  /**
   * The callback of search bar when enter or button is clicked
   */
  onSearch: (value: string) => void;
  /**
   * The definition of input in search bar
   */
  inputDefinition?: React.HTMLProps<HTMLInputElement>;
}

/**
 * The Search bar component with
 * @param props
 */
export default function SearchBar({
  onSearch,
  inputDefinition,
  ...props
}: ISearchBarProps): ReactElement {
  const { t } = useTranslation();
  const [currentValue, setCurrentValue] = useState<string>('');
  /**
   * Function to update state if search input is empty
   */
  const updateIfemptySearchValue = () => {
    if (currentValue.trim() === '') {
      onSubmit();
    }
  };
  useEffect(updateIfemptySearchValue, [currentValue]);
  /**
   * Function to update 'value' state
   */
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };
  /**
   * Function when Submit event raised
   * @param event The Submit Event
   */
  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    onSearch(currentValue);
  };
  return (
    <form {...props} className='SearchBar' onSubmit={onSubmit}>
      <input
        placeholder={t('SEARCH')}
        type='text'
        value={currentValue}
        onChange={onChange}
        {...inputDefinition}
        />
      <Button type={EBUTTON_TYPE.SUBMIT} name={t('SEARCH')} />
    </form>
  );
}
