import React, {useEffect, useState} from "react";
import {Box, Grid} from "@mui/material";

import './Home.css';

import Gamepad from "assets/home-gamepad.png";
import {getTopFieldData} from "features/reports/services";
import BarPieChart from "features/reports/components/BarPieChart";


const Home = () => {
    const [pieChart, setPieChart] = useState(<svg/>);

    useEffect(() => {
        getTopFieldData({field: 'genre'})
            .then(r => setPieChart(
                <BarPieChart xTitle="genre" yTitle="sales"
                             title="" data={r.data}
                             border={''}/>
                )
            )
    }, []);

    const gamepadOnClick = () => {
        const gamepad = document.getElementById('gamepad');
        gamepad.classList.add('gamepad-animation');

        gamepad.addEventListener('animationend', () => {
            gamepad.classList.remove('gamepad-animation');
        })
    };

    return(
        <>
        <Grid container textAlign="center"
              paddingTop="5vh"
              alignItems="center">
            <Grid item xs={12} md={9}
                  color="#1976d2"
                  className="text"
                  alignSelf="start">
                <Box maxWidth="400px" margin="auto">
                    <div className="title">
                        Games Sales Analysis
                    </div>
                    <div className="paragraph">
                        Provides Games Sales info from &nbsp;
                        <a href="https://www.kaggle.com/datasets/rush4ratio/video-game-sales-with-ratings">
                            this
                        </a>
                        &nbsp; data set
                    </div>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} alignSelf="end">
                <div className="pie-chart">
                    {pieChart}
                </div>
            </Grid>
            <Grid item xs={12} md={6} alignSelf="end">
                <img id="gamepad" src={Gamepad} alt="Gamepad"
                     className="gamepad"
                     onClick={gamepadOnClick}
                />
            </Grid>
        </Grid>
        <div className="background"></div>
        </>
    );
};


export default Home;
