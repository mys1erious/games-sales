import React from "react";
import {innerHeight} from "./BarChart";


const nameShortener = (name) => (
    name.length > 9
        ? name.substring(0, 7) + ('..')
        : name
);

const BarName = ({nameScale, tickValue}) => (
    <text style={{textAnchor: "middle", fill: "#635f5d"}}
          x={nameScale(tickValue) + (nameScale.bandwidth()/2)}
          y={innerHeight} dy="1em">
        {nameShortener(tickValue)}
    </text>
);

const YAxis = ({nameScale}) => (
    nameScale.domain().map(tickValue =>
        <BarName key={tickValue} tickValue={tickValue}
                 nameScale={nameScale}
        />
    )
);


export default YAxis;
