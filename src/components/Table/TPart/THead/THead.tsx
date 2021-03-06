import React, { ReactElement, useState } from 'react';
import TRow, { ITRow } from '../../TRow/TRow';

interface ITableHeader extends React.HTMLProps<HTMLTableSectionElement> {
  dataRows: ITRow[];
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
  dataRows,
  onSort,
  ...props
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
    <thead {...props}>
      {dataRows
        ? dataRows.map((row: ITRow, index: number) => {
            return (
              <TRow
                onClickOnRow={index === 0 ? onClick : undefined}
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
