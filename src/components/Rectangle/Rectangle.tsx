import React, { ReactElement } from "react";

interface IRectangle {
  /**
   * The main color of rectangle
   */
  primaryColor: string;
    /**
   * The sencond color of rectangle
   */
  secondaryColor: string;
  /**
   * The color of text in the middle of rectangle
   */
  textColor: string;
  /**
   * The Height of SVG
   */
  height: number;
  /**
   * The Width of SVG
   */
  width: number;
  /**
   * Th text to print to the user
   */
  text: string;
}

export default function Rectangle(props: IRectangle): ReactElement {
    const id = `tt${Date.now()}`.slice(0, -2);
  return (
    <svg
      viewBox={`0 0 ${props.width} ${props.height}`}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className='Rectangle'
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="45%" y2="45%">
          <stop
            offset="10%"
            style={{ stopColor: props.secondaryColor, stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: props.primaryColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <rect
        width={props.width}
        height={props.height}
        fill={`url(#${id})`}
        style={{ strokeWidth: 3, stroke: "#000000" }}
      />
      Sorry, your browser does not support inline SVG.
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Helvetica,Verdana, Arial, sans-serif"
        fontSize="50"
        fill={props.textColor}
      >
        {props.text}
      </text>
    </svg>
  );
}
