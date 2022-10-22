import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import {unslugify} from "features/core/utils";


const getTableHeaders = (data) => {
    const row = Object.values(data)[0];
    return Object.keys(row);
}


const DescribeTable = ({data}) => {
    console.log('RENDERED: describe table')
    const tableHeaders = getTableHeaders(data);

    return(
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="report table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {tableHeaders.map((header) => (
                            <TableCell key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(data).map(([name, row]) => (
                        <TableRow key={name}>
                            <TableCell>{unslugify(name)}</TableCell>
                            {Object.values(row).map((val, count) => (
                                <TableCell key={count}>
                                    {Math.round((val + Number.EPSILON) * 100) / 100}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};


export default DescribeTable;
