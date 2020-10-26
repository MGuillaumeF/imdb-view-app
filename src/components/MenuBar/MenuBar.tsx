import React, { ReactElement } from 'react';
import './MenuBar.sass';
const menu = require('../../icons/menu.svg');
function MenuBar(props: { title: string }): ReactElement {
  return (
    <header className='MenuBar'>
      <img src={menu} alt='menu' />
      <h1>{props.title}</h1>
    </header>
  );
}

export default MenuBar;
