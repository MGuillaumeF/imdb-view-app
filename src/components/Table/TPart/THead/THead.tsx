import React, { ReactElement, useState } from 'react';
import TRow, { ITRow } from '../../TRow/TRow';

interface ITableHeader {
  rows: ITRow[];
  isSortable: boolean;
  onSort: Function;
}
interface ISort {
  row: string;
  col: string;
  alpha: boolean;
  priority: number;
}
export default function TableHeader({
  isSortable,
  rows,
  onSort
}: ITableHeader): ReactElement {
  const [priority, setPriority] = useState(0);
  const [sort, setSort] = useState<Map<string, ISort>>(
    new Map<string, ISort>()
  );
  function onClick(value: any) {
    const tempMap = new Map(sort);
    const clickedItem = tempMap.get(value.col.id);
    if (clickedItem !== undefined) {
      tempMap.set(value.col.id, {
        ...value,
        alpha: !clickedItem.alpha,
        priority
      });
    } else {
      tempMap.set(value.col.id, { ...value, alpha: true, priority });
    }
    setPriority(priority + 1);
    setSort(tempMap);
    onSort(tempMap);
  }
  return (
    <thead>
      {rows
        ? rows.map((row: ITRow, index: number) => {
            return (
              <TRow
                onClick={index === 0 ? onClick : undefined}
                className={isSortable && index === 0 ? 'sortable' : undefined}
                key={row.id}
                id={row.id}
                cells={row.cells}
              />
            );
          })
        : null}
    </thead>
  );
}
