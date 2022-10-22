import React from "react";
import {innerHeight} from "./BarChart";


const DEFAULT_BAR_COLOR = '#46abdb';
const SELECTED_BAR_COLOR = '#1696d2';
const STROKE_BAR_COLOR = '#12719e';


const Bar = ({nameScale, valScale, xVal, yVal, width}) => {
    const x = nameScale(xVal);
    const y = valScale(yVal);
    const height = innerHeight - valScale(yVal);

    const onMouseOver = (e) => {
        e.target.style.fill = {SELECTED_BAR_COLOR};
        e.target.nextElementSibling.style.display = 'inline';
    };

    const onMouseOut = (e) => {
        e.target.style.fill = DEFAULT_BAR_COLOR;
        e.target.nextElementSibling.style.display = 'none'
    };

    return (
        <g>
            <rect x={x} y={y} width={width} height={height}
                fill={DEFAULT_BAR_COLOR} stroke={STROKE_BAR_COLOR}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            />
            <text x={x} y={y+(height/2)} fontSize={11}
                  cursor="default" pointerEvents="none"
                  stroke="#000000" display="none">
                {yVal}
            </text>
        </g>
    );
}

const Bars = ({data, xTitle, yTitle, nameScale, valScale}) => {
    const width = nameScale.bandwidth();
    return (data.map((d) =>
            <Bar key={d[xTitle]} width={width} xVal={d[xTitle]} yVal={d[yTitle]}
                 nameScale={nameScale} valScale={valScale}/>
        )
    );
};


export default Bars;
