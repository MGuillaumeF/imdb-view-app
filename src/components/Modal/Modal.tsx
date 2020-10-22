import React, { ReactElement, ReactNode } from 'react';
import './Modal.sass';
interface IModalProps {
  onClose: Function;
  children: ReactNode;
}

export default function Modal(props: IModalProps): ReactElement {
  const onFadeClick = () => {
    props.onClose();
  };
  const onPopClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <div className='ModalFade' onClick={onFadeClick}>
      <div className='ModalContent' onClick={onPopClick}>
        {props.children}
      </div>
    </div>
  );
}
