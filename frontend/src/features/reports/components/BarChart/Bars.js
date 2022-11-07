import React from "react";
import * as d3 from "d3";

import {roundVal} from "features/core/utils";
import {PLOT_DATA_COLORS} from "../../constants";


const Bar = ({
    yScale, xScale,
    xVal, yVal,
    width, height,
    color
}) => {
    const x = xScale(xVal);
    const y = yScale(yVal);
    height -= yScale(yVal);

    const onMouseOver = (e) => {
        e.target.style.strokeWidth = "3px";
        e.target.nextElementSibling.style.display = 'inline';
    };

    const onMouseOut = (e) => {
        e.target.style.strokeWidth = "1px";
        e.target.nextElementSibling.style.display = 'none';
    };

    return (
        <g>
            <rect x={x} y={y} height={height} width={width}
                  fill={color} stroke="black"
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
            />
            <text x={x+3} y={y+(height/2)} fontSize={11}
                  cursor="default" pointerEvents="none"
                  fill="#000000" display="none">
                {roundVal(yVal)}
            </text>
        </g>
    );
}

const Bars = ({
    data, maxWidth,
    xTitle, yTitle,
    xScale, yScale,
    height,
}) => {
    const width = Math.min(xScale.bandwidth(), maxWidth);
    const colors = d3.shuffle(PLOT_DATA_COLORS);
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d[xTitle]))
        .range(colors);

    return (data.map((d) =>
            <Bar key={d[xTitle]} color={color(d[xTitle])}
                 width={width} height={height}
                 xVal={d[xTitle]} yVal={d[yTitle]}
                 yScale={yScale} xScale={xScale}
                 />
        )
    );
};


export default Bars;
