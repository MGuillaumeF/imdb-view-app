import React, { ReactElement, ReactNode } from 'react';
import './Modal.sass';

interface IModalProps {
  /**
   * Function called when popup is closed
   */
  onClose: Function;
  /**
   * Children of componnnt  Modal to display as content of popup
   */
  children: ReactNode;
}

/**
 * 
 * @param props Function to whrite popup Component
 */
export default function Modal(props: IModalProps): ReactElement {

  /**
   * Function called when out of pop p is clicked
   */
  const onFadeClick = () => {
    props.onClose();
  };

  /**
   * Function to listen click on popup
   * @param event 
   */
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
