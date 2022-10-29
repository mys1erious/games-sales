import React from "react";
import {innerHeight} from "./LineChart";


const YAxisValue = ({value, y}) => (
    <text style={{textAnchor: "end", fill: "#635f5d"}}
          y={y} dx={"-1em"}>
        {value}
    </text>
);

const YAxis = ({scale}) => (
    <>
        <line x1={0} x2={0}
              y1={0} y2={innerHeight}
              stroke="#d9d9d9"/>
        {scale.ticks().map(value =>
            <g key={value}>
                <YAxisValue value={value} y={scale(value)}/>
            </g>)}
    </>
);


export default YAxis;
