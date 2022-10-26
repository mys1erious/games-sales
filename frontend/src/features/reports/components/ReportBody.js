import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {Box, Grid} from "@mui/material";

import DataLoadingItem from "features/core/components/DataLoadingItem";

import {getAnalysisData} from "../services";
import {initChartsVal, initialAnalysisData} from "../constants";
import ShowChartButtons from "./ShowChartButtons";
import DescribeTable from "./DescribeTable";
import PlotGridItems from "./PlotGridItems";


const ReportBody = () => {
    console.log('--RENDERED: report body')
    const [searchParams] = useSearchParams({});
    const [analysisData, setAnalysisData] = useState(initialAnalysisData);
    const [reportItems, setReportItems] = useState(initChartsVal);

    useEffect(() => {
        getAnalysisData(searchParams)
            .then(r => setAnalysisData(r.data));
    }, [searchParams]);

    return(
        <Box border="1px solid gray">
            <ShowChartButtons charts={reportItems} setCharts={setReportItems}/>
            <div id="reportBody">
                <Grid container rowGap={2} justifyContent="center">
                    <Grid item xs={12}>
                        {analysisData.description
                            ? <DescribeTable data={analysisData.description} />
                            : <DataLoadingItem />}
                    </Grid>
                    <PlotGridItems charts={reportItems} analysisData={analysisData} />
                </Grid>
            </div>
        </Box>
    );
};


export default React.memo(ReportBody);
