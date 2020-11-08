import React, { HTMLProps, ReactElement, ReactNode, useState } from 'react';
import { Button } from '../Button';
import { IButtonProps } from '../Button/Button';
import './ToggleButtonGroup.sass';

interface IToggleButtonProps extends IButtonProps {
  id: string;
  value: string;
  objectContent?: ReactNode;
}

interface IToggleButtonGroupProps extends HTMLProps<HTMLDivElement> {
  buttons: IToggleButtonProps[];
  onChangeToggle: (value: string) => void;
  defaultValue?: string;
}

export default function ToggleButtonGroup({
  buttons,
  onChangeToggle,
  defaultValue,
  ...props
}: IToggleButtonGroupProps): ReactElement {
  const [activeButton, setActiveButton] = useState<string>(defaultValue || '');
  return (
    <div className='ToggleButtonGroup' {...props}>
      {buttons.map(
        ({
          value,
          objectContent,
          onClick,
          ...buttonProps
        }: IToggleButtonProps) => {
          return (
            <Button
              {...buttonProps}
              key={buttonProps.id}
              onClick={(e) => {
                if (onClick) {
                  onClick(e);
                }
                setActiveButton(value);
                onChangeToggle(value);
              }}
              className={`${buttonProps.className || 'Button'} ${
                activeButton === value ? 'active' : ''
              }`}
            >
              {objectContent || value}
            </Button>
          );
        }
      )}
    </div>
  );
}
