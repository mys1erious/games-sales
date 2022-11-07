import React from "react";
import {nameShortener} from "features/core/utils";


const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle)/2;


const Label = ({pos, textAnchor, text}) => (
    <text dy=".35em"
          transform={`translate(${pos})`}
          textAnchor={textAnchor}
          fill="#635f5d">
        {text}
    </text>
);


const Labels = ({pieData, yTitle, xTitle, getPosSide}) => {

    return (
        <g>{pieData.map(pieObj =>
            <Label key={pieObj.data[yTitle]}
                   pos={getPosSide(pieObj)}
                   textAnchor={midAngle(pieObj) < Math.PI ? "start" : "end"}
                   text={nameShortener(pieObj.data[xTitle], 18)}
            />)}
        </g>
    );
};


export default Labels;
