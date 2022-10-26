import React from "react";
import {innerHeight} from "./ScatterPlot";


const YAxisValue = ({tickValue, y}) => (
    <text style={{textAnchor: "end", fill: "#635f5d"}}
          y={y} dx={"-1em"}>
        {tickValue}
    </text>
);

const YAxis = ({yScale}) => (
    <>
        <line x1={0} x2={0}
              y1={0} y2={innerHeight}
              stroke="#d9d9d9"/>
        {yScale.ticks().map(tickValue =>
            <g key={tickValue}>
                <YAxisValue tickValue={tickValue} y={yScale(tickValue)}/>
            </g>)}
    </>
);


export default YAxis;
