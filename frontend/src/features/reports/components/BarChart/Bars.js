import React from "react";
import * as d3 from "d3";

import {roundVal} from "../../utils";
import {PLOT_DATA_COLORS} from "../../constants";
import {innerHeight, barMaxWidth} from "./BarChart";


const Bar = ({yScale, xScale, xVal, yVal, width, color}) => {
    const x = yScale(xVal);
    const y = xScale(yVal);
    const height = innerHeight - xScale(yVal);

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

const Bars = ({data, xTitle, yTitle, yScale, xScale}) => {
    const width = Math.min(yScale.bandwidth(), barMaxWidth);
    const colors = d3.shuffle(PLOT_DATA_COLORS);
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d[xTitle]))
        .range(colors);


    return (data.map((d) =>
            <Bar key={d[xTitle]} width={width} xVal={d[xTitle]} yVal={d[yTitle]}
                 yScale={yScale} xScale={xScale} color={color(d[xTitle])}/>
        )
    );
};


export default Bars;
