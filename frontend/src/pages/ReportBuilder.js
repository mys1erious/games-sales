import React, {useEffect, useState} from 'react';
import axiosInstance from "../lib/axiosInstance";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useSearchParams} from "react-router-dom";


const ReportBuilder = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [data, setData] = useState({});
    const [columnHeaders, setColumnHeaders] = useState([]);
    const [rowHeaders, setRowHeaders] = useState([]);

    const getData = async(searchParams) => {
        return await axiosInstance.get(`/sale-analysis/${searchParams}`);
    };

    useEffect(() => {
        getData(`?${searchParams}`).then(r => {setData(r.data)});
    }, []);

    const getColumnHeaders = () => {
        const headers = [];
        for (const header of Object.keys(data))
            headers.push(header);
        return headers;
    };

    const getRowHeaders = () => {
        let headers = [];

        const row = Object.values(data)[0];
        if (row)
            headers = Object.keys(row);

        return headers;
    };

    useEffect(() => {
        setColumnHeaders(getColumnHeaders());
        setRowHeaders(getRowHeaders());
    }, [data]);

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table sx={{width: "50vw"}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {data ?
                                rowHeaders.map((header, index) => (
                                    <TableCell key={index}>{header}</TableCell>
                                ))
                                : null
                                }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data ?
                            Object.values(data).map((row, index) => (
                                <TableRow key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{columnHeaders[index]}</TableCell>
                                    <TableCell>{row['count']}</TableCell>
                                    <TableCell>{row['max']}</TableCell>
                                    <TableCell>{Math.round(row['mean'] * 100) / 100}</TableCell>
                                    <TableCell>{row['min']}</TableCell>
                                    <TableCell>{Math.round(row['std'] * 100) / 100}</TableCell>
                                    <TableCell>{row['25%']}</TableCell>
                                    <TableCell>{row['50%']}</TableCell>
                                    <TableCell>{row['75%']}</TableCell>
                                </TableRow>
                            ))
                            : null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};


export default ReportBuilder;
