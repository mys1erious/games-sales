import React from "react";

import {innerHeight} from "./BarChart";
import {barMaxWidth} from "./BarChart";
import {nameShortener} from "../../utils";


const BarName = ({nameScale, tickValue}) => (
    <text style={{textAnchor: "middle", fill: "#635f5d"}}
          x={nameScale(tickValue) + (Math.min(nameScale.bandwidth(), barMaxWidth) / 2)}
          y={innerHeight} dy="1em">
        {nameShortener(tickValue, 9)}
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
