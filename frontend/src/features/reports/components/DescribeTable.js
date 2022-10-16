import React, {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import {slugify, unslugify} from "features/core/utils";


const DescribeTable = ({data}) => {
    const [tableHeaders, setTableHeaders] = useState([]);

    const getTableHeaders = () => {
        const row = Object.values(data)[0];
        const headers = Object.keys(row);
        setTableHeaders(headers);
    };

    useEffect(() => {
        setTableHeaders(getTableHeaders);
    }, []);

    return(
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="report table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {tableHeaders ?
                            tableHeaders.map((header) => (
                                <TableCell key={header}>{header}</TableCell>
                            ))
                            : null
                        }
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
