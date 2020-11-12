import React, { ReactElement, ReactNode } from 'react';

export interface ITCell {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  rawContent: string;
  content?: ReactNode;
  onClick?: Function;
  header?: boolean;
  children?: ReactNode;
  col?: number;
}

function DataCell(props: ITCell): ReactElement {
  function onClick() {
    if (props.onClick) {
      props.onClick();
    }
  }
  return <td onClick={onClick}>{props.children}</td>;
}
function HeaderCell({children, ...props}: ITCell): ReactElement {
  function onClick() {
    if (props.onClick) {
      props.onClick();
    }
  }
  return <th onClick={onClick}>{children}</th>;
}

export default function TCell(props: ITCell): ReactElement {
  function onClick() {
    if (props.onClick) {
      props.onClick({ id: props.id, col: props.col });
    }
  }
  const Comp = props.header ? HeaderCell : DataCell;
  return (
    <Comp
      id={props.id}
      col={props.col}
      onClick={onClick}
      rawContent={props.rawContent}
      content={props.content}
    >
      {props.content || props.rawContent}
    </Comp>
  );
}
