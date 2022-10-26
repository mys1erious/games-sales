import React from "react";

import {DEFAULT_COLOR, SVG_NAMESPACE} from "../../constants";
import {zip} from "../../utils";
import {unslugify} from "../../../core/utils";


const radius = 10;
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
    color
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

    return (
        <g>
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
        {zip(data[xTitle], data[yTitle]).map(([x, y], count) =>
            <Point key={count} color={DEFAULT_COLOR}
                   xVal={x} yVal={y}
                   xScale={xScale} yScale={yScale}
                   xTitle={xTitle} yTitle={yTitle}
            />)}
    </g>
);


export default Points;
