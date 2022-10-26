import React, {useEffect, useState} from "react";
import {max, scaleBand, scaleLinear} from "d3";

import XAxis from "./XAxis";
import Bars from "./Bars";
import YAxis from "./YAxis";
import ChartContainer from "../ChartContainer";
import {roundVal} from "../../utils";


export const margin = {top: 20, right: 20, bottom: 20, left: 40};
export const width = 640;
export const height = 400;
export const innerWidth = width - margin.left - margin.right;
export const innerHeight = height - margin.top - margin.bottom;
export const barMaxWidth = 55;


const BarChart = ({data, title, xTitle, yTitle}) => {
    const [barChart, setBarChart] = useState(<svg viewBox={`0 0 ${width} ${height}`}/>);

    const nameScale = scaleBand()
        .domain(data.map(d => d[xTitle]))
        .range([0, innerWidth])
        .paddingInner(0.05)
        .paddingOuter(0.1);

    const valScale = scaleLinear()
        .domain([max(data, d => d[yTitle]), 0])
        .range([0, innerHeight]);

    const generateBarChart = () => (
        <svg viewBox="0 0 640 400">
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis valScale={valScale}/>
                <YAxis nameScale={nameScale}/>
                <Bars data={data} xTitle={xTitle} yTitle={yTitle}
                      nameScale={nameScale} valScale={valScale}
                />
            </g>
        </svg>
    );

    useEffect(() => {
        setBarChart(generateBarChart());
        // eslint-disable-next-line
    }, [data]);

    return (
        <ChartContainer title={title}>
            {barChart}
        </ChartContainer>
    );
};


export default React.memo(BarChart);
