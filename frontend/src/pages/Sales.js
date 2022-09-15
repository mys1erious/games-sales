import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import {Grid, Pagination, Typography} from "@mui/material";

import axiosInstance from "../lib/axiosInstance";

import DataLoadingItem from "../features/core/components/DataLoadingItem";
import SalesList from "../features/sales/components/SalesList";


const Sales = ({sales, setSales}) => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [currPage, setCurrPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [numPages, setNumPages] = useState(1);

    useEffect(() => {
        getSales();
        navigate(`/sales/?page=${currPage}`);

    }, [currPage]);


    const getSales = () => {
        axiosInstance.get(`/sales/?page=${currPage}`)
            .then((response) => {
                setSales(response.data.sales);
                setNumPages(response.data.num_pages);
            });
    };

    const changePage = (e, p) => {
        setCurrPage(p);
    };

    return(
        <React.Fragment>
            {sales ?
                <Grid container spacing={0} direction="column"
                      alignItems="center">
                    <Grid item marginBottom={"5%"}><h1>Sales List</h1></Grid>
                    <Grid item minWidth={"300px"} width={"30%"}>
                        <SalesList sales={sales} currPage={currPage} />
                    </Grid>
                    <Grid item marginTop={"20px"}>
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
