import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {Box, Grid} from "@mui/material";

import DataLoadingItem from "features/core/components/DataLoadingItem";

import {getAnalysisData} from "../services";
import {initChartsVal, initialAnalysisData} from "../constants";
import ShowChartButtons from "./ShowChartButtons";
import DescribeTable from "./DescribeTable";


const ReportBody = () => {
    console.log('--RENDERED: report body')
    const [searchParams] = useSearchParams({});
    const [analysisData, setAnalysisData] = useState(initialAnalysisData);
    const [charts, setCharts] = useState(initChartsVal);

    useEffect(() => {
        getAnalysisData(searchParams).then(r => {
            setAnalysisData(r.data);
        });
    }, [searchParams]);

    const getBarPieChart = (data, title, xTitle, yTitle, Chart) =>
            <Chart data={data} title={title}
                   xTitle={xTitle} yTitle={yTitle}/>;

    if (!analysisData)
        return(<DataLoadingItem />);

    return(
        <Box border="1px solid gray">
        <ShowChartButtons charts={charts} setCharts={setCharts}/>

        <div id="reportBody">
        <Grid container rowGap={2} justifyContent="center">
            <Grid item xs={12}>
                {analysisData.description
                    ? <DescribeTable data={analysisData.description} />
                    : <DataLoadingItem />
                }
            </Grid>

            {Object.entries(charts).map(
                ([name, chart]) => (
                    chart.isVisible &&
                    <Grid key={name} item xs={12} md={6} xl={4}>
                        {getBarPieChart(
                            analysisData[chart.dataProp],
                            chart.title,
                            chart.xTitle,
                            chart.yTitle,
                            chart.component
                        )}
                    </Grid>
                )
            )}
        </Grid>
        </div>
        </Box>
    );
};


export default React.memo(ReportBody);
