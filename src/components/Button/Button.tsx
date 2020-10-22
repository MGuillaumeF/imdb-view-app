import React, { CSSProperties, ReactElement } from 'react';
import './Button.sass';

interface IButtonProps {
  /**
   * The callback when button is clicked
   */
  onClick?: Function;
  /**
   * The button is an input with type submit
   */
  submit?: boolean;
  /**
   * The text content of button
   */
  name?: string;
  /**
   * The style of button
   */
  style?: CSSProperties;
  /**
   * The CSS class of button
   */
  className?: string;
}

/**
 * The Buttoncomponent with
 * @param props
 */
export default function Button({
  name,
  submit,
  className,
  onClick,
  style
}: IButtonProps): ReactElement {
  return (
    <>
      {submit ? (
        <input
          type='submit'
          value={name}
          className={className || 'Button'}
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
          style={{ ...style }}
        />
      ) : (
        <button
          className={className || 'Button'}
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
          style={{ ...style }}
        >
          {name}
        </button>
      )}
    </>
  );
}
