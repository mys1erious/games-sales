import React, {useEffect, useState} from "react";
import * as d3 from "d3";

import PlotContainer from "../PlotContainer";
import Points from "./Points";
import XAxis from "./XAxis";
import YAxis from "../ScatterPlot/YAxis";


const width = 640*1.5;
const height = 400*1.5;
const margin = {top: 20, right: 20, bottom: 20, left: 40};
export const innerWidth = width - margin.left - margin.right;
export const innerHeight = height - margin.top - margin.bottom;
const viewBox = `0 0 ${width} ${height}`;
export const barMaxWidth = 55;


const ScatterBarPlot = ({data, title, xTitle, yTitle, xyTitle}) => {
    const [plot, setPlot] = useState(<svg viewBox={viewBox}/>);

    const xValues = Object.keys(data);

    let yValues = [];
    for (const obj of Object.values(data)){
        for (const game of Object.values(obj)){
            yValues.push(game[yTitle])
        }
    }

    const xScale = d3.scaleBand()
        .domain(xValues)
        .range([0, innerWidth])
        .paddingOuter(0.2);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(yValues))
        .range([innerHeight, 0])
        .nice();

    const generateScatterPlot = () => (
        <svg viewBox={viewBox}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis scale={xScale}/>
                <YAxis scale={yScale}/>
                <Points data={data} xyTitle={xyTitle}
                        xTitle={xTitle} yTitle={yTitle}
                      yScale={yScale} xScale={xScale}
                />
            </g>
        </svg>
    );

    useEffect(() => {
        setPlot(generateScatterPlot());
        // eslint-disable-next-line
    }, [data]);

    return (
        <PlotContainer title={title}>
            {plot}
        </PlotContainer>
    );
};


export default React.memo(ScatterBarPlot);
