import React from "react";
import {innerWidth} from "./BarChart";


const BackgroundLine = () => (
    <line x1={0} x2={innerWidth} y1={0} y2={0} stroke="#d9d9d9" />
);


const XAxisValue = ({tickValue}) => (
    <text style={{textAnchor: "end", fill: "#635f5d"}} dy=".32em" x={-3}>
        {tickValue}
    </text>
);

const XAxis = ({xScale}) => {
    return(xScale.ticks().map(tickValue =>
        <g key={tickValue} transform={`translate(${0}, ${xScale(tickValue)})`}>
            <BackgroundLine />
            <XAxisValue tickValue={tickValue}/>
        </g>
    ))};


export default XAxis;
