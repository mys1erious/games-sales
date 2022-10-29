import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {Box, Grid} from "@mui/material";

import {
    getGamesAnnuallyData,
    getGamesByFieldsData,
    getScoreData,
    getTopFieldsData
} from "../services";
import {initPlotVals, PLOTS} from "../constants";
import ShowChartButtons from "./ShowChartButtons";
import DescribeTable from "./DescribeTable";
import {BarPieChartGridItems} from "./BarPieChart";
import {ScatterPlotGridItem} from "./ScatterPlot";
import {LineChartGridItem} from "./LineChart";
import {ScatterBarPlotGridItem} from "./ScatterBarPlot";


const ReportBody = () => {
    console.log('--RENDERED: report body')
    const [searchParams] = useSearchParams({});

    const [plots, setPlots] = useState(initPlotVals);
    const [topFieldsData, setTopFieldsData] = useState({});
    const [scoreData, setScoreData] = useState({});
    const [gamesAnnuallyData, setGamesAnnuallyData] = useState({});
    const [gamesByFieldData, setGamesByFieldData] = useState({});

    useEffect(() => {console.log(gamesByFieldData)}, [gamesByFieldData])

    useEffect(() => {
        getTopFieldsData(searchParams)
            .then(data => setTopFieldsData(data));
        getScoreData(searchParams)
            .then(r => setScoreData(r.data));
        getGamesAnnuallyData(searchParams)
            .then(r => setGamesAnnuallyData(r.data));
        getGamesByFieldsData(searchParams)
            .then(data => setGamesByFieldData(data));
    }, [searchParams]);

    return(
        <Box border="1px solid gray">
            <ShowChartButtons charts={plots} setCharts={setPlots}/>
            <div id="reportBody">
                <DescribeTable />

                <Grid container rowGap={2} justifyContent="center">
                    <BarPieChartGridItems
                        plots={plots}
                        data={topFieldsData}/>
                    <LineChartGridItem
                        plot={plots[PLOTS.GAMES_ANNUALLY]}
                        data={gamesAnnuallyData}/>
                </Grid>
                <Grid container rowGap={2} justifyContent="center">
                    <ScatterBarPlotGridItem
                        plot={plots[PLOTS.TOP_GAMES_BY_GENRE]}
                        data={gamesByFieldData}
                    />
                    <ScatterBarPlotGridItem
                        plot={plots[PLOTS.TOP_GAMES_BY_PLATFORM]}
                        data={gamesByFieldData}
                    />
                </Grid>
                <Grid container rowGap={2} justifyContent="center">
                    <ScatterPlotGridItem
                        plot={plots[PLOTS.SCORE_CORRELATION]}
                        data={scoreData}
                    />
                </Grid>
            </div>
        </Box>
    );
};


export default React.memo(ReportBody);
