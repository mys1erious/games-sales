import React, {useEffect, useState} from "react";
import * as d3 from "d3";

import PlotContainer from "../PlotContainer";
import Slices from "./Slices";
import Labels from "./Labels";
import Lines from "./Lines";


const width = 640;
const height = 400;
const margin = 20;
const viewBox = `0 0 ${width} ${height}`;
export const radius = Math.min(width, height) / 2-margin;
export const labelOffset = 40;

const outerArc = d3.arc()
    .innerRadius(radius)
    .outerRadius(radius);


const PieChart = ({data, title, xTitle, yTitle}) => {
    const [pieChart, setPieChart] = useState(
        <svg viewBox={viewBox} />
    );

    const pie = d3.pie()
        .value(d => d[yTitle]);
    const pieData = pie(data);

    const getPosSide = pieObj => {
        let pos = outerArc.centroid(pieObj);
        pos[0] < 0
            ? pos[0] -= labelOffset
            : pos[0] += labelOffset;
        return pos;
    };

    const generatePieChart = () => (
        <svg viewBox={viewBox}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {
                    <>
                    <Slices data={data} pieData={pieData}
                            yTitle={yTitle} xTitle={xTitle}/>
                    <Labels pieData={pieData} getPosSide={getPosSide}
                            yTitle={yTitle} xTitle={xTitle}/>
                    <Lines pieData={pieData} getPosSide={getPosSide}
                           yTitle={yTitle} outerArc={outerArc} />
                    </>
                }
            </g>
        </svg>
    );

    useEffect(() => {
        setPieChart(generatePieChart());
        // eslint-disable-next-line
    }, [data]);

    return(
        <PlotContainer title={title}>
            {pieChart}
        </PlotContainer>
    );
};


export default React.memo(PieChart);
