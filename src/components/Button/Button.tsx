import React, { HTMLProps, ReactElement } from 'react';
import './Button.sass';

/**
 * Enumerate for button types
 */
export enum EBUTTON_TYPE {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'submit'
}

export interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  /**
   * The button type ("button" by default)
   */
  type?: EBUTTON_TYPE;
}

/**
 * The Button component
 * @param props
 */
export default function Button(props: IButtonProps): ReactElement {
  return (
    <button
      {...props}
      type={props.type || EBUTTON_TYPE.BUTTON}
      className={props.className || 'Button'}
    >
      {props.children || props.name}
    </button>
  );
}
