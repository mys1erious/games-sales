import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import {Box, Grid, Pagination, Typography} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import DataLoadingItem from "features/core/components/DataLoadingItem";
import {Button} from "features/core/components/Button";
import SalesList from "features/sales/components/SalesList";
import {getSales} from "features/sales/services";
import SalesFilterSidebar from "features/sales/components/SalesFilterSidebar";


const Sales = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [sales, setSales] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currPage, setCurrPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [numPages, setNumPages] = useState(1);

    useEffect(() => {
        if (location.state?.newSearch)
            setCurrPage(1);
    }, [location.state?.newSearch]);

    useEffect(() => {
        getSales(`?${searchParams.toString()}`)
            .then((response) => {
                setSales(response.data.sales);
                setNumPages(response.data.num_pages);
        });

        searchParams.set('page', currPage.toString());
        setSearchParams(searchParams);

    }, [currPage, searchParams]);

    const changePage = (e, p) => {
        setCurrPage(p);
    };

    const createReport = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('page');
        navigate(`/report-builder/?${params}`);
    };

    if (!sales)
        return(<DataLoadingItem />)

    return(
        <Grid container spacing={0} direction="column" alignItems="center">
            <Grid item marginY="3%">
                <Typography variant="h4">Sales List</Typography>
            </Grid>
            <Grid item minWidth="300px" width="40%">
                <Box display="flex" justifyContent="space-between">
                    <SalesFilterSidebar setCurrPage={setCurrPage} />
                    <Button color="success" onClick={createReport}>
                        Create Report <ArrowForwardIcon />
                    </Button>
                </Box>
                <SalesList sales={sales} currPage={currPage} />
            </Grid>
            <Grid item marginTop="5%">
                <Typography>Page: {currPage}</Typography>
                <Pagination boundaryCount={1} siblingCount={1} count={numPages}
                            onChange={changePage} page={currPage}
                            hidePrevButton hideNextButton
                            color="primary" variant="outlined"
                />
            </Grid>
        </Grid>
    );
};


export default Sales;
