import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import {Box, Grid, Pagination, Typography} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import DataLoadingItem from "features/core/components/DataLoadingItem";
import {Button} from "features/core/components/Button";
import SalesList from "features/sales/components/SalesList";
import {getSales} from "features/sales/services";
import FilterSidebar from "features/sales/components/FilterSidebar";


const Sales = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [numPages, setNumPages] = useState(1);

    useEffect(() => {
        if (location.state?.newSearch) {
            searchParams.set('page', '1');
            setSearchParams(searchParams);
        }
    }, [location.state?.newSearch]);

    useEffect(() => {
        setLoading(true);
        getSales(`?${searchParams}`)
            .then((response) => {
                setSales(response.data.sales);
                setNumPages(response.data.num_pages);
                setLoading(false);
        });
    }, [searchParams]);

    const changePage = (e, p) => {
        searchParams.set('page', p);
        setSearchParams(searchParams);
    };

    const createReport = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('page');
        navigate(`/report-builder/?${params}`);
    };

    return(
        <Grid container spacing={0} direction="column" alignItems="center">
            <Grid item marginY="3%">
                <Typography variant="h4">Sales List</Typography>
            </Grid>
            <Grid item minWidth="300px" width="40%">
                <Box display="flex" justifyContent="space-between">
                    <FilterSidebar />
                    <Button color="success" onClick={createReport}>
                        Create Report <ArrowForwardIcon />
                    </Button>
                </Box>
                {loading
                    ? <DataLoadingItem/>
                    : <SalesList sales={sales}/>
                }
            </Grid>
            <Grid item marginTop="5%">
                <Typography>Page: {searchParams.get('page')}</Typography>
                <Pagination boundaryCount={1} siblingCount={1} count={numPages}
                            onChange={changePage} page={+searchParams.get('page')}
                            hidePrevButton hideNextButton
                            color="primary" variant="outlined"
                />
            </Grid>
        </Grid>
    );
};


export default Sales;
