import React from "react";


const BackgroundLine = ({width, y}) => (
    <line x1={0} x2={width} y1={y} y2={y} stroke="#d9d9d9" />
);


const YAxisValue = ({scale, value}) => (
    <text style={{textAnchor: "end", fill: "#635f5d"}}
          x={-3} y={scale(value)} dx={0} dy=".32em">
        {value}
    </text>
);


const YAxis = ({scale, width}) => (
    scale.ticks().map(value =>
        <g key={value}>
            <BackgroundLine width={width} y={scale(value)}/>
            <YAxisValue scale={scale} value={value}/>
        </g>
    )
);


export default YAxis;
