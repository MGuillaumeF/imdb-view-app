import React, { ReactElement } from 'react';
import './MenuBar.sass';
const menu = require('../../icons/menu.svg');
function MenuBar(): ReactElement {
  return (
    <header className='MenuBar'>
      <img src={menu} alt='menu' />
      <h1>TITLE</h1>
    </header>
  );
}

export default MenuBar;
