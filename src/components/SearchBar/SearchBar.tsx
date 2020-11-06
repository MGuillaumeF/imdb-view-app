import React, {
  FormEvent,
  ReactElement,
  useRef
} from 'react';
import Button, { EBUTTON_TYPE } from '../Button';
import './SearchBar.sass';
import { useTranslation } from 'react-i18next';
import more from '../../icons/more.svg'


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
  const searchField = useRef<HTMLInputElement>(null);
  
  /**
   * Function when Submit event raised
   * @param event The Submit Event
   */
  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    onSearch(searchField.current?.value || '');
  };

  return (
    <form {...props} className='SearchBar' onSubmit={onSubmit}>
    <Button className="Button SearchBarMoreButton" type={EBUTTON_TYPE.BUTTON}><img src={more} alt=""/></Button>
      <input
        placeholder={t('SEARCH')}
        type='text'
        ref={searchField}
        {...inputDefinition}
        />
      <Button type={EBUTTON_TYPE.SUBMIT} name={t('SEARCH')} />
    </form>
  );
}
