import React from "react";

import {DEFAULT_COLOR, SVG_NAMESPACE} from "../../constants";
import * as d3 from "d3";
import {unslugify} from "../../../core/utils";


const radius = 5;
const stroke = 'black';
const strokeWidth = 2;


const onHoverCircle = (cx, cy) => {
    const circle = document.createElementNS(
        SVG_NAMESPACE,
        'circle'
    );
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', DEFAULT_COLOR);
    circle.setAttribute('stroke', stroke);
    circle.setAttribute('stroke-width', strokeWidth);
    circle.setAttribute('pointer-events', 'none');

    return circle;
};


const Point = ({
    yScale, xScale,
    xVal, yVal,
    xTitle, yTitle,
    color, data
}) => {
    const cx = xScale(xVal);
    const cy = yScale(yVal);

    const onMouseOver = (e) => {
        const circle = onHoverCircle(cx, cy, radius, color, stroke);
        e.target.nextElementSibling.style.display = 'inline';
        e.target.parentNode.parentNode.appendChild(circle);
    };

    const onMouseOut = (e) => {
        e.target.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.lastElementChild);
        e.target.nextElementSibling.style.display = 'none';
    };

    // console.log(cx, cy)
    return (
        <g>
            <path d={d3.line()
                .x(d => xScale(d[xTitle]))
                .y(d => yScale(d[yTitle]))
                .curve(d3.curveCardinal)(data)}
                  fill="none"
                  stroke={DEFAULT_COLOR}
                  strokeWidth={4}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  pointerEvents="none"
            />
            <circle cx={cx} cy={cy} r={radius}
                    fill={color} stroke={stroke}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
            />
            <text x="-35" y="-10"
                  cursor="default"
                  pointerEvents="none"
                  fill="#635f5d"
                  style={{display: "none"}}>
                {`${unslugify(xTitle)}: ${xVal}, ` +
                 `${unslugify(yTitle)}: ${yVal}`}
            </text>
        </g>
    );
}

const Points = ({data, xTitle, yTitle, yScale, xScale}) => (
    <g className="points">
        {data.map((obj, count) =>
            <Point key={count} color={DEFAULT_COLOR}
                   xVal={obj[xTitle]} yVal={[obj[yTitle]]}
                   xScale={xScale} yScale={yScale}
                   xTitle={xTitle} yTitle={yTitle}
                   data={data}
            />)}
    </g>
);


export default Points;
