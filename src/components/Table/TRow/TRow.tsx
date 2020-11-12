import React, { ReactElement } from 'react';
import TCell, { ITCell } from '../TCell/TCell';

export interface ITRow extends React.HTMLProps<HTMLTableRowElement> {
  onClickOnRow?: (target: {
    row: string;
    col: { id: string; index: number };
  }) => void;
  cells: ITCell[];
  id: string;
}

export default function TRow({
  onClickOnRow,
  cells,
  ...props
}: ITRow): ReactElement {
  function onClickCell({ id, col }: any) {
    if (onClickOnRow) {
      onClickOnRow({ row: props.id, col: { id, index: col } });
    }
  }
  return (
    <tr {...props}>
      {cells.map((cell, index) => {
        return (
          <TCell
            key={cell.id}
            id={cell.id}
            col={index}
            content={cell.content}
            rawContent={cell.rawContent}
            onClick={onClickOnRow ? onClickCell : undefined}
            header={cell.header}
          />
        );
      })}
    </tr>
  );
}
