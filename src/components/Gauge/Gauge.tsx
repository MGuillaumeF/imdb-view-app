import React, { ReactElement } from "react";
import "./Gauge.sass";

interface IGauge {
  /**
   * The value of gauge
   */
  note: number;
  /**
   * The min end of Gauge
   */
  min?: number;
  /**
   * The max end of Gauge
   */
  max?: number;
  /**
   * To add CSS in props
   */
  style?: React.CSSProperties;
}

export default function Gauge(props: IGauge): ReactElement {
  const angleOffset = Math.PI / 2;
  const radius = 150;

  let max = props.max || 100;
  let min = props.min || 0;
  let note = props.note;
  if (min > max) {
    min = 0;
    max = 100;
    console.error("Invalid définition of min and max values");
  }
  if (note > max) {
    note = max;
    console.error("Note out of max range");
  }
  if (note < min) {
    note = min;
    console.error("Note out of min range");
  }
  const totalRange = max - min;
  const valueRange = note - min;
  const ratio = valueRange / totalRange;

  const angle = ratio * 2 * Math.PI;

  enum ECOLORS {
    GREEN = 'green',
    RED = 'red',
    WHITE = 'white'
  }

  function getColor() : ECOLORS {
    let color = ECOLORS.WHITE;
    if (ratio > 0.75) {
      color = ECOLORS.GREEN;
    } else if (ratio < 0.5) {
      color = ECOLORS.RED;
    }
    return color;
  }
  function getXValue() {
    console.log("COS", note, angle, Math.cos(angle + angleOffset));
    return 200 + Math.cos(angle + angleOffset) * radius;
  }
  function getYValue() {
    console.log("SIN", note, angle, Math.sin(angle + angleOffset));
    return 50 + Math.sin(angle + angleOffset) * radius;
  }
  return (
    <svg
      className="Gauge"
      style={{ ...props.style }}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <title>Note</title>
      <desc>Gauge of percent satisfaction</desc>

      <path d="M0 200 a 200 200 0 1 0 0 -1 z" />
      <path
        d={`M200 50 A 150 150 0 1 0 ${350} ${200}`}
        fill="transparent"
        stroke={getColor()}
        strokeWidth="20"
      />      
      <text
        x="200"
        y="200"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Verdana"
        fontSize="100"
        fill={getColor()}
      >
        {note}
      </text>
    </svg>
  );
}
