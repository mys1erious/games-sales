import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import {
    Box,
    Container,
    Grid,
    Typography
} from "@mui/material";

import {Button} from "features/core/components/Button";
import {getSale} from "features/sales/services";
import SaleDetailTable from "../features/sales/components/SaleDetailTable";


const buttonWidth = "70px";


const SaleDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {saleSlug} = useParams();
    const [sale, setSale] = useState({});

    function getSaleFromState() {
        try {
            setSale(location.state.sale);
        } catch (e) {
            if (e.name === 'TypeError')
                throw new TypeError('Sale hasn\'t been passed through the state.');
        }
        return sale;
    }

    async function handleGetSale() {
        try {getSaleFromState();}
        catch (e) {
            const res = await getSale(saleSlug);
            setSale(res.data);
        }
    }

    useEffect(() => {
        handleGetSale();
    }, [saleSlug]);

    return(
        <Container component="main" maxWidth="xl">
            <Button sx={{width: buttonWidth}} onClick={() => navigate(-1)}>
                Back
            </Button>
            <Box textAlign="center">
                <Typography variant="h4" marginBottom="20px">
                    Sale info:
                </Typography>
                <Grid container textAlign="center">
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5">Sales</Typography>
                        <SaleDetailTable obj={sale} exclude={['game', 'slug']}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5">Game</Typography>
                        {sale.game
                            ? <SaleDetailTable obj={sale.game} exclude={['rating', 'slug']}/>
                            : null}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5">Ratings</Typography>
                        {sale.game?.rating
                            ? <SaleDetailTable obj={sale.game.rating}/>
                            : null}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
};


export default SaleDetail;
