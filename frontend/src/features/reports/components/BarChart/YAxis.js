import React from "react";
import {nameShortener} from "../../utils";
import {innerHeight, barMaxWidth} from "./BarChart";


const BarName = ({yScale, tickValue}) => (
    <text style={{textAnchor: "middle", fill: "#635f5d"}}
          x={yScale(tickValue) + (Math.min(yScale.bandwidth(), barMaxWidth) / 2)}
          y={innerHeight} dy="1em">
        {nameShortener(tickValue, 9)}
    </text>
);

const YAxis = ({yScale}) => (
    yScale.domain().map(tickValue =>
        <BarName key={tickValue} tickValue={tickValue}
                 yScale={yScale}
        />
    )
);


export default YAxis;
