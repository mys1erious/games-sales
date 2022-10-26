import React from "react";
import {innerWidth, innerHeight} from "./ScatterPlot";


const XAxisValue = ({tickValue, x}) => (
    <text style={{textAnchor: "end", fill: "#635f5d"}} dy="1em" x={x}>
        {tickValue}
    </text>
);

const XAxis = ({xScale}) => (
    <>
        <line x1={0} x2={innerWidth}
              y1={innerHeight} y2={innerHeight}
              stroke="#d9d9d9"/>
        {xScale.ticks().map(tickValue =>
            <g key={tickValue} transform={`translate(${0}, ${innerHeight})`}>
                <XAxisValue tickValue={tickValue} x={xScale(tickValue)}/>
            </g>
        )}
    </>
);


export default XAxis;
