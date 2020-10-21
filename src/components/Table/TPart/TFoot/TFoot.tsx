import React, { ReactElement } from 'react'
import TRow, { ITRow } from '../../TRow/TRow'

interface ITableFooter{
    rows : ITRow[];
}

export default function TableFooter({rows}: ITableFooter): ReactElement {
    return <tfoot>
    {
        rows ? rows.map((row : ITRow) => {return <TRow key={row.id} id={row.id} cells={row.cells} />})  : null
    }
    </tfoot>
}