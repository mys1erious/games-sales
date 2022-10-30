import React from "react";
import {innerWidth, innerHeight} from "./ScatterPlot";


const XAxisValue = ({value, x}) => (
    <text style={{textAnchor: "end", fill: "#635f5d"}} dy="1em" x={x}>
        {value}
    </text>
);

const XAxis = ({scale}) => (
    <>
        <line x1={0} x2={innerWidth}
              y1={innerHeight} y2={innerHeight}
              stroke="#d9d9d9"/>
        {scale.ticks().map(value =>
            <g key={value} transform={`translate(${0}, ${innerHeight})`}>
                <XAxisValue value={value} x={scale(value)}/>
            </g>
        )}
    </>
);


export default XAxis;
