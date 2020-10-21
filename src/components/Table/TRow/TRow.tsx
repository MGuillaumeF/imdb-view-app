import React, { ReactElement } from 'react'
import TCell, { ITCell } from '../TCell/TCell';


export interface ITRow {
    id : string;
    className? : string;
    style? : React.CSSProperties;
    onClick? : Function;
    cells : ITCell[]
}

export default function TRow(props: ITRow): ReactElement {
    function onClickCell({id , col} : any) {
        if (props.onClick) {
            props.onClick({row : props.id, col : { id, index : col}});
        }
    }
    return <tr id={props.id} className={props.className}>{props.cells.map((cell, index)=>{
        return <TCell key={cell.id} id={cell.id} col={index} content={cell.content} onClick={onClickCell} header={cell.header} />
    
    })}</tr>
    }