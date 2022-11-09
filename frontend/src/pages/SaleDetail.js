import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {
    Box,
    Container,
    Grid,
    Typography
} from "@mui/material";

import {getSale} from "features/sales/services";
import SaleDetailTable from "features/sales/components/SaleDetailTable";


const SaleDetail = () => {
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
            <Box textAlign="center" paddingTop="20px">
                <Typography variant="h4" marginBottom="20px">
                    Sale info:
                </Typography>
                <Grid container textAlign="center">
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5">Sales</Typography>
                        <SaleDetailTable obj={sale} exclude={['game', 'slug']} postfix="M"/>
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
