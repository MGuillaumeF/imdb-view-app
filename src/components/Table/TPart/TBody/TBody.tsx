import React, { ReactElement } from 'react'
import TRow, { ITRow } from '../../TRow/TRow'

interface ITableBody {
    rows : ITRow[];
}

export default function TableBody({rows}: ITableBody): ReactElement {
    return <tbody>
    {
        rows ? rows.map((row : ITRow) => {return <TRow key={row.id} id={row.id} cells={row.cells} />})  : null
    }
    </tbody>
}