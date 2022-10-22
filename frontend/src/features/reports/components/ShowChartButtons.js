import React from "react";
import {Grid} from "@mui/material";
import ShowChartButton from "./ShowChartButton";


// TODO: dont re-render ALL buttons when press 1
const ShowChartButtons = ({charts, setCharts}) => {
    const onChange = (name) => {
        setCharts({
            ...charts,
            [name]: {
                ...charts[name],
                isVisible: !charts[name].isVisible
            }
        })
    };

    return (
        <Grid container justifyContent="center">
            {Object.entries(charts).map(([name, chart]) => (
                <Grid key={`${name}Switch`} item xs={12} sm={4} md={3} lg={2}>
                    <ShowChartButton isVisible={chart.isVisible}
                                     label={chart.title} name={name}
                                     onChange={onChange}
                    />
                </Grid>
            ))}
        </Grid>
    );
};


export default ShowChartButtons;
