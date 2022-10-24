import React from "react";
import {radius} from "./PieChart";
import * as d3 from "d3";


const Line = ({points}) => {
    const space = 2;
    points[2][0] -= space; // Adds space between Line and Label

    return (
        <polyline points={points}
                  opacity={0.5} fill="none"
                  stroke="#635f5d" strokeWidth="2px"
                  pointerEvents="none"/>
    );
};


const Lines = ({pieData, yTitle, getPosSide, outerArc}) => {
    const innerArc = d3.arc()
        .innerRadius(radius * 0.8)
        .outerRadius(radius * 0.4);

    return (
        <g>
            {pieData.map(pieObj =>
                <Line key={pieObj.data[yTitle]}
                      points={[
                          innerArc.centroid(pieObj),
                          outerArc.centroid(pieObj),
                          getPosSide(pieObj)
                      ]}
                />
            )}
        </g>
    );
};


export default Lines;
