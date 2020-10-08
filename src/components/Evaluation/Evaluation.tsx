import React, { ReactElement } from 'react';
import './Evaluation.sass';

interface IEvaluationProps {
  note: number;
  min?: number;
  max?: number;
}

export default function Evaluation(props: IEvaluationProps): ReactElement {
  let max = props.max || 100;
  let min = props.min || 0;
  let note = props.note;
  if (min > max) {
    console.error('Invalid définition of min and max values')
    min = 0;
    max = 100;
  }
  if (note > max) {
    note = max;
    console.error('Note out of max range')
  }
  if (note < min) {
    note = min;
    console.error('Note out of min range')
  }
  const totalRange = max - min;
  const valueRange = note - min;
  const ratio = valueRange / totalRange;
  function getColor() {
    let color = 'white';
    if (props.note > max * 0.75) {
      color = 'green';
    } else if (props.note < max * 0.5) {
      color = 'red';
    }
    return color;
  }
  function getXValue() {}
  function gerYValue() {}
  return (
    <svg
      className='Evaluation'
      viewBox='0 0 400 400'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
    >
      <title>Note</title>
      <desc>Gauge of percent satisfaction</desc>

      <path d='M0 200 a 200 200 0 1 0 0 -1 z' />
      <path
        d='M200 50 a 150 150 0 1 0 150 150'
        fill='transparent'
        stroke={getColor()}
        strokeWidth='20'
      />
      <text
        x='200'
        y='200'
        dominantBaseline='middle'
        textAnchor='middle'
        fontFamily='Verdana'
        fontSize='100'
        fill={getColor()}
      >
        {props.note}
      </text>
    </svg>
  );
}
