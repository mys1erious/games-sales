import React from "react";
import {Box} from "@mui/material";

import SalesListItem from "./SalesListItem";


const SalesList = ({sales, currPage}) => {
    return(
        <Box>
            <ul>
                {sales.map((sale, index) => (
                    <SalesListItem key={index} sale={sale} currPage={currPage}/>
                ))}
            </ul>
        </Box>
    )
};


export default SalesList;
