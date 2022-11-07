import React from "react";
import {nameShortener} from "features/core/utils";


const XAxisValue = ({scale, value, barMaxWidth}) => (
    <text style={{textAnchor: "middle", fill: "#635f5d"}}
          x={scale(value) + (Math.min(scale.bandwidth(), barMaxWidth) / 2)}
          y={0} dx={0} dy="1em">
        {nameShortener(value, 9)}
    </text>
);


const XAxis = ({scale, height, barMaxWidth=55}) => (
    scale.domain().map(value =>
        <g key={value} transform={`translate(${0}, ${height})`}>
            <XAxisValue scale={scale} value={value}
                        barMaxWidth={barMaxWidth}/>
        </g>
    )
);



export default XAxis;
