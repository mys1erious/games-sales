import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import {Box, Grid, Pagination, Typography} from "@mui/material";

import DataLoadingItem from "../features/core/components/DataLoadingItem";
import SalesList from "../features/sales/components/SalesList";
import {getSales} from "../features/sales/services";


const Sales = ({sales, setSales}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();
    const [currPage, setCurrPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [numPages, setNumPages] = useState(1);

    useEffect(() => {
        searchParams.delete('page');

        if (location.state?.newSearch)
            setCurrPage(1);

        let saleSearchParams = buildSaleSearchParams(currPage, searchParams);
        getSales(`${saleSearchParams}`)
            .then((response) => {
                setSales(response.data.sales);
                setNumPages(response.data.num_pages);
        });
        navigate(`/sales/${saleSearchParams}`);

    }, [currPage, searchParams]);

    const buildSaleSearchParams = (page, searchParams) => {
        let pageParam = `?page=${page}`;
        if (searchParams.toString().length === 0)
            return pageParam;
        return `${pageParam}&${searchParams.toString()}`;
    };

    const changePage = (e, p) => {
        setCurrPage(p);
    };

    return(
        <React.Fragment>
            {sales ?
                <Grid container spacing={0} direction="column"
                      alignItems="center">
                    <Grid item marginY={"3%"}>
                        <Typography variant="h4">Sales List</Typography>
                    </Grid>
                    <Grid item minWidth={"300px"} width={"50%"}>
                        <SalesList sales={sales} currPage={currPage} />
                    </Grid>
                    <Grid item marginTop={"5%"}>
                        <Typography>Page: {currPage}</Typography>
                        <Pagination boundaryCount={0} siblingCount={1}
                                    color="primary" count={numPages}
                                    showFirstButton showLastButton
                                    page={currPage} onChange={changePage} />
                    </Grid>
                </Grid>
            : <DataLoadingItem />
        }
        </React.Fragment>
    )
};


export default Sales;
