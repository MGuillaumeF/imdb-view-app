import React, { ReactElement, useEffect, useState } from 'react'
import './Table.sass'
import TableBody from './TPart/TBody/TBody';
import TableFooter from './TPart/TFoot/TFoot';
import TableHeader from './TPart/THead/THead';
import { ITRow } from './TRow/TRow';

function copy(data : any) {
    return JSON.parse(JSON.stringify(data));
}




interface ITable {
    id? : string;
    className? : string;
    style? : React.CSSProperties;
    onClick? : Function;
    onChange? : Function;
    hRows? : ITRow[];
    bRows? : ITRow[];
    fRows? : ITRow[];
    isSortable? : boolean;
    isFiltrable? : boolean;
}




function Table({ isSortable, hRows, bRows, fRows, ...props}: ITable): ReactElement {
    const [displayedRows, setDisplayedRows] = useState<ITRow[]>(bRows || []);

    useEffect(() => {
        setDisplayedRows(bRows || [])
    }, [bRows])
    function sortRowsByCol(rows : any, col : any, alpha : boolean) {
        let tb = rows.map((element : any, index : number) => {
            return {content : element.cells[col.index].content, rowIndex : index}
        })
        tb.sort((a : any, b : any) => {
            const direction = alpha ? -1 : 1 
            let r = 0;
            const aC = a.content;
            const bC = b.content;
            if (typeof aC === 'string' && typeof bC === 'string') {
                r = aC.toLowerCase().localeCompare(bC.toLowerCase());
            } else if (!isNaN(aC) && !isNaN(bC)) {
                if (aC > bC) {
                    r = -1
                } else if (aC < bC) {
                    r = 1
                }
            }
            return r * direction;
        })
        let startRows = copy(rows);
        let tmpRows : any = [];
        tb.forEach((element : any, index : number) => {
            tmpRows.push(startRows[element.rowIndex])
        });
        return copy(tmpRows);
    }

    function onSort(sortMap : any) {
        let tb : any = [];
        sortMap.forEach((value : any, key : string, map : Map<string, any>) => {
            tb.push(value);
        });

        tb.sort((a : any, b : any) => {
            if (a.priority < b.priority) {
                return -1
            } else if (a.priority > b.priority) {
                return 1
            }
            return 0
        })
        let tmpRows = copy(displayedRows);
        tb.forEach((element : any, index : number) => {
            tmpRows = sortRowsByCol(tmpRows, element.col, element.alpha);
        });
        setDisplayedRows(tmpRows);
    }
    return (
        <table>
            <TableHeader isSortable={!!isSortable} rows={hRows || []} onSort={onSort}/>
            <TableBody rows={displayedRows || []}/>
            <TableFooter rows={fRows || []}/>            
        </table>
    )
}

export default Table
