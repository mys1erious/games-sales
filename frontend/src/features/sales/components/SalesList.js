import React from "react";
import {Container} from "@mui/material";
import SalesListItem from "./SalesListItem";


const SalesList = ({sales, currPage}) => {
    return(
        <Container component="main">
            <ul>
                {sales.map((sale, index) => (
                    <SalesListItem key={index} sale={sale} currPage={currPage} />
                ))}
            </ul>
        </Container>
    )
};


export default SalesList;
