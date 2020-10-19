import React, { ReactElement } from 'react'
import './Table.sass'

interface ICell {
    id : string;
    className? : string;
    style? : React.CSSProperties;
    content : string;
    onClick? : Function;
    header? : boolean;
}

export interface IRow {
    id : string;
    className? : string;
    style? : React.CSSProperties;
    onClick? : Function;
    cells : ICell[]
}

function DataCell(props: {children : React.ReactNode}): ReactElement {
    return <td>{props.children}</td>
}
function HeaderCell(props: {children : React.ReactNode}): ReactElement {
    return <th>{props.children}</th>
}


function Cell(props: ICell): ReactElement {
    const Comp = props.header ? HeaderCell : DataCell;
    return <Comp>{props.content}</Comp>
}

function Row(props: IRow): ReactElement {
return <tr id={props.id} className={props.className}>{props.cells.map((cell)=>{
    return <Cell key={cell.id} id={cell.id} content={cell.content} onClick={cell.onClick} header={cell.header} />

})}</tr>
}

interface ITable {
    id? : string;
    className? : string;
    style? : React.CSSProperties;
    onClick? : Function;
    onChange? : Function;
    hRows? : IRow[];
    bRows? : IRow[];
    fRows? : IRow[];
    isSortable? : boolean;
    isFiltrable? : boolean;
}


function TableHeader({isSortable, hRows}: ITable): ReactElement {
    return <thead>
    {
        hRows ? hRows.map((row : IRow) => {return <Row className={isSortable ? 'sortable' : undefined} key={row.id} id={row.id} cells={row.cells} />})  : null
    }
    </thead>

}

function TableBody({bRows}: ITable): ReactElement {
    return <tbody>
    {
        bRows ? bRows.map((row : IRow) => {return <Row key={row.id} id={row.id} cells={row.cells} />})  : null
    }
    </tbody>
}
function TableFooter({fRows}: ITable): ReactElement {
    return <tbody>
    {
        fRows ? fRows.map((row : IRow) => {return <Row key={row.id} id={row.id} cells={row.cells} />})  : null
    }
    </tbody>
}

function Table({ isSortable, hRows, bRows, fRows, ...props}: ITable): ReactElement {
    return (
        <table>
            <TableHeader isSortable={isSortable} hRows={hRows}/>
            <TableBody bRows={bRows}/>
            <TableFooter fRows={fRows}/>            
        </table>
    )
}

export default Table
