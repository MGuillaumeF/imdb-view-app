import React, { ReactElement } from 'react'
import Movie from '../../model/Movie'
import './Modal.sass'
interface IModalProps {
    data : Movie
}

export default function Modal(props: IModalProps): ReactElement {
    return (
        <div className="ModalFade">
            <div className="ModalContent">
                <button>Ajouter aux favories</button>
                <h1>{props.data.title}</h1>
                <p>props.data.details</p>
            </div> 
        </div>
    )
}
