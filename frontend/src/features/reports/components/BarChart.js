import React, {useEffect, useRef} from "react";
import * as Plot from "@observablehq/plot";
import {Typography} from "@mui/material";

const BarChart = ({data, title, xTitle, yTitle}) => {
    const ref = useRef();

    console.log(data);

    for(let row of data){
        let title = row[xTitle]
        if (title.length > 10)
            row[xTitle] = title.substring(0, 7)+('...');
    }
    console.log(data);

    useEffect(() => {
        const barChart = Plot.plot({
            marks: [
                Plot.ruleY([1/data.length]),
                Plot.barY(data, {
                    x: xTitle, y: yTitle,
                    sort: {x: 'y', reverse: true},
                    fill: 'steelblue'
                }),
            ],
            y: {grid: true},
            marginBottom: 40
        });

        ref.current.append(barChart);
        return () => barChart.remove();
    }, [data]);

    return (
        <div>
            <Typography align="center" variant="h6">{title}</Typography>
            <div style={{fontSize: 11}} ref={ref} />
        </div>
    )
};


export default BarChart;
