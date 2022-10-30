import React from "react";
import {innerWidth, innerHeight, barMaxWidth} from "./ScatterBarPlot";



const XAxisValue = ({value, scale}) => (
    <text style={{textAnchor: "end", fill: "#635f5d"}} dy="1em"
          x={scale(value) + (Math.min(scale.bandwidth(), barMaxWidth) / 2)}
    >
        {value}
    </text>
);

const XAxis = ({scale}) => (
    <>
        <line x1={0} x2={innerWidth}
              y1={innerHeight} y2={innerHeight}
              stroke="#d9d9d9"/>
        {scale.domain().map(value =>
            <g key={value} transform={`translate(${0}, ${innerHeight})`}>
                <XAxisValue value={value} scale={scale}/>
            </g>
        )}
    </>
);


export default XAxis;
