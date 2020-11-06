import React, { ReactElement } from 'react';
import './MenuBar.sass';
import menu from '../../icons/menu.svg';

interface IMenuBarProps {
  /**
   * The title of MenuBar
   */
  title: string;
}

/**
 * Function to create Menu component
 * @param props  All data of MenuBar definition
 */
function MenuBar(props: IMenuBarProps): ReactElement {
  return (
    <header className='MenuBar'>
      <img src={menu} alt='menu' />
      <h1>{props.title}</h1>
    </header>
  );
}

export default MenuBar;
